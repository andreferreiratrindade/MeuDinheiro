import { injectable, inject } from "inversify";
import "reflect-metadata";
import { _model } from "src/models/_models";
import { from } from "linq-to-typescript";
import { ICalculoService } from "src/services/interfaces/ICalculoService";
import { Constants } from "./../constants/constants";

@injectable()
class CalculoService implements ICalculoService {
  public recuperaPosicaoAtualCarteira(
    ordens: _model.OrdemModel[]
  ): _model.PosicaoAtualModel[] {
    let lst: _model.PosicaoAtualModel[] = [];

    const group = from(ordens)
      .groupBy(y => y.Titulo)
      .toArray();

    group.forEach(element => {
      let ordensTemp = element
        .orderBy(y => y.DataPregao)
        .thenBy(y => y.OrdemPosicao)
        .toArray();
      var posicaoAtual = this.recuperaPosicalAtualCarteiraPorPapel(ordensTemp);
      if (posicaoAtual != null) {
        posicaoAtual.Papel = element.key;
        lst.push(posicaoAtual);
      }
    });

    return lst;
  }

  public recuperaPosicalAtualCarteiraPorPapel(
    ordens: _model.OrdemModel[]
  ): _model.PosicaoAtualModel | null {
    let liquido: number = 0;
    let qtdEstoque: number = 0;
    let posicaoAtual: _model.PosicaoAtualModel | null = null;

    for (let index = 0; index < ordens.length; index++) {
      const ordemAtual = ordens[index];

      if (ordemAtual.CV == Constants.CV.COMPRA) {
        liquido += ordemAtual.PrecoAjuste * ordemAtual.Quantidade * -1;
        qtdEstoque += ordemAtual.Quantidade;
      } else if (ordemAtual.CV == Constants.CV.VENDA) {
        liquido += ordemAtual.PrecoAjuste * ordemAtual.Quantidade;
        qtdEstoque -= ordemAtual.Quantidade;
      }

      if (qtdEstoque == 0) {
        liquido = 0;
      }
    }
    liquido = Math.abs(liquido);
    qtdEstoque = Math.abs(qtdEstoque);

    if (liquido > 0) {
      posicaoAtual = {
        PrecoMedio: liquido / qtdEstoque,
        Quantidade: qtdEstoque,
        Papel: ordens[0].Titulo,
        ValorTotalPrecoMedio: liquido,
        ValorTotal: 0,
        Lucro: 0,
        AtivoDetalhes: {
          CotacaoAtual: 0,
          Papel: "",
          RazaoSocial: "",
          Percentual: 0
        }
      };
    }

    return posicaoAtual;
  }

  public montaValoresPosicalAtual(
    posicaoAtual: _model.PosicaoAtualModel
  ): _model.PosicaoAtualModel {
    posicaoAtual.ValorTotal =
      posicaoAtual.AtivoDetalhes.CotacaoAtual * posicaoAtual.Quantidade;
    posicaoAtual.Lucro =
      posicaoAtual.ValorTotal - posicaoAtual.ValorTotalPrecoMedio;
    return posicaoAtual;
  }

  public calculaLucroRealizado(
    ordens: _model.OrdemModel[]
  ): _model.LucroRealizado[] {
    
    let lucrosRealizados: _model.LucroRealizado[] = [];

    var ordensPorPapel = from(ordens)
      .groupBy(x => x.Titulo)
      .toArray();
    ordensPorPapel.forEach(item => {
      var ordensTemp = item
        .orderBy(x => x.DataPregao)
        .thenBy(x => x.OrdemPosicao)
        .toArray();
      lucrosRealizados.push({
        Lucro: this.calculaLucroRealizadoPorPapel(ordensTemp),
        Papel: ordensTemp[0].Titulo
      });
    });
    return lucrosRealizados;
  }

  public calculaLucroRealizadoPorPapel(ordens: _model.OrdemModel[]): number {

    let liquido = 0;
    let qtdEstoque = 0;
    let calc: number[] = [];
    let precoMedio: number = 0;
    let compraOuVendido: string = "";
    for (let i = 0; i < ordens.length; i++) {
      var ordemAtual = ordens[i];

      if (ordemAtual.CV == Constants.CV.COMPRA) {
        liquido += ordemAtual.PrecoAjuste * ordemAtual.Quantidade * -1;
        qtdEstoque += ordemAtual.Quantidade;

        compraOuVendido = !compraOuVendido.length
          ? Constants.CV.COMPRA
          : compraOuVendido;

        if (
          compraOuVendido == Constants.CV.COMPRA &&
          liquido != 0 &&
          qtdEstoque != 0
        ) {
          precoMedio = Math.abs(liquido) / Math.abs(qtdEstoque);
        }

        if (compraOuVendido == Constants.CV.VENDA) {
          var calculo =
            ordemAtual.Quantidade * precoMedio -
            ordemAtual.PrecoAjuste * ordemAtual.Quantidade;
          calc.push(calculo);
        }
      } else if (ordemAtual.CV == Constants.CV.VENDA) {
        liquido += ordemAtual.PrecoAjuste * ordemAtual.Quantidade;
        qtdEstoque -= ordemAtual.Quantidade;
        compraOuVendido = !compraOuVendido.length
          ? Constants.CV.VENDA
          : compraOuVendido;

        if (
          compraOuVendido == Constants.CV.VENDA &&
          liquido != 0 &&
          qtdEstoque != 0
        ) {
          precoMedio = Math.abs(liquido) / Math.abs(qtdEstoque);
        }
        if (compraOuVendido == Constants.CV.COMPRA) {
          var calculo =
            ordemAtual.PrecoAjuste * ordemAtual.Quantidade -
            ordemAtual.Quantidade * precoMedio;
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
