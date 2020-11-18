import { _modelOutput } from "src/models/_modelsOutput";

export interface IAtivoBovespaService{

     recuperaDetalhesPapel(papel:string):Promise<_modelOutput.AtivoDetalhesOutputModel>;
}