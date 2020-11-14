import { _model } from "src/models/_models";

export interface IAtivoBovespaService{

     recuperaDetalhesPapel(papel:string):Promise<_model.AtivoDetalhesModel>;
}