var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "./../src/config/database.js";
import bcrypt from "bcrypt";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const SALT = +process.env.BCRYPT_SALT;
        const hashedPassword = bcrypt.hashSync("123", SALT);
        yield prisma.users.upsert({
            where: { email: "carol@testes.com" },
            update: {},
            create: {
                email: "carol@testes.com",
                password: hashedPassword
            }
        });
        yield prisma.terms.createMany({
            data: [
                { number: 1 },
                { number: 2 },
                { number: 3 },
                { number: 4 },
                { number: 5 },
                { number: 6 }
            ],
            skipDuplicates: true
        });
        yield prisma.categories.createMany({
            data: [
                { name: "Projeto" },
                { name: "Prática" },
                { name: "Recuperação" }
            ],
            skipDuplicates: true
        });
        yield prisma.teachers.createMany({
            data: [
                { name: "Diego Pinho" },
                { name: "Bruna Hamori" }
            ],
            skipDuplicates: true
        });
        yield prisma.disciplines.createMany({
            data: [
                { name: "HTML e CSS", termId: 1 },
                { name: "JavaScript", termId: 2 },
                { name: "React", termId: 3 },
                { name: "Humildade", termId: 1 },
                { name: "Planejamento", termId: 2 },
                { name: "Autoconfiança", termId: 3 }
            ],
            skipDuplicates: true
        });
        yield prisma.teacherDisciplines.createMany({
            data: [
                { teacherId: 1, disciplineId: 1 },
                { teacherId: 1, disciplineId: 2 },
                { teacherId: 1, disciplineId: 3 },
                { teacherId: 2, disciplineId: 4 },
                { teacherId: 2, disciplineId: 5 },
                { teacherId: 2, disciplineId: 6 },
            ],
            skipDuplicates: true
        });
    });
}
;
try {
    main();
}
catch (e) {
    console.log(e);
    process.exit(1);
}
finally {
    () => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.$disconnect(); });
}
