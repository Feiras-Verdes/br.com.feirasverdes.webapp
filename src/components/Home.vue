<template>
  <v-container fluid>
    <v-row class="row-carrossel" justify="center">
      <v-carousel cycle hide-delimiter-background show-arrows-on-hover class="carrossel">
        <v-carousel-item
          v-for="(itemCarrossel, i) in imagensCarrossel"
          :key="i"
          :src="itemCarrossel.src"
        >
          <v-img class="blurred-img" :src="itemCarrossel.src" />
        </v-carousel-item>
      </v-carousel>
    </v-row>
    <v-row class="d-flex flex-no-wrap justify-space-around">
      <v-col sm="12" md="5" lg="5">
        <div class="noticias-titulo">Notícias</div>
        <v-card class="mx-auto" outlined v-for="noticia in noticias" :key="noticia.id">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" v-text=" noticia.titulo"></v-card-title>
              <v-card-subtitle class="autor-noticia" v-text="noticia.autor"></v-card-subtitle>
              <v-card-text class="descricao-noticia">{{ noticia.descricao }}</v-card-text>
            </div>
            <v-avatar v-if="noticia.imagem" class="ma-3" size="150" tile>
              <v-img :src="noticia.imagem"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
      
      <v-col sm="12" md="5" lg="5">
        <div class="feiras-titulo">Feiras</div>
         <v-list three-line>
          <template v-for="feira in melhoresFeiras">
            <v-list-item @click="" :key="feira.id">
              <v-list-item-content>
                <v-list-item-title v-html="feira.nome"></v-list-item-title>
                <v-list-item-subtitle v-text="`${feira.endereco.rua}, nº ${feira.endereco.numero} - ${feira.endereco.cidade}, ${feira.endereco.estado}`"></v-list-item-subtitle>
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
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
      noticias: [
        {
          id: 1,
          autor: "Lucas",
          imagem: require("@/assets/banner-feira3.jpg"),
          titulo: "Chegaram os produtos!",
          descricao: "Chegaram couves e abóboras!"
        },
        {
          id: 2,
          autor: "Natália",
          imagem: "",
          titulo: "Não abrirei hoje",
          descricao: "Por motivos de coronga, não poderem atender hoje."
        }
      ],
      melhoresFeiras: [
        {
          id: 1,
          nome: "Feira do Lucas",
          avaliacao: 5.0,
          endereco: {
              rua: "Rua",
              numero: 12,
              bairro: "Bairro",
              cidade: "Cidade",
              estado: "ES"
          },
          contato: "(48)99999-9999"
        },
        {
          id: 2,
          nome: "Feira da Natália",
          avaliacao: 4.5,
           endereco: {
              rua: "Rua",
              numero: 12,
              bairro: "Bairro",
              cidade: "Cidade",
              estado: "ES"
          },
          contato: "(48)99999-9999"
        },
        {
            id: 4,
            nome: "Feira da Jhully",
            avaliacao: 4.0,
            endereco: {
                rua: "Rua",
                numero: 12,
                bairro: "Bairro",
                cidade: "Cidade",
                estado: "ES"
            },
            contato: "(48)99999-9999"
        },
        // {
        //   id: 3,
        //   nome: "Feira da Laís",
        //   avaliacao: 3.5,
        //    endereco: {
        //       rua: "Rua",
        //       numero: 12,
        //       bairro: "Bairro",
        //       cidade: "Cidade",
        //       estado: "ES"
        //   },
        //   contato: "(48)99999-9999"
        // },
      ]
    };
  },

  created() {
      
  }
};
</script>

<style scoped>
.carrossel {
  height: 45% !important;
}

/* .blurred-img {
  filter: blur(3px);
  -webkit-filter: blur(3px);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
} */

.text-box {
  /* background-color: rgb(0,0,0); Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
  color: #558b2f;
  font-weight: bold;
  /* border: 3px solid #558b2f; */
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  padding: 10px;
  text-align: center;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #000;
  font-size: 3em;
  color: #fff;
}

.card-noticia {
  margin: 10px;
}
</style>