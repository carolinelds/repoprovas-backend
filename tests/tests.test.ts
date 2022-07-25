import app from "../src/app.js";
import supertest from "supertest";
import prisma from "../src/config/database.js";
import { faker } from "@faker-js/faker";
import { createNewTest } from "./factories/testsFactory.js";
import { createNewUser } from "./factories/userFactory.js";

const agent = supertest(app);

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});

describe ("POST /tests", () => {
    it("given valid token and valid test data it should return 201", async () => {
        const bodySignup = await createNewUser();
        await agent.post("/user/signup").send(bodySignup);
       
        const bodySignin = {
            email: bodySignup.email,
            password: bodySignup.password
        };
        const resultToken = await agent.post("/user/signin").send(bodySignin);
        const token = resultToken.text;
        const formatedToken = `Bearer ${token}`;

        const body = await createNewTest();
        const result = await agent.post("/tests").set('Authorization', formatedToken).send(body);

        const status = result.status;
        expect(status).toEqual(201);
    });

    it("given invalid token and valid test data it should return 401", async () => {
        const random = faker.random.alphaNumeric();
        const formatedToken = `Bearer ${random}`;

        const body = await createNewTest();
        const result = await agent.post("/tests").set('Authorization', formatedToken).send(body);

        const status = result.status;
        expect(status).toEqual(401);
    });

    it("given valid token and invalid test data it should return 400", async () => {
        const bodySignup = await createNewUser();
        await agent.post("/user/signup").send(bodySignup);
       
        const bodySignin = {
            email: bodySignup.email,
            password: bodySignup.password
        };
        const resultToken = await agent.post("/user/signin").send(bodySignin);
        const token = resultToken.text;
        const formatedToken = `Bearer ${token}`;

        let body = await createNewTest();
        body.name = "";

        const result = await agent.post("/tests").set('Authorization', formatedToken).send(body);

        const status = result.status;
        expect(status).toEqual(400);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});