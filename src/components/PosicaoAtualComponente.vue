  <template>
  <div class="q-pa-md" style="width: 350px">
    <q-toolbar class="bg-secondary text-white shadow-2">
      <q-toolbar-title>Posição Atual</q-toolbar-title>
    </q-toolbar>
    <div></div>
    <q-list bordered  virtual-scroll>
      <q-item v-if="data">
        Nenhum registro encontrado
        <q-item-section> </q-item-section>
      </q-item>
      <q-item
        v-for="(item, index) in data"
        :key="index"
        class="q-my-sm"
        clickable
        v-ripple
      >
        <q-item-section>
          {{ item.Papel }}
        </q-item-section>

        <q-item-section>
          <q-item-label>{{
            item.CotacaoAtual.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          {{ item.Percentual }}
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IOrdemService } from "src/services/interfaces/IOrdemService";
import { ICalculoService } from "src/services/interfaces/ICalculoService";
import { IPosicaoAtualService } from "src/services/interfaces/IPosicaoAtualService";
import { _modelOutput } from "src/models/_modelsOutput";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "src/config/types";
import myContainer from "src/config/inversify.config";

@Component
export default class PosicaoAtualComponente extends Vue {
  loading: boolean = true;

  private _posicaoAtualService !: IPosicaoAtualService;

  data: any[] = [];
  
  resultados: any = { ValorTotal: 0, LucroTotal: 0 };
  recuperaPosicaoAtual(ordens:_modelOutput.OrdemOutputModel[]) {
    this.loading = true;
    
    this._posicaoAtualService
      .recuperaPosicaoAtualCarteira(ordens)
      .then((result) => {
        this.data = result;
        this.resultados = {
          ValorTotal: this.data.reduce(
            (sum, current) => sum + current.ValorTotal,
            0
          ),
          LucroTotal: this.data.reduce(
            (sum, current) => sum + current.Lucro,
            0
          ),
        };
      })
      .catch((reject) => {
        console.log(reject);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  mounted() {
    this._posicaoAtualService = myContainer.myContainer.get<
      IPosicaoAtualService
    >(TYPES.PosicaoAtualService);

  }
}
</script>