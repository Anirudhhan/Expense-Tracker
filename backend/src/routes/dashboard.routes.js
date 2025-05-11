import express from "express";
import { getDashboardData } from "../controllers/dashboard.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getDashboardData);

export default router;