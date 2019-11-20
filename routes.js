const express = require('express');
const AlunoController = require('./controllers/AlunoController');
const routes = express.Router();

routes.get('/', AlunoController.getAlunos);
routes.get('/aluno/:id', AlunoController.getAluno);
routes.post('/inserir', AlunoController.inserir);
routes.put('/atualizar/:id', AlunoController.atualizar);
routes.delete('/excluir/:id', AlunoController.excluir);
routes.post('/imprimir', AlunoController.imprimir);

module.exports = routes;