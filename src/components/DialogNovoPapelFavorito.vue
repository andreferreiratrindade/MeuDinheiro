<template>
  <q-dialog ref="dialog" v-model="showModal" persistent dark cancel>
    <q-card>
      <q-form @submit="adicionarPapelFavorito" class="q-gutter-md">
        <q-card-section>
          <q-input
            v-model="papelFavorito.papel"
            type="text"
            label="Papel"
            filled
            require
            lazy-rules
            focus
            :rules="[ val => val && val.length > 0 || 'Campo de preenchimento obrigatório']"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" label="Adicionar" type="submit" value/>
          <q-btn
            label="Cancelar"
            @click="$emit('close')"
             value
            v-close-popup
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { IPapelFavoritoService } from "src/services/interfaces/IPapelFavoritoService";
import { Component, Prop, Vue } from "vue-property-decorator";
import myContainer from "src/config/inversify.config";
import { TYPES } from "src/config/types";
import { _modelInput } from "src/models/_modelsInput";

@Component
export default class DialogNovoPapelFavorito extends Vue {
  private _papelFavoritoService!: IPapelFavoritoService;

  @Prop({ type: Function, default: () => false })
	readonly refreshTable!: Function;


  showModal: boolean = false;

  papelFavorito: _modelInput.PapelFavoritoInputModel = {
    papel: "",
    usuarioId: "",
  };

  public show(){
    console.log('Teste')
    this.showModal = true;
  }

  public adicionarPapelFavorito() {
    this._papelFavoritoService
      .adicionarPapelFavorito(this.papelFavorito)
      .then((result: any) => {
        this.$q.notify(result);
        this.papelFavorito.papel = "";
        this.refreshTable();
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  created() {
    this._papelFavoritoService = myContainer.myContainer.get<
      IPapelFavoritoService
    >(TYPES.PapelFavoritoService);
  }
}
</script>