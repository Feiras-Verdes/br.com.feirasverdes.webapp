import httpClient from "./httpClient.js";

const cadastrarProduto = (produto) => httpClient.post("/produtos", produto, { headers: { 'Content-Type': 'multipart/form-data' } });

const atualizarProduto = (idProduto, produto) => httpClient.put(`/produtos/${idProduto}`, produto, { headers: { 'Content-Type': 'multipart/form-data' } });

const excluirProduto = (idProduto) => httpClient.delete(`/produtos/${idProduto}`);

export {
    cadastrarProduto,
    atualizarProduto,
    excluirProduto
}