<template>
  <v-container fluid height="100%" class="pa-3">
    <v-row>
      <v-chip class="ma-2" @click="mostrarPopupOrdenacaoFeiras = true">Ordenar por {{ordenacao}}</v-chip>
      <v-chip class="ma-2" v-if="tipoOrdenacao == 'asc'" @click="alterarTipoOrdenacao">
        <v-icon>mdi-sort-ascending</v-icon>
      </v-chip>
      <v-chip class="ma-2" v-if="tipoOrdenacao == 'desc'" @click="alterarTipoOrdenacao">
        <v-icon>mdi-sort-descending</v-icon>
      </v-chip>
    </v-row>
    <v-row>
      <div class="d-sm-flex d-md-inline-flex flex-wrap justify-space-between">
        <div class="justify-space-around d-sm-flex d-md-inline-flex flex-wrap ">
          <CardFeira class="flex-shrink-5"
            v-for="feira in feiras"
            :key="feira.id"
            :feira="feira"
            @abrir-imagem-dialog="abrirDialogImagem"
          />
        </div>
      </div>
    </v-row>
    <v-dialog v-model="mostrarPopupOrdenacaoFeiras" width="500">
      <v-card>
        <v-card-title>Ordenação</v-card-title>
        <v-card-text>
          <v-radio-group class="pl-3" v-model="ordenacao">
            <v-radio label="Nome" value="nome" color="light-green darken-3"></v-radio>
            <v-radio label="Avaliação" value="avaliacao" color="light-green darken-3"></v-radio>
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
import CardFeira from "./CardFeira";

export default {
  name: "BuscaFeiras",
  data() {
    return {
      mostrarPopupOrdenacaoFeiras: false,
      ordenacao: "",
      tipoOrdenacao: "asc"
    };
  },
  components: {
    CardFeira
  },

  computed: {
    ...mapState("Busca", ["feiras"]),

    id() {
      return this.$route.params.id;
    }
  },
  created() {
    this.getFeiras();
  },
  methods: {
    ...mapActions("Busca", ["getFeiras", "setOrdenacao", "setTipoOrdenacao"]),
    ordenar() {
      this.setOrdenacao(this.ordenacao),
        (this.mostrarPopupOrdenacaoFeiras = false);
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
</style>