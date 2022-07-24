import testsRepository, { TestCreateData } from "./../repositories/testsRepository.js";
import categoriesRepository from "./../repositories/categoriesRepository.js";
import teachersRepository from "./../repositories/teachersRepository.js";
import disciplinesRepository from "./../repositories/disciplinesRepository.js";
import teacherDisciplinesRepository from "./../repositories/teacherDisciplinesRepository.js";

export type TestInput = {
    name: string,
    url: string,
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
        pdfUrl: newTestInput.url,
        categoryId,
        teacherDisciplineId
    };

    await testsRepository.addNewTest(newTest);
};

const testsServices = {
    createTest
};

export default testsServices;