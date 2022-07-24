import prisma from "../config/database.js";

async function findTeacherDisciplinesByIds(teacherId: number, disciplineId: number){
    const teacherDiscipline = await prisma.teacherDisciplines.findFirst({
        where: {
            teacherId,
            disciplineId
        }
    });

    return teacherDiscipline;
};

const teacherDisciplinesRepository = {
    findTeacherDisciplinesByIds
};

export default teacherDisciplinesRepository;