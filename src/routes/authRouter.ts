import { Router } from "express";
import { createUser, login } from "./../controllers/authController.js";
import { validateToken } from "./../middlewares/authMiddleware.js";
import validSchema from "./../middlewares/validateSchema.js";
import authSchemas from "../schemas/authSchemas.js";

const authRouter = Router();

authRouter.post("/user/signup", 
    validSchema(authSchemas.signup, "User email and/or password"),
    createUser
);

authRouter.post("/user/signin",
    validSchema(authSchemas.signin, "User email and/or password"),
    login
);

export default authRouter;