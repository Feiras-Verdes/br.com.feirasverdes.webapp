import httpClient from "./httpClient.js";

const endpointFeiras = process.env.VUE_APP_ENDPOINT_FEIRAS

const fetchMelhoresFeiras = () => httpClient.get(`${endpointFeiras}/pesquisar-melhores-feiras`);

const fetchUltimasNoticias = () => httpClient.get(`${endpointFeiras}/ultimas-noticias`);

const fetchFeira = (id) => httpClient.get(`${endpointFeiras}/${id}`);

// const fetchProdutosDeFeira = (id) => httpClient.get(`${endpointFeiras}/${id}/produtos`)

const fetchNoticiasDeFeira = (id) => httpClient.get(`${endpointFeiras}/${id}/noticias`);

// const fetchAvaliacaoDoUsuario = (idFeira, idUsuario) => httpClient.get();

const avaliarFeira = (idUsuario, idFeira, nota) => httpClient.post(`${endpointFeiras}/${idFeira}/avaliar`, {idUsuario, nota});

const fetchEstandesDeFeira = (id) => httpClient.get(`${endpointFeiras}/${id}/estandes`);

const cadastrarFeira = (feira) => httpClient.post(`${endpointFeiras}/cadastrar`, feira);

const salvarFeiraEditada = (idFeira, formData) => httpClient.put(`${endpointFeiras}/${idFeira}/atualizar`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

const excluirFeira = (idFeira) => httpClient.delete(`${endpointFeiras}/${idFeira}/excluir`, idFeira);

const fetchFeirasDoOrganizador = (idUsuario) => httpClient.get(`${endpointFeiras}/listar-por-organizador/${idUsuario}`);

export {
	fetchEstandesDeFeira,
	fetchMelhoresFeiras,
    fetchUltimasNoticias,
    fetchFeira,
    fetchNoticiasDeFeira,
    avaliarFeira,
    cadastrarFeira,
    excluirFeira,
    fetchFeirasDoOrganizador,
    salvarFeiraEditada
};