import { _model } from "src/models/_models";

export interface IPosicaoAtualService{
    recuperaPosicaoAtualCarteira(ordens: _model.OrdemModel[]):Promise<_model.PosicaoAtualModel[]>
}