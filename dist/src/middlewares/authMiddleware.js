var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import "./../setup.js";
import errorResponses from "./../responses/errorResponses.js";
export function validateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { authorization } = req.headers;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace('Bearer ', '');
        if (!token) {
            return errorResponses.unauthorized("User");
        }
        let userData;
        try {
            userData = jwt.verify(token, process.env.JWT_SECRET);
        }
        catch (e) {
            return errorResponses.unauthorized("User");
        }
        res.locals.idUser = userData.idUser;
        next();
    });
}
