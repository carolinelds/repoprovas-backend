import prisma from "../config/database.js";

async function findDisciplineByName(name: string){
    const discipline = await prisma.disciplines.findUnique({
        where: {
            name
        }
    });

    return discipline;
};

const disciplinesRepository = {
    findDisciplineByName
};

export default disciplinesRepository;