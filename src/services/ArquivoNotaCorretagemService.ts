
import readWriteFile from './ReadWriteFile'
import {Constants} from '../constants/constants'

class ArquivoNotaCorretagemService {
    ExtrairNotasDeArquivo(file: any): Promise<any> {
      return new Promise<any>((resolve, reject) => {resolve()});
    }

    AdicionaArquivoNotaCorretagem(nomeArquivo: string, file:any):Promise<any>{
        return readWriteFile.write(Constants.Arquivo.pathArquivoOriginalNotaCorretagem, nomeArquivo, file);
    }
}

export default new ArquivoNotaCorretagemService();