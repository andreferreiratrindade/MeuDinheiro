import { inject, injectable } from "inversify";
import { TYPES } from "src/config/types";
import { Constants } from "src/constants/constants";
import { _model } from "src/models/_models";
import { IAcaoMonitoradaService } from "./interfaces/IAcaoMonitoradaService";
import { IAtivoBovespaService } from "./interfaces/IAtivoBovespaService";
import ReadWriteFile from "./ReadWriteFile";
@injectable()
class AcaoMonitoradaService implements IAcaoMonitoradaService {
  private _ativoBovespaService: IAtivoBovespaService;

  /**
   *
   */
  constructor(    @inject(TYPES.AtivoBovespaService)
  _ativoBovespaService: IAtivoBovespaService) {
    this._ativoBovespaService = _ativoBovespaService
  }
  public recuperaAcoesMonitoradas(): Promise<_model.AtivoDetalhesModel[]> {
    let acoesMonitoradas : _model.AtivoDetalhesModel[] = []
    
    let acoesTmp = ReadWriteFile.readJson(
      Constants.Arquivo.pathArquivoAcaoMonitorada
    );
if(acoesTmp.length){
  acoesMonitoradas = acoesTmp.map((y:string)=> {
            let papel : any = {Papel:y};
            return {...papel}
          });
}
    let promises: any[] = [];
    acoesMonitoradas.forEach(element => {
      promises.push(
        this._ativoBovespaService
          .recuperaDetalhesPapel(element.Papel)
          .then(result => {
            return result;
          })
          .catch(reject => {
            throw reject;
          })
      );
    });

    return Promise.all(promises)
    .then((promiseAllResult)=>{
        return promiseAllResult
    })
      .catch(reject => {
        throw reject;
      });
  }

  public adicionarAcoesMonitoradas(
    acaoMonitorada: string[]
  ):void {

    acaoMonitorada = acaoMonitorada.map(y=>{return y.toUpperCase()});

    ReadWriteFile.writeJson(
      Constants.Arquivo.pathArquivoAcaoMonitorada,
      acaoMonitorada
    );
  }
}

export { AcaoMonitoradaService };
