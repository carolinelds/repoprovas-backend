var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import testsServices from "./../services/testsServices.js";
export function createTest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newTest = res.locals.body;
        yield testsServices.createTest(newTest);
        res.status(201).send("Test added.");
    });
}
;
export function getTestsByDiscipline(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const disciplineName = req.params.name;
        const tests = yield testsServices.getTestsByDiscipline(disciplineName);
        res.status(200).send(tests);
    });
}
;
export function getCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield testsServices.getTestsCategories();
        res.status(200).send(categories);
    });
}
;
