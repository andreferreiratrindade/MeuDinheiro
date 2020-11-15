
export interface IRead {
	find(filter: any): Promise<any[]> ;
	findOne( id: string):Promise<any>;
}