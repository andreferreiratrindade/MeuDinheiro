import { injectable } from "inversify";
import { IRead } from "./interfaces/IRead";
import { IWrite } from "./interfaces/IWirte";
// import * as firebase from 'firebase/app';
import {db} from 'src/boot/firebase'

@injectable()
export abstract class BaseRepository implements IWrite, IRead {
	_collectionName: string = "";
	protected db: any;

	constructor() {
		debugger
		this.db = db;
	}
	update(id: string, item: any): Promise<boolean> {
		throw new Error("Method not implemented.");
	}


	add(item: any, id: string): Promise<any> {

		let idTemp = id ? id : this.db.collection(this._collectionName).doc().id;
		item.id = idTemp;
		return new Promise((resolve, reject) => {
			this.db.collection(this._collectionName)
				.doc(idTemp)
				.set({ ...item })
				.then((obj: any) => {
					resolve(obj);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	// .where(element.obj, element.type, element.compare)
	find(filter: any): Promise<any[]> {
		return new Promise((resolve, reject) => {
			let ref = this.db.collection(this._collectionName)
				.where(filter.elemento, filter.tipoComparacao, filter.comparacao)
				.get()
				.then((result : any[]) => {

					let lst : any[] = [];
					result.forEach(function (doc: any) {

						lst.push({ data: doc.data(), id: doc.id });
					})
					resolve(lst);
				})
				.catch(function (error: any) {
					reject(error)
				});
		});
	}

	findOne(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.db.collection(this._collectionName).doc(id)
				.get()
				.then((result: any) => {
					resolve(result.data());
				});
		});
	}

	delete(id: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.db.collection(this._collectionName).doc(id).set({ ...{ deletado: true } }, { merge: true })
				.then(() => {
					resolve();
				}).catch((err : any) => {
					reject(err);
				});
		});
	}
	recuperaColletion(collection: string) {
		return this.db.collection(collection);
	}
}