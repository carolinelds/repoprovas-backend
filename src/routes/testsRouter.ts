import { Router } from "express";
import { createTest } from "./../controllers/testsController.js";
import { validateToken } from "./../middlewares/authMiddleware.js";
import validSchema from "./../middlewares/validateSchema.js";
import testsSchemas from "./../schemas/testsSchemas.js";

const testsRouter = Router();

testsRouter.post("/tests/",
    validateToken,
    validSchema(testsSchemas.newTest, "Test data"),
    createTest
);


export default testsRouter;