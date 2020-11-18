<template>
  <div class="q-pa-md">
    <upload-arquivo />
    <q-table
      title="Ordens"
      :data="data"
      :columns="colunas"
      :loading="loading"
      color="primary"
    >
    </q-table>
  </div>
</template>


<script lang="ts">
import UploadArquivo from "components/UploadArquivo.vue";

import { Component, Vue } from "vue-property-decorator";
import DialogManterOrdemCorretagem from"./components/DialogManterOrdemCorretagem.vue"
import { IOrdemService } from "src/services/interfaces/IOrdemService";
import { _modelOutput } from "src/models/_modelsOutput";
import myContainer from "../../config/inversify.config";
import { TYPES } from "src/config/types";
import { inject, injectable } from "inversify";
@Component({
  components: { UploadArquivo },
})
export default class OrdemList extends Vue {
  loading : boolean = true;

  private _OrdemService !: IOrdemService;

  colunas: Array<object> = [
    {
      name: "OrdemPosicao",
      label: "Ordem",
      field: "OrdemPosicao",
      align: "left",
    },
    { name: "Papel", label: "Papel", field: "Papel", align: "left" },
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
      name: "Preco",
      label: "Preço",
      field: "Preco",
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

  data: _modelOutput.OrdemOutputModel[] = [];

  recuperaNotasCorretagens() {
    
       this._OrdemService
      .recuperaNotasCorretagens() 
      .then()
      .catch()
      .finally()
 
  }

  showNovaOrdem(){
    (this.$refs.dialogManterordemCorretagem as Vue & { show():boolean}).show();
  }

created() {
     this.recuperaNotasCorretagens();
   this.loading = false;
    this._OrdemService = myContainer.myContainer.get<
      IOrdemService
    >(TYPES.OrdemService);
  }
}
</script>