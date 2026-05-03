import { Router } from "express";
import { ckeckToken } from "../middlewares/checkToken.js";
import { createPost, getAll, getPostById } from "../controllers/posts.js";

const router = new Router();

router.post("/", ckeckToken, createPost);
router.get("/", getAll);
router.get("/:id", getPostById);

export default router;
