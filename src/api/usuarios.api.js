import httpClient from "./httpClient.js";

const endpointUsuarios = process.env.VUE_APP_ENDPOINT_USUARIOS

const fazerLogin = (email, senha) => httpClient.post(`${endpointUsuarios}/login`, { email , senha });

const fetchDetalhesDoUsuario = () => httpClient.get(`${endpointUsuarios}/detalhes`);

const cadastrarUsuarioApi = (usuario) => httpClient.put(`${endpointUsuarios}`, usuario);

export {
	fazerLogin,
    fetchDetalhesDoUsuario,
    cadastrarUsuarioApi
};