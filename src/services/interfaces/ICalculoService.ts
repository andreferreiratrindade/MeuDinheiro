import {_model} from 'src/models/_models'

export interface ICalculoService{
    recuperaPosicaoAtualCarteira(ordens:_model.OrdemModel[]): _model.PosicaoAtualModel[];
    montaValoresPosicalAtual(posicaoAtual:_model.PosicaoAtualModel):_model.PosicaoAtualModel;
    calculaLucroRealizado(ordens: _model.OrdemModel[] ): _model.LucroRealizado[];
}