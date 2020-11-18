
import { injectable } from 'inversify';
import { _modelOutput } from 'src/models/_modelsOutput';
import {_modelInput} from 'src/models/_modelsInput';
import { IUsuarioRepository } from './interfaces/IUsuarioRepository';
import { BaseRepository } from './Repository-Base'

@injectable()
export class UsuarioRepository extends BaseRepository  implements IUsuarioRepository {

  constructor() {
    super();
    this._collectionName = "usuario";
  }

  adicionaPerfilAoUsuario(usuario: _modelInput.UsuarioInputModel, perfil: number):Promise<any> {
    let ref = this.db.collection(this._collectionName).doc(usuario.usuarioId)
    let ob = [perfil]
    return new Promise<any>((retorno, reject) => {
      this.db.runTransaction((transaction:any) => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(ref).then((doc : any) => {

          let usuario = doc.data();
          if (!usuario.perfis) {
            usuario.perfis = [perfil];
            transaction.set(ref, usuario);
          } else {
            usuario.perfis = usuario.perfis.filter((y:any) => { return y != perfil });
            usuario.perfis.push(perfil);
            transaction.update(ref, usuario);
          }
        });
      }).then(function () {
        retorno()
      }).catch((error: any)=> {
        reject(error)
      });
    });
  }
}
