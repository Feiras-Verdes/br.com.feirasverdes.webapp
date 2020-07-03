<template>
  <v-card class="ma-3 flex-sm-grow-1"  width="355px" @click="irParaEstande">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title v-text="produto.nome"></v-card-title>

        <v-card-subtitle
          v-text="`${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}/${produto.unidade}`"
        ></v-card-subtitle>

        <v-card-text v-text="produto.descricao"></v-card-text>
      </div>

      <v-avatar size="120" tile>
        <v-img v-if="produto.imagem" :src="produto.imagem" @click="abrirDialogImagem(produto.imagem)"></v-img>
        <v-img v-else src="../assets/icone-produto.png"></v-img>
      </v-avatar>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CardProduto",
  
  props: {
    produto: {
      type: Object,
      required: true
    }
  },

  methods: {
    abrirDialogImagem(imagem) {
      this.$emit("abrir-imagem-dialog", imagem);
    },
    irParaEstande(){
      this.$router.push({path:`/estandes/${this.produto.estande.id}`})
    }
  }
};
</script>

<style scoped>
</style>