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
          <q-btn
            round
            flat
            color="red"
               @click="deleteRow(props.row)"
            icon="delete"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { INotaCorretagemService } from "src/services/interfaces/INotaCorretagemService";
import { _model } from "src/models/_models";
import UploadArquivo from "components/UploadArquivo.vue";
import myContainer from "src/config/inversify.config";
import { TYPES } from "src/config/types";

@Component({
  components: { UploadArquivo },
})
export default class ArquivoNotaCorretagemList extends Vue {
  private notaCorretagemService = myContainer.myContainer.get<
    INotaCorretagemService
  >(TYPES.NotaCorretagemService);

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

  private data: Array<_model.ArquivoNotaCorretagemModel> = [];

   recuperaNotasCorretagens() {
    this.notaCorretagemService
      .recuperaArquivoNotasCorretagens()
      .then((result) => {
        this.data = result;
      });
  }

  public mounted() {
    this.recuperaNotasCorretagens();
  }

  public deleteRow(row: _model.ArquivoNotaCorretagemModel) {
    this.data = this.data.filter((y) => {
      return y.Competencia != row.Competencia;
    });
    this.notaCorretagemService.atualizaArquivoNotaCorretagem(this.data);
  }
}
</script>
