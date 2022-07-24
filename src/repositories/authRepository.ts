import prisma from "../config/database.js";
import { UserDataInput } from "../services/authServices.js";

async function findUserByEmail(email: string){
    const user = await prisma.users.findFirst({
        where: {
            email
        }
    })

    return user;
};

async function addNewUser(newUser: UserDataInput){
    await prisma.users.create({
        data: newUser
    });
};

const authRepository = {
    findUserByEmail,
    addNewUser
};

export default authRepository;