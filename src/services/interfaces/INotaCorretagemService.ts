import { _model } from "src/models/_models";

export interface INotaCorretagemService{

    recuperaNotasCorretagens(): _model.OrdemModel[]

    recuperaArquivoNotasCorretagens():Promise<any>

    atualizaArquivoNotaCorretagem(data: any[]):Promise<any> 
}