//#region parametros 
let dolar = 1
let euro = 1
let bitcoin = 1
let dados_hora_consulta_euro = ''
let dados_hora_consulta_dolar = ''
let dados_hora_consulta_biticoin = ''
//valeu document
let hora_consulta = document.getElementById('horaConsulta')
let valor_unitario = document.getElementById('ValorUnitario')
let botao = document.getElementById('botao')
let select_moedas = document.getElementById('selectMoedas')
let texto_resultado = document.getElementById('textoResultado')
let bandeiras = document.getElementById('bandeiras')
//chama a função ao clicar no botão 
botao.addEventListener('click', conversao)
select_moedas.addEventListener('change', trocademoeda)
//#endregion

async function conversao() {
    //para usar await para aguarda vc tem que colocar async na função 
    //ele vai aguardar o retorno do site para prosseguir 
    let moedas = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL').then(function (respota) {
        return respota.json()
    })

    dolar = moedas.USDBRL.ask
    euro = moedas.EURBRL.ask
    bitcoin = moedas.BTCBRL.ask
    dados_hora_consulta_dolar = moedas.EURBRL.create_date
    dados_hora_consulta_euro = moedas.USDBRL.create_date
    dados_hora_consulta_biticoin = moedas.BTCBRL.create_date

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


    if (select_moedas.value === 'Bitcoin') {
        let resultado = valorReal / bitcoin
        Valor_convertido.innerHTML = resultado.toLocaleString('de-DE', { style: 'currency', currency: 'BTC', minimumFractionDigits: 8, })
        Valor_digitado.innerHTML = valorReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        hora_consulta.innerHTML = 'Atualizado: ' + dados_hora_consulta_biticoin
        valor_unitario.innerHTML = 'Valor Unitário: ' + bitcoin

    }


}

function trocademoeda() {

    if (select_moedas.value === 'U$ Dolar Americano') {
        texto_resultado.innerHTML = 'Dolar Americano'
        bandeiras.src = './assets/img/eua.png'

    }

    if (select_moedas.value === '€ Euro') {
        texto_resultado.innerHTML = 'Valor Euro'
        bandeiras.src = './assets/img/euro.png'

    }

    if (select_moedas.value === 'Bitcoin') {
        texto_resultado.innerHTML = 'Valor Bitcoin'
        bandeiras.src = './assets/img/btc.png'

    }

    conversao()

}
