import { Router } from "express";
import { ckeckToken } from "../middlewares/checkToken.js";
import {
  createPost,
  getAll,
  getPostById,
  removePost,
} from "../controllers/posts.js";

const router = new Router();

router.post("/", ckeckToken, createPost);
router.get("/", getAll);
router.get("/:id", getPostById);
router.delete("/:id", ckeckToken, removePost);

export default router;
