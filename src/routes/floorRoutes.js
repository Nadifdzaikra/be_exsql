import express from "express";
import { getFloorsByLocation } from "../controllers/floorController.js";

const router = express.Router();

router.get("/:id", getFloorsByLocation);

export default router;