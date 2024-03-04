import { Request, Response } from "express";
import * as userService from "../services/user.service";

export async function createNewUser(req: Request, res: Response) {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao criar usuário" });
    }
}
