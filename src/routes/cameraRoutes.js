import express from "express";
import { getAllCameras, getCamerasByFloor } from "../controllers/cameraController.js";

const router = express.Router();

router.get("/:id", getCamerasByFloor);
router.get("/", getAllCameras);


export default router;