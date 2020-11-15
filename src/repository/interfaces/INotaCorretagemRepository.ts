import { _model } from "src/models/_models";
import { IRead } from "./IRead";
import { IWrite } from "./IWirte";

export interface INotaCorretagemRepository extends IRead, IWrite{
    recuperaNotasCorretagens(usuarioId:string): Promise<_model.OrdemModel[]>;

}