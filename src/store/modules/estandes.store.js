import { fetchUltimasNoticias, fetchProdutosDeEstande, fetchNoticiasDeEstande, fetchEstande, avaliarEstande } from "@/api/estandes.api"

const state = {
    ultimasNoticias: {},
    estande: {},
    produtos: {},
    noticias: {},
    avaliacaoDoUsuario: -1
}

const mutations = {
    SET_ULTIMAS_NOTICIAS(state, ultimasNoticias) {
        state.ultimasNoticias = ultimasNoticias;
    },

    SET_ESTANDE(state, estande) {
        state.estande = estande;
    },

    SET_PRODUTOS(state, produtos) {
        state.produtos = produtos;
    },

    SET_NOTICIAS(state, noticias) {
        state.noticias = noticias;
    },

    SET_AVALIACAO_USUARIO(state, avaliacaoDoUsuario) {
        state.avaliacaoDoUsuario = avaliacaoDoUsuario;
    }
}

const actions = {
    async getUltimasNoticias({ commit }) {
        try {
            const res = await fetchUltimasNoticias();
            commit("SET_ULTIMAS_NOTICIAS", res.data.noticias)
        } catch (error) {
            console.log(error)
        }
    },

    async getEstande({ commit }, id) {
        try {
            const res = await fetchEstande(id);
            commit("SET_ESTANDE", res.data);
        } catch (error) {
            console.log(error)
        }
    },

    async getProdutosDeEstande({ commit }, id) {
        try {
            const res = await fetchProdutosDeEstande(id);
            commit("SET_PRODUTOS", res.data);
        } catch (error) {
            console.log(error)
        }
    },

    async getNoticiasDeEstande({ commit }, id) {
        try {
            const res = await fetchNoticiasDeEstande(id);
            commit("SET_NOTICIAS", res.data);
        } catch (error) {
            console.log(error)
        }
    },

    async getAvaliacaoDoUsuario({ commit }, payload) {
        try {
            const res = await fetchAvaliacaoDoUsuario(payload.idEstande, payload.idUsuario);
            commit("SET_AVALIACAO_USUARIO", res.data);
        } catch (error) {
            console.log(error)
        }
    },

    async actionAvaliarEstande({ commit }, payload) {
        try {
            const res = await avaliarEstande(payload.idUsuario, payload.idEstande, payload.nota);
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