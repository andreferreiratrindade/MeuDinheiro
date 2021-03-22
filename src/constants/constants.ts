export module Constants{

    export class Arquivo{
        public static arquivoOrdemInfo : string = "ImportacaoOrdemInfo.json";
        public static pathArquivoOriginalOrdem : string = "./arquivos/ArquivoOriginalOrdem";
        public static pathNotasDeCorretagens : string = "./arquivos/notasDeCorretagens.json";
        public static pathArquivoPapelFavorito : string = "./arquivos/acoesMonitoradas.json";

    }

    export  class TipoOrdem{

            public static COMPRA : string = "C"; // C
            public static VENDA : string = "V"; // V
    }


    export class PerfilUsuario {
        public static Cliente :number = 0;
        public static AdministradorSistema: number = 1;
  
        public static RecuperaListagem(): any[] {
           return [
              { valor: this.AdministradorSistema, descricao: "Administrador Sistema" },
  
           ]
        }
  
        public static RecuperaDescricaoPorValor(valor: any): string {
           return this.RecuperaListagem().filter(y => y.valor == valor)[0].descricao;
        }
  
     }
}