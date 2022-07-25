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
import { createNewTest, pickDiscipline } from "./factories/testsFactory.js";
import { createNewUser } from "./factories/userFactory.js";
const agent = supertest(app);
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$executeRaw `TRUNCATE TABLE tests;`;
}));
describe("POST /tests", () => {
    it("given valid token and valid test data it should return 201", () => __awaiter(void 0, void 0, void 0, function* () {
        const bodySignup = yield createNewUser();
        yield agent.post("/user/signup").send(bodySignup);
        const bodySignin = {
            email: bodySignup.email,
            password: bodySignup.password
        };
        const resultToken = yield agent.post("/user/signin").send(bodySignin);
        const token = resultToken.text;
        const formatedToken = `Bearer ${token}`;
        const body = yield createNewTest();
        const result = yield agent.post("/tests").set('Authorization', formatedToken).send(body);
        const status = result.status;
        expect(status).toEqual(201);
    }));
    it("given invalid token and valid test data it should return 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const random = faker.random.alphaNumeric();
        const formatedToken = `Bearer ${random}`;
        const body = yield createNewTest();
        const result = yield agent.post("/tests").set('Authorization', formatedToken).send(body);
        const status = result.status;
        expect(status).toEqual(401);
    }));
    it("given valid token and invalid test name it should return 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const bodySignup = yield createNewUser();
        yield agent.post("/user/signup").send(bodySignup);
        const bodySignin = {
            email: bodySignup.email,
            password: bodySignup.password
        };
        const resultToken = yield agent.post("/user/signin").send(bodySignin);
        const token = resultToken.text;
        const formatedToken = `Bearer ${token}`;
        let body = yield createNewTest();
        body.name = "";
        const result = yield agent.post("/tests").set('Authorization', formatedToken).send(body);
        const status = result.status;
        expect(status).toEqual(400);
    }));
    it("given valid token and invalid pdf url for test it should return 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const bodySignup = yield createNewUser();
        yield agent.post("/user/signup").send(bodySignup);
        const bodySignin = {
            email: bodySignup.email,
            password: bodySignup.password
        };
        const resultToken = yield agent.post("/user/signin").send(bodySignin);
        const token = resultToken.text;
        const formatedToken = `Bearer ${token}`;
        let body = yield createNewTest();
        body.pdfUrl = "";
        const result = yield agent.post("/tests").set('Authorization', formatedToken).send(body);
        const status = result.status;
        expect(status).toEqual(400);
    }));
    it("given valid token and invalid test category it should return 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const bodySignup = yield createNewUser();
        yield agent.post("/user/signup").send(bodySignup);
        const bodySignin = {
            email: bodySignup.email,
            password: bodySignup.password
        };
        const resultToken = yield agent.post("/user/signin").send(bodySignin);
        const token = resultToken.text;
        const formatedToken = `Bearer ${token}`;
        let body = yield createNewTest();
        body.category = "";
        const result = yield agent.post("/tests").set('Authorization', formatedToken).send(body);
        const status = result.status;
        expect(status).toEqual(400);
    }));
    it("given valid token and invalid test discipline it should return 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const bodySignup = yield createNewUser();
        yield agent.post("/user/signup").send(bodySignup);
        const bodySignin = {
            email: bodySignup.email,
            password: bodySignup.password
        };
        const resultToken = yield agent.post("/user/signin").send(bodySignin);
        const token = resultToken.text;
        const formatedToken = `Bearer ${token}`;
        let body = yield createNewTest();
        body.discipline = "";
        const result = yield agent.post("/tests").set('Authorization', formatedToken).send(body);
        const status = result.status;
        expect(status).toEqual(400);
    }));
    it("given valid token and invalid test teacher it should return 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const bodySignup = yield createNewUser();
        yield agent.post("/user/signup").send(bodySignup);
        const bodySignin = {
            email: bodySignup.email,
            password: bodySignup.password
        };
        const resultToken = yield agent.post("/user/signin").send(bodySignin);
        const token = resultToken.text;
        const formatedToken = `Bearer ${token}`;
        let body = yield createNewTest();
        body.teacher = "";
        const result = yield agent.post("/tests").set('Authorization', formatedToken).send(body);
        const status = result.status;
        expect(status).toEqual(400);
    }));
});
describe("GET /tests/discipline/:name", () => {
    it("given valid token and valid discipline name it should return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const bodySignup = yield createNewUser();
        yield agent.post("/user/signup").send(bodySignup);
        const bodySignin = {
            email: bodySignup.email,
            password: bodySignup.password
        };
        const resultToken = yield agent.post("/user/signin").send(bodySignin);
        const token = resultToken.text;
        const formatedToken = `Bearer ${token}`;
        const disciplineName = yield pickDiscipline();
        const result = yield agent.get(`/tests/discipline/${disciplineName}`).set('Authorization', formatedToken);
        const status = result.status;
        expect(status).toEqual(200);
    }));
    it("given invalid token and valid discipline name it should return 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const random = faker.random.alphaNumeric();
        const formatedToken = `Bearer ${random}`;
        const disciplineName = yield pickDiscipline();
        const result = yield agent.get(`/tests/discipline/${disciplineName}`).set('Authorization', formatedToken);
        const status = result.status;
        expect(status).toEqual(401);
    }));
    it("given valid token and invalid discipline name it should return 404", () => __awaiter(void 0, void 0, void 0, function* () {
        const bodySignup = yield createNewUser();
        yield agent.post("/user/signup").send(bodySignup);
        const bodySignin = {
            email: bodySignup.email,
            password: bodySignup.password
        };
        const resultToken = yield agent.post("/user/signin").send(bodySignin);
        const token = resultToken.text;
        const formatedToken = `Bearer ${token}`;
        const disciplineName = faker.random.alphaNumeric();
        const result = yield agent.get(`/tests/discipline/${disciplineName}`).set('Authorization', formatedToken);
        const status = result.status;
        expect(status).toEqual(404);
    }));
});
describe("GET /tests/categories", () => {
    it("given valid token it should return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const bodySignup = yield createNewUser();
        yield agent.post("/user/signup").send(bodySignup);
        const bodySignin = {
            email: bodySignup.email,
            password: bodySignup.password
        };
        const resultToken = yield agent.post("/user/signin").send(bodySignin);
        const token = resultToken.text;
        const formatedToken = `Bearer ${token}`;
        const result = yield agent.get(`/tests/categories`).set('Authorization', formatedToken);
        const status = result.status;
        expect(status).toEqual(200);
    }));
    it("given invalid token it should return 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const random = faker.random.alphaNumeric();
        const formatedToken = `Bearer ${random}`;
        const result = yield agent.get(`/tests/categories`).set('Authorization', formatedToken);
        const status = result.status;
        expect(status).toEqual(401);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
