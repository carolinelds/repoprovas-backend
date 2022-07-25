import app from "../src/app.js";
import supertest from "supertest";
import prisma from "../src/config/database.js";
import { faker } from "@faker-js/faker";

const agent = supertest(app);

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});



afterAll(async () => {
    await prisma.$disconnect();
});