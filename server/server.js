const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = express();
const porta = 8081;

api.use(bodyParser.json());
api.use(cors());
api.use(express.urlencoded({ extended: true }));

// definir objetos para enviar para front-end


/* definir endpoints
exemplo: 

api.get("/endpoint", requisição, resposta) {
    resposta.send(obetoDeclaradoAcima)
}
*/


// escutar na porta definida
app.listen(port);