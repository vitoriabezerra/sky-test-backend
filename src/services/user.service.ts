import User, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

// This is an example, it should not go directly into the code
const secretKey = "chave_secreta";

// Hash the password
const hashPassword = async (password: string): Promise<string> => {
    // number of salts for hashing
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    return bcrypt.hash(password, salt);
};

// Compare the the password with the hash
const verifyPassword = async (
    password: string,
    hash: string
): Promise<boolean> => {
    try {
        // If they coincide, returns true
        return await bcrypt.compare(password, hash);
    } catch (error) {
        throw new Error("Usuário e/ou senha inválidos");
    }
};

const generateToken = (userId: string) => {
    // Define token payload
    const payload = {
        userId: userId,
    };

    // The token is valid for 30 minutes only
    const options = { expiresIn: "30min" };

    // Generates the token
    const token = jwt.sign(payload, secretKey, options);

    return token;
};

// Create the user in the data base
export const createUser = async (user: IUser) => {
    try {
        // Check if the e-mail is new before creating
        const existingUser = await User.findOne({ email: user.email });
        const passwordHash = await hashPassword(user.senha);
        const userId = uuidv4();
        const newUser: IUser = {
            ...user,
            id: userId,
            senha: passwordHash,
            data_criacao: new Date(),
            data_atualizacao: new Date(),
            ultimo_login: new Date(),
            token: generateToken(userId),
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
};

// Sign in for user
export const authUser = async (email: string, password: string) => {
    try {
        // Check if user existes on dataBase
        const userFound = await User.findOne({ email: email });

        // If the user existes and the password is correct, returns the user
        if (userFound && (await verifyPassword(password, userFound.senha))) {
            // returns the user Information and changes the last login datetime.
            const now = new Date();
            const updatedUser = await User.findOneAndUpdate(
                { id: userFound.id },
                {
                    $set: {
                        data_atualizacao: now,
                        ultimo_login: now,
                        token: generateToken(userFound.id),
                    },
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
};

export const searchUser = async (userId: string) => {
    try {
        // Check if user existes on dataBase
        const userFound = await User.findOne({ id: userId });

        // if the user is not found
        if (!userFound) {
            throw new Error("Usuário não encontrado");
        }

        return userFound;
    } catch (error) {
        console.error("Erro", error);
        throw error;
    }
};
