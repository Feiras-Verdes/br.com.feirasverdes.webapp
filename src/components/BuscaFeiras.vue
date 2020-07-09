<template>
  <v-container fluid height="100%" class="pa-3">
    <v-row>
      <v-row>
        <div class="d-none d-sm-block busca pa-2">Buscando por</div>
        <div class="d-none d-sm-block nomeBusca py-2">{{ nome }}</div>
      </v-row>
      <div>
        <v-chip class="ma-2" @click="mostrarPopupOrdenacaoFeiras = true" v-if="ordenacao == 'nome'"
          >Ordenar por {{ ordenacao }}</v-chip
        >
        <v-chip class="ma-2" @click="mostrarPopupOrdenacaoFeiras = true" v-if="ordenacao == 'a.nota'"
          >Ordenar por avaliação</v-chip
        >
        <v-chip
          class="ma-2"
          v-if="tipoOrdenacao == 'asc'"
          @click="alterarTipoOrdenacao"
        >
          <v-icon>mdi-sort-ascending</v-icon>
        </v-chip>
        <v-chip
          class="ma-2"
          v-if="tipoOrdenacao == 'desc'"
          @click="alterarTipoOrdenacao"
        >
          <v-icon>mdi-sort-descending</v-icon>
        </v-chip>
      </div>
    </v-row>
    <v-row>
      <div class="d-sm-flex d-md-inline-flex flex-wrap justify-space-between">
        <div
          class="sm-justify-center md-justify-start d-md-inline-flex flex-wrap"
        >
          <CardFeira v-for="feira in feiras" :key="feira.id" :feira="feira" />
        </div>
      </div>
    </v-row>
    <v-dialog v-model="mostrarPopupOrdenacaoFeiras" width="500">
      <v-card>
        <v-card-title>Ordenação</v-card-title>
        <v-card-text>
          <v-radio-group class="pl-3" v-model="ordenacao">
            <v-radio
              label="Nome"
              value="nome"
              color="light-green darken-3"
            ></v-radio>
            <v-radio
              label="Avaliação"
              value="a.nota"
              color="light-green darken-3"
            ></v-radio>
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
      ordenacao: "nome",
      tipoOrdenacao: "asc",
    };
  },
  components: {
    CardFeira,
  },

  computed: {
    ...mapState("Busca", ["feiras", "nome"]),

    id() {
      return this.$route.params.id;
    },
  },

  watch: {
    nome: function ()  {
       this.getFeiras({nome: this.nome, ordenacao: this.ordenacao,tipoOrdenacao: this.tipoOrdenacao });
    }
  },

  created() {
    this.getFeiras({nome: this.nome, ordenacao: this.ordenacao,tipoOrdenacao: this.tipoOrdenacao });
  },
  methods: {
    ...mapActions("Busca", ["getFeiras", "setOrdenacao", "setTipoOrdenacao"]),

    ordenar() {
     this.getFeiras({nome: this.nome, ordenacao: this.ordenacao,tipoOrdenacao: this.tipoOrdenacao })
     this.mostrarPopupOrdenacaoFeiras = false;
    },
    alterarTipoOrdenacao() {
      if (this.tipoOrdenacao == "asc") {
        this.tipoOrdenacao = "desc";
      } else if (this.tipoOrdenacao == "desc") {
        this.tipoOrdenacao = "asc";
      }
      this.getFeiras({nome: this.nome, ordenacao: this.ordenacao,tipoOrdenacao: this.tipoOrdenacao });
    },
  },
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
