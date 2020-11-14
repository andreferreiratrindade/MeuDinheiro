<template>
  <div class="q-pa-md">
    <q-table title="Notas de Corretagens" :data="data" :columns="colunas" :loading="loading"  color="primary">
     
    </q-table>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { INotaCorretagemService } from "src/services/interfaces/INotaCorretagemService";
import { _model } from "src/models/_models";
import myContainer from "../../config/inversify.config";
import { TYPES } from "src/config/types";
import { inject, injectable } from "inversify";
import { OrdemConfig } from "src/services/OrdemConfig";
@Component
export default class NotaCorretagemList extends Vue {
  loading : boolean = true;

  private notaCorretagemService = myContainer.myContainer.get<
    INotaCorretagemService
  >(TYPES.NotaCorretagemService);

  colunas: Array<object> = [
    {
      name: "OrdemPosicao",
      label: "Ordem",
      field: "OrdemPosicao",
      align: "left",
    },
    { name: "Titulo", label: "Papel", field: "Titulo", align: "left" },
    {
      name: "DataPregao",
      label: "Pregão",
      field: "DataPregao",
      align: "left",
      format: (val: any) => `${new Date(val).toLocaleDateString()}`,
    },
    {
      name: "Quantidade",
      label: "Quantidade",
      field: "Quantidade",
      align: "left",
    },
    {
      name: "PrecoAjuste",
      label: "Preço",
      field: "PrecoAjuste",
      align: "left",
      format: (val: any) =>
        val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
    },
    {
      name: "VlrOperacao",
      label: "Vlr. Operação",
      field: "VlrOperacao",
      align: "left",
      format: (val: any) =>
        val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
    },
    { name: "actions", label: "", field: "", align: "center" },
  ];

  data: _model.OrdemModel[] = [];

  recuperaNotasCorretagens() {
    
      this.data = OrdemConfig.recuperaInstancia().recuperaOrdens();
 
  }

  mounted() {

    this.recuperaNotasCorretagens();
   this.loading = false;

  }
}
</script>