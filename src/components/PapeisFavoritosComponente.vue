<template>
  <div>
    <q-card class="my-card" flat bordered >
      <q-card-section color="red">
        <q-card-section class="text-h6">
          Papeis Favoritos
          <q-btn
            round
            color="primary"
            @click="showModal = true"
          >
<i class="fas fa-plus"></i>
          </q-btn>
        </q-card-section>
        

        <div class="q-pa-md row items-start q-gutter-md">
          <q-card
            class="my-card"
            flat
            bordered
            vertical
            v-for="(item, index) in papeisFavoritos"
            :key="index"
          >
            <q-card-section color="red" horizontal>
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
    <dialog-novo-papel-favorito :showModal="showModal" @close="showModal = false"> </dialog-novo-papel-favorito>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import myContainer from "src/config/inversify.config";
import { TYPES } from "src/config/types";
import { IPapelFavoritoService } from "src/services/interfaces/IPapelFavoritoService";
import { _model } from "src/models/_models";
import DialogNovoPapelFavorito from "./DialogNovoPapelFavorito.vue"

@Component({
  components: { DialogNovoPapelFavorito },
})
export default class PapeisFavoritosComponente extends Vue {
  papel: string = "";
  loading: boolean = false;
  papeisFavoritos: _model.AtivoDetalhesModel[] = [];
  showModal : boolean =false;
  private _papelFavoritoService!: IPapelFavoritoService

  public recuperaPapeisFavoritos() {
      this._papelFavoritoService
      .recuperaPapeisFavoritos()
      .then((result) => {
        this.papeisFavoritos = result;
      })
      .catch((err) => {
        console.log(err);
      });
  }


  mounted() {
    this.loading = true;
    this._papelFavoritoService = myContainer.myContainer.get<
      IPapelFavoritoService
    >(TYPES.PapelFavoritoService);

    this.recuperaPapeisFavoritos();

  }
}
</script>