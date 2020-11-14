export module Constants{

    export class Arquivo{
        public static arquivoNotaCorretagemInfo : string = "ImportacaoNotaCorretagemInfo.json";
        public static pathArquivoOriginalNotaCorretagem : string = "./arquivos/ArquivoOriginalNotaCorretagem";
        public static pathNotasDeCorretagens : string = "./arquivos/notasDeCorretagens.json";
        public static pathArquivoAcaoMonitorada : string = "./arquivos/acoesMonitoradas.json";

    }

    export class CV{

            public static COMPRA : string = "C";
            public static VENDA : string = "V";
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