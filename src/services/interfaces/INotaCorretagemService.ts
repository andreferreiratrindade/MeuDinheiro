import { _model } from "src/models/_models";

export interface INotaCorretagemService{

    recuperaNotasCorretagens(usuarioId:string): Promise<_model.OrdemModel[]>

    recuperaArquivoNotasCorretagens():Promise<any>

    atualizaArquivoNotaCorretagem(data: any[]):Promise<any> 
}