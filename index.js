const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const dados = require('./dados.json');

const app = express();
const porta = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(routes);

app.listen(porta, () => { console.log(`Servidor rodando na porta ${porta}`) });