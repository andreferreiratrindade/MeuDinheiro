import { injectable } from 'inversify';
import { IPapelFavoritoRepository } from './interfaces/IPapelFavoritoRepository';
import { BaseRepository } from './Repository-Base'

@injectable()
export class PapelFavoritoRepository extends BaseRepository implements IPapelFavoritoRepository {

    constructor() {
        super();
        this._collectionName = "papelFavorito";
    }
    recuperaPapeisFavoritos(usuarioId: string): Promise<string[]> {
        return new Promise<any>((resolve, reject) => {

            let query = this.db.collection(this._collectionName)
                .where("usuarioId", "==", usuarioId)
                .get()
                .then((result) => {

                    let lst: string[] = [];
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

