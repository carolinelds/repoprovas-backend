var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import errorResponses from "./../responses/errorResponses.js";
import authUtils from "./../utils/authUtils.js";
import authRepository from "./../repositories/authRepository.js";
import "./../setup.js";
function createUser(email, password, confirmPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingEmail = yield authRepository.findUserByEmail(email);
        if (existingEmail) {
            return errorResponses.conflict("Email");
        }
        if (password !== confirmPassword) {
            return errorResponses.unprocessableEntity("password, inputs do not match");
        }
        const SALT = +process.env.BCRYPT_SALT;
        const hashedPassword = bcrypt.hashSync(password, SALT);
        const newUser = {
            email,
            password: hashedPassword
        };
        yield authRepository.addNewUser(newUser);
    });
}
;
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield authRepository.findUserByEmail(email);
        if (!user) {
            return errorResponses.unprocessableEntity("user email and/or password");
        }
        authUtils.checkPassword(user.password, password);
        const jwtKey = process.env.JWT_SECRET;
        const token = jwt.sign({ idUser: user.id }, jwtKey);
        return token;
    });
}
;
const authServices = {
    createUser,
    login
};
export default authServices;
