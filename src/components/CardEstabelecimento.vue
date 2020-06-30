<template>
  <v-card class="ma-3" @click="irParaEstabelecimento">
    <div class="d-flex flex-wrap">
      <v-avatar size="120">
        <v-img
          v-if="estabelecimento.imagem"
          :src="estabelecimento.imagem"
          @click.stop="abrirDialogImagem(estabelecimento.imagem)"
        ></v-img>
        <v-img v-else src="../assets/icone-feira.png"></v-img>
      </v-avatar>
      <div>
        <v-card-title v-text="estabelecimento.nome"></v-card-title>
        <v-card-subtitle>
          <v-rating
            v-model="estabelecimento.nota"
            color="yellow darken-3"
            background-color="yellow darken-3"
            full-icon="mdi-star"
            half-icon="mdi-star-half"
            empty-icon="mdi-star-outline"
            readonly
            half-increments
            dense
          ></v-rating>
        </v-card-subtitle>

        <v-card-text class="d-flex d-md-inline-flex justify-space-around">
          <p
            class="mx-3"
          >{{`Endereço: ${estabelecimento.endereco.logradouro}, nº ${estabelecimento.endereco.numero} - ${estabelecimento.endereco.cidade}, ${estabelecimento.endereco.estado}`}}</p>
          <p class="d-none d-sm-block">-</p>
          <p class="mx-3">{{`Contato: ${estabelecimento.contato}`}}</p>
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CardEstabelecimento",

  props: {
    estande: {
      type: Object,
      required: true
    }
  },

  methods: {
    abrirDialogImagem(imagem) {
      this.$emit("abrir-imagem-dialog", imagem);
    },

    irParaEstabelecimento() {
      if (estabelecimento.tipo == "estande") {
        this.$router.push({ path: `/estandes/${this.estabelecimento.id}` });
      } else {
        this.$router.push({ path: `/feiras/${this.estabelecimento.id}` });
      }
    }
  }
};
</script>

<style scoped>
</style>