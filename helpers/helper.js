const fs = require('fs');

const getNovoId = array => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  } else {
    return 1;
  }
};

const novaData = () => new Date().toString();

function buscaAluno(array, id) {
  return new Promise((resolve, reject) => {
    const aluno = array.find(linha => linha.id == id);
    if (!aluno) {
      reject({
        mensagem: 'ID incorreto',
        status: 404
      });
    }
    resolve(aluno);
  });
}

function escreveJSONFile(nomeArquivo, conteudo) {
  fs.writeFileSync(nomeArquivo, JSON.stringify(conteudo), 'utf8', erro => {
    if (erro) {
      return erro;
    }
  });
  return conteudo;
}

module.exports = {
  getNovoId,
  novaData,
  buscaAluno,
  escreveJSONFile
};
