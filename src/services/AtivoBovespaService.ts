import { _model } from "src/models/_models";
import { httpClient } from "./HttpClientService";
import { IAtivoBovespaService } from "./interfaces/IAtivoBovespaService";
import { IHttpClientRequestParameters } from "./interfaces/IHttpClientRequestParameters";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import cheerio from "cheerio";

@injectable()
class AtivoBovespaService implements IAtivoBovespaService {
  async recuperaDetalhesPapel(
    papel: string
  ): Promise<_model.AtivoDetalhesModel> {
    const getParameters: IHttpClientRequestParameters<any> = {
      url: `https://fundamentus.com.br/detalhes.php?papel=${papel}`,
      requiresToken: false
    };

    // just return httpClient.get (which is a promise) or again use async/await if you prefer
    return httpClient.get<any>(getParameters).then(result => {
      const html = result.data; // Get the HTML from the HTTP request
      const $ = cheerio.load(html); // Load the HTML string into cheerio
      const statsTable = $(".data.destaque.w3");

      let detalheEmpresa: _model.AtivoDetalhesModel = {
        Papel: papel,
        RazaoSocial: "",
        Percentual : 0,
        CotacaoAtual: Number(statsTable[0].children[0].children[0].data?.replace(",","."))
      };

      return detalheEmpresa;
    }).catch((err)=>{
      throw err;
    });
  }
}

export { AtivoBovespaService };