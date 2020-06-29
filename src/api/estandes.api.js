import httpClient from "./httpClient.js";

const endpointEstandes = process.env.VUE_APP_ENDPOINT_ESTANDES

const fetchUltimasNoticias = () => httpClient.get(`${endpointEstandes}/ultimas-noticias`);

const fetchEstande = (id) => httpClient.get(`${endpointEstandes}/${id}`)

const fetchProdutosDeEstande = (id) => httpClient.get(`${endpointEstandes}/${id}/produtos`)

const fetchNoticiasDeEstande = (id) => httpClient.get(`${endpointEstandes}/${id}/noticias`)

// const fetchAvaliacaoDoUsuario = (idEstande, idUsuario) => httpClient.get();  

const avaliarEstande = (idUsuario, idEstande, nota) => httpClient.post(`${endpointEstandes}/${idEstande}/avaliar`, {idUsuario, nota});

export {
    fetchUltimasNoticias,
    fetchEstande,
    fetchProdutosDeEstande,
    fetchNoticiasDeEstande,
		avaliarEstande
};