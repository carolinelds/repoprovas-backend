var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../config/database.js";
function addNewTest(newTest) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.tests.create({
            data: newTest
        });
    });
}
function findByDiscipline(disciplineId) {
    return __awaiter(this, void 0, void 0, function* () {
        const tests = yield prisma.terms.findMany({
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
    });
}
;
const testsRepository = {
    addNewTest,
    findByDiscipline
};
export default testsRepository;
