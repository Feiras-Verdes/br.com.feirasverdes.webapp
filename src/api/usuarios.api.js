import httpClient from "./httpClient.js";

const endpointUsuarios = process.env.VUE_APP_ENDPOINT_USUARIOS

const fazerLogin = (email, senha) => httpClient.post(`${endpointUsuarios}/login`, { email, senha });

const fetchDetalhesDoUsuario = () => httpClient.get(`${endpointUsuarios}/detalhes`);

const cadastrarUsuarioApi = (usuario) => httpClient.post(`${endpointUsuarios}/cadastrar`, usuario);

const salvarUsuarioAtualizado = (idUsuario, formData) => httpClient.put(`${endpointUsuarios}/${idUsuario}/atualizar`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

const excluirUsuario = (idUsuario) =>  httpClient.put(`${endpointUsuarios}/${idUsuario}/excluir`);

export {
    fazerLogin,
    fetchDetalhesDoUsuario,
    cadastrarUsuarioApi,
    salvarUsuarioAtualizado,
    excluirUsuario
};