const convertButton = document.querySelector(".buttonconvert")
const currencySelect = document.querySelector(".currency-coin-converted")
const currencySelectConvert = document.querySelector(".currency-coin-convert")

const convertValues = async () => {
    const inputCurrencyValue = document.querySelector(".input-currency").value
    const currencyValueToConvert = document.querySelector(".currency-value")
    const currencyValueConverted = document.querySelector(".currency-value-convert")

    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL").then(response => response.json())

    const dolarToday = data.USDBRL.high
    const euroToday = data.EURBRL.high
    const libraToday = data.GBPBRL.high
    const bitcoinToday = data.BTCBRL.high

    currencyValueToConvert.innerHTML = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(inputCurrencyValue)


    if (currencySelect.value == "real-to") {
        currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(inputCurrencyValue)
    }


    if (currencySelect.value == "libra-to") {
        currencyValueToConvert.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(inputCurrencyValue)
    }

    if (currencySelect.value == "bitcoin-to") {
        currencyValueToConvert.innerHTML = new Intl.NumberFormat("en", {
            style: "currency",
            currency: "BTC"
        }).format(inputCurrencyValue)
    }

    if (currencySelect.value == "euro-to") {
        currencyValueToConvert.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue)
    }





    //  CONVERTENDO REAL PARA OUTRAS MOEDAS
    if (currencySelect.value == "real") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(inputCurrencyValue)
    }

    if (currencySelect.value == "dolar") { //Se o dolar estiver selecionado entra aqui
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyValue / dolarToday)
    }

    if (currencySelect.value == "euro") { //Se o euro estiver selecionado entra aqui
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue / euroToday)
    }

    if (currencySelect.value == "libra") { //Se a libra estiver selecionada entra aqui
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "GBP"
        }).format(inputCurrencyValue / libraToday)
    }

    if (currencySelect.value == "bitcoin") { //Se o bitcoin estiver selecionado entra aqui
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "BTC"
        }).format(inputCurrencyValue / bitcoinToday)
    }

    //CONVERTER DOLAR PARA OUTRAS MOEDAS

    if (currencySelectConvert.value == "dolar-to" && currencySelect.value == "dolar") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyValue)
    }

    if (currencySelectConvert.value == "dolar-to" && currencySelect.value == "real") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(inputCurrencyValue * dolarToday)
    }

    if (currencySelectConvert.value == "dolar-to" && currencySelect.value == "euro") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue * 0.92)
    }

    if (currencySelectConvert.value == "dolar-to" && currencySelect.value == "libra") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "GBP"
        }).format(inputCurrencyValue * 0.79)
    }

    if (currencySelectConvert.value == "dolar-to" && currencySelect.value == "bitcoin") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "BTC"
        }).format(inputCurrencyValue * 0.000015)
    }

    //EURO PARA OUTRAS MOEDAS

    if (currencySelectConvert.value == "euro-to" && currencySelect.value == "euro") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue)
    }

    if (currencySelectConvert.value == "euro-to" && currencySelect.value == "real") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(inputCurrencyValue * euroToday)
    }

    if (currencySelectConvert.value == "euro-to" && currencySelect.value == "dolar") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyValue * 1.09)
    }

    if (currencySelectConvert.value == "euro-to" && currencySelect.value == "libra") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "GBP"
        }).format(inputCurrencyValue * 0.86)
    }

    if (currencySelectConvert.value == "euro-to" && currencySelect.value == "bitcoin") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "BTC"
        }).format(inputCurrencyValue * 0.000017)
    }

    //LIBRA PARA OUTRAS MOEDAS

    if (currencySelectConvert.value == "libra-to" && currencySelect.value == "libra") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "GBP"
        }).format(inputCurrencyValue)
    }

    if (currencySelectConvert.value == "libra-to" && currencySelect.value == "real") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(inputCurrencyValue * libraToday)
    }

    if (currencySelectConvert.value == "libra-to" && currencySelect.value == "dolar") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyValue * 1.26)
    }

    if (currencySelectConvert.value == "libra-to" && currencySelect.value == "euro") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue * 1.16)
    }

    if (currencySelectConvert.value == "libra-to" && currencySelect.value == "bitcoin") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "BTC"
        }).format(inputCurrencyValue * 0.000019)
    }

    //BITCOIN PARA OUTRAS MOEDAS

    if (currencySelectConvert.value == "bitcoin-to" && currencySelect.value == "bitcoin") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "BTC"
        }).format(inputCurrencyValue)
    }

    if (currencySelectConvert.value == "bitcoin-to" && currencySelect.value == "real") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(inputCurrencyValue * bitcoinToday)
    }

    if (currencySelectConvert.value == "bitcoin-to" && currencySelect.value == "dolar") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyValue * 65669.10)
    }

    if (currencySelectConvert.value == "bitcoin-to" && currencySelect.value == "euro") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue * 60448, 41)
    }

    if (currencySelectConvert.value == "bitcoin-to" && currencySelect.value == "libra") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "GBP"
        }).format(inputCurrencyValue * 52114.20)
    }
}


const changeCurrency = () => {
    const currencyName = document.getElementById("currency-text")
    const currencyImage = document.querySelector(".logo-converted")


    if (currencySelect.value == "real") {
        currencyName.innerHTML = "R$"
        currencyImage.src = "./assets/Real.png"
    }


    if (currencySelect.value == "dolar") {
        currencyName.innerHTML = "USD"
        currencyImage.src = "./assets/Dolar.png"
    }


    if (currencySelect.value == "euro") {
        currencyName.innerHTML = "€"
        currencyImage.src = "./assets/Euro.png"
    }

    if (currencySelect.value == "libra") {
        currencyName.innerHTML = "£"
        currencyImage.src = "./assets/Libra.png"
    }
    if (currencySelect.value == "bitcoin") {
        currencyName.innerHTML = "₿"
        currencyImage.src = "./assets/bitcoin.png"
    }

    convertValues()
}


const changeCurrency2 = () => {
    const currencyName2 = document.querySelector(".currency-convert")
    const currencyImage2 = document.querySelector(".logo-convert")

    if (currencySelectConvert.value == "dolar-to") {
        currencyName2.innerHTML = "USD"
        currencyImage2.src = "./assets/Dolar.png"
    }

    if (currencySelectConvert.value == "real-to") {
        currencyName2.innerHTML = "R$"
        currencyImage2.src = "./assets/Real.png"
    }

    if (currencySelectConvert.value == "euro-to") {
        currencyName2.innerHTML = "€"
        currencyImage2.src = "./assets/Euro.png"
    }
    if (currencySelectConvert.value == "libra-to") {
        currencyName2.innerHTML = "£"
        currencyImage2.src = "./assets/Libra.png"
    }
    if (currencySelectConvert.value == "bitcoin-to") {
        currencyName2.innerHTML = "₿"
        currencyImage2.src = "./assets/bitcoin.png"
    }
    convertValues()
}





currencySelectConvert.addEventListener("change", changeCurrency2)
currencySelect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues)
