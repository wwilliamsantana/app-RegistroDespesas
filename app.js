class Despesas {
  constructor(dia, mes, ano, tipo, descricao, valor) {
    this.dia = dia
    this.mes = mes
    this.ano = ano
    this.tipo = tipo
    this.descricao = descricao
    this.valor = valor
  }

  validarDados() {
    for (let i in this) {
      if (
        this[i] === null ||
        this[i] === undefined ||
        this[i] === '' ||
        this[i] === ' '
      ) {
        return false
      }
    }
    return true
  }
}

class Bd {
  //Ao chamar esta função automaticamente nosso constructor irá funcionar
  constructor() {
    let id = localStorage.getItem('id') //Buscando o valor da chave "id" -> Caso não encontre, vai retornar null

    if (id === null) {
      //-> Caso seja null, vamos atribuir a chave Id, valor 0
      localStorage.setItem('id', 0)
    }
  }

  getProximoId() {
    let proximoId = localStorage.getItem('id') //Buscando id novamente

    return parseInt(proximoId) + 1 //A cada chamada desta function, iremos incrementar +1
  }

  gravarLocal(despesas) {
    let id = this.getProximoId() //Pegando o id atual
    localStorage.setItem(id, JSON.stringify(despesas)) //Adicionando a info no localStorage

    localStorage.setItem('id', id) //Set do id + novo
  }

  recuperarTodosRegistros() {
    let idAtual = localStorage.getItem('id')
    let despesas = []
    for (let i = 1; i <= idAtual; i++) {
      let despesa = JSON.parse(localStorage.getItem(i))

      if (despesa === null) {
        continue
      }

      despesa.id = i
      despesas.push(despesa)
    }
    return despesas
  }

  pesquisar(despesa) {
    let despesas = this.recuperarTodosRegistros()

    if (despesa.dia != '') {
      despesas = despesas.filter(d => d.dia == despesa.dia)
    }
    if (despesa.mes != '') {
      despesas = despesas.filter(d => d.mes == despesa.mes)
    }
    if (despesa.ano != '') {
      despesas = despesas.filter(d => d.ano == despesa.ano)
    }
    if (despesa.descricao != '') {
      despesas = despesas.filter(d => d.descricao == despesa.descricao)
    }
    if (despesa.valor != '') {
      despesas = despesas.filter(d => d.valor == despesa.valor)
    }
    if (despesa.tipo != '') {
      despesas = despesas.filter(d => d.tipo == despesa.tipo)
    }

    return despesas
  }

  remover(id) {
    localStorage.removeItem(id)
  }
}

let bd = new Bd()

function cadastrarDespesas() {
  let ano = document.getElementById('ano')
  let mes = document.getElementById('mes')
  let dia = document.getElementById('dia')
  let tipo = document.getElementById('tipo')
  let descricao = document.getElementById('descricao')
  let valor = document.getElementById('valor')

  let despesas = new Despesas(
    dia.value,
    mes.value,
    ano.value,
    tipo.value,
    descricao.value,
    valor.value
  )

  if (despesas.validarDados()) {
    bd.gravarLocal(despesas)
    swapModal('success')
    ano.value = ''
    mes.value = ''
    dia.value = ''
    tipo.value = ''
    descricao.value = ''
    valor.value = ''
  } else {
    swapModal('error')
  }
}

function swapModal(version) {
  let button = document.getElementById('buttonAdd')
  let labelModal = document.getElementById('exampleModalLabel')
  let buttonModal = document.getElementById('buttonModal')
  let descricaoModal = document.getElementById('descricaoModal')

  if (version === 'success') {
    button.setAttribute('data-target', '#registroModal')
    button.setAttribute('data-toggle', 'modal')
    labelModal.innerHTML = 'Sucesso na gravação'
    labelModal.className = 'text-success'
    buttonModal.className = 'btn btn-success'
    descricaoModal.innerHTML = 'Despesas armazenadas com sucesso!'
  } else if (version === 'error') {
    button.setAttribute('data-target', '#registroModal')
    button.setAttribute('data-toggle', 'modal')
    labelModal.innerHTML = 'Erro na gravação'
    labelModal.className = 'text-danger'
    buttonModal.className = 'btn btn-danger'
    descricaoModal.innerHTML = 'Por favor! Preencha todos os dados!'
  }
}

function buttonClear() {
  let button = document.getElementById('buttonAdd')
  button.removeAttribute('data-toggle')
}

function carregarListaDespesas(despesas = []) {
  if (despesas.length == 0) {
    //Existe essa tratativa pois o body(consulta.html) chama está function tbm
    despesas = bd.recuperarTodosRegistros()
  }

  let table = document.getElementById('table')
  table.innerHTML = ' '

  despesas.forEach(a => {
    let linha = table.insertRow()

    switch (a.tipo) {
      case '1':
        a.tipo = 'Alimentação'
        break
      case '2':
        a.tipo = 'Educação'
        break
      case '3':
        a.tipo = 'Lazer'
        break
      case '4':
        a.tipo = 'Saúde'
        break
      case '5':
        a.tipo = 'Trasnporte'
        break
    }

    linha.insertCell(0).innerHTML = `${a.dia}/${a.mes}/${a.ano} `
    linha.insertCell(1).innerHTML = `${a.tipo}`
    linha.insertCell(2).innerHTML = `${a.descricao}`
    linha.insertCell(3).innerHTML = `${a.valor}`

    let btn = document.createElement('button')
    btn.className = 'btn btn-outline-danger'
    btn.innerHTML = "<i class='fas fa-times'></i>"
    btn.id = 'idRegistro' + a.id
    btn.onclick = function () {
      let id = this.id.replace('idRegistro', ' ')

      bd.remover(parseInt(id))
      window.location.reload()
    }

    linha.insertCell(4).append(btn)
  })
}

function pesquisarDespesas() {
  let ano = document.getElementById('ano').value
  let mes = document.getElementById('mes').value
  let dia = document.getElementById('dia').value
  let tipo = document.getElementById('tipo').value
  let descricao = document.getElementById('descricao').value
  let valor = document.getElementById('valor').value

  let despesa = new Despesas(dia, mes, ano, tipo, descricao, valor)

  let despesaFiltrada = bd.pesquisar(despesa)

  carregarListaDespesas(despesaFiltrada)
}
