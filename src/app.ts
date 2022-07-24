import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import "./setup.js";
import router from "./routes/index.js";
import { errorHandlerMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandlerMiddleware);

export default app;