import express from "express";
import { getAllLocations } from "../controllers/locationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/",authMiddleware, getAllLocations);

export default router;
