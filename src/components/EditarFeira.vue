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
            <v-form>
              <v-text-field
                label="Nome da feira"
                color="light-green darken-3"
                v-model="nome"
                outlined
              ></v-text-field>

              <v-row>
                <v-col cols="6">
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
                        append-icon="mdi-clock-outline"
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

                <v-col cols="6">
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
                        append-icon="mdi-clock-outline"
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

              <div class="d-lg-flex">
                <div class="pb-2 px-3">Dias:</div>
                <div class="pb-12">
                  <v-btn
                    v-for="dia in diasDaSemana"
                    :key="dia.id"
                    :color="dia.ativo ? 'light-green darken-3' : 'white'"
                    :depressed="dia.ativo"
                    :dark="dia.ativo"
                    rounded
                    class="botao-dia"
                    small
                    @click="ativarDiaDaSemana(dia.id)"
                  >{{ dia.nome }}</v-btn>
                </div>
                <div class="d-inline-flex">
                  <v-combobox
                    v-model="frequencia"
                    :items="frequenciaArray"
                    hide-selected
                    outlined
                    color="light-green darken-3"
                  ></v-combobox>
                  <v-text-field
                    v-if="frequencia === 'A cada'"
                    label="A cada"
                    color="light-green darken-3"
                    v-model="frequencia"
                    outlined
                    min="0"
                    type="number"
                  ></v-text-field>
                </div>
              </div>

              <v-text-field
                label="Telefone"
                outlined
                append-icon="mdi-phone"
                color="light-green darken-3"
                v-model="telefone"
                v-mask="['(##) ####-####', '(##) #####-####']"
              ></v-text-field>

              <v-text-field
                label="Rua"
                outlined
                append-icon="mdi-phone"
                color="light-green darken-3"
                v-model="endereco.rua"
              ></v-text-field>

              <v-text-field
                label="Número"
                outlined
                append-icon="mdi-phone"
                color="light-green darken-3"
                v-model="endereco.numero"
                v-mask="'##########'"
              ></v-text-field>

              <v-text-field
                label="Bairro"
                outlined
                append-icon="mdi-phone"
                color="light-green darken-3"
                v-model="endereco.bairro"
              ></v-text-field>

              <v-text-field
                label="Cidade"
                outlined
                append-icon="mdi-phone"
                color="light-green darken-3"
                v-model="endereco.cidade"
              ></v-text-field>

              <v-select
                v-model="endereco.estadoSelecionado"
                :items="estados"
                label="Estado"
                color="light-green darken-3"
                item-color="light-green darken-3"
                outlined
                validate-on-blur
              ></v-select>

              <v-text-field
                label="Complemento"
                outlined
                append-icon="mdi-phone"
                color="light-green darken-3"
                v-model="endereco.complemento"
              ></v-text-field>
            </v-form>
          </v-tab-item>
        </v-container>
      </v-tabs-items>
    </v-tabs>
  </v-card>
</template>

<script>
import { mask } from "vue-the-mask";

export default {
  name: "EditarFeira",

  directives: { mask },

  data() {
    return {
      abas: [
        {
          id: 1,
          nome: "Feira"
        },
        {
          id: 2,
          nome: "Estandes"
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
        rua: "",
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
      diasDaSemana: [
        {
          id: 0,
          nome: "D",
          cor: "light-green lighten-3",
          ativo: false
        },
        {
          id: 1,
          nome: "S",
          cor: "#F0F0F0",
          ativo: false
        },
        {
          id: 2,
          nome: "T",
          cor: "#F0F0F0",
          ativo: false
        },
        {
          id: 3,
          nome: "Q",
          cor: "#F0F0F0",
          ativo: false
        },
        {
          id: 4,
          nome: "Q",
          cor: "#F0F0F0",
          ativo: false
        },
        {
          id: 5,
          nome: "S",
          cor: "#F0F0F0",
          ativo: false
        },
        {
          id: 6,
          nome: "S",
          cor: "#F0F0F0",
          ativo: false
        }
      ],
      frequenciaArray: [
        "Semanalmente",
        "Mensalmente",
        "A cada"
      ]
    };
  },

  methods: {
    ativarDiaDaSemana(id) {
      this.diasDaSemana[id].ativo = !this.diasDaSemana[id].ativo;

      if (this.diasDaSemana[id].ativo) {
        this.diasDaSemana[id].cor = "light-green darken-3";
      } else {
        this.diasDaSemana[id].cor = "light-green darken-4";
      }
    }
  }
};
</script>

<style scoped>
.abas {
  height: 100%;
}
/* 
.frequencia-dias {
  height: 86px;
} */

.botao-dia {
  min-width: 0 !important;
  margin-left: 6px;
}
</style>