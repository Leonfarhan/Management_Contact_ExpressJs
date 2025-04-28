import express from 'express';
import userRouter from './user.routes.js';
import { errorHandling } from '../controller/error-handling.js';

const route = express.Router();

route.use("/api", userRouter);
route.use(errorHandling);
route.use((req, res) => {
    res.status(404).json({
        errors: ["Page Not Found"],
        message: "Internal Server Error",
        data: null,
    });
});
export default route;