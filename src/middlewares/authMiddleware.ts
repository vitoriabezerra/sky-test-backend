import User from "../models/user.model";
import jwt from "jsonwebtoken";

const secretKey = "chave_secreta";

export const checkTokenAndUser = async (req: any, res: any, next: any) => {
    const bearerHeader = req.headers["authorization"];

    // Se o token não for passado
    if (!bearerHeader) {
        return res.status(401).json({ mensagem: "Não autorizado" });
    }

    const token = bearerHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, secretKey);

        // Verifies if decode is an object and has the property email
        if (typeof decoded === "object" && "email" in decoded) {
            const userEmail = decoded.email;

            // Now we can search for the user
            const user = await User.findOne({ email: userEmail });

            if (!user) {
                return res
                    .status(404)
                    .json({ mensagem: "Usuário não encontrado" });
            }

            req.user = user;
            next();
        } else {
            return res.status(401).json({ mensagem: "Não autorizado" });
        }
    } catch (error) {
        // if the token is not longer valid : 30 minutes
        if (error instanceof jwt.TokenExpiredError) {
            sendError(res, "Sessão inválida", 401);
        }
        // Token invalid (dont match or not formmated)
        else if (error instanceof jwt.JsonWebTokenError) {
            sendError(res, "Não autorizado", 401);
        }
        // Other errors
        else {
            sendError(res, "Erro ao verificar o token", 500);
        }
    }
};

const sendError = (res: any, message: string, statusCode: number) => {
    res.status(statusCode).json({ messagem: message });
};
