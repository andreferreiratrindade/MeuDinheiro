<template>
  <div class="q-pa-md" style="width: 350px">
    <q-toolbar class="bg-secondary text-white shadow-2">
      <q-toolbar-title>Lucro Realizado</q-toolbar-title>
    </q-toolbar>
       <q-list bordered>
      <q-item
        class="q-my-sm"
        clickable
        v-ripple
      >
        <q-item-section>
          {{
                totalLucroRealziado.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }}
        </q-item-section>
      </q-item>
       </q-list>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ICalculoService } from "src/services/interfaces/ICalculoService";
import { _modelOutput } from "src/models/_modelsOutput";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "src/config/types";
import myContainer from "src/config/inversify.config";

@Component
export default class LucroRealizadoComponente extends Vue {
  loading: boolean = true;
  totalLucroRealziado: number = 0;

  private _calculoServico = myContainer.myContainer.get<ICalculoService>(
    TYPES.CalculadoraService
  );
  recuperaLucroRealizado() {
    // let lucroRealizados = this._calculoServico.calculaLucroRealizado(ordens);
    // this.totalLucroRealziado = lucroRealizados.reduce(
    //   (sum, item) => sum + item.Lucro,
    //   0
    // );
  }

  mounted() {
    this.loading = true;
    this._calculoServico = myContainer.myContainer.get<ICalculoService>(
      TYPES.CalculadoraService
    );

    this.recuperaLucroRealizado();
  }
}
</script>