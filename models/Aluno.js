let alunos = require('../dados.json');
const helper = require('../helpers/helper');
const nomeArquivo = 'dados.json';

function getAlunos() {
  return new Promise((resolve, reject) => {
    if (alunos.length === 0) {
      reject({
        mensagem: 'Nenhum aluno cadastrado',
        status: 202
      });
    }
    resolve(alunos);
  });
}

function getAluno(id) {
  return new Promise((resolve, reject) => {
    helper
      .buscaAluno(alunos, id)
      .then(aluno => resolve(aluno))
      .catch(erro => reject(erro));
  });
}

function insertAluno(aluno) {
  return new Promise((resolve, reject) => {
    const id = { id: helper.getNovoId(alunos) };
    novoAluno = { ...id, ...aluno };
    alunos.push(novoAluno);
    const retorno = helper.escreveJSONFile(nomeArquivo, alunos);
    resolve(novoAluno);
  });
}

function updateAluno(id, novoAluno) {
  return new Promise((resolve, reject) => {
    helper
      .buscaAluno(alunos, id)
      .then(aluno => {
        const index = alunos.findIndex(a => a.id == aluno.id);
        id = { id: aluno.id };
        alunos[index] = { ...id, ...novoAluno };
        const retorno = helper.escreveJSONFile(nomeArquivo, alunos);
        resolve(alunos[index]);
      })
      .catch(erro => reject(erro));
  });
}

function deleteAluno(id) {
  return new Promise((resolve, reject) => {
    helper
      .buscaAluno(alunos, id)
      .then(aluno => {
        alunos = alunos.filter(aluno => aluno.id != id);
        const retorno = helper.escreveJSONFile(nomeArquivo, alunos);
        resolve(retorno);
      })
      .catch(erro => reject(erro));
  });
}

module.exports = {
  getAlunos,
  getAluno,
  insertAluno,
  updateAluno,
  deleteAluno
};
