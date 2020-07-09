<template>
  <v-container fluid height="100%"  class="pa-0">
    <v-tabs background-color="light-green darken-3" v-model="abaSelecionada" dark centered grow>
      <v-tab v-for="aba in abas" :key="aba.id">{{ aba.nome }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="abaSelecionada">
      <v-tab-item>
        <BuscaFeiras :busca="busca"/>
      </v-tab-item>
      <v-tab-item>
        <BuscaEstandes :busca="busca"/>
      </v-tab-item>
      <v-tab-item>
        <BuscaProdutos :busca="busca"/>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BuscaProdutos from "./BuscaProdutos";
import BuscaFeiras from "./BuscaFeiras";
import BuscaEstandes from "./BuscaEstandes";

export default {
  name: "Busca",
  data() {
    return {
      abas: [
        {
          id: 1,
          nome: "Feiras"
        },
        {
          id: 2,
          nome: "Estandes"
        },
        {
          id: 3,
          nome: "Produtos"
        }
      ],
      abaSelecionada: 0,
      ordenacao: "",
      tipoOrdenacao: "asc"
    };
  },

  components: {
    BuscaProdutos,
    BuscaFeiras,
    BuscaEstandes
  },

  computed: {
    ...mapState("Busca", ["feiras", "estandes", "produtos"]),

    id() {
      return this.$route.params.id;
    },

    busca() {
      return this.$route.query.busca;
    }
  }
};
</script>

<style scoped>
</style>