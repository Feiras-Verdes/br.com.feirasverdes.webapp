<template>
  <v-card class="ma-3" @click="irParaEstande"  width="355px">
    <div class="d-flex flex-wrap">
      <div>
        <div class="d-inline-flex justify-space-between">
          <v-avatar size="120">
            <v-img
              v-if="estande.imagem"
              :src="estande.imagem"
              @click.stop="abrirDialogImagem(estande.imagem)"
            ></v-img>
            <v-img v-else src="../assets/icone-feira.png"></v-img>
          </v-avatar>
          <div>
            <v-card-title v-text="estande.nome"></v-card-title>
            <v-card-subtitle>
              <v-rating
                v-model="estande.avaliacao"
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

            <v-card-text v-if="estande.endereco" class="d-flex d-md-inline-flex justify-space-around">
              <v-icon color="black">mdi-map-marker</v-icon>
              <div class="endereco">{{`${estande.endereco.logradouro}, nº${estande.endereco.numero} - ${estande.endereco.cidade}, ${estande.endereco.estado}`}}</div>
            </v-card-text>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CardEstande",

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

    irParaEstande() {
      this.$router.push({ path: `/estandes/${this.estande.id}` });
    }
  }
};
</script>

<style scoped>
.endereco {
  padding-top: 5px;
}
</style>