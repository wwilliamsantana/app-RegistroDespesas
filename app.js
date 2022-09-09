class Despesas {
  constructor(dia, mes, ano, tipo, descricao, valor) {
    this.dia = dia
    this.mes = mes
    this.ano = ano
    this.tipo = tipo
    this.descricao = descricao
    this.valor = valor
  }
}

class Bd {
  constructor() {
    let id = localStorage.getItem('id')

    if (id === null) {
      localStorage.setItem('id', 0)
    }
  }

  getProximoId() {
    let proximoId = localStorage.getItem('id')

    return parseInt(proximoId) + 1
  }

  gravarLocal(despesas) {
    let id = this.getProximoId()
    localStorage.setItem(id, JSON.stringify(despesas))

    localStorage.setItem('id', id)
  }
}

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

  let bd = new Bd()

  bd.gravarLocal(despesas)
}
