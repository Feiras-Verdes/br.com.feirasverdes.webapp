<template>
  <v-container fluid>
    <v-card class="card-cadastro">
      <v-toolbar dark color="light-green darken-3" height="45px">
        <v-row align="center" justify="center">
          <v-spacer></v-spacer>
          <v-toolbar-title class="dialog-title">Editar Perfil</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-row>
      </v-toolbar>
      <v-form ref="form" v-model="formularioValido">
        <v-card-text class="form">
          <v-row justify="center">
            <v-col cols="8" class="d-flex justify-center">
              <v-avatar class="avatar-usuario" size="120">
                <img v-if="usuario.imagem" :src="usuario.imagem" />
                <img v-else-if="fotoUrl" :src="fotoUrl" />
                <v-icon left size="120" v-else color="light-green darken-3">mdi-account-circle</v-icon>
              </v-avatar>
            </v-col>
            <!-- <v-btn @click="salvarImagem">Salvar Imagem</v-btn> -->
          </v-row>
          <v-row justify="center">
            <v-col>
              <template>
                <v-file-input
                  accept="image/*"
                  placeholder="Selecione sua foto"
                  prepend-icon="mdi-camera"
                  label="Foto"
                  outlined
                  v-model="foto"
                  color="light-green darken-3"
                  @change="mostrarFoto"
                >
                  <template v-slot:selection="{ text }">
                    <v-chip small label color="light-green darken-3" text-color="white">{{ text }}</v-chip>
                  </template>
                </v-file-input>
              </template>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col>
              <v-text-field
                label="Nome"
                prepend-icon="mdi-account"
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
                    prepend-icon="mdi-calendar"
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
                label="CPF"
                prepend-icon="mdi-card-account-details"
                outlined
                color="light-green darken-3"
                v-model="cpf"
                :rules="[regras.obrigatorio]"
                v-mask="'###.###.###-##'"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col>
              <v-text-field
                label="Telefone"
                outlined
                prepend-icon="mdi-phone"
                color="light-green darken-3"
                v-model="telefone"
                :rules="[regras.obrigatorio]"
                v-mask="'(##) #####-####'"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col>
              <v-text-field
                label="Email"
                outlined
                prepend-icon="mdi-email"
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
            color="light-green darken-3"
            @click="cancelar"
          >Cancelar</v-btn>
          <v-btn
            class="white--text"
            :disabled="!formularioValido"
            color="light-green darken-3"
            @click="salvar"
          >Salvar</v-btn>
        </v-card-actions>
      </v-form>
      <v-snackbar
        :value="atualizarUsuarioInvalido"
        top
        :timeout="5000"
        color="error"
      >Erro ao atualizar dados. Revise seus dados e tente novamente.</v-snackbar>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { mask } from "vue-the-mask";

export default {
  nome: "EditarUsuario",

  directives: { mask },

  data() {
    return {
      nome: "",
      dataNascimento: "",
      cpf: "",
      telefone: "",
      email: "",
      //   senha: this.usuario.senha,
      foto: null,
      fotoUrl: "",
      datePicker: false,
      regras: {
        obrigatorio: valor => (valor && !!valor.trim()) || "Obrigatório",
        senhaConfirmada: () =>
          this.senha == this.confirmacaoSenha ||
          "Senha e confirmação de senha devem ser idênticas"
      },
      formularioValido: false
    };
  },

  async created() {
    await this.fetchDetalhesDoUsuario();

    this.nome = this.usuario.nome;
    this.dataNascimento = this.usuario.dataNascimento;
    this.cpf = this.usuario.cpf;
    this.telefone = this.usuario.telefone;
    this.email = this.usuario.email;
    this.fotoUrl = this.usuario.foto;
  },

  computed: {
    ...mapState("Usuarios", ["usuario", "atualizarUsuarioInvalido"]),

    dataNascimentoFormatada() {
      return this.formatarData(this.dataNascimento);
    }
  },

  watch: {
    datePicker(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },

  methods: {
    ...mapActions("Usuarios", [
      "atualizarUsuario",
      "fetchDetalhesDoUsuario",
      "enviarImagem"
    ]),

    formatarData(data) {
      if (!data) return null;

      if (data.match(/\d{2}\/\d{2}\/\d+/)) return data;

      const [ano, mes, dia] = data.split("-");
      return `${dia}/${mes}/${ano}`;
    },

    async salvar() {
      this.validarFormulario;

      let formData = new FormData();
      formData.append("foto", this.foto);
      formData.append("nome", this.nome);
      formData.append("cpf", this.cpf);
      formData.append("telefone", this.telefone);
      formData.append("email", this.email);
      formData.append("dataNascimento", this.dataNascimentoFormatada);

      if (this.formularioValido) {
        await this.atualizarUsuario({
          id: this.usuario.id,
          usuario: formData
        });
      }
    },

    async salvarImagem() {
        // const fotoBase64 = await this.toBase64(this.foto);
        console.log(this.foto)
        const payload = {
            id: this.usuario.id,
            foto: this.foto
        }
        await this.enviarImagem(payload);
    },

    toBase64: file =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      }),

    validarFormulario() {
      this.$refs.form.validate();
    },

    cancelar() {
      this.$router.push("/");
    },

    mostrarFoto() {
      this.fotoUrl = window.URL.createObjectURL(this.foto);
    }
  }
};
</script>

<style scoped>
</style>