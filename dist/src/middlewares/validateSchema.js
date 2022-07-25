var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { stripHtml } from "string-strip-html";
import errorResponse from "./../responses/errorResponses.js";
export default function validSchema(schema, errorMessageEntity) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const schemaBody = {};
        for (const key in body) {
            if (typeof body[key] === "string" && key !== "pdfUrl") {
                schemaBody[key] = stripHtml(body[key]).result.trim();
            }
            else {
                schemaBody[key] = body[key];
            }
        }
        const validation = schema.validate(schemaBody, { abortEarly: false });
        if (validation.error) {
            return errorResponse.badRequest(errorMessageEntity);
        }
        res.locals.body = validation.value;
        next();
    });
}
