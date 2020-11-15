<template>
  <div >
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <q-card-section>
          <div class="text-h5">Lucro Realizado</div>

          <div class="text-h5">
            <div>
              {{
                totalLucroRealziado.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }}
            </div>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ICalculoService } from "src/services/interfaces/ICalculoService";
import { _model } from "src/models/_models";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "src/config/types";
import myContainer from "src/config/inversify.config";
import { OrdemConfig } from "src/services/OrdemConfig";

@Component
export default class LucroRealizadoComponente extends Vue {
  loading: boolean = true;
  totalLucroRealziado: number = 0;

  private _calculoServico = myContainer.myContainer.get<ICalculoService>(
    TYPES.CalculadoraService
  );
  recuperaLucroRealizado() {
    const ordens = OrdemConfig.recuperaInstancia().recuperaOrdens();
    let lucroRealizados = this._calculoServico.calculaLucroRealizado(ordens);
    this.totalLucroRealziado = lucroRealizados.reduce(
      (sum, item) => sum + item.Lucro,
      0
    );
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