import prisma from "../config/database.js";

async function findTeacherByName(name: string){
    const teacher = await prisma.teachers.findUnique({
        where: {
            name
        }
    });

    return teacher;
};

const teachersRepository = {
    findTeacherByName,
};

export default teachersRepository;