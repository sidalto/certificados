const express = require('express');
const AlunoController = require('./controllers/AlunoController');
const routes = express.Router();

routes.get('/', AlunoController.getAlunos);
routes.get('/aluno/:id', AlunoController.getAluno);
routes.get('/criar', AlunoController.criar);
routes.post('/inserir', AlunoController.inserir);
routes.get('/editar', AlunoController.editar);
routes.put('/atualizar/:id', AlunoController.atualizar);
routes.delete('/excluir/:id', AlunoController.excluir);

module.exports = routes;