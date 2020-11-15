import readJson from "./ReadWriteFile";
import { Constants } from "../constants/constants";
import { INotaCorretagemService } from "./interfaces/INotaCorretagemService";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { _model } from "src/models/_models";
import { INotaCorretagemRepository } from "src/repository/interfaces/INotaCorretagemRepository";
import { TYPES } from "src/config/types";

@injectable()
class NotaCorretagemService implements INotaCorretagemService {

 private _notaCorretagemRepository !: INotaCorretagemRepository
  constructor(@inject(TYPES.NotaCorretagemRepository ) notaCorretagem: INotaCorretagemRepository) {
    
    this._notaCorretagemRepository = notaCorretagem;

  }

  adicionarOrdem(ordem:_model.OrdemModel):Promise<any>{
    return this._notaCorretagemRepository.add(ordem);
  }
  
  recuperaNotasCorretagens(usuarioId:string): Promise<_model.OrdemModel[]> {
    return  this._notaCorretagemRepository.recuperaNotasCorretagens(usuarioId);
  }

  recuperaArquivoNotasCorretagens(): Promise<any> {
    return readJson.readJson(Constants.Arquivo.arquivoNotaCorretagemInfo);
  }

  atualizaArquivoNotaCorretagem(data: any[]): Promise<any> {
    {
      return readJson.writeJson(
        Constants.Arquivo.arquivoNotaCorretagemInfo,
        data
      );
    }
  }
}

export { NotaCorretagemService };
