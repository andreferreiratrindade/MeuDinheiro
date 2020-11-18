import { _modelOutput } from "src/models/_modelsOutput";

export interface IPosicaoAtualService{
    recuperaPosicaoAtualCarteira(ordens: _modelOutput.OrdemOutputModel[]):Promise<_modelOutput.PosicaoAtualOutputModel[]>
}