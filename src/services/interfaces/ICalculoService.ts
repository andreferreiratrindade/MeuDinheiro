import {_modelOutput} from 'src/models/_modelsOutput'

export interface ICalculoService{
    recuperaPosicaoAtualCarteira(ordens:_modelOutput.OrdemOutputModel[]): _modelOutput.PosicaoAtualOutputModel[];
    montaValoresPosicalAtual(posicaoAtual:_modelOutput.PosicaoAtualOutputModel):_modelOutput.PosicaoAtualOutputModel;
    calculaLucroRealizado(ordens: _modelOutput.OrdemOutputModel[] ): _modelOutput.LucroRealizadoOutputModel[];
    RecuperaLucroPorCompetencia(ordens: _modelOutput.OrdemOutputModel[]
      ): _modelOutput.LucroPorCompetenciaOutputModel[]
}