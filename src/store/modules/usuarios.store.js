import router from "@/router";
import { fetchDetalhesDoUsuario, fazerLogin, cadastrarUsuarioApi, salvarUsuarioAtualizado } from "@/api/usuarios.api"
import { converterBytesParaDataUrl } from "@/utils/utils.js"

const state = {
    usuario: null
}

const mutations = {
    SET_USUARIO(state, usuario) {
        state.usuario = usuario;
    },

    SET_IMAGEM(state, imagem) {
        state.usuario.imagem = imagem;
    }
}

const actions = {
    async login({ dispatch }, payload) {
        try {
            const response = await fazerLogin(payload.email, payload.senha);
            localStorage.setItem("token-usuario", response.data.token);
            await dispatch("fetchDetalhesDoUsuario")
            router.push("/");
        } catch (error) {
            if (error.response.status == 401) {
                this.dispatch("Mensagens/mostrarMensagem", { mensagem: "Usuário e/ou senha incorretos", tipo: "error"});
            }
        }
    },

    async logout({ commit }) {
        try {
            localStorage.removeItem("token-usuario")
            commit("SET_USUARIO", null)
            router.push("/login");
        } catch (error) {
            if (error.response.status == 401) {
                console.log(error);
            }
        }
    },

    async fetchDetalhesDoUsuario({ state, commit }) {
        try {
            if (localStorage.getItem("token-usuario")) {
                const res = await fetchDetalhesDoUsuario();
                commit("SET_USUARIO", res.data);
                commit("SET_IMAGEM", converterBytesParaDataUrl(state.usuario.imagem))
            }
        } catch (error) {
            console.log(error);
            localStorage.removeItem("token-usuario");
        }
    },

    async cadastrarUsuario({ commit }, payload) {
        try {
            const res = await cadastrarUsuarioApi(payload)
            this.dispatch("Mensagens/mostrarMensagem", { mensagem: "Cadastro efetuado com sucesso!", tipo: "success"});
            router.push("/login");
        } catch (error) {
            console.log(error);
            this.dispatch("Mensagens/mostrarMensagem", { mensagem: "Cadastro inválido. Verifique seus dados.", tipo: "error"});
        }
    },

    async atualizarUsuario({ dispatch }, payload) {
        try {
            const res = await salvarUsuarioAtualizado(payload.id, payload.formData);
            this.dispatch("Mensagens/mostrarMensagem", { mensagem: "Usuário atualizado com sucesso!", tipo: "success"});
            dispatch("fetchDetalhesDoUsuario");
        } catch (error) {
            console.log(error);
            this.dispatch("Mensagens/mostrarMensagem", { mensagem: "Dados inválidos.", tipo: "error"});
        }
    }

}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}