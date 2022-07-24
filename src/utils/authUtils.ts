import bcrypt from "bcrypt";
import errorResponses from "./../responses/errorResponses.js";

function checkPassword(registeredPassword: string, inputPassword: string){
    if (!bcrypt.compareSync(inputPassword, registeredPassword)){
        return errorResponses.unprocessableEntity("user email and/or password");
    }
};

const authUtils = {
    checkPassword
};

export default authUtils;