<template>
  <v-container fluid height="100%" class="pa-0 editar-feira">
    <v-tabs background-color="light-green darken-3" dark>
      <v-tab v-for="feira in feiras" :key="feira.id" :to="`/gerenciar-feiras/${feira.id}`" exact>{{ feira.nome }}</v-tab>
      <v-tab @click="adicionarFeira">
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-tab>
    </v-tabs>
    <router-view @feira-excluida="getFeirasDoOrganizador(usuario.id)"></router-view>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "GerenciarFeiras",
  data() {
    return {
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

    async adicionarFeira() {
      const feira = {
        nome: 'Nova Feira',
        usuario: {
          id: this.usuario.id
        }
      }

      await this.cadastrarFeira(feira);

      await this.getFeirasDoOrganizador(this.usuario.id);
      
      // this.$router.push(`/gerenciar-feira/${this.feiras[this.feiras.length].id}`);
    }
  }
};
</script>

<style scoped>
.editar-feira {
    height: 100%;
}
</style>