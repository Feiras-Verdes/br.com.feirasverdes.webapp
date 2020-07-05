const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = express();
const porta = 8081;

api.use(bodyParser.json());
api.use(cors());
api.use(express.urlencoded({ extended: true }));

// definir objetos para enviar para front-end
let usuario = {
    "id": 1,
    "nome": "Teste",
    "email": "teste@email.com",
    "senha": "123",
    "tipoUsuario": {
        "descricao": "ORGANIZADOR"
    }
};

const autorizacao = "token";

const melhoresFeiras = {
    "feiras": [
        {
            "id": 1,
            "nome": "Feira do Lucas",
            "avaliacao": 5.0,
            "endereco": {
                "logradouro": "Rua",
                "numero": 12,
                "bairro": "Bairro",
                "cidade": "Cidade",
                "estado": "ES"
            },
            "contato": "(48)99999-9999",
            "estandes": [
                {
                    "usuario": {
                        "nome": "Lucas"
                    },
                    "horaInicio": "10:00",
                    "horaInicio": "18:00",
                    "id": 1,
                    "nome": "Estande 1",
                    "avaliacao": 3.5,
                    "endereco": {
                        "logradouro": "Rua",
                        "numero": 12,
                        "bairro": "Bairro",
                        "cidade": "Cidade",
                        "estado": "ES"
                    },
                    "contato": "(48)99999-9999",
                    "noticias": [
                        {
                            "id": 1,
                            "usuario": {
                                "nome": "Lucas"
                            },
                            "dataPublicacao": "24/05/2020",
                            "imagem": "https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                            "titulo": "Chegaram os produtos!",
                            "descricao": "Chegaram couves e abóboras!",
                        },
                        {
                            "id": 2,
                            "usuario": {
                                "nome": "Lucas"
                            },
                            "dataPublicacao": "24/05/2020",
                            "imagem": "https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                            "titulo": "Chegaram os produtos!",
                            "descricao": "Chegaram couves e abóboras!",
                        }
                    ],
                    "produtos": [
                        {
                            "id": 1,
                            "nome": "Beterraba",
                            "preco": 3.50,
                            "unidade": "kg",
                            "descricao": "Beterrabas roxas do Iraque",
                            "imagem": "data:image/jpeg;base64,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"
                        },
                        {
                            "id": 2,
                            "nome": "Melancia",
                            "preco": 10.00,
                            "unidade": "unidade",
                            "descricao": "Melancias azedas do Alasca"
                        }
                    ]
                },

                {
                    "usuario": {
                        "nome": "Lais"
                    },
                    "horaInicio": "13:00",
                    "horaInicio": "20:00",
                    "id": 2,
                    "nome": "Estande Bonito",
                    "avaliacao": 3.5,
                    "endereco": {
                        "logradouro": "Rua",
                        "numero": 12,
                        "bairro": "Bairro",
                        "cidade": "Cidade",
                        "estado": "ES"
                    },
                    "contato": "(48)99999-9999",
                    "noticias": [
                        {
                            "id": 1,
                            "usuario": {
                                "nome": "Lucas"
                            },
                            "dataPublicacao": "24/05/2020",
                            "imagem": "https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                            "titulo": "Chegaram os produtos!",
                            "descricao": "Chegaram couves e abóboras!",
                        },
                        {
                            "id": 2,
                            "usuario": {
                                "nome": "Lucas"
                            },
                            "dataPublicacao": "24/05/2020",
                            "imagem": "https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                            "titulo": "Chegaram os produtos!",
                            "descricao": "Chegaram couves e abóboras!",
                        }
                    ],
                    "produtos": [
                        {
                            "id": 1,
                            "nome": "Beterraba",
                            "preco": 3.50,
                            "unidade": "kg",
                            "descricao": "Beterrabas roxas do Iraque",
                            "imagem": "data:image/jpeg;base64,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"
                        },
                        {
                            "id": 2,
                            "nome": "Melancia",
                            "preco": 10.00,
                            "unidade": "unidade",
                            "descricao": "Melancias azedas do Alasca"
                        }
                    ]
                }
            ],
            "noticias": [
                {
                    "id": 1,
                    "usuario": {
                        "nome": "Lucas",
                        "id": 1
                    },
                    "dataPublicacao": "24/05/2020",
                    "imagem": "https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                    "titulo": "Acabaram os produtos!",
                    "descricao": "Acabaram as couves e abóboras!",
                },
                {
                    "id": 2,
                    "usuario": {
                        "nome": "Lucas",
                        "id": 1
                    },
                    "dataPublicacao": "24/05/2020",
                    "imagem": "https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                    "titulo": "Chegaram os produtos!",
                    "descricao": "Chegaram couves e abóboras!",
                }],
            "produtos": [
                {
                    "id": 1,
                    "nome": "Beterraba",
                    "preco": 3.50,
                    "unidade": "kg",
                    "descricao": "Beterrabas roxas do Iraque",
                    "imagem": "data:image/jpeg;base64,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"
                },
                {
                    "id": 2,
                    "nome": "Melancia",
                    "preco": 10.00,
                    "unidade": "unidade",
                    "descricao": "Melancias azedas do Alasca"
                }
            ]
        },
        {
            "id": 2,
            "nome": "Feira da Natália",
            "avaliacao": 4.5,
            "endereco": {
                "logradouro": "Rua",
                "numero": 12,
                "bairro": "Bairro",
                "cidade": "Cidade",
                "estado": "ES"
            },
            "contato": "(48)99999-9999"
        },
        {
            "id": 4,
            "nome": "Feira da Jhully",
            "avaliacao": 4.0,
            "endereco": {
                "logradouro": "Rua",
                "numero": 12,
                "bairro": "Bairro",
                "cidade": "Cidade",
                "estado": "ES"
            },
            "contato": "(48)99999-9999"
        },
        {
            "id": 3,
            "nome": "Feira da Laís",
            "avaliacao": 3.5,
            "endereco": {
                "logradouro": "Rua",
                "numero": 12,
                "bairro": "Bairro",
                "cidade": "Cidade",
                "estado": "ES"
            },
            "contato": "(48)99999-9999"
        },
    ]
};

const ultimasNoticias = {
    "noticias": [
        {
            "id": 1,
            "usuario": {
                "nome": "Lucas"
            },
            "dataPublicacao": "24/05/2020",
            "imagem": "https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            "titulo": "Chegaram os produtos!",
            "descricao": "Chegaram couves e abóboras!"
        },
        {
            "id": 2,
            "usuario": {
                "nome": "Natália"
            },
            "dataPublicacao": "24/05/2020",
            "imagem": "",
            "titulo": "Não abrirei hoje",
            "descricao": "Por motivos de coronga, não poderem atender hoje."
        }
    ]
};

/* definir endpoints
exemplo: 

api.get("/endpoint", (requisição, resposta) => {
    resposta.send(obetoDeclaradoAcima)  
})
*/
api.get("/usuarios/detalhes", (req, res) => {
    if (req.headers.authorization) {
        res.send(usuario)
    }
    else res.send(null)
})

api.post("/usuarios/cadastrar", (req, res) => {
    usuario = req.body;
    usuario.id = 1;
    usuario.tipoUsuario.descricao = "ORGANIZADOR"
    res.send(true);
})

api.put("/usuarios/:id", (req, res) => {
    usuario = req.body;
    console.log(req)
    res.send(true);
})

api.put("/usuarios/:id/imagem", (req, res) => {
    console.log(req)
    usuario.imagem = req.body;
    res.send(true);
})

api.get("/usuarios/:id/estandes", (req, res) => {
    res.send(melhoresFeiras.feiras[0].estandes);
})

api.get("/usuarios/:id/feiras", (req, res) => {
    res.send(melhoresFeiras.feiras);
})

api.post("/usuarios/login", (req, res) => {
    console.Co
    if (req.body.email == usuario.email && req.body.senha == usuario.senha) {
        res.send({ "token": "token", "idUsuario": usuario.id })
    } else {
        res.status(401).json({
            "error": "Unauthorized",
            "message": "Unauthorized"
        })
    }
})

api.get("/feiras/listar-por-organizador/:id", (req, res) => {
    res.send(melhoresFeiras.feiras);
})

api.get("/feiras/melhores-feiras", (req, res) => {
    res.send(melhoresFeiras);
})

api.get("/feiras/ultimas-noticias", (req, res) => {
    res.send(ultimasNoticias);
})

api.get("/feiras/:idFeira", (req, res) => {
    res.send(melhoresFeiras.feiras[req.params.idFeira - 1]);
})

api.get("/feiras/:idFeira/produtos", (req, res) => {
    res.send(melhoresFeiras.feiras[req.params.idFeira - 1].produtos);
})

api.get("/feiras/:idFeira/estandes", (req, res) => {
    res.send(melhoresFeiras.feiras[0].estandes);
})

api.get("/feiras/:idFeira/produtos/:idProduto", (req, res) => {
    res.send(melhoresFeiras.feiras[req.params.idFeira - 1].produtos[req.params.idProduto - 1]);
})

api.get("/feiras/:idFeira/noticias", (req, res) => {
    res.send(melhoresFeiras.feiras[0].noticias);
})

api.get("/feiras/:idFeira/produtos/:idNoticia", (req, res) => {
    res.send(melhoresFeiras.feiras[req.params.idFeira - 1].noticias[req.params.idNoticia - 1]);
})

api.get("/feiras/:idFeira/avaliar", (req, res) => {
    res.send(true);
})


api.get("/estandes/ultimas-noticias", (req, res) => {
    res.send(ultimasNoticias);
})

api.get("/estandes/:idEstande", (req, res) => {
    res.send(melhoresFeiras.feiras[0].estandes[req.params.idEstande - 1]);
})

api.get("/estandes/:idEstande/produtos", (req, res) => {
    res.send(melhoresFeiras.feiras[0].estandes[req.params.idEstande - 1].produtos);
})

api.get("/estandes/:idEstande/produtos/:idProduto", (req, res) => {
    res.send(melhoresFeiras.feiras[0].estandes[req.params.idEstande - 1].produtos[req.params.idProduto - 1]);
})

api.get("/estandes/:idEstande/noticias", (req, res) => {
    res.send(melhoresFeiras.feiras[0].estandes[req.params.idEstande - 1].noticias);
})

api.get("/estandes/:idEstande/produtos/:idNoticia", (req, res) => {
    res.send(melhoresFeiras.feiras[0].estandes[req.params.idEstande - 1].noticias[req.params.idNoticia - 1]);
})

api.get("/estandes/:idEstande/avaliar", (req, res) => {
    res.send(true);
})
// escutar na porta definida
api.listen(porta);