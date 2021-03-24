import { TYPES } from "src/config/types";
import { _modelOutput } from "src/models/_modelsOutput";
import { inject, injectable } from "inversify";
import { IAtivoBovespaService } from "./interfaces/IAtivoBovespaService";
import { ICalculoService } from "./interfaces/ICalculoService";
import { IOrdemService } from "./interfaces/IOrdemService";
import { ILucroPorCompetenciaService } from "./interfaces/ILucroPorCompetenciaService";
@injectable()
class LucroPorCompetenciaService implements ILucroPorCompetenciaService {
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

  recuperaLucroPorCompetencia(ordens: _modelOutput.OrdemOutputModel[]): _modelOutput.LucroPorCompetenciaOutputModel[] {
   return  this._calculadoraService.RecuperaLucroPorCompetencia(ordens);
  }
}

export { LucroPorCompetenciaService };
