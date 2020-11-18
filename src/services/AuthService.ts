import { inject, injectable } from "inversify";
import { Subject } from "rxjs";
import { TYPES } from "src/config/types";
import { Constants } from "src/constants/constants";
import NotifyHelper from "src/helpers/NotifyHelpter";
import { _modelInput } from "src/models/_modelsInput";
import { firebaseAuth } from "../boot/firebase"
import { IAuthService } from "./interfaces/IAuthService";
import { IUsuarioService } from "./interfaces/IUsuarioService";

@injectable()
class AuthService implements IAuthService {
    constructor(@inject(TYPES.UsuarioService)
    usuarioService: IUsuarioService) {
        this._usuarioService = usuarioService;
    }

    public _usuarioService !: IUsuarioService

    // private usuarioSubject = new Subject<_model.Usuario>();

    public novoCadastro(usuario: _modelInput.UsuarioLoginInputModel): Promise<any> {
        return new Promise<any>((resolver, reject) => {
            firebaseAuth
                .createUserWithEmailAndPassword(usuario.email, usuario.password)
                .then(data => {
                    let usuariotmp: _modelInput.UsuarioInputModel = {
                        email: usuario.email,
                        nome: usuario.nome,
                        usuarioId: data.user?.uid ?? "",
                        perfis: [1]
                    }

                    data.user?.updateProfile({
                        displayName: usuario.nome
                    }).then((res) => {
                        this._usuarioService.adicionarUsuario(usuariotmp, Constants.PerfilUsuario.Cliente)

                        resolver(NotifyHelper.sucesso());
                    });
                })
                .catch(err => {
                    reject(NotifyHelper.erro(err));
                });
        });
    }

    public login(usuarioLogin: _modelInput.UsuarioLoginInputModel): Promise<any> {


        return new Promise<any>((resolver, reject) => {
            firebaseAuth
                .signInWithEmailAndPassword(usuarioLogin.email, usuarioLogin.password)
                .then(user => {


                    if (user != null && user.user != null) {

                        let usuario : _modelInput.UsuarioInputModel = {
                            email: user.user.email ?? "",
                            nome: user.user.displayName ?? "",
                            perfis: [],
                            usuarioId: user.user.uid
                        }
                        resolver(user.user);
                    } else {

                        resolver(null);
                    }
                })
                .catch(err => {
                    reject(NotifyHelper.erro("Usuário não encontrado."));
                });
        });
    }


    recuperaUsuarioLogado():any {
       let user = firebaseAuth.currentUser;
        return user;
    }
}

export { AuthService }

