<template>
  <div class="q-pa-md">
    <q-table
      title="Posição Atual"
      :data="data"
      :columns="colunas"
      :loading="loading"
    />
  </div>
</template>



<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IOrdemService } from "src/services/interfaces/IOrdemService";
import { ICalculoService } from "src/services/interfaces/ICalculoService";
import { IPosicaoAtualService } from "src/services/interfaces/IPosicaoAtualService";
import { _modelOutput } from "src/models/_modelsOutput";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "src/config/types";
import myContainer from "src/config/inversify.config";
import { debug } from "util";

@Component
export default class PosicaoAtualComponente extends Vue {
  loading: boolean = true;

  private _posicaoAtualService!: IPosicaoAtualService;

  data: any[] = [];
  colunas : any[] = [
        {
          name: 'papel',
          label: 'Papel',
          align: 'left',
          field: row => row.papel,
          sortable: true
        },
        {
          name: 'cotacaoAtual',
          label: 'Cotação Atual',
          align: 'left',
          field: row => row.ativoDetalhes.cotacaoAtual,
          format: val => val.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
        },
         {
          name: 'quantidade',
          label: 'Quantidade',
          align: 'left',
          field: row => row.quantidade,
        },
        {
          name: 'precoMedio',
          label: 'Preço Medio',
          align: 'left',
          field: row => row.precoMedio,
           format: val => val.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
        },
        {
          name: 'valorTotalPrecoMedio',
          label: 'Valor Total',
          align: 'left',
          field: row => row.valorTotalPrecoMedio,
           format: val => val.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
        },
        {
          name: 'lucro',
          label: 'Lucro',
          align: 'left',
          field: row => row.lucro,
           format: val => val.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
        }
        ];

  resultados: any = { ValorTotal: 0, LucroTotal: 0 };

  recuperaPosicaoAtual(ordens: _modelOutput.OrdemOutputModel[]) {
    this.loading = true;

    this._posicaoAtualService
      .recuperaPosicaoAtualCarteira(ordens)
      .then((result) => {
        this.data = result;
        this.resultados = {
          ValorTotal: this.data.reduce(
            (sum, current) => sum + current.valorTotalPrecoMedio,
            0
          ),
          LucroTotal: this.data.reduce(
            (sum, current) => sum + current.Lucro,
            0
          ),
        };
      })
      .catch((reject) => {
        console.log(reject);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  mounted() {
    this._posicaoAtualService = myContainer.myContainer.get<IPosicaoAtualService>(
      TYPES.PosicaoAtualService
    );
  }
}
</script>