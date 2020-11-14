<template>
<div>
   <q-card
        class="my-card"
        flat
        bordered
      >
      <q-card-section color="red">
          <q-card-section class="text-h6">
            Monitoramento de Ações
          </q-card-section>
    <div class="q-pa-md" style="max-width: 400px">
      <q-input
        filled
        v-model="papel"
        label="Papel"
      />
      <q-btn
        label="Adicionar"
        type="button"
        color="primary"
        @click="adicionarAcoesMonitoradas"
      />
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
        class="my-card"
        flat
        bordered
        v-for="(item, index) in acoesMinitoradas"
        :key="index"
      >
        <q-card-section color="red">
          <q-card-section class="text-h6">
            {{ item.Papel }}
          </q-card-section>
          <q-card-section class="text-h6">
            {{
              item.CotacaoAtual.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            }}
          </q-card-section>
          <q-card-section class="text-h6"> 4,00% </q-card-section>
        </q-card-section>
      </q-card>
    </div>
      </q-card-section>
  </q-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import myContainer from "src/config/inversify.config";
import { TYPES } from "src/config/types";
import { IAcaoMonitoradaService } from "src/services/interfaces/IAcaoMonitoradaService";
import { _model } from "src/models/_models";

@Component
export default class AcoesMonitoradasComponente extends Vue {
  papel: string = "";
  loading: boolean = false;
  acoesMinitoradas: _model.AtivoDetalhesModel[] = [];

  private _acaoMonitoradaService: IAcaoMonitoradaService = myContainer.myContainer.get<
    IAcaoMonitoradaService
  >(TYPES.AcaoMonitoradaService);

  public recuperaAcoesMonitoradas() {
    let data = this._acaoMonitoradaService
      .recuperaAcoesMonitoradas()
      .then((result) => {
        this.acoesMinitoradas = result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public adicionarAcoesMonitoradas() {

    if(!this.papel){
      return ; 
    }
    let acoes = this.acoesMinitoradas.map((y) => {
      return y.Papel;
    });
    acoes.push(this.papel);

    this._acaoMonitoradaService.adicionarAcoesMonitoradas(acoes);
    this.recuperaAcoesMonitoradas();
    this.papel = "";
  }

  mounted() {
    console.log("Teste Ações monitoradas");
    this.loading = true;
    this._acaoMonitoradaService = myContainer.myContainer.get<
      IAcaoMonitoradaService
    >(TYPES.AcaoMonitoradaService);

    this.recuperaAcoesMonitoradas();
  }
}
</script>