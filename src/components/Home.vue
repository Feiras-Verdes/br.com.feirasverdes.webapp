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
        <CardNoticia v-for="noticia in noticias" :key="noticia.id" :noticia="noticia" @abrir-imagem-dialog="abrirDialogImagem"/>
      </v-col>
      
      <v-col sm="12" md="6" lg="6">
        <div class="titulo">Feiras</div>
        <v-divider class="divisor"></v-divider>
        <CardFeira v-for="feira in feiras" :key="feira.id" :feira="feira" @abrir-imagem-dialog="abrirDialogImagem"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CardFeira from './CardFeira';
import CardNoticia from './CardNoticia';

export default {
  name: "Home",

  components: {
    CardFeira,
    CardNoticia
  },

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
    ...mapState("Feiras", ["feiras", "noticias"])
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