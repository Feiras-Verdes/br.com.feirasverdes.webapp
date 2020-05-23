import httpClient from "./httpClient.js";

const endpointFeiras = process.env.VUE_APP_ENDPOINT_FEIRAS

const fetchMelhoresFeiras = () => httpClient.get(`${endpointFeiras}/melhores-feiras`);

const fetchUltimasNoticias = () => httpClient.get(`${endpointFeiras}/ultimas-noticias`);

const fetchFeira = (id) => httpClient.get(`${endpointFeiras}/${id}`)

const fetchProdutosDeFeira = (id) => httpClient.get(`${endpointFeiras}/${id}/produtos`)

const fetchNoticiasDeFeira = (id) => httpClient.get(`${endpointFeiras}/${id}/noticias`)

// const fetchAvaliacaoDoUsuario = (idFeira, idUsuario) => httpClient.get();

const avaliarFeira = (idUsuario, idFeira, nota) => httpClient.post(`${endpointFeiras}/${idFeira}/avaliar`, {idUsuario, nota});

export {
	fetchMelhoresFeiras,
    fetchUltimasNoticias,
    fetchFeira,
    fetchProdutosDeFeira,
    fetchNoticiasDeFeira,
    avaliarFeira
};