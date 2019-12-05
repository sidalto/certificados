(function submitFormNovo() {
  const formNovo = document.getElementById('form-novo');
  formNovo.addEventListener('submit', event => {
    event.preventDefault();
    salvar();
  });
})();

(function submitFormEditar() {
  const formEditar = document.getElementById('form-editar');
  formEditar.addEventListener('submit', event => {
    event.preventDefault();
    atualizar();

    document.getElementById('editar-aluno').style.display = 'none';

    const display = document.getElementById('novo').style.display;

    if (display == 'block') {
      document.getElementById('novo').style.display = 'none';
    } else {
      document.getElementById('novo').style.display = 'block';
    }
  });
})();

function evitaSubmitFormImprimir() {
  const formImprimir = document.getElementById('form-imprimir');
  formImprimir.onsubmit = event => {
    event.preventDefault();
  };
}

function excluir(id) {
  evitaSubmitFormImprimir();

  fetch(`http://localhost:3000/excluir/${id}`, {
    method: 'DELETE'
  })
    .then(() => {
      const tr = document.getElementById('tr' + id);
      tr.remove();
    })
    .catch(erro => {
      console.error(erro);
    });
}

function salvar() {
  let nome = document.querySelector('input[name="nome"]').value;
  let data_inicio = document
    .querySelector('input[name="data_inicio"]')
    .value.split('-');
  let data_fim = document
    .querySelector('input[name="data_fim"]')
    .value.split('-');
  data_inicio = `${data_inicio[2]}/${data_inicio[1]}/${data_inicio[0]}`;
  data_fim = `${data_fim[2]}/${data_fim[1]}/${data_fim[0]}`;

  fetch('http://localhost:3000/inserir', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, data_inicio, data_fim })
  })
    .then(function(resposta) {
      resposta.text().then(resultado => {
        inserirAluno(resultado);
      });
    })
    .catch(erro => {
      console.error(erro);
    });
}

function inserirAluno(aluno) {
  const { id, nome, data_inicio, data_fim } = JSON.parse(aluno);

  document.getElementById('nome').value = '';
  document.getElementById('data_inicio').value = '';
  document.getElementById('data_fim').value = '';

  const tbody = document.querySelector('tbody');
  const tr = document.createElement('tr');
  const tdImprimir = document.createElement('td');
  const tdId = document.createElement('td');
  const tdNome = document.createElement('td');
  const tdDataInicio = document.createElement('td');
  const tdDataFim = document.createElement('td');
  const tdAcao = document.createElement('td');

  const botaoEditar = document.createElement('button');
  botaoEditar.className = 'btn btn-sm btn-warning';
  botaoEditar.setAttribute('style', 'margin-left: 2px; margin-right: 2px;');
  botaoEditar.setAttribute('onclick', `editar(${id})`);
  botaoEditar.appendChild(document.createTextNode('Editar'));

  const botaoExcluir = document.createElement('button');
  botaoExcluir.className = 'btn btn-sm btn-danger';
  botaoExcluir.setAttribute('style', 'margin-left: 2px; margin-right: 2px;');
  botaoExcluir.setAttribute('onclick', `excluir(${id})`);
  botaoExcluir.appendChild(document.createTextNode('Excluir'));

  const imprimir = document.createElement('input');
  imprimir.setAttribute('type', 'checkbox');
  imprimir.setAttribute('name', 'marcar');
  imprimir.setAttribute('id', id);
  imprimir.setAttribute('value', id);

  tdImprimir.appendChild(imprimir);
  tdId.appendChild(document.createTextNode(id));
  tdNome.appendChild(document.createTextNode(nome));
  tdDataInicio.appendChild(document.createTextNode(data_inicio));
  tdDataFim.appendChild(document.createTextNode(data_fim));
  tdAcao.appendChild(botaoEditar);
  tdAcao.appendChild(botaoExcluir);

  tr.setAttribute('id', `tr${id}`);
  tdImprimir.className = 'table-light';
  tdId.className = 'table-light';
  tdNome.className = 'table-light';
  tdDataInicio.className = 'table-light';
  tdDataFim.className = 'table-light';
  tdAcao.className = 'table-light';

  tr.appendChild(tdImprimir);
  tr.appendChild(tdId);
  tr.appendChild(tdNome);
  tr.appendChild(tdDataInicio);
  tr.appendChild(tdDataFim);
  tr.appendChild(tdAcao);
  tbody.appendChild(tr);

  const trNenhum = document.getElementById('nenhum');
  if (trNenhum !== null) {
    trNenhum.remove();
  }
}

function editar(id) {
  evitaSubmitFormImprimir();
  getAluno(id);
}

function atualizar() {
  let id = document.querySelector('input[name="edit_id"]').value;
  let nome = document.querySelector('input[name="edit_nome"]').value;
  let data_inicio = document
    .querySelector('input[name="edit_data_inicio"]')
    .value.split('-');
  let data_fim = document
    .querySelector('input[name="edit_data_fim"]')
    .value.split('-');
  data_inicio = `${data_inicio[2]}/${data_inicio[1]}/${data_inicio[0]}`;
  data_fim = `${data_fim[2]}/${data_fim[1]}/${data_fim[0]}`;

  fetch(`http://localhost:3000/atualizar/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, nome, data_inicio, data_fim })
  })
    .then(function(resposta) {
      resposta.text().then(resultado => {
        atualizarAluno(resultado);
      });
    })
    .catch(erro => {
      console.error(erro);
    });
}

function exibeFormNovo() {
  const display = document.getElementById('novo-aluno').style.display;

  if (display == 'block') {
    document.getElementById('novo-aluno').style.display = 'none';
  } else {
    document.getElementById('novo-aluno').style.display = 'block';
  }
}

function exibeFormEditar(aluno) {
  let { id, nome, data_inicio, data_fim } = JSON.parse(aluno);

  data_inicio = data_inicio.split('/');
  data_inicio = `${data_inicio[2]}-${data_inicio[1]}-${data_inicio[0]}`;
  data_fim = data_fim.split('/');
  data_fim = `${data_fim[2]}-${data_fim[1]}-${data_fim[0]}`;

  document.getElementById('novo-aluno').style.display = 'none';
  document.getElementById('novo').style.display = 'none';

  const display = document.getElementById('editar-aluno').style.display;

  if (display == 'block') {
    document.getElementById('novo').style.display = 'block';
    document.getElementById('editar-aluno').style.display = 'none';
  } else {
    document.getElementById('editar-aluno').style.display = 'block';
  }

  document.getElementById('edit_id').value = id;
  document.getElementById('edit_nome').value = nome;
  document.getElementById('edit_data_inicio').value = data_inicio;
  document.getElementById('edit_data_fim').value = data_fim;
}

function getAluno(id) {
  fetch(`http://localhost:3000/aluno/${id}`, {
    method: 'GET'
  })
    .then(function(resposta) {
      resposta.text().then(resultado => {
        exibeFormEditar(resultado);
      });
    })
    .catch(erro => {
      console.error(erro);
    });
}

function atualizarAluno(aluno) {
  const { id, nome, data_inicio, data_fim } = JSON.parse(aluno);
  const tr = document.getElementById(`tr${id}`);
  tr.children[0].value = id;
  tr.children[2].innerHTML = nome;
  tr.children[3].innerHTML = data_inicio;
  tr.children[4].innerHTML = data_fim;
}
