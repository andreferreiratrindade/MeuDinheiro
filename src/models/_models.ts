export namespace _model {
  export interface ArquivoNotaCorretagemModel {
    Competencia: string;
    Arquivo: string;
  }
  export interface OrdemModel {
    CV: string;
    Titulo: string;
    Mercadoria: string;
    Vencimento: string;
    Quantidade: number;
    PrecoAjuste: number;
    TipoNegocio: string;
    VlrOperacao: number;
    DC: string;
    TaxaOperacional: string;
    Negociacao: string;
    Q: string;
    TipoMercado: string;
    DataPregao: string;
    OrdemPosicao: number;
    DayTrade: boolean;
  }

  export interface PosicaoAtualModel {
    Quantidade: number;
    PrecoMedio: number;
    Papel: string;
    ValorTotalPrecoMedio: number;
    ValorTotal: number;
    Lucro: number;
    AtivoDetalhes: AtivoDetalhesModel
  }

  export interface LucroRealizado {
    Papel: string;
    Lucro: number;
  }


  export interface AtivoDetalhesModel {
    RazaoSocial: string;
    Papel: string;
    CotacaoAtual: number;
    Percentual: number;
  }

  export interface UsuarioLogin {
    nome: string;
    password: string;
    email: string;
  }

  export interface Usuario {
    nome: string;
    email: string;
    usuarioId: string;
    perfis: number[];
  }

  export interface PapelFavorito {
    papel : string, 
    usuarioId : string

  }




}
export default model;
