const CURRENCY_API_URL =
    "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL"


export const getCurrencyRates = async () => {
    const response = await fetch(CURRENCY_API_URL)

    if (!response.ok) {
        throw new Error("Failed to fetch currency rates")
    }

    const data = await response.json()

    return {
        BRL: 1,
        USD: Number(data.USDBRL.high),
        EUR: Number(data.EURBRL.high),
        GBP: Number(data.GBPBRL.high),
        BTC: Number(data.BTCBRL.high)
    }
}