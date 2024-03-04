import User from "../models/user.model";

// TO do - change the type (create interface)
export async function createUser(dadosUsuario: any) {
    const usuario = new User(dadosUsuario);
    await usuario.save();
    return usuario;
}
