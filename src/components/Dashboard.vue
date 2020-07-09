<template>
  <v-app>
    <v-app-bar app color="white" elevation="1">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="light-green darken-3"></v-app-bar-nav-icon>

      <v-toolbar-title color="light-green darken-3" class="titulo d-none d-md-block" @click="irHome">Feiras Verdes</v-toolbar-title>

      <v-spacer class="d-none d-md-block"></v-spacer>

      <v-text-field
        class="search-bar"
        v-model="busca"
        outlined
        clearable
        dense
        hide-details
        append-icon="mdi-magnify"
        color="light-green darken-3"
        transition="scale-transition"
        @click:append="buscar"
        @keydown.enter="buscar"
      ></v-text-field>

      <v-spacer class="d-none d-md-block"></v-spacer>

      <v-btn
        v-if="usuario"
        outlined
        dark
        class="d-none d-sm-block botao"
        color="light-green darken-3"
        @click="logout"
      >Sair</v-btn>

      <v-btn
        v-if="!usuario"
        dark
        class="d-none d-sm-block botao"
        color="light-green darken-3"
        @click="cadastrar"
      >Cadastre-se</v-btn>

      <v-btn
        v-if="!usuario"
        dark
        color="light-green darken-3 d-none d-sm-block"
        @click="entrar"
      >Entrar</v-btn>

      <v-snackbar
        :value="mostrarAlerta"
        :timeout="5000"
        :color="tipo"
        @input="setMostrarMensagem(false)"
      >
        {{ mensagem }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="setMostrarMensagem(false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-app-bar>

    <v-main >
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <template>
          <v-list class="list-menu">
            <v-list-item v-if="usuario">
              <v-list-item-avatar size="60" class="avatar-align">
                <img v-if="usuario.imagem" :src="usuario.imagem" />
                <v-icon left size="60" v-else color="light-green darken-3">mdi-account-circle</v-icon>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item v-else>
              <v-list-item-avatar size="60" class="avatar-align">
                <v-icon left size="60" color="light-green darken-3">mdi-account</v-icon>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-group prepend-icon="mdi-account" color="light-green darken-3">
              <template v-slot:activator>
                <v-list-item-title v-if="usuario" class="titulo-item">{{usuario.nome}}</v-list-item-title>
                <v-list-item-title v-else class="titulo-item">Usuário</v-list-item-title>
              </template>

              <v-list-item v-if="!usuario" to="/login">
                <v-list-item-avatar class="avatar-align">
                  <v-icon left color="light-green darken-3">mdi-login</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="titulo-item">Entrar</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-if="!usuario" to="/cadastro">
                <v-list-item-avatar class="avatar-align">
                  <v-icon left color="light-green darken-3">mdi-account-plus</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="titulo-item">Cadastre-se</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-if="usuario" to="/editar-perfil">
                <v-list-item-avatar class="avatar-align">
                  <v-icon left color="light-green darken-3">mdi-pencil</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="titulo-item">Editar Perfil</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-if="usuario" @click="logout">
                <v-list-item-avatar class="avatar-align">
                  <v-icon left color="light-green darken-3">mdi-logout</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="titulo-item">Sair</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
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
              <v-icon v-if="item.icone" left>{{ item.icone }}</v-icon>
              <v-img v-else :src="item.imagem"></v-img>
            </v-avatar>
            {{ item.nome }}
          </v-tab>

          <v-tab
            v-if="usuario && (usuario.tipoUsuario.descricao == 'ORGANIZADOR')"
            to="/gerenciar-feiras"
            class="aba"
            exact
          >
            <v-avatar class="tab-icon" left>
              <v-icon left>mdi-home-group</v-icon>
            </v-avatar>Minhas Feiras
          </v-tab>

          <v-tab
            v-if="usuario && (usuario.tipoUsuario.descricao == 'FEIRANTE' || usuario.tipoUsuario.descricao == 'ORGANIZADOR')"
            to="/gerenciar-estandes"
            class="aba"
            exact
          >
            <v-avatar class="tab-icon" left>
              <v-icon left>mdi-storefront-outline</v-icon>
            </v-avatar>Meus Estandes
          </v-tab>
          <v-tabs-slider></v-tabs-slider>
        </v-tabs>
      </v-navigation-drawer>

      <router-view @abrir-imagem-dialog="abrirDialogImagem"></router-view>
    </v-main>

    <v-dialog v-model="imagemDialog">
      <v-img max-height="900" :src="imagemDialogSrc"></v-img>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";

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
          nome: "Busca",
          icone: "mdi-magnify",
          rota: "/busca"
        }
      ],
      busca: "",
      imagemDialog: false,
      imagemDialogSrc: ""
    };
  },

  async created() {
    await this.fetchDetalhesDoUsuario();
  },

  computed: {
    ...mapState("Usuarios", ["usuario"]),

    ...mapState("Mensagens", ["mostrarMensagem", "mensagem", "tipo"]),

    mostrarImagemDialog() {
      return this.imagemDialog;
    },

    mostrarAlerta: {
      get() {
        return this.mostrarMensagem;
      },

      set() {
        this.setMostrarMensagem(false);
      }
    }
  },

  methods: {
    ...mapActions("Usuarios", ["fetchDetalhesDoUsuario", "logout"]),

    ...mapActions("Mensagens", [
      "setMostrarMensagem",
      "setMensagem",
      "setTipo"
    ]),

    cadastrar() {
      this.$router.push({ path: "/cadastro" });
    },

    entrar() {
      this.$router.push({ path: "/login" });
    },

    buscar() {
       this.$router.push({path:`/busca`, query: { busca: this.busca}})
    },
    
    irHome(){
      this.$router.push({path:"/"})
    },

    abrirDialogImagem(imagem) {
      // this.imagemDialogSrc = imagem;
      // this.imagemDialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.titulo {
  color: #558b2f;
  font-size: 2em;
  font-family: "Roboto", sans-serif;
  cursor: pointer;
}

.botao {
  margin: 0 16px;
}

.aba {
  justify-content: left !important;
}

.list-menu {
  padding-left: 10px !important;
  * {
    // color: #558b2f;
    color: rgba(0, 0, 0, 0.54);
    font-family: "Roboto", sans-serif;
  }
}

.perfil-name {
  padding-right: 20px !important;
}

.titulo-item {
  text-transform: uppercase;
  font-size: 0.875rem;
  font-weight: 500;
}
</style>