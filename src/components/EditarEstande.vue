<template>
  <v-card flat height="100%" class="pa-0" rounded="0">
    <v-tabs
      v-model="abaAtiva"
      :vertical="$vuetify.breakpoint.name != 'xs' && $vuetify.breakpoint.name != 'sm'"
      background-color="light-green darken-3"
      dark
      class="abas"
    >
      <v-tab v-for="aba in abas" :key="aba.id">{{ aba.nome }}</v-tab>
      <v-tabs-items v-model="abaAtiva">
        <v-container fluid>
          <v-tab-item>
            <v-card flat height="100%" class="pa-0" rounded="0">
              <v-form>
                <v-row justify="center">
                  <v-col cols="8" class="d-flex justify-center">
                    <v-avatar class="avatar-usuario" size="120">
                      <img v-if="imagemUrl" :src="imagemUrl" />
                      <img v-else-if="estande.imagem" :src="estande.imagem" />
                      <v-img v-else src="../assets/icone-feira.png"></v-img>
                    </v-avatar>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="10">
                    <template>
                      <v-file-input
                        accept="image/*"
                        placeholder="Selecione uma imagem"
                        prepend-icon="mdi-camera"
                        label="Imagem"
                        outlined
                        v-model="imagem"
                        color="light-green darken-3"
                        @change="mostrarImagem"
                      >
                        <template v-slot:selection="{ text }">
                          <v-chip
                            small
                            label
                            color="light-green darken-3"
                            text-color="white"
                          >{{ text }}</v-chip>
                        </template>
                      </v-file-input>
                    </template>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="10">
                    <v-text-field
                      label="Nome do Estande"
                      color="light-green darken-3"
                      v-model="nome"
                      prepend-icon="mdi-alphabetical-variant"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col cols="5">
                    <v-dialog
                      ref="dialogInicio"
                      v-model="dialogHorarioInicio"
                      :return-value.sync="horaInicio"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          label="Horário de início"
                          color="light-green darken-3"
                          prepend-icon="mdi-clock-outline"
                          readonly
                          v-model="horaInicio"
                          v-bind="attrs"
                          v-on="on"
                          outlined
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="dialogHorarioInicio"
                        v-model="horaInicio"
                        :max="horaFim"
                        format="24hr"
                        color="light-green darken-3"
                        full-width
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="light-green darken-3"
                          @click="dialogHorarioInicio = false"
                        >Cancelar</v-btn>
                        <v-btn
                          text
                          color="light-green darken-3"
                          @click="$refs.dialogInicio.save(horaInicio)"
                        >Ok</v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-col>

                  <v-col cols="5">
                    <v-dialog
                      ref="dialogFim"
                      v-model="dialogHorarioFim"
                      :return-value.sync="horaFim"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          label="Horário de fim"
                          color="light-green darken-3"
                          prepend-icon="mdi-clock-outline"
                          readonly
                          v-model="horaFim"
                          v-bind="attrs"
                          v-on="on"
                          outlined
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="dialogHorarioFim"
                        v-model="horaFim"
                        :min="horaInicio"
                        format="24hr"
                        color="light-green darken-3"
                        full-width
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="light-green darken-3"
                          @click="dialogHorarioFim = false"
                        >Cancelar</v-btn>
                        <v-btn
                          text
                          color="light-green darken-3"
                          @click="$refs.dialogFim.save(horaFim)"
                        >Ok</v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col cols="10">
                    <v-text-field
                      label="A cada"
                      prepend-icon="mdi-calendar-range"
                      color="light-green darken-3"
                      v-model="frequencia"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col cols="10">
                    <v-text-field
                      label="Telefone"
                      outlined
                      prepend-icon="mdi-phone"
                      color="light-green darken-3"
                      v-model="telefone"
                      v-mask="['(##) ####-####', '(##) #####-####']"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col cols="10">
                    <v-text-field
                      label="CEP"
                      outlined
                      prepend-icon="mdi-map-marker"
                      append-outer-icon="mdi-magnify"
                      color="light-green darken-3"
                      v-model="endereco.cep"
                      v-mask="'#####-###'"
                      :loading="carregandoEndereco"
                      @click:append-outer="pesquisarCep"
                      @blur="pesquisarCep"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col sm="10" md="8">
                    <v-text-field
                      label="Cidade"
                      outlined
                      prepend-icon="mdi-map"
                      color="light-green darken-3"
                      v-model="endereco.cidade"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col sm="10" md="2">
                    <v-select
                      v-model="endereco.estadoSelecionado"
                      :items="estados"
                      label="Estado"
                      color="light-green darken-3"
                      item-color="light-green darken-3"
                      prepend-icon="mdi-map"
                      outlined
                      validate-on-blur
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col cols="10">
                    <v-text-field
                      label="Bairro"
                      outlined
                      prepend-icon="mdi-map"
                      color="light-green darken-3"
                      v-model="endereco.bairro"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col cols="10">
                    <v-text-field
                      label="Logradouro"
                      outlined
                      prepend-icon="mdi-road-variant"
                      color="light-green darken-3"
                      v-model="endereco.logradouro"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col cols="10">
                    <v-text-field
                      label="Número"
                      outlined
                      prepend-icon="mdi-numeric"
                      color="light-green darken-3"
                      v-model="endereco.numero"
                      type="number"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col cols="10">
                    <v-text-field
                      label="Complemento"
                      outlined
                      prepend-icon="mdi-map"
                      color="light-green darken-3"
                      v-model="endereco.complemento"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
              <v-card-actions>
                <a class="subtitle-1 link-excluir" @click="confirmarExclusao = true">Excluir Estande</a>
                <v-spacer></v-spacer>
                <v-btn
                  class="white--text"
                  outlined
                  color="light-green darken-3"
                  @click="cancelar"
                >Cancelar</v-btn>
                <v-btn class="white--text" color="light-green darken-3" @click="salvar">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <GerenciarProdutosDoEstande :idEstande="id"></GerenciarProdutosDoEstande>
          </v-tab-item>

          <v-tab-item>
            <GerenciarNoticiasDoEstande :idEstande="id"></GerenciarNoticiasDoEstande>
          </v-tab-item>
        </v-container>
      </v-tabs-items>
    </v-tabs>
    <v-dialog v-model="confirmarExclusao" width="500">
      <v-card>
        <v-card-title>Deseja realmente excluir este estande?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            outlined
            color="light-green darken-3"
            @click="confirmarExclusao = false"
          >Cancelar</v-btn>
          <v-btn class="white--text" color="light-green darken-3" @click="excluir">Excluir Estande</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { mask } from "vue-the-mask";
import { buscarEnderecoPorCep } from "@/api/endereco.api";

import GerenciarProdutosDoEstande from "./GerenciarProdutosDoEstande";
import GerenciarNoticiasDoEstande from "./GerenciarNoticiasDoEstande";

export default {
  name: "EditarEstande",

  directives: { mask },

  components: {
    GerenciarProdutosDoEstande,
    GerenciarNoticiasDoEstande
  },

  watch: {
    $route: "fetchEstande"
  },

  data() {
    return {
      abas: [
        {
          id: 1,
          nome: "Estande"
        },
        {
          id: 2,
          nome: "Produtos"
        },
        {
          id: 3,
          nome: "Notícias"
        }
      ],
      abaAtiva: 0,
      nome: "",
      dialogHorarioInicio: false,
      dialogHorarioFim: false,
      horaInicio: null,
      horaFim: null,
      frequencia: "Semanalmente",
      telefone: "",
      endereco: {
        cep: "",
        logradouro: "",
        estadoSelecionado: "",
        numero: "",
        bairro: "",
        cidade: "",
        complemento: ""
      },
      estados: [
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO"
      ],
      imagemUrl: "",
      imagem: null,
      carregandoEndereco: false,
      confirmarExclusao: false
    };
  },

  created() {
    this.fetchEstande();
  },

  computed: {
    ...mapState("Estandes", ["estande"]),

    ...mapState("Usuarios", ["usuario"]),

    id() {
      return this.$route.params.id;
    }
  },

  methods: {
    ...mapActions("Estandes", [
      "getEstande",
      "editarEstande",
      "deletarEstande"
    ]),

    async fetchEstande() {
      await this.getEstande(this.id);

      this.setEstande();
    },

    async salvar() {
      let formData = new FormData();
      if (this.imagem) {
        formData.append("imagem", this.imagem);
      }
      formData.append("nome", this.nome);
      formData.append("telefone", this.telefone);
      formData.append("frequencia", this.frequencia);
      formData.append("horaInicio", this.horaInicio);
      formData.append("horaFim", this.horaFim);
      formData.append("idUsuario", this.usuario.id);

      formData.append("cep", this.endereco.cep);
      formData.append("estado", this.endereco.estadoSelecionado);
      formData.append("cidade", this.endereco.cidade);
      formData.append("bairro", this.endereco.bairro);
      formData.append("logradouro", this.endereco.logradouro);
      formData.append("numero", parseInt(this.endereco.numero));
      formData.append("complemento", this.endereco.complemento);

      await this.editarEstande({
        id: this.estande.id,
        formData: formData
      });
    },

    async excluir() {
      this.confirmarExclusao = false;
      await this.deletarEstande(this.estande.id);

      this.$destroy();
    },

    cancelar() {
      this.setEstande();
    },

    setEstande() {
      this.nome = this.estande.nome;
      this.horaInicio = this.estande.horaInicio;
      this.horaFim = this.estande.horaFim;
      this.frequencia = this.estande.frequencia;
      this.telefone = this.estande.telefone;

      if (this.estande.endereco) {
        this.endereco = this.estande.endereco;
      } else {
        this.endereco = {
          cep: "",
          logradouro: "",
          estadoSelecionado: "",
          numero: "",
          bairro: "",
          cidade: "",
          complemento: ""
        };
      }
    },

    mostrarImagem() {
      this.imagemUrl = window.URL.createObjectURL(this.imagem);
    },

    async pesquisarCep() {
      this.carregandoEndereco = true;

      const res = await buscarEnderecoPorCep(
        this.endereco.cep.replace(/\-/g, "")
      );

      this.endereco = res.data;
      this.endereco.estadoSelecionado = res.data.uf;
      this.endereco.cidade = res.data.localidade;
      this.carregandoEndereco = false;
    }
  }
};
</script>

<style scoped>
.abas {
  height: 100%;
}

.botao-dia {
  min-width: 0 !important;
  margin-left: 6px;
}

.link-excluir {
  color: red;
}
</style>