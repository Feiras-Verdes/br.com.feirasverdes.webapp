import {
  fetchEstandesDeFeira,
  fetchMelhoresFeiras,
  fetchUltimasNoticias,
  fetchNoticiasDeFeira,
  fetchFeira,
  avaliarFeira,
  cadastrarFeira,
  excluirFeira,
  salvarFeiraEditada,
  removerEstandeDeFeira,
} from "@/api/feiras.api";
import {
  cadastrarNoticia,
  atualizarNoticia,
  excluirNoticia,
} from "@/api/noticias.api";
import { fetchFeirasDoOrganizador } from "@/api/usuarios.api";
import { converterBytesParaDataUrl } from "@/utils/utils.js";

const state = {
  feira: {},
  noticias: [],
  avaliacaoDoUsuario: -1,
  estandes: [],
  feiras: [],
};

const mutations = {
  SET_FEIRA(state, feira) {
    state.feira = feira;
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

  SET_ESTANDES(state, estandes) {
    state.estandes = estandes;
  },

  SET_FEIRAS(state, feiras) {
    state.feiras = feiras;
  },
};

const actions = {
  async getMelhoresFeiras({ commit }) {
    try {
      const res = await fetchMelhoresFeiras();
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].imagem = converterBytesParaDataUrl(res.data[i].imagem);
      }
      commit("SET_FEIRAS", res.data);
    } catch (error) {
      console.log(error);
    }
  },

  async getEstandesDeFeira({ commit }, id) {
    try {
      const res = await fetchEstandesDeFeira(id);
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].imagem = converterBytesParaDataUrl(res.data[i].imagem);
      }
      commit("SET_ESTANDES", res.data);
    } catch (error) {
      console.log(error);
    }
  },

  async getUltimasNoticias({ commit }) {
    try {
      const res = await fetchUltimasNoticias();
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].imagem = converterBytesParaDataUrl(res.data[i].imagem);
      }
      commit("SET_NOTICIAS", res.data);
    } catch (error) {
      console.log(error);
    }
  },

  async getFeira({ commit }, id) {
    try {
      const res = await fetchFeira(id);
      res.data.imagem = converterBytesParaDataUrl(res.data.imagem);
      commit("SET_FEIRA", res.data);
    } catch (error) {
      console.log(error);
    }
  },

  async getNoticiasDeFeira({ commit }, id) {
    try {
      const res = await fetchNoticiasDeFeira(id);
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
        payload.idFeira,
        payload.idUsuario
      );
      commit("SET_AVALIACAO_USUARIO", res.data);
    } catch (error) {
      console.log(error);
    }
  },

  async actionAvaliarFeira({ commit }, payload) {
    try {
      const res = await avaliarFeira(
        payload.idUsuario,
        payload.idFeira,
        payload.nota
      );
    } catch (error) {
      console.log(error);
    }
  },

  async cadastrarFeira({ commit }, feira) {
    try {
      await cadastrarFeira(feira);
    } catch (error) {
      console.log(error);
    }
  },

  async deletarFeira({ dispatch }, idFeira) {
    try {
      await excluirFeira(idFeira);
      this.dispatch("Mensagens/mostrarMensagem", {
        mensagem: "Feira excluiída com sucesso",
        tipo: "success",
      });
    } catch (error) {
      console.log(error);
      this.dispatch("Mensagens/mostrarMensagem", {
        mensagem: "Erro ao excluir feira.",
        tipo: "error",
      });
    }
  },

  async editarFeira({ dispatch }, payload) {
    try {
      const res = await salvarFeiraEditada(payload.id, payload.formData);
      this.dispatch("Mensagens/mostrarMensagem", {
        mensagem: "Feira atualizado com sucesso!",
        tipo: "success",
      });
      dispatch("getFeira", payload.id);
    } catch (error) {
      console.log(error);
      this.dispatch("Mensagens/mostrarMensagem", {
        mensagem: "Dados inválidos.",
        tipo: "error",
      });
    }
  },

  async getFeirasDoOrganizador({ commit }, idUsuario) {
    try {
      const res = await fetchFeirasDoOrganizador(idUsuario);
      commit("SET_FEIRAS", res.data);
    } catch (error) {
      console.log(error);
    }
  },

  async removerEstandeDeFeira({ state, dispatch }, idEstande) {
    try {
      const res = await removerEstandeDeFeira(idEstande);
      dispatch("getEstandesDeFeira", state.feira.id);
    } catch (error) {
      console.log(error);
      this.dispatch("Mensagens/mostrarMensagem", {
        mensagem: "Erro ao excluir notícia.",
        tipo: "error",
      });
    }
  },

  async cadastrarNoticia({ state, dispatch }, noticia) {
    try {
      const res = await cadastrarNoticia(noticia);
      dispatch("getNoticiasDeFeira", state.feira.id);
    } catch (error) {
      console.log(error);
      this.dispatch("Mensagens/mostrarMensagem", {
        mensagem: "Erro ao cadastrar nova notícia.",
        tipo: "error",
      });
    }
  },

  async atualizarNoticia({ state, dispatch }, payload) {
    try {
      const res = await atualizarNoticia(payload.id, payload.formData);
      dispatch("getNoticiasDeFeira", state.feira.id);
    } catch (error) {
      console.log(error);
      this.dispatch("Mensagens/mostrarMensagem", {
        mensagem: "Erro ao atualizar notícia.",
        tipo: "error",
      });
    }
  },

  async excluirNoticia({ state, dispatch }, idNoticia) {
    try {
      const res = await excluirNoticia(idNoticia);
      dispatch("getNoticiasDeFeira", state.feira.id);
    } catch (error) {
      console.log(error);
      this.dispatch("Mensagens/mostrarMensagem", {
        mensagem: "Erro ao excluir notícia.",
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
