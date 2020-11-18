<template>
  <div class="q-pa-md">
    <upload-arquivo />

    <q-table
      title="Arquivos Importados"
      :data="data"
      :columns="colunas"
      row-key="competencia"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
        
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IOrdemService } from "src/services/interfaces/IOrdemService";
import UploadArquivo from "components/UploadArquivo.vue";
import myContainer from "src/config/inversify.config";
import { TYPES } from "src/config/types";
import { _modelOutput } from "src/models/_modelsOutput";

@Component({
  components: { UploadArquivo },
})
export default class ArquivoOrdemList extends Vue {
  private OrdemService = myContainer.myContainer.get<
    IOrdemService
  >(TYPES.OrdemService);

  colunas: Array<object> = [
    {
      name: "Competencia",
      label: "Competência",
      field: "Competencia",
      align: "left",
    },
    { name: "Arquivo", label: "Arquivo", field: "Arquivo", align: "left" },
    { name: "actions", label: "Ações", field: "", align: "center" },
  ];

  private data: Array<_modelOutput.ArquivoOrdemOutputModel> = [];

  //  recuperaNotasCorretagens() {
  //   this.OrdemService
  //     .recuperaArquivoNotasCorretagens()
  //     .then((result) => {
  //       this.data = result;
  //     });
  // }

  // public mounted() {
  //   this.recuperaNotasCorretagens();
  // }

  // public deleteRow(row: _model.ArquivoOrdemModel) {
  //   this.data = this.data.filter((y) => {
  //     return y.Competencia != row.Competencia;
  //   });
  //   this.OrdemService.atualizaArquivoOrdem(this.data);
  // }
}
</script>
