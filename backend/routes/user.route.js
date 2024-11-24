import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { login, Register } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", login);

export default router;
