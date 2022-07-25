import { faker } from "@faker-js/faker";

export async function createNewTest(){

    const categories = ["Prática", "Projeto", "Recuperação"];
    const randomCat = Math.floor(Math.random()*categories.length);

    const disciplines = ["HTML e CSS", "JavaScript", "React", "Humildade", "Planejamento", "Autoconfiança"];
    let randomDisc = 0;

    const teachers = ["Diego Pinho", "Bruna Hamori"];
    const randomTea = Math.floor(Math.random()*teachers.length);
    if (randomTea === 0){
        randomDisc = Math.floor(Math.random()*3);
    } else {
        randomDisc = 3 + Math.floor(Math.random()*3);
    };

    const newTest = {
        name: faker.lorem.word(),
        pdfUrl: faker.internet.url(),
        category: categories[randomCat],
        discipline: disciplines[randomDisc],
        teacher: teachers[randomTea]
    };
    
    return newTest;
};

export async function pickDiscipline(){
    const disciplines = ["HTML e CSS", "JavaScript", "React", "Humildade", "Planejamento", "Autoconfiança"];
    const randomDisc = Math.floor(Math.random()*disciplines.length);
    return disciplines[randomDisc];
};