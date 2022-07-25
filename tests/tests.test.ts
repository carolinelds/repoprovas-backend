import app from "../src/app.js";
import supertest from "supertest";
import prisma from "../src/config/database.js";
import { faker } from "@faker-js/faker";
import { createNewTest, pickDiscipline } from "./factories/testsFactory.js";
import { createNewUser } from "./factories/userFactory.js";

const agent = supertest(app);

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});

describe("POST /tests", () => {
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

    it("given valid token and invalid test name it should return 400", async () => {
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

    it("given valid token and invalid pdf url for test it should return 400", async () => {
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
        body.pdfUrl = "";

        const result = await agent.post("/tests").set('Authorization', formatedToken).send(body);

        const status = result.status;
        expect(status).toEqual(400);
    });


    it("given valid token and invalid test category it should return 400", async () => {
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
        body.category = "";

        const result = await agent.post("/tests").set('Authorization', formatedToken).send(body);

        const status = result.status;
        expect(status).toEqual(400);
    });
    
    it("given valid token and invalid test discipline it should return 400", async () => {
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
        body.discipline = "";

        const result = await agent.post("/tests").set('Authorization', formatedToken).send(body);

        const status = result.status;
        expect(status).toEqual(400);
    });

    it("given valid token and invalid test teacher it should return 400", async () => {
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
        body.teacher = "";

        const result = await agent.post("/tests").set('Authorization', formatedToken).send(body);

        const status = result.status;
        expect(status).toEqual(400);
    });
    
});

describe("GET /tests/discipline/:name", () => {
    it("given valid token and valid discipline name it should return 200", async () => {
        const bodySignup = await createNewUser();
        await agent.post("/user/signup").send(bodySignup);

        const bodySignin = {
            email: bodySignup.email,
            password: bodySignup.password
        };
        const resultToken = await agent.post("/user/signin").send(bodySignin);
        const token = resultToken.text;
        const formatedToken = `Bearer ${token}`;

        const disciplineName = await pickDiscipline();

        const result = await agent.get(`/tests/discipline/${disciplineName}`).set('Authorization', formatedToken);

        const status = result.status;
        expect(status).toEqual(200);
    });

    it("given invalid token and valid discipline name it should return 401", async () => {
        const random = faker.random.alphaNumeric();
        const formatedToken = `Bearer ${random}`;

        const disciplineName = await pickDiscipline();

        const result = await agent.get(`/tests/discipline/${disciplineName}`).set('Authorization', formatedToken);

        const status = result.status;
        expect(status).toEqual(401);
    });

    it("given valid token and invalid discipline name it should return 404", async () => {
        const bodySignup = await createNewUser();
        await agent.post("/user/signup").send(bodySignup);

        const bodySignin = {
            email: bodySignup.email,
            password: bodySignup.password
        };
        const resultToken = await agent.post("/user/signin").send(bodySignin);
        const token = resultToken.text;
        const formatedToken = `Bearer ${token}`;

        const disciplineName = faker.random.alphaNumeric();

        const result = await agent.get(`/tests/discipline/${disciplineName}`).set('Authorization', formatedToken);

        const status = result.status;
        expect(status).toEqual(404);
    });
});

describe("GET /tests/categories", () => {
    it("given valid token it should return 200", async () => {
        const bodySignup = await createNewUser();
        await agent.post("/user/signup").send(bodySignup);

        const bodySignin = {
            email: bodySignup.email,
            password: bodySignup.password
        };
        const resultToken = await agent.post("/user/signin").send(bodySignin);
        const token = resultToken.text;
        const formatedToken = `Bearer ${token}`;

        const result = await agent.get(`/tests/categories`).set('Authorization', formatedToken);

        const status = result.status;
        expect(status).toEqual(200);
    });

    it("given invalid token it should return 401", async () => {
        const random = faker.random.alphaNumeric();
        const formatedToken = `Bearer ${random}`;

        const result = await agent.get(`/tests/categories`).set('Authorization', formatedToken);

        const status = result.status;
        expect(status).toEqual(401);
    });
});


afterAll(async () => {
    await prisma.$disconnect();
});