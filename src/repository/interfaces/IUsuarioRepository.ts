import { _modelInput } from "src/models/_modelsInput";
import { IRead } from "./IRead";
import { IWrite } from "./IWirte";

export interface IUsuarioRepository extends IRead, IWrite{
    adicionaPerfilAoUsuario(usuario: _modelInput.UsuarioInputModel, perfil: number):Promise<any>;
}