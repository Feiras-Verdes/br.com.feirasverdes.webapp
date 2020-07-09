<template>
  <v-container v-if="usuario" fluid>
    <v-card class="card-cadastro">
      <v-toolbar dark color="light-green darken-3" height="45px">
        <v-row align="center" justify="center">
          <v-spacer></v-spacer>
          <v-toolbar-title class="dialog-title">Editar Perfil</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-row>
      </v-toolbar>
      <v-form ref="form" v-model="formularioValido" lazy-validation>
        <v-card-text class="form">
          <v-row justify="center">
            <v-col cols="8" class="d-flex justify-center">
              <v-avatar class="avatar-usuario" size="120">
                <img v-if="fotoUrl" :src="fotoUrl" />
                <img v-else-if="usuario.imagem" :src="usuario.imagem" />
                <v-icon left size="120" v-else color="light-green darken-3"
                  >mdi-account-circle</v-icon
                >
              </v-avatar>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10">
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
                    <v-chip
                      small
                      label
                      color="light-green darken-3"
                      text-color="white"
                      >{{ text }}</v-chip
                    >
                  </template>
                </v-file-input>
              </template>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10">
              <v-text-field
                label="Nome"
                prepend-icon="mdi-account"
                outlined
                color="light-green darken-3"
                v-model="nome"
                :rules="[regras.obrigatorio]"
              ></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-icon small color="red darken-3 obrigatorio"
                >mdi-asterisk</v-icon
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10">
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
          <v-row>
            <div class="d-sm-inline-flex">
              <v-radio-group class="pl-3" v-model="cpfOuCpnj" row>
                <v-radio
                  label="CPF"
                  value="CPF"
                  color="light-green darken-3"
                ></v-radio>
                <v-radio
                  label="CNPJ"
                  value="CNPJ"
                  color="light-green darken-3"
                ></v-radio>
              </v-radio-group>

              <div class="d-flex">
                <v-row justify="center" class="flex-grow-1">
                  <v-col cols="10" class="flex-grow-1">
                    <v-text-field
                      v-if="cpfOuCpnj == 'CPF'"
                      label="Digite seu CPF"
                      outlined
                      color="light-green darken-3"
                      v-model="cpf"
                      v-mask="'###.###.###-##'"
                      :rules="[regras.cpfOuCpnj]"
                      validate-on-blur
                    ></v-text-field>

                    <v-text-field
                      label="Digite seu CNPJ"
                      v-if="cpfOuCpnj == 'CNPJ'"
                      outlined
                      color="light-green darken-3"
                      v-model="cnpj"
                      v-mask="'##.###.###/####-##'"
                      :rules="[regras.cpfOuCpnj]"
                      validate-on-blur
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1">
                    <v-icon
                      small
                      color="red darken-3 obrigatorio"
                      class=".d-inline-flex"
                      >mdi-asterisk</v-icon
                    >
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-row>
          <v-row>
            <v-col cols="10">
              <v-text-field
                label="Telefone"
                outlined
                prepend-icon="mdi-phone"
                color="light-green darken-3"
                v-model="telefone"
                v-mask="'(##) #####-####'"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10">
              <v-text-field
                label="Email"
                outlined
                prepend-icon="mdi-email"
                color="light-green darken-3"
                v-model="email"
                :rules="[regras.obrigatorio]"
              ></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-icon small color="red darken-3 obrigatorio"
                >mdi-asterisk</v-icon
              >
            </v-col>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
          <v-btn 
            class="white--text"
            color="light-green darken-3"
            outlined
            @click="novaSenha"
          >Nova Senha</v-btn>
          <v-spacer></v-spacer>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            outlined
            color="light-green darken-3"
            @click="cancelar"
            >Cancelar</v-btn
          >
          <v-btn
            class="white--text"
            :disabled="!formularioValido"
            color="light-green darken-3"
            @click="salvar"
            >Salvar</v-btn
          >
        </v-card-actions>
      </v-form>
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
      cnpj: "",
      cpfOuCpnj: "CPF",
      telefone: "",
      email: "",
      //   senha: this.usuario.senha,
      foto: null,
      fotoUrl: "",
      datePicker: false,
      regras: {
        obrigatorio: (valor) => (valor && !!valor.trim()) || "Obrigatório",
        senhaConfirmada: () =>
          this.senha == this.confirmacaoSenha ||
          "Senha e confirmação de senha devem ser idênticas",
        cpfOuCpnj: (valor) =>
          this.cpf.trim() != "" ||
          this.cnpj.trim() != "" ||
          "CPF ou CNPJ devem ser preenchidos!",
      },
      formularioValido: false
    };
  },

  async created() {
    await this.fetchDetalhesDoUsuario();

    this.nome = this.usuario.nome;
    this.dataNascimento = this.usuario.dataNascimento;
    this.cpf = this.usuario.cpf;
    this.cnpj = this.usuario.cnpj;
    this.telefone = this.usuario.telefone;
    this.email = this.usuario.email;
    this.foto = this.usuario.foto;
    this.cpfOuCpnj = this.cnpj ? "CNPJ" : "CPF";
  },

  computed: {
    ...mapState("Usuarios", ["usuario"]),

    dataNascimentoFormatada() {
      return this.formatarData(this.dataNascimento);
    },
  },

  watch: {
    datePicker(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  methods: {
    ...mapActions("Usuarios", [
      "atualizarUsuario",
      "fetchDetalhesDoUsuario",
      "enviarImagem",
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
      if (this.foto) {
        formData.append("imagem", this.foto);
      }
      formData.append("nome", this.nome);
      if (this.cpf) {
        formData.append("cpf", this.cpf);
      }
      if (this.cnpj) {
        formData.append("cnpj", this.cnpj);
      }
      formData.append("telefone", this.telefone);
      formData.append("email", this.email);
      if (this.dataNascimentoFormatada) {
        formData.append("dataNascimento", this.dataNascimentoFormatada);
      }

      if (this.formularioValido) {
        await this.atualizarUsuario({
          id: this.usuario.id,
          formData: formData,
        });
      }
    },

    async salvarImagem() {
      // const fotoBase64 = await this.toBase64(this.foto);
      console.log(this.foto);
      const payload = {
        id: this.usuario.id,
        foto: this.foto,
      };
      await this.enviarImagem(payload);
    },

    toBase64: (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      }),

    validarFormulario() {
      this.$refs.form.validate();
    },

    cancelar() {
      this.$router.push("/");
    },

    novaSenha() {
      this.$router.push("/novaSenha");
    },

    mostrarFoto() {
      this.fotoUrl = window.URL.createObjectURL(this.foto);
    },
  },
};
</script>

<style scoped></style>
