import { _modelInput } from "src/models/_modelsInput";

export interface IUsuarioService {
    adicionarUsuario(usuario: _modelInput.UsuarioInputModel, perfil:number): Promise<any> ;
    findOne(uid:string): Promise<any>;
}