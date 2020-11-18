export namespace _modelInput {
  export interface ArquivoOrdemInputModel {
    competencia: string;
    arquivo: string;
  }
  export interface OrdemInputModel extends UsuarioDefault{
    tipoOrdem: string;
    papel: string;
    quantidade: number;
    preco: number;
    dataPregao: string;
    ordemPosicao: number ;
    dayTrade: boolean;
  }

  export interface UsuarioLoginInputModel {
    nome: string;
    password: string;
    email: string;
  }

  export interface UsuarioInputModel extends UsuarioDefault{
    nome: string;
    email: string;
    perfis: number[];
  }

  export interface PapelFavoritoInputModel extends UsuarioDefault {
    papel: string
  }


  export interface UsuarioDefault{
    usuarioId: string;
    dtaAtualizacao?:Date
  }

}
export default model;
