
import * as firebase from 'firebase';
export interface IWrite {
	add( item: any, id:string): Promise<any>;
	update(id: string, item: any): Promise<boolean>;
	delete(id: string): Promise<boolean>;
}