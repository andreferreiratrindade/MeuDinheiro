import { TYPES } from "src/config/types";
import { _model } from "src/models/_models";
import myContainer from "../config/inversify.config";
import { INotaCorretagemService } from "./interfaces/INotaCorretagemService";

export class OrdemConfig {
  private static instance: OrdemConfig;
  protected  ordens:_model.OrdemModel[] = [];

  public static recuperaInstancia(): OrdemConfig {
    if (!OrdemConfig.instance) {
      OrdemConfig.instance = new OrdemConfig();
    }
    return OrdemConfig.instance;
   
  }

  public montaOrdem(){
    let notaCorretagemService = myContainer.myContainer.get<INotaCorretagemService>(TYPES.NotaCorretagemService)
    // this.ordens = notaCorretagemService.recuperaNotasCorretagens()
  }

  public recuperaOrdens(){
      return this.ordens
  }
}
