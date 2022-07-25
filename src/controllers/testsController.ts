import { Request, Response } from "express";
import testsServices, { TestInput } from "./../services/testsServices.js";
import errorResponses from "./../responses/errorResponses.js";

export async function createTest(req: Request, res: Response){
    const newTest : TestInput = res.locals.body;

    await testsServices.createTest(newTest);

    res.status(201).send("Test added.")
};

export async function getTestsByDiscipline(req: Request, res: Response){
    const disciplineName : string = req.params.name;

    const tests = await testsServices.getTestsByDiscipline(disciplineName);

    res.status(200).send(tests);
};

export async function getCategories(req: Request, res: Response){
    const categories = await testsServices.getTestsCategories();

    res.status(200).send(categories);
};