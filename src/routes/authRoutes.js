import express from "express";
import { register, login, getAllUser, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout)
router.get("/user", getAllUser)

export default router;
