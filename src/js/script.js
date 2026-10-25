import { getCurrencyRates } from "./api/currencyApi.js"
import { formatCurrency } from "./utils/currencyFormatter.js"
import { currencies } from "./data/currencies.js"

const convertButton = document.querySelector(".buttonconvert")
const cancelButton = document.querySelector(".buttoncancel")
const currencySelect = document.querySelector(".currency-coin-converted")
const currencySelectConvert = document.querySelector(".currency-coin-convert")

const inputCurrency = document.querySelector(".input-currency")
const currencyValueToConvert = document.querySelector(".currency-value")
const currencyValueConverted = document.querySelector(".currency-value-convert")
const feedbackMessage = document.querySelector(".feedback-message")
let activeController = null

const convertCurrency = (amount, fromCurrency, toCurrency, rates) => {
    const amountInBRL = amount * rates[fromCurrency]

    return amountInBRL / rates[toCurrency]
}

const convertValues = async () => {
    if (activeController) {
        return
    }

    try {
        feedbackMessage.classList.remove("is-neutral")
        feedbackMessage.setAttribute("role", "alert")
        feedbackMessage.textContent = ""
        currencyValueToConvert.textContent = "—"
        currencyValueConverted.textContent = "—"

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

        activeController = new AbortController()
        cancelButton.hidden = false

        const exchangeRates = await getCurrencyRates({
            signal: activeController.signal
        })

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
        if (error.name === "AbortError") {
            feedbackMessage.classList.add("is-neutral")
            feedbackMessage.setAttribute("role", "status")
            feedbackMessage.textContent = "Consulta cancelada. / Request canceled."
        }
        else if (error.name === "TimeoutError") {
            feedbackMessage.textContent =
                "A consulta demorou mais que o esperado. Tente novamente. / " +
                "The request took longer than expected. Please try again."
        }
        else if (error.name === "HttpError") {
            feedbackMessage.textContent =
                `O serviço de cotações retornou um erro (HTTP ${error.status}). Tente novamente mais tarde. / ` +
                `The exchange rate service returned an error (HTTP ${error.status}). Please try again later.`
        }
        else if (navigator.onLine === false) {
            feedbackMessage.textContent =
                "Você parece estar sem conexão. Verifique sua internet e tente novamente. / " +
                "You appear to be offline. Check your internet connection and try again."
        }
        else {
            feedbackMessage.textContent =
                "Não foi possível acessar o serviço de cotações. Verifique sua conexão ou tente mais tarde. / " +
                "Unable to reach the exchange rate service. Check your connection or try again later."
        }

        if (error.name !== "AbortError") {
            console.error(error)
        }
    }
    finally {
        convertButton.disabled = false
        convertButton.textContent = "Convert"
        currencySelect.disabled = false
        currencySelectConvert.disabled = false
        if (document.activeElement === cancelButton) {
            convertButton.focus()
        }
        cancelButton.hidden = true
        activeController = null
    }
}

const populateCurrencySelect = (select) => {
    Object.entries(currencies).forEach(([code, currency]) => {
        const option = document.createElement("option")
        option.value = code
        option.textContent = `${code} · ${currency.name}`
        select.appendChild(option)
    })

    select.value = select.dataset.default
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

populateCurrencySelect(currencySelectConvert)
populateCurrencySelect(currencySelect)

currencySelectConvert.addEventListener("change", changeCurrency2)
currencySelect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues)
cancelButton.addEventListener("click", () => activeController?.abort())
