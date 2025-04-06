import express from "express";

const app = express();
const PORT = 5001;

app.use("/", (req, res) => {
    res.send("hello");
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})