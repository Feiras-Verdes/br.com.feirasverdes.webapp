<template>
  <v-container fluid>
    <v-row>
      <v-col sm="12" md="12" lg="12">
        <v-row justify="center">
          <v-col sm="6" md="6" lg="6">
            <v-avatar class="avatar-estande" size="140">
              <v-img v-if="estande.imagem" :src="estande.imagem" @click.stop="abrirDialogImagem(estande.imagem)"></v-img>
              <v-img v-else src="../assets/icone-feira.png"></v-img>
            </v-avatar>
          </v-col>
        </v-row>
        <v-row>
          <div class="d-md-flex d-lg-inline-flex justify-space-around informacoes">
            <div class="nome pa-2">{{ estande.nome }}</div>
            <v-rating
              v-model="estande.avaliacao"
              class="avaliacao pa-2"
              color="yellow darken-3"
              background-color="yellow darken-3"
              full-icon="mdi-star"
              half-icon="mdi-star-half"
              empty-icon="mdi-star-outline"
              :readonly="podeAvaliar"
              hover
              half-increments
              dense
              @input="avaliarEstande"
            ></v-rating>
          </div>
          <div class="d-md-flex d-lg-inline-flex justify-space-around informacoes">
            <div class="contato pa-2">{{ estande.contato }}</div>
            <div
              v-if="estande.endereco"
              class="endereco pa-2"
            >{{ `${estande.endereco.logradouro}, nº ${estande.endereco.numero} - ${estande.endereco.cidade}, ${estande.endereco.estado}` }}</div>
          </div>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="12" lg="12">
        <v-tabs v-model="aba" background-color="light-green darken-3" dark centered grow>
          <v-tabs-slider></v-tabs-slider>

          <v-tab>Notícias</v-tab>

          <v-tab>Produtos</v-tab>
        </v-tabs>

        <v-tabs-items v-model="aba">
          <v-tab-item>
            <div class="d-sm-flex d-md-inline-flex flex-wrap">
              <CardNoticia v-for="noticia in noticias" :key="noticia.id" :noticia="noticia" @abrir-imagem-dialog="abrirDialogImagem"/>
            </div>
          </v-tab-item>

          <v-tab-item>
            <div class="d-sm-flex d-md-inline-flex flex-wrap">
              <CardProduto v-for="produto in produtos" 
							:key="produto.id" 
							:produto="produto" 
							@abrir-imagem-dialog="abrirDialogImagem"/>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CardProduto from "./CardProduto";
import CardNoticia from "./CardNoticia";

export default {
  name: "Estande",
  data() {
    return {
      aba: 0
    };
  },

  components: {
    CardProduto,
    CardNoticia
  },

  computed: {
    ...mapState("Estandes", ["estande", "noticias", "produtos"]),

    ...mapState("Usuarios", ["usuario"]),

    id() {
      return this.$route.params.id;
    },

    podeAvaliar() {
      return this.usuario == null || this.usuario.tipoUsuario.descricao != "CONSUMIDOR";
    }
  },

  async created() {
    await this.getEstande(this.id);
    await this.getProdutosDeEstande(this.id);
    await this.getNoticiasDeEstande(this.id);
    // if (this.usuario) {
    //     await this.getAvaliacaoDoUsuario(this.id, this.usuario.id);
    // }
  },

  methods: {
    ...mapActions("Estandes", [
      "getEstande",
      "getProdutosDeEstande",
      "getNoticiasDeEstande",
      "getAvaliacaoDoUsuario",
      "actionAvaliarEstande"
    ]),

    avaliarEstande(nota) {
      this.actionAvaliarEstande({
        idUsuario: this.usuario.id,
        idEstande: this.id,
        nota
      });
    },

    abrirDialogImagem(imagem) {
      this.$emit("abrir-imagem-dialog", imagem);
    }
  }
};
</script>

<style scoped>
.nome {
  color: #558b2f;
  font-size: 1.2em;
  font-family: "Roboto", sans-serif;
  margin: 0 auto;
  width: fit-content;
}

.avaliacao {
  margin: 0 auto;
  width: fit-content;
}

.contato {
  font-family: "Roboto", sans-serif;
  margin: 0 auto;
  width: fit-content;
}

.endereco {
  font-family: "Roboto", sans-serif;
  margin: 0 auto;
  width: fit-content;
}

.avatar-estande {
  margin: 0 auto;
  display: flex;
}

.linha {
  width: 100%;
}

.informacoes {
  width: 50%;
}
</style>