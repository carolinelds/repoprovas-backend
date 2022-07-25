import prisma from "../config/database.js";

async function findCategoryByName(name: string){
    const category = await prisma.categories.findUnique({
        where: {
            name
        }
    });

    return category;
};

async function findCategories(){
    return prisma.categories.findMany();
}

const categoriesRepository = {
    findCategoryByName,
    findCategories
};

export default categoriesRepository;