<template>
    <v-card
    class="ma-3 flex-grow-1"
    >
    <v-img
        v-if="noticia.imagem"
        height="150px"
        :src="noticia.imagem"
        @click="abrirDialogImagem(noticia.imagem)"
    ></v-img>
    <div class="d-flex flex-no-wrap justify-space-between">
        <div>
        <v-card-title class="headline" v-text=" noticia.titulo"></v-card-title>
        <v-card-subtitle class="autor-noticia" v-text="noticia.autor"></v-card-subtitle>
        <v-card-text class="descricao-noticia">{{ noticia.descricao }}</v-card-text>
        </div>
    </div>
    </v-card>
</template>

<script>
export default {
    name: "CardNoticia",

    props: {
        noticia : {
            type: Object,
            required: true
        }
    },

    methods: {
        abrirDialogImagem(imagem) {
            this.$emit("abrir-imagem-dialog", imagem);
        }
    }
}
</script>

<style scoped>

</style>