import { Request, Response } from "express";
import * as userService from "../services/user.service";

export async function createNewUser(req: Request, res: Response) {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        if (error instanceof Error) {
            // Check if is an existing email error
            if (error.message === "E-mail já existente") {
                // returns 409, conflict of resources
                return res.status(409).json({ mensagem: error.message });
            }
            // For other errors, internal Server Error
            return res.status(500).json({ mensagem: "Erro ao criar usuário" });
        }
        // General error
        res.status(500).json({
            mensagem: "Erro desconhecido ao criar usuário",
        });
    }
}

export async function autheticateUser(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
        const User = await userService.authUser(email, senha);
        res.status(200).json(User);
    } catch (error) {
        if (error instanceof Error) {
            // Check if is an existing email error
            if (error.message === "Usuário e/ou senha inválidos") {
                // returns 409, conflict of resources
                return res.status(401).json({ mensagem: error.message });
            }
            // For other errors, internal Server Error
            return res
                .status(500)
                .json({ mensagem: "Erro ao autenticar usuário" });
        }
        // General error
        res.status(500).json({
            mensagem: "Erro ao autenticar usuário",
        });
    }
}
