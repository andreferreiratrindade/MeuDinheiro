import { TYPES } from "src/config/types";
import { _modelOutput } from "src/models/_modelsOutput";
import { inject, injectable } from "inversify";
import { IAtivoBovespaService } from "./interfaces/IAtivoBovespaService";
import { ICalculoService } from "./interfaces/ICalculoService";
import { IOrdemService } from "./interfaces/IOrdemService";
import { IPosicaoAtualService } from "./interfaces/IPosicaoAtualService";
@injectable()
class PosicaoAtualService implements IPosicaoAtualService {
  private _notaCorretageService: IOrdemService;
  private _calculadoraService: ICalculoService;
  private _ativoBovespaService: IAtivoBovespaService;
  constructor(
    @inject(TYPES.OrdemService)
    OrdemService: IOrdemService,
    @inject(TYPES.CalculadoraService)
    calculadoraService: ICalculoService,
    @inject(TYPES.AtivoBovespaService)
    _ativoBovespaService: IAtivoBovespaService
  ) {
    this._notaCorretageService = OrdemService;
    this._calculadoraService = calculadoraService;
    this._ativoBovespaService = _ativoBovespaService;
  }

  async recuperaPosicaoAtualCarteira(
    ordens: _modelOutput.OrdemOutputModel[]
  ): Promise<_modelOutput.PosicaoAtualOutputModel[]> {
    let promises: any[] = [];
    let posicalAtualLst: _modelOutput.PosicaoAtualOutputModel[] = [];

    posicalAtualLst = this._calculadoraService.recuperaPosicaoAtualCarteira(
      ordens
    );
    posicalAtualLst.forEach(posicaoAtual => {
      promises.push(
        this._ativoBovespaService
          .recuperaDetalhesPapel(posicaoAtual.papel)
          .then(result => {
            posicaoAtual.ativoDetalhes = result;

            return this._calculadoraService.montaValoresPosicalAtual(
              posicaoAtual
            );
          })
          .catch(reject => {
            throw reject;
          })
      );
    });

    try {
      const promiseAllResult = await Promise.all(promises);
      return promiseAllResult;
    } catch (reject_1) {
      throw reject_1;
    }
  }
}

export { PosicaoAtualService };
