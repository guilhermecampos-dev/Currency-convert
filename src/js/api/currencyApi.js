const CURRENCY_API_URL =
    "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL"


export const getCurrencyRates = async () => {
    const response = await fetch(CURRENCY_API_URL)

    const data = await response.json()

    return data
}