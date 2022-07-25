import testsRepository, { TestCreateData } from "./../repositories/testsRepository.js";
import categoriesRepository from "./../repositories/categoriesRepository.js";
import teachersRepository from "./../repositories/teachersRepository.js";
import disciplinesRepository from "./../repositories/disciplinesRepository.js";
import teacherDisciplinesRepository from "./../repositories/teacherDisciplinesRepository.js";
import termsRepository from "../repositories/termsRepository.js";

export type TestInput = {
    name: string,
    pdfUrl: string,
    category: string,
    discipline: string,
    teacher: string
}

async function createTest(newTestInput: TestInput) {
    const category = await categoriesRepository.findCategoryByName(newTestInput.category);
    const categoryId = category.id;

    const teacher = await teachersRepository.findTeacherByName(newTestInput.teacher);
    const teacherId = teacher.id;

    const discipline = await disciplinesRepository.findDisciplineByName(newTestInput.discipline);
    const disciplineId = discipline.id;

    const teacherDiscipline = await teacherDisciplinesRepository.findTeacherDisciplinesByIds(teacherId, disciplineId);
    const teacherDisciplineId = teacherDiscipline.id;

    const newTest : TestCreateData = {
        name: newTestInput.name,
        pdfUrl: newTestInput.pdfUrl,
        categoryId,
        teacherDisciplineId
    };

    await testsRepository.addNewTest(newTest);
};

async function getTestsByDiscipline(disciplineName: string){
    const discipline = await disciplinesRepository.findDisciplineByName(disciplineName);
    const disciplineId = discipline.id;
    
    const termId = discipline.termId;
    const term = await termsRepository.findTermById(termId);
    const termNumber = term.number;

    const tests = await testsRepository.findByDiscipline(disciplineId);

    const formatedTests = tests.filter(x => {
        return x.Disciplines.length > 0 && x.Disciplines.filter(y => {
            return y.TeacherDisciplines.length > 0 && y.TeacherDisciplines.filter(z => {
                return z.Tests.length > 0;
            });
        });
    });

    return formatedTests;
};

async function getTestsCategories(){
    return await categoriesRepository.findCategories();
};
// OBS: front-end will use getTestsCategories to filter tests by categories

const testsServices = {
    createTest,
    getTestsByDiscipline,
    getTestsCategories
};

export default testsServices;