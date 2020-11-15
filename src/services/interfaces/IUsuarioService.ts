import { _model } from "src/models/_models";

export interface IUsuarioService {
    adicionarUsuario(usuario: _model.Usuario, perfil:number): Promise<any> ;
    findOne(uid:string): Promise<any>;
}