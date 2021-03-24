
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
}
