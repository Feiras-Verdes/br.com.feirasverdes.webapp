import httpClient from "./httpClient.js";

const cadastrarNoticia = (noticia) => httpClient.post("/noticias", noticia, { headers: { 'Content-Type': 'multipart/form-data' } });

const atualizarNoticia = (idNoticia, noticia) => httpClient.put(`/noticias/${idNoticia}`, noticia, { headers: { 'Content-Type': 'multipart/form-data' } });

const excluirNoticia = (idNoticia) => httpClient.delete(`/noticias/${idNoticia}`);

export {
    cadastrarNoticia,
    atualizarNoticia,
    excluirNoticia
}