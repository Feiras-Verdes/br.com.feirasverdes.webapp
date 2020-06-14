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
      <v-form ref="form" v-model="formularioValido" lazy-validation>
        <v-card-text class="form">
          <v-row justify="center">
            <v-col>
              <v-combobox
                v-model="tipoSelecionado"
                :items="tiposUsuario"
                label="Tipo de Usuário"
                color="light-green darken-3"
                item-color="light-green darken-3"
                outlined
                :rules="[regras.comboboxPreenxido]"
                validate-on-blur
              >
                <template v-slot:selection="{ attrs, item, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    color="light-green darken-3"
                    :input-value="selected"
                    label
                    small
                    dark
                  >
                    <span class="pr-2">{{ item.text }}</span>
                  </v-chip>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="1">
              <v-icon small color="red darken-3 obrigatorio">mdi-asterisk</v-icon>
            </v-col>
          </v-row>
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
            <v-col cols="1">
              <v-icon small color="red darken-3 obrigatorio">mdi-asterisk</v-icon>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="11">
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
                    :rules="[regras.obrigatorioParaFeirantes]"
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
            <v-col cols="1">
              <v-icon
                v-if="tipoSelecionado.value > 1"
                small
                color="red darken-3 obrigatorio"
              >mdi-asterisk</v-icon>
            </v-col>
          </v-row>
          <v-row justify="center">
            <!-- <v-col cols="5"> -->
            <v-col class="d-flex align-center">
              <v-text-field
                label="CPF"
                outlined
                color="light-green darken-3"
                v-model="cpf"
                v-mask="'###.###.###-##'"
                :rules="[regras.cpfOuCpnj]"
                validate-on-blur
                class=".d-inline-flex"
              ></v-text-field>
              <!-- </v-col> -->
              <!-- <v-col cols="1"> -->
              <!-- <v-icon
                v-if="tipoSelecionado.value > 1"
                small
                color="red darken-3 obrigatorio"
              >mdi-asterisk</v-icon>-->
              <!-- </v-col> -->
              <!-- </v-row> -->
              <!-- <v-row justify="center"> -->
              <!-- <v-col cols="1" v-if="tipoSelecionado.value > 1"> -->
              <div v-if="tipoSelecionado.value > 1" class=".d-inline-flex mx-5 text-h5 texto ou">ou</div>
              <!-- </v-col> -->
              <!-- <v-col v-if="tipoSelecionado.value > 1" cols="5"> -->
              <v-text-field
                label="CNPJ"
                v-if="tipoSelecionado.value > 1"
                outlined
                color="light-green darken-3"
                v-model="cnpj"
                v-mask="'##.###.###/####-##'"
                :rules="[regras.cpfOuCpnj]"
                validate-on-blur
                class=".d-inline-flex"
              ></v-text-field>
              <!-- </v-col> -->
              <!-- <v-col cols="1"> -->
            </v-col>
            <v-col cols="1">
              <v-icon
                v-if="tipoSelecionado.value > 1"
                small
                color="red darken-3 obrigatorio"
                class=".d-inline-flex"
              >mdi-asterisk</v-icon>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="11">
              <v-text-field
                label="Telefone"
                outlined
                append-icon="mdi-phone"
                color="light-green darken-3"
                v-model="telefone"
                :rules="[regras.obrigatorioParaFeirantes]"
                v-mask="'(##) #####-####'"
              ></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-icon
                v-if="tipoSelecionado.value > 1"
                small
                color="red darken-3 obrigatorio"
              >mdi-asterisk</v-icon>
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
            <v-col cols="1">
              <v-icon small color="red darken-3 obrigatorio">mdi-asterisk</v-icon>
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
            <v-col cols="1">
              <v-icon small color="red darken-3 obrigatorio">mdi-asterisk</v-icon>
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
            <v-col cols="1">
              <v-icon small color="red darken-3 obrigatorio">mdi-asterisk</v-icon>
            </v-col>
          </v-row>
          <div class="observacao">
            <v-icon x-small color="red darken-3 obrigatorio">mdi-asterisk</v-icon>- Obrigatório
          </div>
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
            @click="cadastrar"
          >Cadastrar</v-btn>
        </v-card-actions>
      </v-form>
      <v-snackbar
        :value="cadastroInvalido"
        top
        :timeout="5000"
        color="error"
      >Erro ao fazer cadastro. Revise seus dados e tente novamente.</v-snackbar>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { mask } from "vue-the-mask";

export default {
  name: "Cadastro",

  directives: { mask },

  data() {
    return {
      nome: "",
      cpf: "",
      cnpj: "",
      telefone: "",
      email: "",
      dataNascimento: null,
      senha: "",
      confirmacaoSenha: "",
      mostrarSenha: false,
      mostrarConfirmacaoSenha: false,
      datePicker: false,
      regras: {
        obrigatorio: valor => (valor && !!valor.trim()) || "Obrigatório",
        comboboxPreenxido: valor =>
          this.tiposUsuario.includes(valor) || "Selecione uma opção",
        obrigatorioParaFeirantes: valor =>
          this.tipoSelecionado.value == 1 ||
          (valor && !!valor.trim()) ||
          "Obrigatório",
        senhaConfirmada: () =>
          this.senha == this.confirmacaoSenha ||
          "Senha e confirmação de senha devem ser idênticas",
        cpfOuCpnj: valor =>
          this.tipoSelecionado.value == 1 ||
          this.cpf.trim() != "" ||
          this.cnpj.trim() != "" ||
          "CPF ou CNPJ devem ser preenchidos!"
      },
      formularioValido: false,
      tiposUsuario: [
        { value: 1, text: "Consumidor" },
        { value: 2, text: "Feirante" },
        { value: 3, text: "Organizador" }
      ],
      tipoSelecionado: {}
    };
  },

  watch: {
    datePicker(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },

  computed: {
    ...mapState("Usuarios", ["cadastroInvalido"]),

    dataNascimentoFormatada() {
      return this.formatarData(this.dataNascimento);
    }
  },

  mounted() {
    this.tipoSelecionado = this.tiposUsuario[0];
  },

  methods: {
    ...mapActions("Usuarios", ["cadastrarUsuario"]),

    formatarData(data) {
      if (!data) return null;

      const [ano, mes, dia] = data.split("-");
      return `${dia}/${mes}/${ano}`;
    },

    async cadastrar() {
      await this.$refs.form.validate();
      if (this.formularioValido) {
        const usuario = {
          nome: this.nome,
          cpf: this.cpf,
          cnpj: this.cnpj,
          telefone: this.telefone,
          email: this.email,
          dataNascimento: this.dataNascimento,
          senha: this.senha,
          tipoUsuario: {
            id: this.tipoSelecionado.value
          }
        };
        await this.cadastrarUsuario(usuario);
      }
    },

    validarFormulario() {
      this.$refs.form.validate();
    },

    cancelar() {
      this.$router.push("/");
    },

    validarCpfCnpj() {
      if (this.tipoSeleiconado > 1) {
        return this.cpf || this.cnpj;
      } else {
        return true;
      }
    }
  }
};
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

.obrigatorio {
  margin-top: 12px;
}

.ou {
  margin-bottom: 30px;
}
</style>