<template>
  <v-container fluid>
    <v-card class="card-senha">
      <v-toolbar dark color="light-green darken-3" height="45px">
        <v-row align="center" justify="center">
          <v-spacer></v-spacer>
          <v-toolbar-title class="dialog-title">Nova Senha</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-row>
      </v-toolbar>
      <v-form ref="form" v-model="formularioValido">
        <v-card-text class="form">
          <v-row justify="center">
            <v-col>
              <v-text-field
                label="Senha Atual"
                color="light-green darken-3"
                v-model="senhaAtual"
                outlined
                @click:append="mostrarSenhaAtual = !mostrarSenhaAtual"
                :append-icon="mostrarSenhaAtual ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[regras.obrigatorio]"
                :type="mostrarSenhaAtual ? 'text' : 'password'"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Nova Senha"
                color="light-green darken-3"
                v-model="senhaNova"
                outlined
                @click:append="mostrarSenhaNova = !mostrarSenhaNova"
                :append-icon="mostrarSenhaNova ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[regras.obrigatorio]"
                :type="mostrarSenhaNova ? 'text' : 'password'"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Confirmação Senha"
                color="light-green darken-3"
                v-model="senhaConfirmacao"
                outlined
                @click:append="mostrarSenhaConfirmacao = !mostrarSenhaConfirmacao"
                :append-icon="mostrarSenhaConfirmacao ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[regras.obrigatorio, regras.senhaConfirmada]"
                :type="mostrarSenhaConfirmacao ? 'text' : 'password'"
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
            @click="atualizarSenha"
          >Salvar</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "NovaSenha",
  data() {
    return {
      senhaAtual: "",
      senhaNova: "",
      senhaConfirmacao: "",
      mostrarSenhaAtual: false,
      mostrarSenhaNova: false,
      mostrarSenhaConfirmacao: false,
      regras: {
        obrigatorio: valor => !!valor.trim() || "Obrigatório",
        senhaConfirmada: () =>
          this.senhaNova == this.senhaConfirmacao ||
          "Senha nova e confirmação de senha devem ser idênticas"
        },
      formularioValido: true
    };
  },

  methods: {
    ...mapActions("Usuarios", ["novaSenha"]),

    async atualizarSenha() {
      this.validarFormulario;
      if (this.formularioValido) {
        await this.novaSenha({ senha: this.senha });
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