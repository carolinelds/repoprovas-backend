import prisma from "../config/database.js";

async function findTermById(id: number){
    const term = await prisma.terms.findUnique({
        where: {
            id
        }
    });

    return term;
};

const termsRepository = {
    findTermById,
};

export default termsRepository;