import httpClient from "./httpClient.js";

const endpointFeiras = process.env.VUE_APP_ENDPOINT_FEIRAS

// CRUD FEIRA
const cadastrarFeira = (feira) => httpClient.post(`${endpointFeiras}`, feira);

const salvarFeiraEditada = (idFeira, formData) => httpClient.put(`${endpointFeiras}/${idFeira}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

const excluirFeira = (idFeira) => httpClient.delete(`${endpointFeiras}/${idFeira}`);

const fetchFeira = (id) => httpClient.get(`${endpointFeiras}/${id}`);

const fetchMelhoresFeiras = () => httpClient.get(`${endpointFeiras}/pesquisar-melhores-feiras`);

const fetchUltimasNoticias = () => httpClient.get(`${endpointFeiras}/ultimas-noticias`);

const cadastrarNoticiaEmFeira = (idFeira, noticia) => httpClient.post(`${endpointFeiras}/${idFeira}/noticias`, noticia, { headers: { 'Content-Type': 'multipart/form-data' } });

const fetchNoticiasDeFeira = (id) => httpClient.get(`${endpointFeiras}/${id}/noticias`);

const fetchEstandesDeFeira = (id) => httpClient.get(`${endpointFeiras}/${id}/estandes`);

const cadastrarNoticiaEmFeira = (noticia) => httpClient.post("/noticias/cadastrar", noticia, { headers: { 'Content-Type': 'multipart/form-data' } });

const removerEstandeDeFeira = (idFeira, idEstande) => httpClient.delete(`${endpointFeiras}/${idFeira}/estandes/${idEstande}`);

const avaliarFeira = (idUsuario, idFeira, nota) => httpClient.post(`${endpointFeiras}/${idFeira}/avaliar`, { idUsuario, nota });

export {
    fetchEstandesDeFeira,
    fetchMelhoresFeiras,
    fetchUltimasNoticias,
    fetchFeira,
    fetchNoticiasDeFeira,
    avaliarFeira,
    cadastrarFeira,
    excluirFeira,
    salvarFeiraEditada,
    cadastrarNoticiaEmFeira,
    removerEstandeDeFeira
};