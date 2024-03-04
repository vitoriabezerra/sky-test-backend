const mongoose = require("mongoose");

export interface IUser {
    id?: string;
    nome: string;
    email: string;
    senha: string;
    telefones: IPhone[];
    data_criacao?: Date;
    data_atualizacao?: Date;
    ultimo_login?: Date;
    token?: string;
}

interface IPhone {
    numero: string;
    ddd: string;
}

const PhoneSchema = new mongoose.Schema({
    numero: {
        type: String,
        required: true,
    },
    ddd: {
        type: String,
        required: true,
    },
});

const UserSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        nome: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        senha: {
            type: String,
            required: true,
        },
        telefones: [PhoneSchema],
        data_criacao: {
            type: Date,
            required: true,
        },
        data_atualizacao: {
            type: Date,
            required: true,
        },
        ultimo_login: {
            type: Date,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: false,
    }
);

const User = mongoose.model("Users", UserSchema);

export default User;
