import express from "express";
import { addExpense } from "../controllers/expense.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add-expense", protectRoute, addExpense);

export default router;