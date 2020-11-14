import { _model } from "src/models/_models";

export interface IAuthService{

   novoCadastro(usuario: _model.UsuarioLogin): Promise<any>;
   login(usuario: _model.UsuarioLogin): Promise<any>;

}