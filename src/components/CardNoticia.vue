<template>
  <v-card class="ma-3" width="355px">
    <v-img
      v-if="editar == false && noticia.imagem"
      height="150px"
      :src="noticia.imagem"
      @click="abrirDialogImagem(noticia.imagem)"
    ></v-img>
    <v-img
      v-if="editar && imagemUrl"
      height="150px"
      :src="imagemUrl"
      @click="abrirDialogImagem(imagem)"
    ></v-img>
    <template>
      <v-file-input
        v-if="editar"
        accept="image/*"
        placeholder="Selecione sua imagem"
        prepend-icon="mdi-image"
        label="Imagem"
        outlined
        v-model="imagem"
        color="light-green darken-3"
        @change="mostrarImagem"
        @click:clear="imagemUrl = null"
        class="mt-3 px-4"
      >
        <template v-slot:selection="{ text }">
          <v-chip small label color="light-green darken-3" text-color="white">{{ text }}</v-chip>
        </template>
      </v-file-input>
    </template>
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline">
          <div v-if="!editar">{{ noticia.titulo }}</div>

          <v-text-field
            v-if="editar"
            label="Título"
            color="light-green darken-3"
            v-model="titulo"
            prepend-icon="mdi-alphabetical-variant"
            outlined
          ></v-text-field>
        </v-card-title>
        <v-card-subtitle class="autor-noticia">
          <div v-if="!editar">{{ `${noticia.dataPublicacao} - ${autor}` }}</div>
        </v-card-subtitle>
        <v-card-text class="descricao-noticia">
          <div v-if="!editar">{{ noticia.descricao }}</div>

          <v-text-field
            v-if="editar"
            label="Notícia"
            prepend-icon="mdi-newspaper"
            outlined
            color="light-green darken-3"
            v-model="descricao"
            :rules="[regras.obrigatorio]"
          ></v-text-field>
        </v-card-text>
      </div>
    </div>

    <v-card-actions v-if="podeEditar">
      <a
        v-if="editar"
        class="subtitle-1 link-excluir"
        @click="confirmarExclusao = true"
      >Excluir Notícia</a>
      <v-spacer></v-spacer>
      <v-icon v-if="!editar" @click="editar = true">mdi-pencil</v-icon>

      <v-btn
        v-if="editar"
        class="white--text"
        outlined
        color="light-green darken-3"
        @click="cancelar"
      >Cancelar</v-btn>
      <v-btn v-if="editar" class="white--text" color="light-green darken-3" @click="salvar">Salvar</v-btn>
    </v-card-actions>

    <v-dialog v-model="confirmarExclusao" width="500">
      <v-card>
        <v-card-title>Deseja realmente excluir esta notícia?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            outlined
            color="light-green darken-3"
            @click="confirmarExclusao = false"
          >Cancelar</v-btn>
          <v-btn class="white--text" color="light-green darken-3" :loading="carregando" @click="excluir">Excluir Feira</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CardNoticia",

  data() {
    return {
      editar: false,
      titulo: "",
      descricao: "",
      imagem: null,
      imagemUrl: null,
      regras: {
        obrigatorio: valor => (valor && !!valor.trim()) || "Obrigatório"
      },
      confirmarExclusao: false,
      carregando: false
    };
  },

  props: {
    noticia: {
      type: Object,
      required: true
    },

    podeEditar: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    autor() {
      return this.noticia.feira ? this.noticia.feira.nome : this.noticia.estande ? this.noticia.estande.nome : "";
    }
  },

  created() {
    this.titulo = this.noticia.titulo;
    this.descricao = this.noticia.descricao;
    this.imagemUrl = this.noticia.imagem;
  },

  methods: {
    ...mapActions("Feiras", ["atualizarNoticia", "excluirNoticia"]),

    abrirDialogImagem(imagem) {
      this.$emit("abrir-imagem-dialog", imagem);
    },

    async salvar() {
      this.carregando = true;

      const formData = new FormData();
      if (this.imagem) {
        formData.append("imagem", this.imagem);
      }
      formData.append("titulo", this.titulo);
      formData.append("descricao", this.descricao);
      formData.append("idFeira", this.idFeira);
      await this.atualizarNoticia(formData)
    },

    async excluir() {
      this.carregando = true;
      await this.excluirNoticia(this.noticia.id);

      this.carregando = false;
      this.confirmarExclusao = false;
    },

    cancelar() {
      this.editar = false;
    },

    mostrarImagem() {
      this.imagemUrl = window.URL.createObjectURL(this.imagem);
    }
  }
};
</script>

<style scoped>
.link-excluir {
  color: red;
}
</style>