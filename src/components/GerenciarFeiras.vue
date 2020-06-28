<template>
  <v-container fluid height="100%" class="pa-0 editar-feira">
    <v-tabs background-color="light-green darken-3" dark>
      <v-tab v-for="feira in feiras" :key="feira.id" :to="`${feira.id}`" exact>{{ feira.nome }}</v-tab>
      <v-tab @click="adicionarFeira">
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-tab>
    </v-tabs>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  name: "GerenciarFeiras",
  data() {
    return {
      feiras: []
    };
  },

  methods: {
    adicionarFeira() {
      this.feiras.push({
        id: this.feiras.length + 1,
        nome: "Nova Feira"
      });

      this.$router.push(`/gerenciar-feira/${this.feiras.length}`);
    },

    excluirFeira(id) {
        this.feiras.splice(id - 1, 1);
    }
  }
};
</script>

<style scoped>
.editar-feira {
    height: 100%;
}
</style>