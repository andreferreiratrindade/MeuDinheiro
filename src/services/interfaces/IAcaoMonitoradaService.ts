import { _model } from "src/models/_models";

export interface IAcaoMonitoradaService{
    recuperaAcoesMonitoradas(): Promise<_model.AtivoDetalhesModel[]>;

    adicionarAcoesMonitoradas(acaoMonitorada: string[]):void;
    
}