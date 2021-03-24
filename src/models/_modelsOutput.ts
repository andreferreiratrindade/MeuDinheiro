export namespace _modelOutput {
  export interface ArquivoOrdemOutputModel {
    competencia: string;
    arquivo: string;
  }
  export interface OrdemOutputModel {
    id:string;
    tipoOrdem: string;
    papel: string;
    quantidade: number;
    preco: number;
    tipoMercado: string ;
    dataPregao: Date;
    ordemPosicao: number ;
    dayTrade: boolean;

  }

  export interface PosicaoAtualOutputModel {
    quantidade: number;
    precoMedio: number;
    papel: string;
    valorTotalPrecoMedio: number;
    valorTotal: number;
    lucro: number;
    ativoDetalhes: AtivoDetalhesOutputModel
  }

  export interface LucroRealizadoOutputModel {
    papel: string;
    lucro: number;
  }


  export interface AtivoDetalhesOutputModel extends Loading {
    razaoSocial: string;
    papel: string;
    cotacaoAtual: number;
    percentual: number;
  }

  export interface UsuarioLogin {
    nome: string;
    password: string;
    email: string;
  }

  export interface PapelFavoritoOutputModel  extends Loading {
    papel: string,
  }

  export interface Loading {
    loading: boolean
  }

   export interface LucroPorCompetenciaOutputModel{
     competencia:number;
      valor : number
    
   } 
}
