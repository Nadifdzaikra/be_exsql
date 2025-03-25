import express from "express";
import { getFloorsByLocation } from "../controllers/floorController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id",authMiddleware, getFloorsByLocation);

export default router;