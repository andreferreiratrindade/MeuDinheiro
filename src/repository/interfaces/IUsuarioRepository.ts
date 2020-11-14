import { _model } from "src/models/_models";
import { IRead } from "./IRead";
import { IWrite } from "./IWirte";

export interface IUsuarioRepository extends IRead, IWrite{
    adicionaPerfilAoUsuario(usuarioId: _model.Usuario, perfil: number):Promise<any>;
}