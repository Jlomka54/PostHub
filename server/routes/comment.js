import { Router } from "express";
import { ckeckToken } from "../middlewares/checkToken.js";

const router = new Router();

router.post("/:id", checkToken, createComment);

export default router;
