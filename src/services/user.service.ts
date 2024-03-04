import User, { IUser } from "../models/user.model";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

// number of salts for hashing
const saltRounds = 10;

async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);

    return bcrypt.hash(password, salt);
}

export async function createUser(user: IUser) {
    try {
        // Check if the e-mail is new before creating
        const existingUser = await User.findOne({ email: user.email });
        const passwordHash = await hashPassword(user.senha);
        const newUser: IUser = {
            ...user,
            id: uuidv4(),
            senha: passwordHash,
            data_criacao: new Date(),
            data_atualizacao: new Date(),
            ultimo_login: new Date(),
            token: uuidv4(),
        };
        if (existingUser) {
            // Throws an error if the email already existes
            throw new Error("E-mail já existente");
        }
        // Se não houver usuário existente com o mesmo e-mail, cria um novo usuário
        const response = await User.create(newUser);
        console.log("Usuário criado com sucesso", response);
        return response;
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw error; // Relança o erro para ser tratado pelo chamador da função
    }
}
