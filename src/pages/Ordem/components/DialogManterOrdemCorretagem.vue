<template>
  <q-dialog ref="dialog" v-model="showModal" persistent cancel>
    <q-card>
      <q-form @submit="salvar" class="q-gutter-md">
        <q-card-section>
          <q-input
            v-model="ordem.papel"
            type="text"
            label="Papel"
            filled
            require
            lazy-rules
            focus
            :rules="[ val => val && val.length > 0 || 'Campo de preenchimento obrigatório']"
          />
               <q-input
            v-model="ordem.dataPregao"
            type="text"
            label="Dta. Pregão"
            filled
            require
            lazy-rules
            focus
            :rules="[ val => val && val.length > 0 || 'Campo de preenchimento obrigatório']"
          />

          <q-input
            v-model="ordem.quantidade"
            type="text"
            label="Quantidade"
            filled
            require
            lazy-rules
            focus
            :rules="[ val => val && val.length > 0 || 'Campo de preenchimento obrigatório']"
          />

          <q-input
            v-model="ordem.dataPregao"
            type="text"
            label="Dta. Pregão"
            filled
            require
            lazy-rules
            focus
            :rules="[ val => val && val.length > 0 || 'Campo de preenchimento obrigatório']"
          />
          <q-input
            v-model="ordem.preco"
            type="text"
            label="Preço"
            filled
            require
            lazy-rules
            focus
            :rules="[ val => val && val.length > 0 || 'Campo de preenchimento obrigatório']"
          />

            <q-radio label="Compra" val="C" v-model="ordem.tipoOrdem" name="TipoOrdem"/>
            <q-radio label="Venda" val="V" v-model="ordem.tipoOrdem"  name="TipoOrdem"/>

            <q-toggle v-model="ordem.dayTrade" label="Day Trade" />
           <q-input
            v-model="ordem.preco"
            type="text"
            label="Preço"
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
import { Component, Prop, Vue } from "vue-property-decorator"
import {Constants} from 'src/constants/constants'
import { IOrdemService } from "src/services/interfaces/IOrdemService";
import { _modelInput } from "src/models/_modelsInput";
import myContainer from "src/config/inversify.config";
import { TYPES } from "src/config/types";
import { inject, injectable } from "inversify";

@Component
export default class DialogManterOrdemCorretagem extends Vue{

  @Prop({ type: Function, default: () => false })
	readonly refreshTable!: Function;

    public showModal : boolean = false;
    private _OrdemService !: IOrdemService
    public ordem : _modelInput.OrdemInputModel= {
    papel: "",
    quantidade: 0,
    preco: 0,
    dataPregao: "",
    ordemPosicao: 0,
    dayTrade: false,
    tipoOrdem : "",
    usuarioId : ""

      }


    show(){
        this.showModal = true
    }

   public salvar() {
    this._OrdemService
      .adicionarOrdem(this.ordem)
      .then((result: any) => {
        this.$q.notify(result);

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
    this._OrdemService = myContainer.myContainer.get<
      IOrdemService
    >(TYPES.OrdemService);
  }
}
</script>