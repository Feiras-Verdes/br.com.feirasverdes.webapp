<template>
  <v-container fluid>
    <v-row>
      <v-col sm="12" md="12" lg="12">
        <v-row justify="center">
          <v-col sm="6" md="6" lg="6">
            <v-avatar class="avatar-feira" size="140">
              <v-img v-if="feira.imagem" :src="feira.imagem" @click.stop="abrirDialogImagem(feira.imagem)"></v-img>
              <v-img v-else src="../assets/icone-feira.png"></v-img>
            </v-avatar>
          </v-col>
        </v-row>
        <v-row>
          <div class="d-md-flex d-lg-inline-flex justify-space-around informacoes">
            <div class="nome pa-2">{{ feira.nome }}</div>
            <v-rating
              v-model="feira.avaliacao"
              class="avaliacao pa-2"
              color="yellow darken-3"
              background-color="yellow darken-3"
              full-icon="mdi-star"
              half-icon="mdi-star-half"
              empty-icon="mdi-star-outline"
              :readonly="!usuario"
              hover
              half-increments
              dense
              @input="avaliarFeira"
            ></v-rating>
          </div>
          <div class="d-md-flex d-lg-inline-flex justify-space-around informacoes">
            <div class="contato pa-2">{{ feira.contato }}</div>
            <div
              v-if="feira.endereco"
              class="endereco pa-2"
            >{{ `${feira.endereco.logradouro}, nº ${feira.endereco.numero} - ${feira.endereco.cidade}, ${feira.endereco.estado}` }}</div>
          </div>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="12" lg="12">
        <v-tabs v-model="aba" background-color="light-green darken-3" dark centered grow>
          <v-tabs-slider></v-tabs-slider>

          <v-tab>Notícias</v-tab>

          <v-tab>Estandes</v-tab>
        </v-tabs>

        <v-tabs-items v-model="aba">
          <v-tab-item>
            <div class="d-sm-flex d-md-inline-flex flex-wrap">
              <CardNoticia v-for="noticia in noticias" :key="noticia.id" :noticia="noticia" @abrir-imagem-dialog="abrirDialogImagem"/>
              <!-- <v-card
                class="ma-3 flex-grow-1"
                outlined
                v-for="noticia in noticias"
                :key="noticia.id"
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
              </v-card> -->
            </div>
          </v-tab-item>

          <v-tab-item>
            <div class="d-sm-flex d-md-inline-flex flex-wrap">
							<CardEstande v-for="estande in estandes" :key="estande.id" :estande="estande" @abrir-imagem-dialog="abrirDialogImagem"/>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CardEstande from "./CardEstande";
import CardNoticia from "./CardNoticia";

export default {
  name: "Feira",
  data() {
    return {
      aba: 0
    };
  },

  components: {
    CardEstande,
    CardNoticia
  },

  computed: {
    ...mapState("Feiras", ["feira", "noticias", "estandes"]),

    ...mapState("Usuarios", ["usuario"]),

    id() {
      return this.$route.params.id;
    }
  },

  async created() {
    await this.getFeira(this.id);
    await this.getEstandesDeFeira(this.id);
    await this.getNoticiasDeFeira(this.id);
    // if (this.usuario) {
    //     await this.getAvaliacaoDoUsuario(this.id, this.usuario.id);
    // }
  },

  methods: {
    ...mapActions("Feiras", [
      "getFeira",
      "getEstandesDeFeira",
      "getNoticiasDeFeira",
      "getAvaliacaoDoUsuario",
      "actionAvaliarFeira"
    ]),

    avaliarFeira(nota) {
      this.actionAvaliarFeira({
        idUsuario: this.usuario.id,
        idFeira: this.id,
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

.avatar-feira {
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