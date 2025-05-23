import express from "express";
import { publicRouter } from "../routers/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../routers/api.js";

export const web = express();

web.use(express.json());
web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);