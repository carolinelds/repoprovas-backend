import app from "../src/app.js";
import supertest from "supertest";
import prisma from "../src/config/database.js";
import { faker } from "@faker-js/faker";
import { createNewUser } from "./factories/userFactory.js";

const agent = supertest(app);

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
  });

describe("POST /user/signup", () => {
    it("given a valid email and password it should return 201", async () => {
        const body = await createNewUser();

        const result = await agent.post("/user/signup").send(body);
        const status = result.status;

        expect(status).toEqual(201);
    });

    it("given a registered email and password it should return 409", async () => {
        const body = {
            email: "carol99@teste.com",
            password: "123",
            confirmPassword: "123"
        };
        
        await agent.post("/user/signup").send(body);
        const result = await agent.post("/user/signup").send(body);
        const status = result.status;

        expect(status).toEqual(409);
    });

    it("given an empty email and valid password it should return 400", async() => {
        let body = await createNewUser();

        body.email = "";

        const result = await agent.post("/user/signup").send(body);
        const status = result.status;

        expect(status).toEqual(400);
    });

    it("given a valid email and empty passwords it should return 400", async() => {
        let body = await createNewUser();

        body.password = "";
        body.confirmPassword = "";

        const result = await agent.post("/user/signup").send(body);
        const status = result.status;

        expect(status).toEqual(400);
    });

    it("given a valid email and mismatch passwords it should return 422", async() => {
        let body = await createNewUser();

        body.confirmPassword = faker.internet.password();

        const result = await agent.post("/user/signup").send(body);
        const status = result.status;

        expect(status).toEqual(422);
    });
});

describe("POST /user/signin", () => {
    it("given a registered email and password it should return 200 and valid token", async () => {
        const bodySignup = await createNewUser();
        await agent.post("/user/signup").send(bodySignup);
       
        const bodySignin = {
            email: bodySignup.email,
            password: bodySignup.password
        };
        const result = await agent.post("/user/signin").send(bodySignin);

        const status = result.status;
        expect(status).toEqual(200);

        const token = result.text;
        const regexJwt = /^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/;
        const validation = regexJwt.test(token);
        expect(validation).toEqual(true);
    });

    it("given a registered email and invalid password it should return 422", async () => {
        const bodySignup = await createNewUser();
        await agent.post("/user/signup").send(bodySignup);
       
        const bodySignin = {
            email: bodySignup.email,
            password: faker.internet.password()
        };
        const result = await agent.post("/user/signin").send(bodySignin);
        const status = result.status;

        expect(status).toEqual(422);
    });

    it("given an unregistered email and password it should return 422", async () => {
        const bodySignup = await createNewUser();
        await agent.post("/user/signup").send(bodySignup);
       
        const bodySignin = {
            email: faker.internet.email(),
            password: bodySignup.password
        };
        const result = await agent.post("/user/signin").send(bodySignin);
        const status = result.status;

        expect(status).toEqual(422);
    });

    it("given an empty email and password it should return 400", async () => {
        const bodySignup = await createNewUser();
        await agent.post("/user/signup").send(bodySignup);
       
        const bodySignin = {
            email: "",
            password: bodySignup.password
        };
        const result = await agent.post("/user/signin").send(bodySignin);
        const status = result.status;

        expect(status).toEqual(400);
    });

    it("given a registered email and an empty password it should return 400", async () => {
        const bodySignup = await createNewUser();
        await agent.post("/user/signup").send(bodySignup);
       
        const bodySignin = {
            email: bodySignup.email,
            password: ""
        };
        const result = await agent.post("/user/signin").send(bodySignin);
        const status = result.status;

        expect(status).toEqual(400);
    });

});

afterAll(async () => {
    await prisma.$disconnect();
});