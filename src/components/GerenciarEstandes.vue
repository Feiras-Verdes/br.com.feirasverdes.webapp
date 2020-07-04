<template>
  <v-container fluid height="100%" class="pa-0 editar-estande">
    <v-tabs background-color="light-green darken-3" dark>
      <v-tab v-for="estande in estandes" :key="estande.id" :to="`/gerenciar-estandes/${estande.id}`" exact>{{ estande.nome }}</v-tab>
      <v-tab @click="adicionarEstande">
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-tab>
    </v-tabs>
    <router-view @estande-excluido="onEstandeExcluido"></router-view>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "GerenciarEstandes",

  data() {
    return {
    };
  },

  computed: {
    ...mapState("Usuarios", ["usuario"]),

    ...mapState("Estandes", ["estandes"]),
  },

  created() {
    this.getEstandesDoFeirante(this.usuario.id);
  },

  methods: {
    ...mapActions("Estandes", ["cadastrarEstande", "getEstandesDoFeirante"]),

    async adicionarEstande() {
      const estande = {
        nome: 'Novo Estande',
        usuario: {
          id: this.usuario.id
        }
      }

      await this.cadastrarEstande(estande);

      await this.getEstandesDoFeirante(this.usuario.id);
    },

    async onEstandeExcluido() {
      await this.getEstandesDoFeirante(usuario.id);
    }
  }
};
</script>

<style scoped>
.editar-estande {
    height: 100%;
}
</style>