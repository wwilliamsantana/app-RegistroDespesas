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
      if (this[i] === null || this[i] === undefined || this[i] === '') {
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
    console.log('Dados válidos')
  } else {
    console.log('Dados inválidos')
  }
}
