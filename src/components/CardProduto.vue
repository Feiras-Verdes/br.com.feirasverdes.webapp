<template>
  <v-card class="ma-3" width="355px" @click="irParaEstande">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title>
          <div v-if="!editar">{{ produto.nome }}</div>

          <v-text-field
            v-if="editar"
            label="Nome"
            color="light-green darken-3"
            v-model="nome"
            prepend-icon="mdi-alphabetical-variant"
            outlined
            :rules="[regras.obrigatorio]"
          ></v-text-field>
        </v-card-title>

        <v-card-subtitle>
          <div
            v-if="!editar"
          >{{ `${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}/${produto.unidade}` }}</div>

          <v-row v-if="editar">
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
              <v-text-field label="Unidade" outlined color="light-green darken-3" v-model="unidade"></v-text-field>
            </v-col>
          </v-row>
        </v-card-subtitle>

        <v-card-text>
          <div v-if="!editar">{{ produto.descricao }}</div>

          <v-text-field
            v-if="editar"
            label="Descrição"
            prepend-icon="mdi-newspaper"
            outlined
            color="light-green darken-3"
            v-model="descricao"
          ></v-text-field>

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
              @click:clear.stop="imagemUrl = null"
            >
              <template v-slot:selection="{ text }">
                <v-chip small label color="light-green darken-3" text-color="white">{{ text }}</v-chip>
              </template>
            </v-file-input>
          </template>
        </v-card-text>
      </div>

      <v-avatar size="120" tile>
        <v-img
          v-if="editar == false && produto.imagem"
          :src="produto.imagem"
        ></v-img>
        <v-img
          v-else-if="editar && imagemUrl"
          :src="imagemUrl"
        ></v-img>
        <v-img v-else src="../assets/icone-produto.png"></v-img>
      </v-avatar>
    </div>

    <v-card-actions v-if="podeEditar">
      <a
        v-if="editar"
        class="subtitle-1 link-excluir"
        @click.stop="confirmarExclusao = true"
      >Excluir Notícia</a>
      <v-spacer></v-spacer>
      <v-icon v-if="!editar" @click.stop="editar = true">mdi-pencil</v-icon>

      <v-btn
        v-if="editar"
        class="white--text"
        outlined
        color="light-green darken-3"
        @click.stop="cancelar"
      >Cancelar</v-btn>
      <v-btn
        v-if="editar"
        :loading="carregando"
        class="white--text"
        color="light-green darken-3"
        @click.stop="salvar"
      >Salvar</v-btn>
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
            @click.stop="confirmarExclusao = false"
          >Cancelar</v-btn>
          <v-btn
            class="white--text"
            color="light-green darken-3"
            :loading="carregando"
            @click.stop="excluir"
          >Excluir Feira</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CardProduto",

  data() {
    return {
      editar: false,
      confirmarExclusao: false,
      nome: "",
      descricao: "",
      preco: "",
      unidade: "",
      imagem: null,
      imagemUrl: null,
      regras: {
        obrigatorio: valor => (valor && !!valor.trim()) || "Obrigatório"
      },
      carregando: false
    };
  },

  props: {
    produto: {
      type: Object,
      required: true
    },

    podeEditar: {
      type: Boolean,
      default: false
    }
  },

  created() {
    this.nome = this.produto.nome;
    this.descricao = this.produto.descricao;
    this.preco = this.produto.preco;
    this.unidade = this.produto.unidade;
    this.imagemUrl = this.produto.imagem;
  },

  methods: {
    ...mapActions("Estandes", ["excluirProduto", "atualizarProduto"]),

    abrirDialogImagem(imagem) {
      this.$emit("abrir-imagem-dialog", imagem);
    },

    async salvar() {
      this.carregando = true;
      let formData = new FormData();

      if (this.imagem) {
        formData.append("imagem", this.imagem);
      }

      formData.append("nome", this.nome);
      formData.append("preco", this.preco);
      formData.append("descricao", this.descricao);
      formData.append("unidade", this.unidade);
      formData.append("idEstande", this.produto.estande.id);

      this.atualizarProduto({ formData });

      this.carregando = false;
    },

    async excluir() {
      this.carregando = true;
      await this.excluirProduto(this.noticia.id);

      this.carregando = false;
      this.confirmarExclusao = false;
    },

    cancelar() {
      this.editar = false;
    },

    mostrarImagem() {
      this.imagemUrl = window.URL.createObjectURL(this.imagem);
    },

    irParaEstande() {
      if (!this.podeEditar) {
        this.$router.push({ path: `/estandes/${this.produto.estande.id}` });
      }
    }
  }
};
</script>

<style scoped>
.link-excluir {
  color: red;
}
</style>