import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/connect";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Course selling backend is running");
})

const startServer = async () => {
    await connectDb();

    app.listen(PORT, () => {
        console.log(`server running on post ${PORT}`);
    })
}

startServer();