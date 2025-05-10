import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, 
}));  

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});