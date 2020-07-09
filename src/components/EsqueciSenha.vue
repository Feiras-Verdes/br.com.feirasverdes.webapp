<template>
  <v-container fluid>
    <v-card class="card-senha">
      <v-toolbar dark color="light-green darken-3" height="45px">
        <v-row align="center" justify="center">
          <v-spacer></v-spacer>
          <v-toolbar-title class="dialog-title">Esqueci minha Senha</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-row>
      </v-toolbar>
      <v-form ref="form" v-model="formularioValido">
        <v-card-text class="form">
          <v-row>
            <v-col>
              <v-text-field
                label="Email"
                outlined
                append-icon="mdi-email"
                color="light-green darken-3"
                v-model="email"
                :rules="[regras.obrigatorio]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            outlined
            large
            color="light-green darken-3"
            @click="cancelar"
          >Cancelar</v-btn>
          <v-btn
            class="white--text"
            :disabled="!formularioValido"
            large
            color="light-green darken-3"
            @click="enviar"
          >Enviar nova senha para email</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "EsqueciSenha",
  data() {
    return {
      email: "",
      regras: {
        obrigatorio: valor => !!valor.trim() || "Obrigatório"
      },
      formularioValido: true
    };
  },

  methods: {
    ...mapActions("Usuarios", ["recuperarSenha"]),

    async enviar() {
      this.validarFormulario;
      if (this.formularioValido) {
        await this.recuperarSenha({ email: this.email });
      }
    },

    validarFormulario() {
      this.$refs.form.validate();
    },

    cancelar() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.card-senha {
  margin: 5%;
}

.texto {
  color: #558b2f;
  font-family: "Roboto", sans-serif;
}

.form {
  padding: 5%;
}
</style>