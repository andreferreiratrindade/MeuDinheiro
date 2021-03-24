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
    deletetarTotas(usuarioId: string): Promise<void> {

        return new Promise<void>((resolve, reject) => {
            this.db.collection(this._collectionName)
            .where("usuarioId", "==", usuarioId)
            .get()
            .then((result) => {
                result.forEach(x => {
                    this.db.collection(this._collectionName).doc(x.id).delete()
                })
                resolve()
            }).catch((err) => {
                reject(err);
            });
        });
    }


    recuperaNotasCorretagens(usuarioId: string): Promise<_modelOutput.OrdemOutputModel[]> {
        return new Promise<_modelOutput.OrdemOutputModel[]>((resolve, reject) => {

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

