import prisma from "../config/database.js";
import { Tests } from "@prisma/client";

export type TestCreateData = Omit<Tests, "id">;

async function addNewTest(newTest: TestCreateData){
    await prisma.tests.create({
        data: newTest
    });
}

const testsRepository = {
    addNewTest
};

export default testsRepository;