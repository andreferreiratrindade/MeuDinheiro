import { injectable } from 'inversify';
import { _model } from 'src/models/_models';
import { INotaCorretagemRepository } from './interfaces/INotaCorretagemRepository';
import { BaseRepository } from './Repository-Base'

@injectable()
export class NotaCorretagemRepository extends BaseRepository implements INotaCorretagemRepository {

    constructor() {
        super();
        this._collectionName = "notaCorretagem";
    }
    recuperaNotasCorretagens(usuarioId: string): Promise<_model.OrdemModel[]> {
        return new Promise<any>((resolve, reject) => {

            let query = this.db.collection(this._collectionName)
                .where("usuarioId", "==", usuarioId)
                .get()
                .then((result) => {

                    let lst: _model.OrdemModel[] = [];
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

