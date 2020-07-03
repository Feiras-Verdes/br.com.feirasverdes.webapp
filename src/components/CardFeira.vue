<template>
  <v-card class="ma-3" @click="irParaFeira" width="355px">
    <div class="d-flex flex-wrap">
      <div>
        <div class="d-inline-flex justify-space-between">
          <v-avatar size="120">
            <v-img
              v-if="feira.imagem"
              :src="feira.imagem"
              @click.stop="abrirDialogImagem(feira.imagem)"
            ></v-img>
            <v-img v-else src="../assets/icone-feira.png"></v-img>
          </v-avatar>
          <v-spacer></v-spacer>
          <div>
            <v-card-title v-text="feira.nome"></v-card-title>
            <v-card-subtitle>
              <v-rating
                v-model="feira.avaliacao"
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
              <v-icon color="black">mdi-map-marker</v-icon>
              <div>{{`${feira.endereco.logradouro}, nº ${feira.endereco.numero} - ${feira.endereco.cidade}, ${feira.endereco.estado}`}}</div>
            </v-card-text>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CardFeira",

  props: {
    feira: {
      type: Object,
      required: true
    }
  },

  methods: {
    abrirDialogImagem(imagem) {
      this.$emit("abrir-imagem-dialog", imagem);
    },

    irParaFeira() {
      this.$router.push({ path: `/feiras/${this.feira.id}` });
    }
  }
};
</script>

<style scoped>
.endereco {
  padding-top: 5px;
}
</style>