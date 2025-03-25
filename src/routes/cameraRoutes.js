import express from "express";
import { getAllCameras, getCamerasByFloor } from "../controllers/cameraController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", authMiddleware, getCamerasByFloor);
router.get("/", authMiddleware, getAllCameras);


export default router;