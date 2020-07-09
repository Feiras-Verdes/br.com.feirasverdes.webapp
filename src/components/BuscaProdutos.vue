<template>
  <v-container fluid height="100%" class="pa-3">
    <v-row>
      <v-row>
        <div class="d-none d-sm-block busca pa-2">Buscando por</div>
        <div class="d-none d-sm-block nomeBusca py-2">{{ busca }}</div>
      </v-row>
      <div>
        <v-chip class="ma-2" @click="mostrarPopupOrdenacaoProdutos = true">Ordenar por {{ordenacao}}</v-chip>
        <v-chip class="ma-2" v-if="tipoOrdenacao == 'asc'" @click="alterarTipoOrdenacao">
          <v-icon>mdi-sort-ascending</v-icon>
        </v-chip>
        <v-chip class="ma-2" v-if="tipoOrdenacao == 'desc'" @click="alterarTipoOrdenacao">
          <v-icon>mdi-sort-descending</v-icon>
        </v-chip>
      </div>
    </v-row>
    <v-row>
      <div class="d-sm-flex d-md-inline-flex flex-wrap justify-space-between">
        <div class="sm-justify-center md-justify-start d-md-inline-flex flex-wrap">
          <CardProduto
            v-for="produto in produtos"
            :key="produto.id"
            :produto="produto"
          />
        </div>
      </div>
    </v-row>
    <v-dialog v-model="mostrarPopupOrdenacaoProdutos" width="500">
      <v-card>
        <v-card-title>Ordenação</v-card-title>
        <v-card-text>
          <v-radio-group class="pl-3" v-model="ordenacao">
            <v-radio label="Nome" value="nome" color="light-green darken-3"></v-radio>
            <v-radio label="Preço" value="preco" color="light-green darken-3"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="ordenar">Ordenar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CardProduto from "./CardProduto";

export default {
  name: "BuscaProdutos",
  data() {
    return {
      mostrarPopupOrdenacaoProdutos: false,
      ordenacao: "",
      tipoOrdenacao: "asc"
    };
  },
  components: {
    CardProduto
  },

  props: {
    busca: {
      required: true
    }
  },

  computed: {
    ...mapState("Busca", ["produtos"]),

    id() {
      return this.$route.params.id;
    }
  },
  created() {
    this.getProdutos();
  },
  methods: {
    ...mapActions("Busca", ["getProdutos", "setOrdenacao", "setTipoOrdenacao"]),
    ordenar() {
      this.setOrdenacao(this.ordenacao),
        (this.mostrarPopupOrdenacaoProdutos = false);
    },
    alterarTipoOrdenacao() {
      if (this.tipoOrdenacao == "asc") {
        this.tipoOrdenacao = "desc";
      } else if (tipoOrdenacao == "desc") {
        this.tipoOrdenacao = "asc";
      }
      this.setTipoOrdenacao(this.tipoOrdenacao);
    }
  }
};
</script>

<style scoped>
.busca {
  font-size: 1.5em;
  font-family: "Roboto", sans-serif;
  margin-left: 50px;
  width: fit-content;
}

.nomeBusca {
  color: #558b2f;
  font-size: 1.5em;
  font-family: "Roboto", sans-serif;
  width: fit-content;
}
</style>