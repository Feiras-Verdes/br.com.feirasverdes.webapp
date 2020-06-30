import httpClient from "./httpClient.js";

const endpointBusca = process.env.VUE_APP_ENDPOINT_BUSCA

const fetchBuscaProduto = () => httpClient.get(`${endpointBusca}/produtos`);
const fetchBuscaEstande = () => httpClient.get(`${endpointBusca}/estandes`);
const fetchBuscaFeira = () => httpClient.get(`${endpointBusca}/feiras`);


export {
    fetchBuscaProduto,
    fetchBuscaEstande,
    fetchBuscaFeira
};