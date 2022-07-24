import prisma from "../config/database.js";

async function findCategoryByName(name: string){
    const category = await prisma.categories.findUnique({
        where: {
            name
        }
    });

    return category;
};

const categoriesRepository = {
    findCategoryByName
};

export default categoriesRepository;