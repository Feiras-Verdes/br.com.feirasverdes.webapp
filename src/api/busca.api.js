import httpClient from "./httpClient.js";

const endpointBusca = process.env.VUE_APP_ENDPOINT_BUSCA

const fetchBuscaProduto = (nome, limite, pagina, ordenacao, tipoOrdenacao) => httpClient.get(`${endpointBusca}/produtos`, 
{params:{nome, limite, pagina, ordenacao, tipoOrdenacao}});
const fetchBuscaEstande = (nome, limite, pagina, ordenacao, tipoOrdenacao) => httpClient.get(`${endpointBusca}/estandes`,
{params:{nome, limite, pagina, ordenacao, tipoOrdenacao}});
const fetchBuscaFeira = (nome, limite, pagina, ordenacao, tipoOrdenacao) => httpClient.get(`${endpointBusca}/feiras`,
{params:{nome, limite, pagina, ordenacao, tipoOrdenacao}});


export {
    fetchBuscaProduto,
    fetchBuscaEstande,
    fetchBuscaFeira
};