const state = {
    mostrarMensagem: false,
    mensagem: "",
    tipo: ""
};

const mutations = {
    MOSTRAR_MENSAGEM(state, mostrarMensagem) {
        state.mostrarMensagem = mostrarMensagem;
    },

    SET_MENSAGEM(state, mensagem) {
        state.mensagem = mensagem;
    },

    SET_TIPO(state, tipo) {
        state.tipo = tipo
    }
};

const actions = {
    setMostrarMensagem({ commit }, mostrarMensagem) {
        commit("MOSTRAR_MENSAGEM", mostrarMensagem);
    },

    setMensagem({ commit }, mensagem) {
        commit("SET_MENSAGEM", mensagem);
    },

    setTipo({ commit }, tipo) {
        commit("SET_TIPO", tipo)
    },

    mostrarMensagem({ dispatch }, mensagem) {
        dispatch("setMensagem", mensagem.mensagem);
        dispatch("setTipo", mensagem.tipo);
        dispatch("setMostrarMensagem", true);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}