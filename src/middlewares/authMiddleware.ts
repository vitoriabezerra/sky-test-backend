import moment from "moment";
import User from "../models/user.model";

export async function checkTokenAndUser(
    req: any,
    res: any,
    next: any
) {
    const bearerHeader = req.headers["authorization"];

    // If the token is not passed
    if (!bearerHeader) {
        return res.status(401).json({ mensagem: "Não autorizado" });
    }

    const token = bearerHeader.split(" ")[1];
    const userId = req.params.id;

    try {
        const user = await User.findOne({ id: userId });

        // If the user does not existes in the data base, returns not found
        if (!user) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        // If the user existes but the token does not match, the request is not authorized
        if (user.token !== token) {
            return res.status(401).json({ mensagem: "Não autorizado" });
        }

        // If last login is more than 30 minutes ago, the session is invalid
        if (user.ultimo_login < moment().subtract(30, "minutes").toDate()) {
            return res.status(401).json({ mensagem: "Sessão inválida" });
        }

        req.user = user; //returns the user
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}
