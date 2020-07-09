import httpClient from "./httpClient.js";

const endpointEstandes = process.env.VUE_APP_ENDPOINT_ESTANDES;
const endpointNoticias = process.env.VUE_APP_ENDPOINT_NOTICIAS;

//CRUD ESTANDE
const cadastrarEstande = (estande) =>
  httpClient.post(`${endpointEstandes}`, estande);

const atualizarEstande = (id, formData) =>
  httpClient.put(`${endpointEstandes}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

const excluirEstande = (id) => httpClient.delete(`${endpointEstandes}/${id}`);

const fetchEstande = (id) => httpClient.get(`${endpointEstandes}/${id}`);

// NOTICIAS
const fetchUltimasNoticias = () =>
  httpClient.get(`${endpointEstandes}/ultimas-noticias`);

const fetchProdutosDeEstande = (id) =>
  httpClient.get(`${endpointEstandes}/${id}/produtos`);

const fetchNoticiasDeEstande = (id) =>
  httpClient.get(`${endpointEstandes}/${id}/noticias`);

const avaliarEstande = (idUsuario, idEstande, nota) =>
  httpClient.post(`${endpointEstandes}/${idEstande}/avaliar`, {
    idUsuario,
    nota,
  });

  const cadastrarNoticiaEmEstande = (noticia) => httpClient.post("/noticias/cadastrar", noticia, { headers: { 'Content-Type': 'multipart/form-data' } });


export {
  fetchUltimasNoticias,
  fetchEstande,
  fetchProdutosDeEstande,
  fetchNoticiasDeEstande,
  avaliarEstande,
  cadastrarEstande,
  atualizarEstande,
  excluirEstande,
  cadastrarNoticiaEmEstande,
};
