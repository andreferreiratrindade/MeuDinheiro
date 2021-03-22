  <template>
  <div class="q-pa-md">
    <q-toolbar class="bg-secondary text-white shadow-2">
      <q-toolbar-title>Posição Atual</q-toolbar-title>
    </q-toolbar>
    <div></div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
        class="my-card"
        flat
        bordered
        v-for="(item, index) in data"
        :key="index"
        clickable
        v-ripple
        style="width: 100%"
      >
        <q-item>
          <q-item-section>
            <q-item-label> {{ item.papel }} </q-item-label>
            <q-item-label>
              {{
                item.ativoDetalhes.cotacaoAtual.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item>
          <q-item-section>
            <q-item-label>Quantidade: {{ item.quantidade }} </q-item-label>
            <q-item-label>
              Preço Médio:{{
                item.precoMedio.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />

        <q-item>
          <q-item-section>
            <q-item-label>
              Valor Total:
              {{
                item.valorTotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }}
            </q-item-label>
            <q-item-label>
              Lucro:
              {{
                item.lucro.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
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

  private _posicaoAtualService!: IPosicaoAtualService;

  data: any[] = [];

  resultados: any = { ValorTotal: 0, LucroTotal: 0 };
  recuperaPosicaoAtual(ordens: _modelOutput.OrdemOutputModel[]) {
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
    this._posicaoAtualService = myContainer.myContainer.get<IPosicaoAtualService>(
      TYPES.PosicaoAtualService
    );
  }
}
</script>