import { Request, Response } from "express";
import testsServices, { TestInput } from "./../services/testsServices.js";


export async function createTest(req: Request, res: Response){
    const newTest : TestInput = res.locals.body;

    await testsServices.createTest(newTest);

    res.status(201).send("Test added.")
}