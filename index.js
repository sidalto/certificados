const express = require('express');
const routes = require('./routes');

const app = express();
const porta = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(routes);

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
