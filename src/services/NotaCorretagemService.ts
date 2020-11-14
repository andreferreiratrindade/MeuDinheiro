import readJson from "./ReadWriteFile";
import { Constants } from "../constants/constants";
import { INotaCorretagemService } from "./interfaces/INotaCorretagemService";
import { injectable } from "inversify";
import "reflect-metadata";
import { _model } from "src/models/_models";

@injectable()
class NotaCorretagemService implements INotaCorretagemService {
  recuperaNotasCorretagens(): _model.OrdemModel[] {
    return readJson.readJson(Constants.Arquivo.pathNotasDeCorretagens);
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
