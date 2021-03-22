import { injectable, inject } from "inversify";
import "reflect-metadata";
import { _modelOutput } from "src/models/_modelsOutput";
import { from } from "linq-to-typescript";
import { ICalculoService } from "src/services/interfaces/ICalculoService";
import { Constants } from "./../constants/constants";

@injectable()
class CalculoService implements ICalculoService {
  public recuperaPosicaoAtualCarteira(
    ordens: _modelOutput.OrdemOutputModel[]
  ): _modelOutput.PosicaoAtualOutputModel[] {
    let lst: _modelOutput.PosicaoAtualOutputModel[] = [];

    const group = from(ordens)
      .groupBy(y => y.papel)
      .toArray();

    group.forEach(element => {
      let ordensTemp = element
        .orderBy(y => y.dataPregao)
        .thenBy(y => y.ordemPosicao)
        .toArray();
      var posicaoAtual = this.recuperaPosicalAtualCarteiraPorPapel(ordensTemp);
      if (posicaoAtual != null) {
        posicaoAtual.papel = element.key;
        lst.push(posicaoAtual);
      }
    });

    return lst;
  }

  public recuperaPosicalAtualCarteiraPorPapel(
    ordens: _modelOutput.OrdemOutputModel[]
  ): _modelOutput.PosicaoAtualOutputModel | null {
    let liquido: number = 0;
    let qtdEstoque: number = 0;
    let posicaoAtual: _modelOutput.PosicaoAtualOutputModel | null = null;

    for (let index = 0; index < ordens.length; index++) {
      const ordemAtual = ordens[index];

      if (ordemAtual.tipoOrdem == Constants.TipoOrdem.COMPRA) {
        liquido += ordemAtual.preco * ordemAtual.quantidade * -1;
        qtdEstoque += ordemAtual.quantidade;
      } else if (ordemAtual.tipoOrdem == Constants.TipoOrdem.VENDA) {
        liquido += ordemAtual.preco * ordemAtual.quantidade;
        qtdEstoque -= ordemAtual.quantidade;
      }

      if (qtdEstoque == 0) {
        liquido = 0;
      }
    }
    liquido = Math.abs(liquido);
    qtdEstoque = Math.abs(qtdEstoque);

    if (liquido > 0) {
      posicaoAtual = {
        precoMedio: liquido / qtdEstoque,
        quantidade: qtdEstoque,
        papel: ordens[0].papel,
        valorTotalPrecoMedio: liquido,
        valorTotal: 0,
        lucro: 0,
        ativoDetalhes: {
          cotacaoAtual: 0,
          papel: "",
          razaoSocial: "",
          percentual: 0,
          loading:false
        }
      };
    }

    return posicaoAtual;
  }

  public montaValoresPosicalAtual(
    posicaoAtual: _modelOutput.PosicaoAtualOutputModel
  ): _modelOutput.PosicaoAtualOutputModel {
    posicaoAtual.valorTotal =
      posicaoAtual.ativoDetalhes.cotacaoAtual * posicaoAtual.quantidade;
    posicaoAtual.lucro =
      posicaoAtual.valorTotal - posicaoAtual.valorTotalPrecoMedio;
    return posicaoAtual;
  }

  public calculaLucroRealizado(
    ordens: _modelOutput.OrdemOutputModel[]
  ): _modelOutput.LucroRealizadoOutputModel[] {
    let lucrosRealizados: _modelOutput.LucroRealizadoOutputModel[] = [];

    var ordensPorPapel = from(ordens)
      .groupBy(x => x.papel)
      .toArray();
    ordensPorPapel.forEach(item => {
      var ordensTemp = item
        .orderBy(x => x.dataPregao)
        .thenBy(x => x.ordemPosicao)
        .toArray();
      lucrosRealizados.push({
        lucro: this.calculaLucroRealizadoPorPapel(ordensTemp),
        papel: ordensTemp[0].papel
      });
    });
    return lucrosRealizados;
  }

  public calculaLucroRealizadoPorPapel(ordens: _modelOutput.OrdemOutputModel[]): number {

    let liquido = 0;
    let qtdEstoque = 0;
    let calc: number[] = [];
    let precoMedio: number = 0;
    let compraOuVendido: string = "";
    for (let i = 0; i < ordens.length; i++) {
      var ordemAtual = ordens[i];

      if (ordemAtual.tipoOrdem == Constants.TipoOrdem.COMPRA) {
        liquido += ordemAtual.preco * ordemAtual.quantidade * -1;
        qtdEstoque += ordemAtual.quantidade;

        compraOuVendido = !compraOuVendido.length
          ? Constants.TipoOrdem.COMPRA
          : compraOuVendido;

        if (
          compraOuVendido == Constants.TipoOrdem.COMPRA &&
          liquido != 0 &&
          qtdEstoque != 0
        ) {
          precoMedio = Math.abs(liquido) / Math.abs(qtdEstoque);
        }

        if (compraOuVendido == Constants.TipoOrdem.VENDA) {
          var calculo =
            ordemAtual.quantidade * precoMedio -
            ordemAtual.preco * ordemAtual.quantidade;
          calc.push(calculo);
        }
      } else if (ordemAtual.tipoOrdem == Constants.TipoOrdem.VENDA) {
        liquido += ordemAtual.preco * ordemAtual.quantidade;
        qtdEstoque -= ordemAtual.quantidade;
        compraOuVendido = !compraOuVendido.length
          ? Constants.TipoOrdem.VENDA
          : compraOuVendido;

        if (
          compraOuVendido == Constants.TipoOrdem.VENDA &&
          liquido != 0 &&
          qtdEstoque != 0
        ) {
          precoMedio = Math.abs(liquido) / Math.abs(qtdEstoque);
        }
        if (compraOuVendido == Constants.TipoOrdem.COMPRA) {
          var calculo =
            ordemAtual.preco * ordemAtual.quantidade -
            ordemAtual.quantidade * precoMedio;
          calc.push(calculo);
        }
      }

      if (qtdEstoque == 0) {
        
       calc.push(liquido);
        liquido = 0;
        compraOuVendido = "";
      }
    }

    return from(calc).sum();
  }
}

export { CalculoService };
