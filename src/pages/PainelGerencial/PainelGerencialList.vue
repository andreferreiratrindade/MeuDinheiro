<template>
  <div class="q-pa-md">
    <div class="row justify-around">
      <posicao-atual-componente
        class="col-12"
        ref="posicaoAtualComp"
      ></posicao-atual-componente>
      <lucro-realizado-componente class="col-3" ref="lucroRealizadoComp"></lucro-realizado-componente>
      <lucro-por-competencia-compomente class="col-3" ref="lucroPorCompetenciaComp"></lucro-por-competencia-compomente>
      <papeis-favoritos-componente class="col-3"></papeis-favoritos-componente>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import LucroPorCompetenciaCompomente from "src/components/LucroPorCompetenciaCompomente.vue";
import PosicaoAtualComponente from "src/components/PosicaoAtualComponente.vue";
import PapeisFavoritosComponente from "src/components/PapeisFavoritosComponente.vue";
import LucroRealizadoComponente from "src/components/LucroRealizadoComponente.vue";
import { IOrdemService } from "src/services/interfaces/IOrdemService";
import { _modelOutput } from "src/models/_modelsOutput";
import myContainer from "../../config/inversify.config";
import { TYPES } from "src/config/types";

@Component({
  components: {
    PosicaoAtualComponente,
    PapeisFavoritosComponente,
    LucroRealizadoComponente,
    LucroPorCompetenciaCompomente
  },
})
export default class PainelGerencialList extends Vue {
  private _OrdemService!: IOrdemService;

  recuperaNotasCorretagens() {
    this._OrdemService.recuperaNotasCorretagens().then((result) => {
      this.initComponentes(result);
    });
  }

  initComponentes(ordens: _modelOutput.OrdemOutputModel[]) {

    
    (this.$refs.lucroRealizadoComp as Vue & {
      recuperaLucroRealizado: (ordens : _modelOutput.OrdemOutputModel[] )=> void ;
    }).recuperaLucroRealizado(ordens);

    (this.$refs.posicaoAtualComp as Vue & {
      recuperaPosicaoAtual: (ordens : _modelOutput.OrdemOutputModel[] )=> void ;
    }).recuperaPosicaoAtual(ordens);


    (this.$refs.lucroPorCompetenciaComp as Vue & {
      recuperaLucroPorCompetencia: (ordens : _modelOutput.OrdemOutputModel[] )=> void ;
    }).recuperaLucroPorCompetencia(ordens);
  }


  mounted() {
    this._OrdemService = myContainer.myContainer.get<IOrdemService>(
      TYPES.OrdemService
    );

    this.recuperaNotasCorretagens();
  }
}
</script>