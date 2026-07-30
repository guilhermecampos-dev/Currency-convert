import { getCurrencyRates } from "./api/currencyApi.js"
import { formatCurrency } from "./utils/currencyFormatter.js"

const convertButton = document.querySelector(".buttonconvert")
const currencySelect = document.querySelector(".currency-coin-converted")
const currencySelectConvert = document.querySelector(".currency-coin-convert")

const convertCurrency = (amount, fromCurrency, toCurrency, rates) => {
    const amountInBRL = amount * rates[fromCurrency]

    return amountInBRL / rates[toCurrency]
}

const convertValues = async () => {
    const inputCurrencyValue = document.querySelector(".input-currency").value
    const currencyValueToConvert = document.querySelector(".currency-value")
    const currencyValueConverted = document.querySelector(".currency-value-convert")

    const data = await getCurrencyRates()

    const dolarToday = data.USDBRL.high
    const euroToday = data.EURBRL.high
    const libraToday = data.GBPBRL.high
    const bitcoinToday = data.BTCBRL.high

    const exchangeRates = {
        BRL: 1,
        USD: Number(dolarToday),
        EUR: Number(euroToday),
        GBP: Number(libraToday),
        BTC: Number(bitcoinToday)
    }

    currencyValueToConvert.innerHTML = formatCurrency(
        Number(inputCurrencyValue),
        currencySelectConvert.value
    )

    const convertedValue = convertCurrency(
        Number(inputCurrencyValue),
        currencySelectConvert.value,
        currencySelect.value,
        exchangeRates
    )

     console.log(
        convertCurrency(
            100,
            "USD",
            "EUR",
            exchangeRates
        )
    )

    currencyValueConverted.innerHTML = formatCurrency(
        convertedValue,
        currencySelect.value
    )
}


const changeCurrency = () => {
    const currencyName = document.getElementById("currency-text")
    const currencyImage = document.querySelector(".logo-converted")


    if (currencySelect.value == "BRL") {
        currencyName.innerHTML = "R$"
        currencyImage.src = "./assets/Real.png"
    }


    if (currencySelect.value == "USD") {
        currencyName.innerHTML = "USD"
        currencyImage.src = "./assets/Dolar.png"
    }


    if (currencySelect.value == "EUR") {
        currencyName.innerHTML = "€"
        currencyImage.src = "./assets/Euro.png"
    }

    if (currencySelect.value == "GBP") {
        currencyName.innerHTML = "£"
        currencyImage.src = "./assets/Libra.png"
    }
    if (currencySelect.value == "BTC") {
        currencyName.innerHTML = "₿"
        currencyImage.src = "./assets/bitcoin.png"
    }

    convertValues()
}


const changeCurrency2 = () => {
    const currencyName2 = document.querySelector(".currency-convert")
    const currencyImage2 = document.querySelector(".logo-convert")

    if (currencySelectConvert.value == "USD") {
        currencyName2.innerHTML = "USD"
        currencyImage2.src = "./assets/Dolar.png"
    }

    if (currencySelectConvert.value == "BRL") {
        currencyName2.innerHTML = "R$"
        currencyImage2.src = "./assets/Real.png"
    }

    if (currencySelectConvert.value == "EUR") {
        currencyName2.innerHTML = "€"
        currencyImage2.src = "./assets/Euro.png"
    }
    if (currencySelectConvert.value == "GBP") {
        currencyName2.innerHTML = "£"
        currencyImage2.src = "./assets/Libra.png"
    }
    if (currencySelectConvert.value == "BTC") {
        currencyName2.innerHTML = "₿"
        currencyImage2.src = "./assets/bitcoin.png"
    }
    convertValues()
}

currencySelectConvert.addEventListener("change", changeCurrency2)
currencySelect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues)