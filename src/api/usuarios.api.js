import httpClient from "./httpClient.js";

const endpointUsuarios = process.env.VUE_APP_ENDPOINT_USUARIOS

const fazerLogin = (email, senha) => httpClient.post(`${endpointUsuarios}/login`, { email, senha });

const fetchDetalhesDoUsuario = () => httpClient.get(`${endpointUsuarios}/detalhes`);

const cadastrarUsuarioApi = (usuario) => httpClient.post(`${endpointUsuarios}`, usuario);

const salvarUsuarioAtualizado = (idUsuario, usuario) => httpClient.put(`${endpointUsuarios}/${idUsuario}`, usuario, { headers: { 'Content-Type': 'multipart/form-data' } });

const uploadImagem = (idUsuario, imagem) => httpClient.put(`${endpointUsuarios}/${idUsuario}/imagem`, imagem, {
    headers: {
        'Content-Type': imagem.type
    }
});

export {
    fazerLogin,
    fetchDetalhesDoUsuario,
    cadastrarUsuarioApi,
    salvarUsuarioAtualizado,
    uploadImagem
};