import express, { Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const port = process.env.PORT;

const uri = process.env.MONGO_URI as string;

dotenv.config();

app.use(express.json());

app.get("/", (res: Response) => {
    res.send("SignIn and SignUp application");
});

app.use("", userRoutes);

// Middleware catch-all for all not routes
app.use((res:any) => {
    res.status(404).send({ messagem: "Rota não encontrada" });
});

const run = async () => {
    console.log(uri);
    await mongoose.connect(uri);
    console.log("Connected to myDB");
};

// Conect into the datadase and run application
run().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
