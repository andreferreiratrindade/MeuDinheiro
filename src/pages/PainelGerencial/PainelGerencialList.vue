<template>
 <div class="q-pa-md" >
   <div class="row  justify-around">
    <posicao-atual-componente class="col-3"></posicao-atual-componente>
    <lucro-realizado-componente class="col-3"></lucro-realizado-componente>   
    <papeis-favoritos-componente class="col-3"></papeis-favoritos-componente>
   </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { _model } from "src/models/_models";
import PosicaoAtualComponente from "src/components/PosicaoAtualComponente.vue";
import { OrdemConfig } from "src/services/OrdemConfig";
import PapeisFavoritosComponente from "src/components/PapeisFavoritosComponente.vue";
import LucroRealizadoComponente from "src/components/LucroRealizadoComponente.vue"
@Component({
  components: { PosicaoAtualComponente, PapeisFavoritosComponente, LucroRealizadoComponente },
})
export default class PainelGerencialList extends Vue {}
</script>