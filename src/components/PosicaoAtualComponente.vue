<template>
  <div>
    <q-card class="my-card " flat bordered>
      <q-card-section >
        <q-card-section  horizontal class="row justify-between"> 
   
          <div class="text-h5"> Posição Atual </div>

          <div  class=" text-h5"> 
            <div> {{
                  resultados.ValorTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }}
                </div>
  <div> {{
                  resultados.LucroTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }}
                </div>
          </div>
        </q-card-section>

        <div class="q-pa-md row items-start q-gutter-md">

          <q-card
            class="my-card"
            flat
            bordered
            v-for="(item, index) in data"
            :key="index"
          >
            <q-card-section >
             <div class="text-h6"> {{ item.Papel }} </div>
             <div>{{ item.AtivoDetalhes.CotacaoAtual.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }) }}</div>
            </q-card-section>
            <q-card-section horizontal>

            <q-card-section>
              <div class="text-caption">vlr. total</div>
              <div class="text-h6">
                {{
                  item.ValorTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }}
              </div>
            </q-card-section>
            <q-card-section>
              <div class="text-caption">lucro</div>
              <div class="text-h6">
                {{
                  item.Lucro.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }}
              </div>
            </q-card-section>
            </q-card-section>

            <q-card-section horizontal>

            <q-card-section>
              <div class="text-caption">preço médio</div>
              <div class="text-h6">
                {{
                  item.PrecoMedio.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }}
              </div>
            </q-card-section>
            <q-card-section>
              <div class="text-caption">quantidade</div>
              <div class="text-h6">
                {{ item.Quantidade }}
              </div>
            </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { INotaCorretagemService } from "src/services/interfaces/INotaCorretagemService";
import { ICalculoService } from "src/services/interfaces/ICalculoService";
import { IPosicaoAtualService } from "src/services/interfaces/IPosicaoAtualService";
import { _model } from "src/models/_models";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "src/config/types";
import myContainer from "src/config/inversify.config";
import { OrdemConfig } from "src/services/OrdemConfig";

@Component
export default class PosicaoAtualComponente extends Vue {
  loading: boolean = true;

  private _posicaoAtualService = myContainer.myContainer.get<
    IPosicaoAtualService
  >(TYPES.PosicaoAtualService);

  data: any[] = [];

resultados: any={ValorTotal:0, LucroTotal:0};
  recuperaPosicaoAtual() {
    const ordens = OrdemConfig.recuperaInstancia().recuperaOrdens();
    this._posicaoAtualService
      .recuperaPosicaoAtualCarteira(ordens)
      .then((result) => {
        this.data = result;
        this.resultados = { ValorTotal : this.data.reduce((sum, current)=>sum+current.ValorTotal,0),
                            LucroTotal : this.data.reduce((sum, current)=>sum+current.Lucro,0)};

      }).catch((reject) => {
        console.log(reject);
      })
      .finally(() => {
        this.loading = false;
      });
  }


  mounted() {
    this.loading = true;
    this._posicaoAtualService = myContainer.myContainer.get<
      IPosicaoAtualService
    >(TYPES.PosicaoAtualService);

    this.recuperaPosicaoAtual();
  }
}
</script>