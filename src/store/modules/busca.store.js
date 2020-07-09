import {
  fetchBuscaProduto,
  fetchBuscaEstande,
  fetchBuscaFeira,
} from "@/api/busca.api";
import { converterBytesParaDataUrl } from "@/utils/utils.js";

const state = {
  nome: "",
  limite: 10,
  pagina: 0,
  ordenacao: "",
  tipoOrdenacao: "asc",
  estandes: [],
  feiras: [],
  produtos: [],
};

const mutations = {
  SET_NOME(state, nome) {
    state.nome = nome;
  },
  SET_LIMITE(state, limite) {
    state.limite = limite;
  },
  SET_PAGINA(state, pagina) {
    state.pagina = pagina;
  },
  SET_ORDENACAO(state, ordenacao) {
    state.ordenacao = ordenacao;
  },
  SET_TIPO_ORDENACAO(state, tipoOrdenacao) {
    state.tipoOrdenacao = tipoOrdenacao;
  },
  SET_ESTANDE(state, estandes) {
    state.estandes = estandes;
  },
  SET_FEIRA(state, feiras) {
    state.feiras = feiras;
  },
  SET_PRODUTO(state, produtos) {
    state.produtos = produtos;
  },
};

const actions = {
  async getEstandes({ state, commit }, payload) {
    try {
      const res = await fetchBuscaEstande(
        payload.nome,
        state.limite,
        state.pagina,
        payload.ordenacao,
        payload.tipoOrdenacao
      );
      for (let i = 0; i < res.data.content.length; i++) {
        res.data.content[i].imagem = converterBytesParaDataUrl(
          res.data.content[i].imagem
        );
      }
      commit("SET_ESTANDE", res.data.content);
    } catch (error) {
      console.log(error);
      this.dispatch("Mensagens/mostrarMensagem", {
        mensagem: "Erro ao buscar estandes",
        tipo: "error",
      });
    }
  },
  async getFeiras({ state, commit }, payload) {
    try {
      const res = await fetchBuscaFeira(
        payload.nome,
        state.limite,
        state.pagina,
        payload.ordenacao,
        payload.tipoOrdenacao
      );
      for (let i = 0; i < res.data.content.length; i++) {
        res.data.content[i].imagem = converterBytesParaDataUrl(
          res.data.content[i].imagem
        );
      }
      commit("SET_FEIRA", res.data.content);
    } catch (error) {
      console.log(error);
      this.dispatch("Mensagens/mostrarMensagem", {
        mensagem: "Erro ao buscar feiras",
        tipo: "error",
      });
    }
  },

  async getFeiras2({ state, commit }, payload) {
    try {
      const res = await fetchBuscaFeira(
        payload.nome,
        state.limite,
        state.pagina,
        payload.ordenacao,
        payload.tipoOrdenacao
      );
      for (let i = 0; i < res.data.content.length; i++) {
        res.data.content[i].imagem = converterBytesParaDataUrl(
          res.data.content[i].imagem
        );
      }
      commit("SET_FEIRA", res.data.content);
    } catch (error) {
      console.log(error);
      this.dispatch("Mensagens/mostrarMensagem", {
        mensagem: "Erro ao buscar feiras",
        tipo: "error",
      });
    }
  },

  async getProdutos({ state, commit }, payload) {
    try {
      const res = await fetchBuscaProduto(
        payload.nome,
        state.limite,
        state.pagina,
        payload.ordenacao,
        payload.tipoOrdenacao
      );
      for (let i = 0; i < res.data.content.length; i++) {
        res.data.content[i].imagem = converterBytesParaDataUrl(
          res.data.content[i].imagem
        );
      }
      commit("SET_PRODUTO", res.data.content);
    } catch (error) {
      console.log(error);
      this.dispatch("Mensagens/mostrarMensagem", {
        mensagem: "Erro ao buscar produtos",
        tipo: "error",
      });
    }
  },
  setOrdenacao({ commit }, ordenacao) {
    commit("SET_ORDENACAO", ordenacao);
  },
  setTipoOrdenacao({ commit }, tipoOrdenacao) {
    commit("SET_TIPO_ORDENACAO", tipoOrdenacao);
  },
  setNome({ commit }, nome) {
    commit("SET_NOME", nome);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
