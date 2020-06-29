<template>
    <v-container fluid>
        <v-card class="card-login">
            <v-toolbar dark color="light-green darken-3" height="45px">
                <v-row align="center" justify="center">
                    <v-spacer></v-spacer>
                    <v-toolbar-title class="dialog-title">Entrar</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-row>
            </v-toolbar>
            <v-form
                ref="form"
                v-model="formularioValido"
            >
                <v-card-text class="form">
                        <v-row justify="center">
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
                        <v-row>
                            <v-col>
                                <v-text-field
                                    label="Senha"
                                    color="light-green darken-3"
                                    v-model="senha"
                                    outlined
                                    @click:append="mostrarSenha = !mostrarSenha"
                                    :append-icon="mostrarSenha ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[regras.obrigatorio]"
                                    :type="mostrarSenha ? 'text' : 'password'"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="white--text" outlined large color="light-green darken-3" @click="cancelar">Cancelar</v-btn>
                    <v-btn class="white--text" :disabled="!formularioValido" large color="light-green darken-3" @click="fazerLogin">Entrar</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
    name: "Login",
    data() {
        return {
            email: "",
            senha: "",
            mostrarSenha: false,
            regras: {
                obrigatorio: valor => !!valor.trim() || "Obrigatório"
            },
            formularioValido: true
        }
    },

    methods: {
        ...mapActions("Usuarios", ["login"]),

        async fazerLogin() {
            this.validarFormulario;
            if (this.formularioValido) {
                await this.login({ email: this.email, senha: this.senha });
            }
        },

        validarFormulario() {
            this.$refs.form.validate();
        },

        cancelar() {
          this.$router.push("/");
        }
    }
}
</script>

<style scoped>
.card-login {
    margin: 10%;
}

.texto {
  color: #558b2f;
  font-family: "Roboto", sans-serif;
}

.form {
    padding: 5%;
}
</style>