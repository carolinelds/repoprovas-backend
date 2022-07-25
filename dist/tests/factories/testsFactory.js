var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { faker } from "@faker-js/faker";
export function createNewTest() {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = ["Prática", "Projeto", "Recuperação"];
        const randomCat = Math.floor(Math.random() * categories.length);
        const disciplines = ["HTML e CSS", "JavaScript", "React", "Humildade", "Planejamento", "Autoconfiança"];
        let randomDisc = 0;
        const teachers = ["Diego Pinho", "Bruna Hamori"];
        const randomTea = Math.floor(Math.random() * teachers.length);
        if (randomTea === 0) {
            randomDisc = Math.floor(Math.random() * 3);
        }
        else {
            randomDisc = 3 + Math.floor(Math.random() * 3);
        }
        ;
        const newTest = {
            name: faker.lorem.word(),
            pdfUrl: faker.internet.url(),
            category: categories[randomCat],
            discipline: disciplines[randomDisc],
            teacher: teachers[randomTea]
        };
        return newTest;
    });
}
;
export function pickDiscipline() {
    return __awaiter(this, void 0, void 0, function* () {
        const disciplines = ["HTML e CSS", "JavaScript", "React", "Humildade", "Planejamento", "Autoconfiança"];
        const randomDisc = Math.floor(Math.random() * disciplines.length);
        return disciplines[randomDisc];
    });
}
;
