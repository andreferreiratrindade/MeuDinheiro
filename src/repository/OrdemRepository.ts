import { injectable } from 'inversify';
import { _modelInput } from 'src/models/_modelsInput';
import { _modelOutput } from 'src/models/_modelsOutput';
import { IOrdemRepository } from './interfaces/IOrdemRepository';
import { BaseRepository } from './Repository-Base'

@injectable()
export class OrdemRepository extends BaseRepository implements IOrdemRepository {

    constructor() {
        super();
        this._collectionName = "ordem";
    }
  

    recuperaNotasCorretagens(usuarioId: string): Promise<_modelOutput.OrdemOutputModel[]> {
        return new Promise<any>((resolve, reject) => {

            let query = this.db.collection(this._collectionName)
                .where("usuarioId", "==", usuarioId)
                .get()
                .then((result) => {
                    let lst: _modelOutput.OrdemOutputModel[] = [];
                    result.forEach(function (doc: any) {

                        lst.push(doc.data());
                    });

                    resolve(lst)
                }).catch((err) => {
                    reject(err);
                });
        });
    }

}

