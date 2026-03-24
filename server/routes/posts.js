import { Router } from "express";
import { ckeckToken } from "../middlewares/checkToken.js";
import { createPost } from "../controllers/posts.js";

const router = new Router();

//Create post
router.post("/", ckeckToken, createPost);

export default router;
