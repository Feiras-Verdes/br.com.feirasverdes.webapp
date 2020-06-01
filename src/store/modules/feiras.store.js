import { fetchEstandesDeFeira, fetchMelhoresFeiras, fetchUltimasNoticias, fetchProdutosDeFeira, fetchNoticiasDeFeira, fetchFeira, avaliarFeira } from "@/api/feiras.api"

const state = {
    melhoresFeiras: {},
    ultimasNoticias: {},
    feira: {},
    produtos: {},
    noticias: {},
		avaliacaoDoUsuario: -1,
		estandes: {}
}

const mutations = {
    SET_MELHORES_FEIRAS(state, melhoresFeiras) {
        state.melhoresFeiras = melhoresFeiras;
    },

    SET_ULTIMAS_NOTICIAS(state, ultimasNoticias) {
        state.ultimasNoticias = ultimasNoticias;
    },

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
		}
}

const actions = {
    async getMelhoresFeiras({ commit }) {
        try {
            const res = await fetchMelhoresFeiras();
            commit("SET_MELHORES_FEIRAS", res.data.feiras)
        } catch (error) {
            console.log(error)
        }
		},
		
		async getEstandesDeFeira({ commit }, id) {
			try {
				const res = await fetchEstandesDeFeira(id);
				commit("SET_ESTANDES", res.data);
		} catch (error) {
				console.log(error)
		}
		},

    async getUltimasNoticias({ commit }) {
        try {
            const res = await fetchUltimasNoticias();
            commit("SET_ULTIMAS_NOTICIAS", res.data.noticias)
        } catch (error) {
            console.log(error)
        }
    },

    async getFeira({ commit }, id) {
        try {
            const res = await fetchFeira(id);
            commit("SET_FEIRA", res.data);
        } catch (error) {
            console.log(error)
        }
    },

    async getProdutosDeFeira({ commit }, id) {
        try {
            const res = await fetchProdutosDeFeira(id);
            commit("SET_PRODUTOS", res.data);
        } catch (error) {
            console.log(error)
        }
    },

    async getNoticiasDeFeira({ commit }, id) {
        try {
            const res = await fetchNoticiasDeFeira(id);
            commit("SET_NOTICIAS", res.data);
        } catch (error) {
            console.log(error)
        }
    },

    async getAvaliacaoDoUsuario({ commit }, payload) {
        try {
            const res = await fetchAvaliacaoDoUsuario(payload.idFeira, payload.idUsuario);
            commit("SET_AVALIACAO_USUARIO", res.data);
        } catch (error) {
            console.log(error)
        }
    },

    async actionAvaliarFeira({ commit }, payload) {
        try {
            const res = await avaliarFeira(payload.idUsuario, payload.idFeira, payload.nota);
        } catch (error) {
            console.log(error)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}