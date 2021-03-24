
import readWriteFile from './ReadWriteFile'
import {Constants} from '../constants/constants'

class ArquivoOrdemService {
    ExtrairNotasDeArquivo(file: any): Promise<any> {
      return new Promise<any>((resolve, reject) => {return {}});
    }

    AdicionaArquivoOrdem(nomeArquivo: string, file:any):Promise<any>{
        return readWriteFile.write(Constants.Arquivo.pathArquivoOriginalOrdem, nomeArquivo, file);
    }
}

export default new ArquivoOrdemService();