import User, { IUser } from "../models/user.model";
import { v4 as uuidv4 } from "uuid";

export async function createUser(user: IUser) {
    try {
        // Check if the e-mail is new
        const existingUser = await User.findOne({ email: user.email });
        const teste: IUser = {
            ...user,
            data_criacao: new Date(),
            data_atualizacao: new Date(),
            ultimo_login: new Date(),
            token: uuidv4(),
        };
        if (existingUser) {
            // Lança um erro se um usuário com esse e-mail já existir
            throw new Error("Usuário com esse e-mail já existe");
        }
        // Se não houver usuário existente com o mesmo e-mail, cria um novo usuário
        const newUser = await User.create(teste);
        console.log("Usuário criado com sucesso", newUser);
        return newUser;
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw error; // Relança o erro para ser tratado pelo chamador da função
    }
}
