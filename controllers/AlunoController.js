const Aluno = require('../models/Aluno');

function getAlunos(res, res) {
  Aluno.getAlunos()
    .then(alunos => {
      res.render('../views/index.ejs', { alunos });
    })
    .catch(erro => res.render('../views/index.ejs', { erro }));
}

function getAluno(req, res) {
  const { id } = req.params;
  Aluno.getAluno(id)
    .then(aluno => {
      res.send(aluno);
    })
    .catch(erro => console.log(erro));
}

function inserir(req, res) {
  Aluno.insertAluno(req.body)
    .then(aluno => {
      res.send(aluno);
    })
    .catch(erro => console.log(erro));
}

function atualizar(req, res) {
  const { id } = req.params;
  const { nome, data_inicio, data_fim } = req.body;
  const aluno = { nome, data_inicio, data_fim };
  Aluno.updateAluno(id, aluno)
    .then(aluno => {
      res.send(aluno);
    })
    .catch(erro => console.log(erro));
}

function excluir(req, res) {
  const id = req.params.id;
  Aluno.deleteAluno(id)
    .then(alunos => {
      res.render('../views/index.ejs', { alunos });
    })
    .catch(erro => console.log(erro));
}

function imprimir(req, res) {
  if (req.body.marcar !== undefined) {
    let alunosMarcados = req.body.marcar;
    alunosMarcados = JSON.stringify(alunosMarcados);
    Aluno.getAlunos()
      .then(alunos => {
        alunos = alunos.filter(aluno => alunosMarcados.includes(aluno.id));
        res.render('../views/impressao.ejs', { alunos });
      })
      .catch(erro => console.log(erro));
  } else {
    res.render('../views/impressao.ejs', {
      mensagem: 'Nenhum aluno selecionado para impressão'
    });
  }
}

module.exports = {
  getAlunos,
  getAluno,
  inserir,
  atualizar,
  excluir,
  imprimir
};
