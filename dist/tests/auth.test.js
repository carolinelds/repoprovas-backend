var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import app from "../src/app.js";
import supertest from "supertest";
import prisma from "../src/config/database.js";
import { faker } from "@faker-js/faker";
import { createNewUser } from "./factories/userFactory.js";
const agent = supertest(app);
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$executeRaw `TRUNCATE TABLE users;`;
}));
describe("POST /user/signup", () => {
    it("given a valid email and password it should return 201", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = yield createNewUser();
        const result = yield agent.post("/user/signup").send(body);
        const status = result.status;
        expect(status).toEqual(201);
    }));
    it("given a registered email and password it should return 409", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            email: "carol99@teste.com",
            password: "123",
            confirmPassword: "123"
        };
        yield agent.post("/user/signup").send(body);
        const result = yield agent.post("/user/signup").send(body);
        const status = result.status;
        expect(status).toEqual(409);
    }));
    it("given an empty email and valid password it should return 400", () => __awaiter(void 0, void 0, void 0, function* () {
        let body = yield createNewUser();
        body.email = "";
        const result = yield agent.post("/user/signup").send(body);
        const status = result.status;
        expect(status).toEqual(400);
    }));
    it("given a valid email and empty passwords it should return 400", () => __awaiter(void 0, void 0, void 0, function* () {
        let body = yield createNewUser();
        body.password = "";
        body.confirmPassword = "";
        const result = yield agent.post("/user/signup").send(body);
        const status = result.status;
        expect(status).toEqual(400);
    }));
    it("given a valid email and mismatch passwords it should return 422", () => __awaiter(void 0, void 0, void 0, function* () {
        let body = yield createNewUser();
        body.confirmPassword = faker.internet.password();
        const result = yield agent.post("/user/signup").send(body);
        const status = result.status;
        expect(status).toEqual(422);
    }));
});
describe("POST /user/signin", () => {
    it("given a registered email and password it should return 200 and valid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const bodySignup = yield createNewUser();
        yield agent.post("/user/signup").send(bodySignup);
        const bodySignin = {
            email: bodySignup.email,
            password: bodySignup.password
        };
        const result = yield agent.post("/user/signin").send(bodySignin);
        const status = result.status;
        expect(status).toEqual(200);
        const token = result.text;
        const regexJwt = /^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/;
        const validation = regexJwt.test(token);
        expect(validation).toEqual(true);
    }));
    it("given a registered email and invalid password it should return 422", () => __awaiter(void 0, void 0, void 0, function* () {
        const bodySignup = yield createNewUser();
        yield agent.post("/user/signup").send(bodySignup);
        const bodySignin = {
            email: bodySignup.email,
            password: faker.internet.password()
        };
        const result = yield agent.post("/user/signin").send(bodySignin);
        const status = result.status;
        expect(status).toEqual(422);
    }));
    it("given an unregistered email and password it should return 422", () => __awaiter(void 0, void 0, void 0, function* () {
        const bodySignup = yield createNewUser();
        yield agent.post("/user/signup").send(bodySignup);
        const bodySignin = {
            email: faker.internet.email(),
            password: bodySignup.password
        };
        const result = yield agent.post("/user/signin").send(bodySignin);
        const status = result.status;
        expect(status).toEqual(422);
    }));
    it("given an empty email and password it should return 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const bodySignup = yield createNewUser();
        yield agent.post("/user/signup").send(bodySignup);
        const bodySignin = {
            email: "",
            password: bodySignup.password
        };
        const result = yield agent.post("/user/signin").send(bodySignin);
        const status = result.status;
        expect(status).toEqual(400);
    }));
    it("given a registered email and an empty password it should return 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const bodySignup = yield createNewUser();
        yield agent.post("/user/signup").send(bodySignup);
        const bodySignin = {
            email: bodySignup.email,
            password: ""
        };
        const result = yield agent.post("/user/signin").send(bodySignin);
        const status = result.status;
        expect(status).toEqual(400);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
