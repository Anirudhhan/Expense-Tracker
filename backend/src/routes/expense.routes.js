import express from "express";
import { addEntry, deleteEntry, editEntry, fetchAllEntries } from "../controllers/expense.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add-entry", protectRoute, addEntry);
router.get("/fetch-entries/:type", protectRoute, fetchAllEntries);

router.delete("/delete/:id", protectRoute, deleteEntry);

router.put("/edit/:id", protectRoute, editEntry);

export default router;