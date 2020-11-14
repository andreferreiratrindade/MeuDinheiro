import { TYPES } from "src/config/types";
import { _model } from "src/models/_models";
import { inject, injectable } from "inversify";
import { IAtivoBovespaService } from "./interfaces/IAtivoBovespaService";
import { ICalculoService } from "./interfaces/ICalculoService";
import { INotaCorretagemService } from "./interfaces/INotaCorretagemService";
import { IPosicaoAtualService } from "./interfaces/IPosicaoAtualService";
@injectable()
class PosicaoAtualService implements IPosicaoAtualService {
  private _notaCorretageService: INotaCorretagemService;
  private _calculadoraService: ICalculoService;
  private _ativoBovespaService: IAtivoBovespaService;
  constructor(
    @inject(TYPES.NotaCorretagemService)
    notaCorretagemService: INotaCorretagemService,
    @inject(TYPES.CalculadoraService)
    calculadoraService: ICalculoService,
    @inject(TYPES.AtivoBovespaService)
    _ativoBovespaService: IAtivoBovespaService
  ) {
    this._notaCorretageService = notaCorretagemService;
    this._calculadoraService = calculadoraService;
    this._ativoBovespaService = _ativoBovespaService;
  }

  recuperaPosicaoAtualCarteira(
    ordens: _model.OrdemModel[]
  ): Promise<_model.PosicaoAtualModel[]> {
    let promises: any[] = [];
    let posicalAtualLst: _model.PosicaoAtualModel[] = [];

    posicalAtualLst = this._calculadoraService.recuperaPosicaoAtualCarteira(
      ordens
    );
    posicalAtualLst.forEach(posicaoAtual => {
      promises.push(
        this._ativoBovespaService
          .recuperaDetalhesPapel(posicaoAtual.Papel)
          .then(result => {
            posicaoAtual.AtivoDetalhes = result;

            return this._calculadoraService.montaValoresPosicalAtual(
              posicaoAtual
            );
          })
          .catch(reject => {
            throw reject;
          })
      );
    });

    return Promise.all(promises)
      .then(promiseAllResult => {
        return promiseAllResult;
      })
      .catch(reject => {
        throw reject;
      });
  }
}

export { PosicaoAtualService };
