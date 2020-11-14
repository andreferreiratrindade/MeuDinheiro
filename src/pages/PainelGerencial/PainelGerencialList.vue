<template>
 <div class="q-pa-md" >
    <posicao-atual-componente></posicao-atual-componente>
    <lucro-realizado-componente></lucro-realizado-componente>
    <div style="margin-top:10px"></div>
    <acoes-monitoradas-componente></acoes-monitoradas-componente>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { _model } from "src/models/_models";
import PosicaoAtualComponente from "src/components/PosicaoAtualComponente.vue";
import { OrdemConfig } from "src/services/OrdemConfig";
import AcoesMonitoradasComponente from "src/components/AcoesMonitoradasComponente.vue";
import LucroRealizadoComponente from "src/components/LucroRealizadoComponente.vue"
@Component({
  components: { PosicaoAtualComponente, AcoesMonitoradasComponente, LucroRealizadoComponente },
})
export default class PainelGerencialList extends Vue {}
</script>