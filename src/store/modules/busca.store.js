import { fetchBuscaProduto, fetchBuscaEstande, fetchBuscaFeira } from '@/api/busca.api'

const state = {
    nome: "",
    limite: 10,
    pagina: 0,
    ordenacao: "",
    tipoOrdenacao: "asc",
    estandes: [],
    feiras: [],
    produtos: []
}

const mutations = {
    SET_NOME(state, nome){
        state.nome = nome
    },
    SET_LIMITE(state, limite){
        state.limite = limite
    },
    SET_PAGINA(state, pagina){
        state.pagina = pagina
    },
    SET_ORDENACAO(state, ordenacao){
        state.ordenacao = ordenacao
    },
    SET_TIPO_ORDENACAO(state, tipoOrdenacao){
        state.tipoOrdenacao = tipoOrdenacao
    },
    SET_ESTANDE(state, estandes){
        state.estandes = estandes
    },
    SET_FEIRA(state, feiras){
        state.feiras = feiras
    },
    SET_PRODUTO(state, produtos){
        state.produtos = produtos
    }
}

const actions = {
   async getEstandes({state,commit}){
        try{
            const res = await fetchBuscaEstande(state.nome, state.limite, state.pagina, state.ordenacao, state.tipoOrdenacao)
            commit("SET_ESTANDE", res.data)
        }catch (error) {
            console.log(error);
            this.dispatch("Mensagens/mostrarMensagem", { mensagem: "Erro ao buscar estandes", tipo: "error"});
        }
    },
    async getFeiras({state,commit}){
        try{
            const res = await fetchBuscaFeira(state.nome, state.limite, state.pagina, state.ordenacao, state.tipoOrdenacao)
            commit("SET_FEIRA", res.data)
        }catch (error) {
            console.log(error);
            this.dispatch("Mensagens/mostrarMensagem", { mensagem: "Erro ao buscar feiras", tipo: "error"});
        }
    },

    async getFeiras2({state,commit}, nome){
        try{
            const res = await fetchBuscaFeira(nome, state.limite, state.pagina, state.ordenacao, state.tipoOrdenacao)
            commit("SET_FEIRA", res.data)
        }catch (error) {
            console.log(error);
            this.dispatch("Mensagens/mostrarMensagem", { mensagem: "Erro ao buscar feiras", tipo: "error"});
        }
    },

    async getProdutos({state,commit}){
        try{
            const res = await fetchBuscaProduto(state.nome, state.limite, state.pagina, state.ordenacao, state.tipoOrdenacao)
            commit("SET_PRODUTO", res.data)
        }catch (error) {
            console.log(error);
            this.dispatch("Mensagens/mostrarMensagem", { mensagem: "Erro ao buscar produtos", tipo: "error"});
        }
    },
    setOrdenacao({commit}, ordenacao){
        commit("SET_ORDENACAO", ordenacao)
    },
    setTipoOrdenacao({commit}, tipoOrdenacao){
        commit("SET_TIPO_ORDENACAO", tipoOrdenacao)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}