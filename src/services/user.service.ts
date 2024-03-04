import User, { IUser } from "../models/user.model";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

async function hashPassword(password: string): Promise<string> {
    // number of salts for hashing
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    return bcrypt.hash(password, salt);
}

async function verifyPassword(
    password: string,
    hash: string
): Promise<boolean> {
    try {
        // If they coincide, returns true
        return await bcrypt.compare(password, hash);
    } catch (error) {
        throw new Error("Usuário e/ou senha inválidos");
    }
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
        return response;
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw error;
    }
}

export async function authUser(email: string, password: string) {
    try {
        // Check if user existes on dataBase
        const userFound: IUser = await User.findOne({ email: email });

        // If the user existes and the password is correct, returns the user
        if (userFound && (await verifyPassword(password, userFound.senha))) {
            // returns the user Information and changes the last login datetime.
            const now = new Date ()
            const updatedUser = await User.findOneAndUpdate(
                { id: userFound.id },
                { 
                    $set: { 
                      ultimo_login: now, 
                      ultima_atualizacao: now,
                      token: uuidv4()
                    } 
                  },
                { new: true }
            );

            // Retorna as informações atualizadas do usuário
            return updatedUser;
        } else {
            throw new Error("Usuário e/ou senha inválidos");
        }
    } catch (error) {
        console.error("Erro", error);
        throw error;
    }
}

export async function searchUser() {}
