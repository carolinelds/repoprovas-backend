var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import testsRepository from "./../repositories/testsRepository.js";
import categoriesRepository from "./../repositories/categoriesRepository.js";
import teachersRepository from "./../repositories/teachersRepository.js";
import disciplinesRepository from "./../repositories/disciplinesRepository.js";
import teacherDisciplinesRepository from "./../repositories/teacherDisciplinesRepository.js";
import termsRepository from "../repositories/termsRepository.js";
import errorResponses from "../responses/errorResponses.js";
function createTest(newTestInput) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield categoriesRepository.findCategoryByName(newTestInput.category);
        const categoryId = category.id;
        const teacher = yield teachersRepository.findTeacherByName(newTestInput.teacher);
        const teacherId = teacher.id;
        const discipline = yield disciplinesRepository.findDisciplineByName(newTestInput.discipline);
        const disciplineId = discipline.id;
        const teacherDiscipline = yield teacherDisciplinesRepository.findTeacherDisciplinesByIds(teacherId, disciplineId);
        const teacherDisciplineId = teacherDiscipline.id;
        const newTest = {
            name: newTestInput.name,
            pdfUrl: newTestInput.pdfUrl,
            categoryId,
            teacherDisciplineId
        };
        yield testsRepository.addNewTest(newTest);
    });
}
;
function getTestsByDiscipline(disciplineName) {
    return __awaiter(this, void 0, void 0, function* () {
        const discipline = yield disciplinesRepository.findDisciplineByName(disciplineName);
        if (!discipline) {
            return errorResponses.notFound("Discipline");
        }
        const disciplineId = discipline.id;
        const termId = discipline.termId;
        const term = yield termsRepository.findTermById(termId);
        const termNumber = term.number;
        const tests = yield testsRepository.findByDiscipline(disciplineId);
        const formatedTests = tests.filter(x => {
            return x.Disciplines.length > 0 && x.Disciplines.filter(y => {
                return y.TeacherDisciplines.length > 0 && y.TeacherDisciplines.filter(z => {
                    return z.Tests.length > 0;
                });
            });
        });
        return formatedTests;
    });
}
;
function getTestsCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield categoriesRepository.findCategories();
    });
}
;
// OBS: front-end will use getTestsCategories to filter tests by categories
const testsServices = {
    createTest,
    getTestsByDiscipline,
    getTestsCategories
};
export default testsServices;
