<template>
  <v-container fluid height="100%" class="pa-0 editar-feira" :key="chaveComponente">
    <v-tabs background-color="light-green darken-3" dark>
      <v-tab @click="redesenhar" v-for="feira in feiras" :key="feira.id" :to="`/gerenciar-feiras/${feira.id}`" exact>{{ feira.nome }}</v-tab>
      <v-tab @click="adicionarFeira">
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-tab>
    </v-tabs>
    <router-view @redesenhar="redesenhar"></router-view>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "GerenciarFeiras",
  data() {
    return {
      chaveComponente: 0
    };
  },

  computed: {
    ...mapState("Usuarios", ["usuario"]),

    ...mapState("Feiras", ["feiras"]),
  },

  created() {
    this.getFeirasDoOrganizador(this.usuario.id);
  },

  methods: {
    ...mapActions("Feiras", ["cadastrarFeira", "getFeirasDoOrganizador"]),

    async redesenhar() {
      await this.getFeirasDoOrganizador(this.usuario.id);

      this.chaveComponente += 1;
    },

    async adicionarFeira() {
      const feira = {
        nome: 'Nova Feira',
        usuario: {
          id: this.usuario.id
        }
      }

      await this.cadastrarFeira(feira);

      await this.getFeirasDoOrganizador(this.usuario.id);
    }
  }
};
</script>

<style scoped>
.editar-feira {
    height: 100%;
}
</style>