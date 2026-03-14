import { Router } from "express";
import { getMe, login, register } from "../controllers/auth.js";
import { ckeckToken } from "../middlewares/checkToken.js";

const router = new Router();

//Register
router.post("/register", register);

//Login
router.post("/login", login);

//Get Me
router.get("/me", ckeckToken, getMe);

export default router;
