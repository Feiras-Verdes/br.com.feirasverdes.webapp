<template>
  <v-data-table
    :headers="headers"
    :items="estandes"
    sort-by="nome"
    :loading="loading"
    :search="pesquisar"
    loading-text="Carregando..."
    hide-default-footer
    class="elevation-1"
    color="light-green darken-3"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-text-field
          v-model="pesquisar"
          append-icon="mdi-magnify"
          label="Pesquisar"
          single-line
          hide-details
          color="light-green darken-3"
        ></v-text-field>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon color="light-green darken-3" small @click="removerEstande(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "GerenciarEstandesDeFeira",
  data() {
    return {
      headers: [
        {
          text: "Nome",
          align: "start",
          value: "nome"
        },
        { text: "Dono", value: "usuario.nome" },
        { text: "Contato", value: "contato" },
        { text: "Horário de Início", value: "horaInicio" },
        { text: "Horário de Fim", value: "horaFim" },
        { text: "Frequência", value: "frequencia" },
        { text: "Ações", value: "actions" }
      ],
      loading: true,
      pesquisar: ""
    };
  },

  props: {
    idFeira: {
      required: true
    }
  },

  computed: {
      ...mapState("Feiras", ["estandes"])
  },

  async created() {
    await this.getEstandesDeFeira(this.idFeira);
    this.loading = false;   
  },

  methods: {
      ...mapActions("Feiras", ["getEstandesDeFeira", "removerEstandeDeFeira"]),

      async removerEstande(estande) {
          await this.removerEstandeDeFeira(this.idFeira, estande.id);
      }
  }
};
</script>

<style scoped>
</style>