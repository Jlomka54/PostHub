import { Router } from "express";
import { ckeckToken } from "../middlewares/checkToken.js";
import { createPost, getAll } from "../controllers/posts.js";

const router = new Router();

//Create post
router.post("/", ckeckToken, createPost);

router.get("/", getAll);

export default router;
