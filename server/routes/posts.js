import { Router } from "express";
import { checkToken } from "../middlewares/checkToken.js";
import {
  createPost,
  getAll,
  getPostById,
  removePost,
  updatePost,
} from "../controllers/posts.js";

const router = new Router();

router.post("/", checkToken, createPost);
router.get("/", getAll);
router.get("/:id", getPostById);
router.delete("/:id", checkToken, removePost);
router.put("/:id", checkToken, updatePost);

export default router;
