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

   const exchangeRates = await getCurrencyRates()

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

const currencies = {
    BRL: {
        symbol: "R$",
        image: "./assets/Real.png"
    },
    USD: {
        symbol: "USD",
        image: "./assets/Dolar.png"
    },
    EUR: {
        symbol: "€",
        image: "./assets/Euro.png"
    },
    GBP: {
        symbol: "£",
        image: "./assets/Libra.png"
    },
    BTC: {
        symbol: "₿",
        image: "./assets/bitcoin.png"
    }
}

const changeCurrency = () => {
    const currencyName = document.getElementById("currency-text")
    const currencyImage = document.querySelector(".logo-converted")

    const currentCurrency = currencies[currencySelect.value]

    currencyName.innerHTML = currentCurrency.symbol
    currencyImage.src = currentCurrency.image

    convertValues()
}


const changeCurrency2 = () => {
    const currencyName2 = document.querySelector(".currency-convert")
    const currencyImage2 = document.querySelector(".logo-convert")

    const currentCurrency = currencies[currencySelectConvert.value]

    currencyName2.innerHTML = currentCurrency.symbol
    currencyImage2.src = currentCurrency.image

    convertValues()
}

currencySelectConvert.addEventListener("change", changeCurrency2)
currencySelect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues)