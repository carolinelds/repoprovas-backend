import { faker } from "@faker-js/faker";

export async function createNewUser() {
    const password = faker.internet.password();
    const newUser = {
        email: faker.internet.email(),
        password,
        confirmPassword: password
    }

    return newUser;
};