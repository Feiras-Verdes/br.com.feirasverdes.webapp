import httpClient from "./httpClient.js";

const endpointUsuarios = process.env.VUE_APP_ENDPOINT_USUARIOS

const fazerLogin = (email, senha) => httpClient.post(`${endpointUsuarios}/login`, { email, senha });

const fetchDetalhesDoUsuario = () => httpClient.get(`${endpointUsuarios}`);

const cadastrarUsuarioApi = (usuario) => httpClient.post(`${endpointUsuarios}`, usuario);

const salvarUsuarioAtualizado = (idUsuario, formData) => httpClient.put(`${endpointUsuarios}/${idUsuario}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

const excluirUsuario = (idUsuario) =>  httpClient.delete(`${endpointUsuarios}/${idUsuario}`);

const fetchEstandesDoFeirante = (idUsuario) => httpClient.get(`${endpointUsuarios}/${idUsuario}/estandes`);

const fetchFeirasDoOrganizador = (idUsuario) => httpClient.get(`${endpointUsuarios}/${idUsuario}/feiras`);

export {
    fazerLogin,
    fetchDetalhesDoUsuario,
    cadastrarUsuarioApi,
    salvarUsuarioAtualizado,
    excluirUsuario,
    fetchEstandesDoFeirante,
    fetchFeirasDoOrganizador
};