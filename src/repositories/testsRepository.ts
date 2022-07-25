import prisma from "../config/database.js";
import { Tests } from "@prisma/client";

export type TestCreateData = Omit<Tests, "id">;

async function addNewTest(newTest: TestCreateData){
    await prisma.tests.create({
        data: newTest
    });
}

async function findByDiscipline(disciplineId: number){
    const tests : any = await prisma.terms.findMany({
        include: {
            Disciplines: {
                where: {
                    id: disciplineId
                },
                select: {
                    id: true,
                    name: true,
                    term: {},
                    TeacherDisciplines: {
                        select: {
                            id: true,
                            discipline: {},
                            teacher: {},
                            Tests: {
                                select: {
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    category: {}    
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    // tests[2].Disciplines[0].TeacherDisciplines[0].Tests
    return tests;
};

const testsRepository = {
    addNewTest,
    findByDiscipline
};

export default testsRepository;