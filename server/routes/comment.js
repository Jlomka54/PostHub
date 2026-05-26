import { Router } from "express";
import { checkToken } from "../middlewares/checkToken.js";
import { createComment } from "../controllers/comment.js";

const router = new Router();

router.post("/:id", checkToken, createComment);

export default router;
