import { _modelOutput } from "src/models/_modelsOutput";
import { IRead } from "./IRead";
import { IWrite } from "./IWirte";

export interface IOrdemRepository extends IRead, IWrite{
    recuperaNotasCorretagens(usuarioId:string): Promise<_modelOutput.OrdemOutputModel[]>;
}