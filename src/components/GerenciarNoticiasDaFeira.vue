<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="card-nova-noticia">
        <v-card>
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-card-text>
              <div class="d-sm-inline-flex imagem">
                <div class="mb-3">
                  <v-img v-if="imagemUrl" :src="imagemUrl" height="120" width="120"></v-img>
                  <v-icon left size="120" v-else color="light-green darken-3">mdi-image</v-icon>
                </div>
                <div class="flex-grow-1 align-self-end">
                  <template>
                    <v-file-input
                      accept="image/*"
                      placeholder="Selecione sua imagem"
                      prepend-icon="mdi-image"
                      label="Imagem"
                      outlined
                      v-model="imagem"
                      color="light-green darken-3"
                      @change="mostrarImagem"
                      @click:clear="imagemUrl = null"
                    >
                      <template v-slot:selection="{ text }">
                        <v-chip
                          small
                          label
                          color="light-green darken-3"
                          text-color="white"
                        >{{ text }}</v-chip>
                      </template>
                    </v-file-input>
                  </template>
                </div>
              </div>
              <v-text-field
                label="Título"
                outlined
                color="light-green darken-3"
                prepend-icon="mdi-format-title"
                v-model="titulo"
                :rules="[regras.obrigatorio]"
              ></v-text-field>
              <v-text-field
                label="Notícia"
                prepend-icon="mdi-newspaper"
                outlined
                color="light-green darken-3"
                v-model="descricao"
                :rules="[regras.obrigatorio]"
              ></v-text-field>
            </v-card-text>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="white--text" outlined color="light-green darken-3" @click="limpar">Limpar</v-btn>
            <v-btn class="white--text" color="light-green darken-3" @click="salvar">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <CardNoticia v-for="noticia in noticias" :key="noticia.id" :noticia="noticia" :podeEditar="true" />
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CardNoticia from "./CardNoticia";

export default {
  name: "GerenciarNoticiasDaFeira",

  components: {
    CardNoticia
  },

  data() {
    return {
      imagemUrl: null,
      imagem: null,
      titulo: "",
      descricao: "",
      regras: {
        obrigatorio: valor => (valor && !!valor.trim()) || "Obrigatório"
      }
    };
  },

  props: {
    idFeira: {
      required: false
    }
  },

  async created() {
    await this.getNoticiasDeFeira(this.idFeira);
  },

  computed: {
    ...mapState("Feiras", ["noticias"])
  },

  methods: {
    ...mapActions("Feiras", ["getNoticiasDeFeira"]),

    mostrarImagem() {
      this.imagemUrl = window.URL.createObjectURL(this.imagem);
    },

    salvar() {},

    limpar() {}
  }
};
</script>

<style scoped>
.imagem {
  width: 100%;
}
</style>