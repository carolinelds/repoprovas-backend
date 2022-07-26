import { Router } from "express";
import { createTest, getTestsByDiscipline, getCategories } from "./../controllers/testsController.js";
import { validateToken } from "./../middlewares/authMiddleware.js";
import validSchema from "./../middlewares/validateSchema.js";
import testsSchemas from "./../schemas/testsSchemas.js";
const testsRouter = Router();
testsRouter.post("/tests", validateToken, validSchema(testsSchemas.newTest, "Test data"), createTest);
testsRouter.get("/tests/discipline/:name", validateToken, getTestsByDiscipline);
testsRouter.get("/tests/categories", validateToken, getCategories);
export default testsRouter;
