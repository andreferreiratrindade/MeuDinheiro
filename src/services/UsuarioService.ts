import { rejects } from 'assert'
import { resolve } from 'dns'
import { inject, injectable } from 'inversify'
import { TYPES } from 'src/config/types'
import { _model } from 'src/models/_models'
import { IUsuarioRepository } from 'src/repository/interfaces/IUsuarioRepository'
import { IUsuarioService } from './interfaces/IUsuarioService'

@injectable()
 class UsuarioService implements IUsuarioService {

    public _usuarioRepository!: IUsuarioRepository;

    constructor(@inject(TYPES.UsuarioRepository)
    usuarioRepository: IUsuarioRepository) {

        this._usuarioRepository = usuarioRepository;
    }

    adicionarUsuario(usuario: _model.Usuario, perfil:number): Promise<any> {
        return  this._usuarioRepository.add(usuario, usuario.usuarioId);
      
    }

    findOne(uid:string): Promise<any>{
        return this._usuarioRepository.findOne(uid);

    }
}

export {UsuarioService}