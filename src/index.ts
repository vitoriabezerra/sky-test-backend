import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;

const uri: string = `mongodb+srv://vitooriabezerra:isXWoKcJjzJsaGpi@cluster0.kwcotdp.mongodb.net/Test-User?retryWrites=true&w=majority&appName=Cluster0`;

dotenv.config();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("SignIn and SignUp application");
});

app.use("", userRoutes);

const run = async () => {
    await mongoose.connect(uri);
    console.log("Connected to myDB");
};

// Conect into the datadase and run application
run().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
