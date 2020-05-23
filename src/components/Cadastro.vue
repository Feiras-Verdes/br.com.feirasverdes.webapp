<template>
    <v-container fluid>
        <v-card class="card-cadastro">
            <v-toolbar dark color="light-green darken-3" height="45px">
                <v-row align="center" justify="center">
                    <v-spacer></v-spacer>
                    <v-toolbar-title class="dialog-title">Cadastro</v-toolbar-title>
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
                                    label="Nome"
                                    outlined
                                    color="light-green darken-3"
                                    v-model="nome"
                                    :rules="[regras.obrigatorio]"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col>
                                <v-menu
                                    ref="datePicker"
                                    v-model="datePicker"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="dataNascimentoFormatada"
                                            label="Data de nascimento"
                                            append-icon="mdi-calendar"
                                            readonly
                                            v-on="on"
                                            outlined
                                            color="light-green darken-3"
                                            :rules="[regras.obrigatorio]"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        ref="picker"
                                        v-model="dataNascimento"
                                        :max="new Date().toISOString().substr(0, 10)"
                                        min="1950-01-01"
                                        no-title
                                        scrollable
                                        color="light-green darken-3"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
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
                        <v-row>
                            <v-col>
                                <v-text-field
                                    label="Confirme sua Senha"
                                    color="light-green darken-3"
                                    v-model="confirmacaoSenha"
                                    outlined
                                    @click:append="mostrarConfirmacaoSenha = !mostrarConfirmacaoSenha"
                                    :append-icon="mostrarConfirmacaoSenha ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[regras.obrigatorio, regras.senhaConfirmada]"
                                    :type="mostrarConfirmacaoSenha ? 'text' : 'password'"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <div class="texto">
                                    Você é um feirante? <a>Clique aqui</a>
                                </div>
                            </v-col>
                        </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="white--text" outlined color="light-green darken-3" @click="cancelar">Cancelar</v-btn>
                    <v-btn class="white--text" :disabled="!formularioValido" color="light-green darken-3" @click="cadastrar">Cadastrar</v-btn>
                </v-card-actions>
            </v-form>
            <v-snackbar :value="cadastroInvalido" top :timeout=5000 color="error">Erro ao fazer cadastro. Revise seus dados e tente novamente.</v-snackbar>
        </v-card>
    </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
    name: "Cadastro",
    data() {
        return {
            nome: "",
            email: "",
            dataNascimento: null,
            senha: "",
            confirmacaoSenha: "",
            mostrarSenha: false,
            mostrarConfirmacaoSenha: false,
            datePicker: false,
            regras: {
                obrigatorio: valor => valor && !!valor.trim() || "Obrigatório",
                senhaConfirmada: () => this.senha == this.confirmacaoSenha || "Senha e confirmação de senha devem ser idênticas"
            },
            formularioValido: false
        }
    },

    watch: {
      datePicker (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },

    computed: {
      ...mapState("Usuarios", ["cadastroInvalido"]),

      dataNascimentoFormatada () {
        return this.formatarData(this.dataNascimento)
      },
    },

    methods: {
      ...mapActions("Usuarios", ["cadastrarUsuario"]),

      formatarData (data) {
          if (!data) return null

          const [ano, mes, dia] = data.split('-')
          return `${dia}/${mes}/${ano}`
      },

      async cadastrar() {
        this.validarFormulario;
        if (this.formularioValido) {
            await this.cadastrarUsuario({ 
                nome: this.nome,
                email: this.email,
                dataNascimento: this.dataNascimento,
                senha: this.senha
             });
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
.card-cadastro {
    margin: 2%;
}

.texto {
  color: #558b2f;
  font-family: "Roboto", sans-serif;
}

.form {
    padding: 5%;
}
</style>