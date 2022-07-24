import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import errorResponses from "./../responses/errorResponses.js";
import authUtils from "./../utils/authUtils.js";
import authRepository from "./../repositories/authRepository.js";
import "./../setup.js";
import { Users } from "@prisma/client";

export type UserDataInput = Omit<Users, "id">;

async function createUser(email: string, password: string, confirmPassword: string){
    const existingEmail = await authRepository.findUserByEmail(email);
    if (existingEmail){
        return errorResponses.conflict("Email");
    }
    
    if (password !== confirmPassword){
        return errorResponses.unprocessableEntity("password, inputs do not match")
    }

    const SALT = +process.env.BCRYPT_SALT;
    const hashedPassword = bcrypt.hashSync(password, SALT);

    const newUser : UserDataInput = {
        email,
        password: hashedPassword
    }
    
    await authRepository.addNewUser(newUser);
};

async function login(email: string, password: string){
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
        return errorResponses.unprocessableEntity("user email and/or password");
    }

    authUtils.checkPassword(user.password, password);

    const jwtKey = process.env.JWT_SECRET;
    const token = jwt.sign({ idUser: user.id }, jwtKey);

    return token;
};

const authServices = {
    createUser,
    login
};

export default authServices;
