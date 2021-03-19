import { _modelInput } from "src/models/_modelsInput";
import { _modelOutput } from "src/models/_modelsOutput";

export interface IOrdemService{
    extrairOrdensDeArquivo(file: any):void

    recuperaNotasCorretagens(): Promise<_modelOutput.OrdemOutputModel[]>

    adicionarOrdem(ordem:_modelInput.OrdemInputModel):Promise<any>
}