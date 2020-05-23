<template>
  <v-container fluid>
    <v-row class="row-carrossel" justify="center">
      <v-carousel height="300" interval="15000" cycle hide-delimiter-background show-arrows-on-hover class="carrossel">
        <v-carousel-item
          v-for="(itemCarrossel, i) in imagensCarrossel"
          :key="i"
          :src="itemCarrossel.src"
        >
        </v-carousel-item>
      </v-carousel>
    </v-row>
    
    <v-row class="d-flex flex-no-wrap justify-space-around">
      <v-col sm="12" md="6" lg="6">
        <div class="titulo">Notícias</div>
        <v-divider class="divisor"></v-divider>
        <v-card class="mx-auto" outlined v-for="noticia in ultimasNoticias" :key="noticia.id">
          <v-img v-if="noticia.imagem" height="150px" :src="noticia.imagem" @click="abrirDialogImagem(noticia.imagem)"></v-img>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" v-text=" noticia.titulo"></v-card-title>
              <v-card-subtitle class="autor-noticia" v-text="noticia.autor"></v-card-subtitle>
              <v-card-text class="descricao-noticia">{{ noticia.descricao }}</v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
      
      <v-col sm="12" md="6" lg="6">
        <div class="titulo">Feiras</div>
        <v-divider class="divisor"></v-divider>
         <v-list three-line>
          <template v-for="feira in melhoresFeiras">
            <v-list-item class="mx-auto" @click="irParaFeira(feira.id)" :key="feira.id">
              <v-spacer class="d-none d-sm-block"/>
              <v-list-item-content>
                <v-list-item-title v-html="feira.nome"></v-list-item-title>
                <v-list-item-subtitle v-text="`${feira.endereco.rua}, nº ${feira.endereco.numero} - ${feira.endereco.cidade}, ${feira.endereco.estado}`"></v-list-item-subtitle>
              </v-list-item-content>
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
              <v-spacer class="d-none d-sm-block"/>
            </v-list-item>
          </template>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "Home",
  data() {
    return {
      imagensCarrossel: [
        {
          src: require("@/assets/banner-feira.jpg"),
          ação: ""
        },
        {
          src: require("@/assets/banner-feira2.jpg"),
          ação: ""
        }
      ],
      imagemDialog: false,
      imagemDialogSrc: ""
    };
  },

  computed: {
    ...mapState("Feiras", ["melhoresFeiras", "ultimasNoticias"])
  },

  async created() {
    await this.getMelhoresFeiras();
    await this.getUltimasNoticias();
  },

  async mounted() {
    
  },

  methods: {
    ...mapActions("Feiras", ["getMelhoresFeiras", "getUltimasNoticias"]),

    ...mapActions("Imagem", ["setImagemDialog", "setImagemDialogSrc"]),

    abrirDialogImagem(imagem) {
      this.$emit("abrir-imagem-dialog", imagem)
    },

    irParaFeira(id) {
      this.$router.push({ path: `/feiras/${id}`})
    }
  }
};
</script>

<style scoped>
.carrossel {
  height: 45% !important;
  padding: 0 12px;
}

.card-noticia {
  margin: 10px;
}

.divisor {
  margin: 12px 0;
  background-color: #558b2f;
}

.titulo {
  font-size: 2em;
  color: #558b2f;
  text-align: center; 
  font-family: "Roboto", sans-serif;
}
/* 
.imagem-dialog{
  height: 500px;
} */
</style>