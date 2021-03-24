<template>
  <div class="q-pa-md">
    <q-table
      title="Lucro Por Competência"
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
import { ILucroPorCompetenciaService } from "src/services/interfaces/ILucroPorCompetenciaService";
import { _modelOutput } from "src/models/_modelsOutput";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "src/config/types";
import myContainer from "src/config/inversify.config";
import { debug } from "util";

@Component
export default class LucroPorCompetenciaCompomente extends Vue {
  loading: boolean = true;

  private _lucroPorCompetenciaService!: ILucroPorCompetenciaService;

  data: any[] = [];
  colunas : any[] = [
        {
          name: 'competencia',
          label: 'Competência',
          align: 'left',
          field: row => row.competencia,
          sortable: true
        },
        {
          name: 'valor',
          label: 'Lucro',
          align: 'left',
          field: row => row.valor,
          format: val => val.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
        }];

  resultados: any = { ValorTotal: 0, LucroTotal: 0 };

  recuperaLucroPorCompetencia(ordens: _modelOutput.OrdemOutputModel[]) {
    this.loading = true;
    this.data  = this._lucroPorCompetenciaService.recuperaLucroPorCompetencia(ordens);
    this.loading = false;
  }

  mounted() {
    this._lucroPorCompetenciaService = myContainer.myContainer.get<ILucroPorCompetenciaService>(
      TYPES.LucrPorCompetenciaService
    );
  }
}
</script>