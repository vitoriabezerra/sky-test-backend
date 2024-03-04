const mongoose = require("mongoose");

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
            default: Date.now,
        },
        data_atualizacao: {
            type: Date,
            default: Date.now,
        },
        ultimo_login: {
            type: Date,
            default: Date.now, // same as data_criacao
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

const User = mongoose.model("User", UserSchema);

export default User;
