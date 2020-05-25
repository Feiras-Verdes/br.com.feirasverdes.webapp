import router from "@/router";
import { fetchDetalhesDoUsuario, fazerLogin, cadastrarUsuarioApi, salvarUsuarioAtualizado, uploadImagem } from "@/api/usuarios.api"


const state = {
    usuario: null,
    loginInvalido: false,
    cadastroInvalido: false
}

const mutations = {
    SET_USUARIO(state, usuario) {
        state.usuario = usuario;
    },

    SET_LOGIN_INVALIDO(state, loginInvalido) {
        state.loginInvalido = loginInvalido
    },

    SET_CADASTROINVALIDO(state, cadastroInvalido) {
        state.cadastroInvalido = cadastroInvalido
    }
}

const actions = {
    async login({ commit, dispatch }, payload) {
        try {
            commit("SET_LOGIN_INVALIDO", false);
            const response = await fazerLogin(payload.email, payload.senha);
            localStorage.setItem("token-usuario", response.data);
            await dispatch("fetchDetalhesDoUsuario")
            router.push("/");
        } catch (error) {
            if (error.response.status == 401) {
                commit("SET_LOGIN_INVALIDO", true);
            }
        }
    },

    async logout({ commit }) {
        try {
            localStorage.removeItem("token-usuario")
            commit("SET_USUARIO", null)
            router.push("/login");
        } catch (error) {
            if (error.res.status == 401) {
                console.log(error);
            }
        }
    },

    async fetchDetalhesDoUsuario({ commit }) {
        try {
            const res = await fetchDetalhesDoUsuario();
            commit("SET_USUARIO", res.data);
        } catch (error) {
            console.log(error);
        }
    },

    async cadastrarUsuario({ commit }, payload) {
        try {
            commit("SET_CADASTROINVALIDO", false)
            const res = await cadastrarUsuarioApi(payload)
            router.push("/login");
        } catch (error) {
            console.log(error);
            commit("SET_CADASTROINVALIDO", true);
        }
    },

    async atualizarUsuario({ dispatch }, payload) {

        try {
            const res = await salvarUsuarioAtualizado(payload.id, payload.usuario);
            dispatch("fetchDetalhesDoUsuario");
        } catch (error) {
            console.log(error);
        }
    },

    async enviarImagem({}, payload) {
        try {
            console.log(payload.foto)
            const res = await uploadImagem(payload.id, payload.foto);
        } catch (error) {
            console.log(error);
        }
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}