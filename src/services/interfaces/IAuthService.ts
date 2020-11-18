import { Subject } from "rxjs";
import { _modelInput } from "src/models/_modelsInput";

export interface IAuthService{
   novoCadastro(usuario: _modelInput.UsuarioLoginInputModel): Promise<any>;
   login(usuario: _modelInput.UsuarioLoginInputModel): Promise<any>;
   recuperaUsuarioLogado():any;
}