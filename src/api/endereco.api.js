import axios from 'axios'

const buscarEnderecoPorCep = (cep) => axios.get(`https://viacep.com.br/ws/${cep}/json/`)

export {
    buscarEnderecoPorCep
}