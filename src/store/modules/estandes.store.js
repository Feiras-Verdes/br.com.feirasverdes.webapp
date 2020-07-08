import {
  fetchUltimasNoticias,
  fetchProdutosDeEstande,
  fetchNoticiasDeEstande,
  fetchEstande,
  avaliarEstande,
  cadastrarEstande,
  atualizarEstande,
  excluirEstande,
} from "@/api/estandes.api";
import { fetchEstandesDoFeirante } from "@/api/usuarios.api";
import { converterBytesParaDataUrl } from "@/utils/utils.js";

const state = {
  estande: {},
  estandes: [],
  produtos: {},
  noticias: {},
  avaliacaoDoUsuario: -1,
};

const mutations = {
  SET_ESTANDE(state, estande) {
    state.estande = estande;
  },

  SET_ESTANDES(state, estandes) {
    state.estandes = estandes;
  },

  SET_PRODUTOS(state, produtos) {
    state.produtos = produtos;
  },

  SET_NOTICIAS(state, noticias) {
    state.noticias = noticias;
  },

  SET_AVALIACAO_USUARIO(state, avaliacaoDoUsuario) {
    state.avaliacaoDoUsuario = avaliacaoDoUsuario;
  },
};

const actions = {
  async getUltimasNoticias({ commit }) {
    try {
      const res = await fetchUltimasNoticias();
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].imagem = converterBytesParaDataUrl(res.data[i].imagem);
      }
      commit("SET_NOTICIAS", res.data.noticias);
    } catch (error) {
      console.log(error);
    }
  },

  async getEstande({ commit }, id) {
    try {
      const res = await fetchEstande(id);
      res.data.imagem = converterBytesParaDataUrl(res.data.imagem);
      commit("SET_ESTANDE", res.data);
    } catch (error) {
      console.log(error);
    }
  },

  async getProdutosDeEstande({ commit }, id) {
    try {
      const res = await fetchProdutosDeEstande(id);
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].imagem = converterBytesParaDataUrl(res.data[i].imagem);
      }
      commit("SET_PRODUTOS", res.data);
    } catch (error) {
      console.log(error);
    }
  },

  async getNoticiasDeEstande({ commit }, id) {
    try {
      const res = await fetchNoticiasDeEstande(id);
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].imagem = converterBytesParaDataUrl(res.data[i].imagem);
      }
      commit("SET_NOTICIAS", res.data);
    } catch (error) {
      console.log(error);
    }
  },

  async getAvaliacaoDoUsuario({ commit }, payload) {
    try {
      const res = await fetchAvaliacaoDoUsuario(
        payload.idEstande,
        payload.idUsuario
      );
      commit("SET_AVALIACAO_USUARIO", res.data);
    } catch (error) {
      console.log(error);
    }
  },

  async actionAvaliarEstande({ commit }, payload) {
    try {
      const res = await avaliarEstande(
        payload.idUsuario,
        payload.idEstande,
        payload.nota
      );
    } catch (error) {
      console.log(error);
    }
  },

  async getEstandesDoFeirante({ commit }, idFeirante) {
    try {
      const res = await fetchEstandesDoFeirante(idFeirante);
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].imagem = converterBytesParaDataUrl(res.data[i].imagem);
      }
      commit("SET_ESTANDES", res.data);
    } catch (error) {
      console.log(error);
    }
  },

  async cadastrarEstande({ commit }, estande) {
    try {
      const res = await cadastrarEstande(estande);
    } catch (error) {
      console.log(error);
    }
  },

  async deletarEstande({ dispatch }, idEstande) {
    try {
      await excluirEstande(idEstande);
      this.dispatch("Mensagens/mostrarMensagem", {
        mensagem: "Estande excluído com sucesso",
        tipo: "success",
      });
    } catch (error) {
      console.log(error);
      this.dispatch("Mensagens/mostrarMensagem", {
        mensagem: "Erro ao excluir estande.",
        tipo: "error",
      });
    }
  },

  async editarEstande({ dispatch }, payload) {
    try {
      const res = await atualizarEstande(payload.id, payload.formData);
      this.dispatch("Mensagens/mostrarMensagem", {
        mensagem: "Estande atualizado com sucesso!",
        tipo: "success",
      });
      dispatch("getEstande", payload.id);
    } catch (error) {
      console.log(error);
      this.dispatch("Mensagens/mostrarMensagem", {
        mensagem: "Dados inválidos.",
        tipo: "error",
      });
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
