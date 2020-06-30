<template>
  <v-container fluid height="100%" class="pa-0">
    <v-tabs background-color="light-green darken-3" v-model="abaSelecionada" dark centered grow>
      <v-tab v-for="aba in abas" :key="aba.id">{{ aba.nome }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="abaSelecionada">
      <v-tab-item>
        <v-chip
          class="ma-2"
          @click="mostrarPopupOrdenacaoEstabelecimentos = true"
        >Ordenar por {{ordenacao}}</v-chip>
        <v-chip class="ma-2" v-if="tipoOrdenacao == 'asc'" @click="tipoOrdenacao = 'desc'">
          <v-icon>mdi-sort-ascending</v-icon>
        </v-chip>
        <v-chip class="ma-2" v-if="tipoOrdenacao == 'desc'" @click="tipoOrdenacao = 'asc'">
          <v-icon>mdi-sort-descending</v-icon>
        </v-chip>
        <div class="d-sm-flex d-md-inline-flex flex-wrap"></div>
      </v-tab-item>
      <v-tab-item>
        <v-chip class="ma-2" @click="mostrarPopupOrdenacaoProdutos = true">Ordenar por {{ordenacao}}</v-chip>
        <v-chip class="ma-2" v-if="tipoOrdenacao == 'asc'" @click="tipoOrdenacao = 'desc'">
          <v-icon>mdi-sort-ascending</v-icon>
        </v-chip>
        <v-chip class="ma-2" v-if="tipoOrdenacao == 'desc'" @click="tipoOrdenacao = 'asc'">
          <v-icon>mdi-sort-descending</v-icon>
        </v-chip>
        <div class="d-sm-flex d-md-inline-flex flex-wrap">
          <CardProduto
            v-for="produto in produtos"
            :key="produto.id"
            :produto="produto"
            @abrir-imagem-dialog="abrirDialogImagem"
          />
        </div>
      </v-tab-item>
    </v-tabs-items>
    <v-dialog v-model="mostrarPopupOrdenacaoEstabelecimentos" width="500">
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
          <v-btn color="primary" text @click="mostrarPopupOrdenacaoEstabelecimentos = false">Ordenar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
          <v-btn color="primary" text @click="mostrarPopupOrdenacaoProdutos = false">Ordenar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CardProduto from "./CardProduto";
import CardEstabelecimento from "./CardEstabelecimento";

export default {
  name: "Busca",
  data() {
    return {
      abas: [
        {
          id: 1,
          nome: "Estabelecimentos"
        },
        {
          id: 2,
          nome: "Produtos"
        }
      ],
      abaSelecionada: 0,
      mostrarPopupOrdenacaoEstabelecimentos: false,
      mostrarPopupOrdenacaoProdutos: false,
      ordenacao: "",
      tipoOrdenacao: "asc"
    };
  },

  components: {
    CardProduto,
    CardEstabelecimento
  },

  computed: {
    ...mapState("Busca", ["estabelecimentos", "produtos"]),

    id() {
      return this.$route.params.id;
    }
  }
};
</script>

<style scoped>
</style>