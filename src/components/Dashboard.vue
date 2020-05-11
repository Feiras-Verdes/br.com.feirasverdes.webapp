<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <template v-slot:prepend>
        <v-list class="list-menu">
          <v-list-item>
            <v-list-item-avatar size="60" class="avatar-align">
              <img v-if="usuario.avatarUrl" :src="usuario.avatarUrl" />
              <v-icon left size="60" v-if="!usuario.avatarUrl" color="light-green darken-3">mdi-account</v-icon>
            </v-list-item-avatar>
          </v-list-item>
          <v-list-item>
            <v-list-item-content class="perfil-name">
              <v-list-item-title>{{usuario.nome}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>  
        </v-list>
      </template>

      <v-tabs
        vertical
        v-model="abaAtiva"
        color="light-green darken-3"
        slider-color="light-green darken-3"
      >
        <v-tab v-for="item in items" :key="item.id" :to="item.rota" class="aba" exact>
          <v-avatar class="tab-icon" left>
            <v-icon left>{{ item.icone }}</v-icon>
          </v-avatar>
          {{ item.nome }}
        </v-tab>
        <v-tabs-slider></v-tabs-slider>
      </v-tabs>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="light-green darken-3"></v-app-bar-nav-icon>

      <v-toolbar-title color="light-green darken-3" class="titulo">Feiras Verdes</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field
        class="search-bar"
        outlined
        clearable
        dense
        hide-details
        background-color="light-green lighten-5"
        append-icon="mdi-magnify"
        color="light-green darken-3"
        transition="scale-transition"
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn dark class="botao" color="light-green darken-3">Cadastre-se</v-btn>

      <v-btn dark color="light-green darken-3">Entrar</v-btn>
    </v-app-bar>

    <v-content>
        <router-view></router-view>
    </v-content>

    <v-footer></v-footer>
  </v-app>
</template>

<script>
export default {
  name: "Dashboard",

  data() {
    return {
      abaAtiva: 0,
      expandSearchBar: false,
      drawer: false,
      items: [
        {
          id: 1,
          nome: "Home",
          icone: "mdi-home",
          rota: "/"
        },
        {
          id: 2,
          nome: "Usuário",
          icone: "mdi-account",
          rota: "/cadastroUsuario"
        }
      ]
    };
  },

  components: {
  },

  computed: {
    usuario() {
      return { nome: "Usuário" };
    }
  },

  methods: {}
};
</script>

<style lang="scss" scoped>
.titulo {
  color: #558b2f;
}
.botao {
  margin-right: 16px;
}

.aba {
  justify-content: left !important;
}

.list-menu {
  padding-left: 20px !important;
  * {
    color: #558b2f;
  }
}

.perfil-name {
  // text-align: center;
  padding-right: 20px !important;
}

// .avatar-align {
//   margin-left: 63px;
// }
</style>