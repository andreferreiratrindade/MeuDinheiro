<template>
  <div class="q-pa-md" style="width: 350px">
    <q-toolbar class="bg-secondary text-white shadow-2">
      <q-toolbar-title>Papeis Favoritos</q-toolbar-title>
      <q-btn round color="primary" @click="novoPapelFavorito">
        <i class="fas fa-plus"></i>
      </q-btn>
    </q-toolbar>

    <q-list bordered v-scroll >
      <q-item
        v-for="item in papeisFavoritos"
        :key="item.papel"
        class="q-my-sm"
        clickable
        v-ripple
      >
        <q-item-section>
          {{ item.papel }}
        </q-item-section>

        <q-item-section>
          <q-item-label>{{
            item.cotacaoAtual.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <dialog-novo-papel-favorito
      ref="dialogNovoPapelFavorito"
      :refreshTable="recuperaPapeisFavoritos"
    >
    </dialog-novo-papel-favorito>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import myContainer from "src/config/inversify.config";
import { TYPES } from "src/config/types";
import { IPapelFavoritoService } from "src/services/interfaces/IPapelFavoritoService";
import { _modelOutput } from "src/models/_modelsOutput";
import DialogNovoPapelFavorito from "./DialogNovoPapelFavorito.vue";

@Component({
  components: { DialogNovoPapelFavorito },
})
export default class PapeisFavoritosComponente extends Vue {
  papel: string = "";
  loading: boolean = false;
  papeisFavoritos: _modelOutput.AtivoDetalhesOutputModel[] = [];
  private _papelFavoritoService!: IPapelFavoritoService;

  public async recuperaPapeisFavoritos() {
    this._papelFavoritoService
      .recuperaPapeisFavoritos()
      .then((result) => {
        this.papeisFavoritos = result;

        this.papeisFavoritos.forEach((item) => {
          item.loading = true;
          //recuperaDetalhesPorPapel(item)
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public recuperaDetalhesPorPapel(papel: string) {}

  public novoPapelFavorito() {
    (this.$refs.dialogNovoPapelFavorito as Vue & {
      show: () => boolean;
    }).show();
  }

  async mounted() {
    this.loading = true;
    this._papelFavoritoService = myContainer.myContainer.get<
      IPapelFavoritoService
    >(TYPES.PapelFavoritoService);

    await this.recuperaPapeisFavoritos();
  }
}
</script>