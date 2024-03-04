import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "../db";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.get("/", (req: Request, res: Response) => {
    res.send("SignIn and SignUp application");
});

// Conect into the datadase and start application
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
