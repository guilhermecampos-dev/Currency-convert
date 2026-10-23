import { getCurrencyRates } from "./api/currencyApi.js"
import { formatCurrency } from "./utils/currencyFormatter.js"

const convertButton = document.querySelector(".buttonconvert")
const currencySelect = document.querySelector(".currency-coin-converted")
const currencySelectConvert = document.querySelector(".currency-coin-convert")

const inputCurrency = document.querySelector(".input-currency")
const currencyValueToConvert = document.querySelector(".currency-value")
const currencyValueConverted = document.querySelector(".currency-value-convert")
const feedbackMessage = document.querySelector(".feedback-message")

const convertCurrency = (amount, fromCurrency, toCurrency, rates) => {
    const amountInBRL = amount * rates[fromCurrency]

    return amountInBRL / rates[toCurrency]
}

const convertValues = async () => {
    try {
        feedbackMessage.textContent = ""

        const inputCurrencyValue = inputCurrency.value
        const amount = Number(inputCurrencyValue)

        if (
            inputCurrencyValue.trim() === "" ||
            !Number.isFinite(amount) ||
            amount <= 0
        ) {
            feedbackMessage.textContent =
                "Digite um valor válido maior que zero. / " +
                "Please enter a valid amount greater than zero."
            return
        }

        convertButton.disabled = true
        convertButton.textContent = "Converting..."
        currencySelect.disabled = true
        currencySelectConvert.disabled = true

        const exchangeRates = await getCurrencyRates()

        currencyValueToConvert.innerHTML = formatCurrency(
            amount,
            currencySelectConvert.value
        )

        const convertedValue = convertCurrency(
            amount,
            currencySelectConvert.value,
            currencySelect.value,
            exchangeRates
        )

        currencyValueConverted.innerHTML = formatCurrency(
            convertedValue,
            currencySelect.value
        )

    }
    catch (error) {
        console.error(error)
        feedbackMessage.textContent =
            "Não foi possível carregar as cotações. Tente novamente mais tarde. / " +
            "Unable to load exchange rates. Please try again later."
    }
    finally {
        convertButton.disabled = false
        convertButton.textContent = "Convert"
        currencySelect.disabled = false
        currencySelectConvert.disabled = false
    }
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
