
let dolar = 5
let euro = 6
let hora_consulta = document.getElementById('horaConsulta')
let valor_unitario = document.getElementById('ValorUnitario')
let dados_hora_consulta_euro = ''
let dados_hora_consulta_dolar = ''
let botao = document.getElementById('botao')
let select_moedas = document.getElementById('selectMoedas')
let texto_resultado = document.getElementById('textoResultado')
let bandeiras = document.getElementById('bandeiras')


async function conversao() {
    //para usar await para aguarda vc tem que colocar async na função 
    //ele vai aguardar o retorno do site para proceguir 
    let moedas = await fetch('http://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL').then(function (respota) {
        return respota.json()
    })

    dolar = moedas.USDBRL.ask
    euro = moedas.EURBRL.ask
    dados_hora_consulta_dolar = moedas.EURBRL.create_date
    dados_hora_consulta_euro = moedas.USDBRL.create_date

    //calculos
    let valorReal = Number(document.getElementById('input').value)
    let Valor_digitado = document.getElementById('ValorDigitado')
    let Valor_convertido = document.getElementById('ValorConvertido')

    //validações do codigo 
    if (select_moedas.value === 'U$ Dolar Americano') {
        let resultado = valorReal / dolar
        Valor_convertido.innerHTML = resultado.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        Valor_digitado.innerHTML = valorReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        hora_consulta.innerHTML = 'Atualizado: ' + dados_hora_consulta_dolar
        valor_unitario.innerHTML = 'Valor Unitário: ' + dolar

    }

    if (select_moedas.value === '€ Euro') {
        let resultado = valorReal / euro
        Valor_convertido.innerHTML = resultado.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
        Valor_digitado.innerHTML = valorReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        hora_consulta.innerHTML = 'Atualizado: ' + dados_hora_consulta_euro
        valor_unitario.innerHTML = 'Valor Unitário: ' + euro

    }

}

function trocademoeda() {

    if (select_moedas.value === 'U$ Dolar Americano') {
        texto_resultado.innerHTML = 'Dolar Americano'
        bandeiras.src = './img/EUA.png'

    }

    if (select_moedas.value === '€ Euro') {
        texto_resultado.innerHTML = 'Valor Euro'
        bandeiras.src = './img/EURO.png'

    }

    conversao()
    //console.log('trocando de dolara para euro')
}

//chama a função ao clicar no botão 
botao.addEventListener('click', conversao)
select_moedas.addEventListener('change', trocademoeda)