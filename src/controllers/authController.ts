import { Request, Response } from "express";
import authServices from "./../services/authServices.js";

export async function createUser(req: Request, res: Response){
    const { email, password, confirmPassword } : { email: string, password: string, confirmPassword: string } = res.locals.body;

    await authServices.createUser(email, password, confirmPassword);
    
    res.status(201).send("User created.");
}
