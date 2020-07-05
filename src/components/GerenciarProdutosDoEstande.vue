<template>
  <v-container>
    <v-card>
      <div class="d-flex flex-no-wrap justify-space-between">
        <div class="flex-grow-1">
          <v-card-text>
            <div class="d-sm-inline-flex">
              <div class="flex-grow-1 align-self-end"></div>
            </div>
            <v-text-field
              label="Nome"
              outlined
              color="light-green darken-3"
              prepend-icon="mdi-format-title"
              v-model="nome"
              :rules="[regras.obrigatorio]"
            ></v-text-field>
            <v-row>
              <v-col sm="12" md="6">
                <v-text-field
                  label="Preço"
                  prepend-icon="mdi-currency-usd"
                  outlined
                  color="light-green darken-3"
                  v-model="preco"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col sm="12" md="6">
                <v-combobox
                  label="Unidade"
                  :items="listaUnidades"
                  outlined
                  color="light-green darken-3"
                  v-model="unidade"
                ></v-combobox>
              </v-col>
            </v-row>
            <v-text-field
              label="Descrição"
              prepend-icon="mdi-newspaper"
              outlined
              color="light-green darken-3"
              v-model="descricao"
            ></v-text-field>
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
                  <v-chip small label color="light-green darken-3" text-color="white">{{ text }}</v-chip>
                </template>
              </v-file-input>
            </template>
          </v-card-text>
        </div>

        <v-avatar v-if="imagemUrl" size="120" tile>
          <v-img height="150px" :src="imagemUrl" @click="abrirDialogImagem(imagem)"></v-img>
        </v-avatar>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="white--text" outlined color="light-green darken-3" @click="limpar">Limpar</v-btn>
        <v-btn
          class="white--text"
          color="light-green darken-3"
          :loading="carregando"
          @click="salvar"
        >Salvar</v-btn>
      </v-card-actions>
    </v-card>
    <div class="d-flex flex-wrap sm-justify-center md-justify-start">
      <CardProduto
        v-for="produto in produtos"
        :key="produto.id"
        :produto="produto"
        :podeEditar="true"
      />
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CardProduto from "./CardProduto";

export default {
  name: "GerenciarProdutosDoEstande",

  components: {
    CardProduto
  },

  data() {
    return {
      imagemUrl: null,
      imagem: null,
      nome: "",
      descricao: "",
      preco: "",
      unidade: "unidade",
      regras: {
        obrigatorio: valor => (valor && !!valor.trim()) || "Obrigatório"
      },
      carregando: false,
      listaUnidades: ["unidade", "kg", "100g", "litro", "100ml"]
    };
  },

  props: {
    idEstande: {
      required: false
    }
  },

  computed: {
    ...mapState("Estandes", ["produtos"])
  },

  async created() {
    await this.getProdutosDeEstande(this.idEstande);
  },

  methods: {
    ...mapActions("Estandes", [
      "getProdutosDeEstande",
      "cadastrarProduto",
      "excluirProduto",
      "salvarProduto"
    ]),

    mostrarImagem() {
      this.imagemUrl = window.URL.createObjectURL(this.imagem);
    },

    salvar() {},

    limpar() {
      this.nome = "";
      this.descricao = "";
      this.preco = "";
      this.unidade = "";
      this.imagem = null;
      this.imagemUrl = null;
    }
  }
};
</script>

<style scoped>
.imagem {
  width: 100%;
}
</style>