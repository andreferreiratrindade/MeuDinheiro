import { inject, injectable } from "inversify";
import { TYPES } from "src/config/types";
import { Constants } from "src/constants/constants";
import { _model } from "src/models/_models";
import {firebaseAuth} from "../boot/firebase"
import { IAuthService } from "./interfaces/IAuthService";
import { IUsuarioService } from "./interfaces/IUsuarioService";


@injectable()
class AuthService implements IAuthService {
    constructor(@inject(TYPES.UsuarioService)
    usuarioService: IUsuarioService) {
        this._usuarioService = usuarioService;
    }

    public _usuarioService !: IUsuarioService

    public novoCadastro(usuario: _model.UsuarioLogin): Promise<any> {
        return new Promise<any>((resolver, reject) => {
            firebaseAuth
                .createUserWithEmailAndPassword(usuario.email, usuario.password)
                .then(data => {
                    let usuariotmp: _model.Usuario = {
                        email: usuario.email,
                        nome: usuario.nome,
                        usuarioId: data.user?.uid ?? "",
                        perfis:[1]
                    }

                    data.user?.updateProfile({
                        displayName: usuario.nome
                    }).then((res) => {
                        this._usuarioService.adicionarUsuario(usuariotmp, Constants.PerfilUsuario.Cliente);
                        resolver(res);
                    });
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    public login(usuario: _model.UsuarioLogin): Promise<any> {
        return new Promise<any>((resolver, reject) => {
            firebaseAuth
                .signInWithEmailAndPassword(usuario.email, usuario.password)
                .then(data => {
                    data.user?.updateProfile({
                        displayName: usuario.nome
                    }).then((res) => {
                        resolver(res);
                    });
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}

export { AuthService }

