import express from "express";
import { addEntry, deleteEntry, fetchAllEntries } from "../controllers/expense.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add-expense", protectRoute, addEntry);
router.get("/entries/:type", protectRoute, fetchAllEntries);

router.delete("/delete/:id", protectRoute, deleteEntry);


export default router;