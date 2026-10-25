const CURRENCY_API_URL =
    "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL"


export const getCurrencyRates = async () => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    try {
        const response = await fetch(CURRENCY_API_URL, {
            signal: controller.signal
        })

        if (!response.ok) {
            const error = new Error("Failed to fetch currency rates")
            error.name = "HttpError"
            error.status = response.status
            throw error
        }

        const data = await response.json()

        return {
            BRL: 1,
            USD: Number(data.USDBRL.bid),
            EUR: Number(data.EURBRL.bid),
            GBP: Number(data.GBPBRL.bid),
            BTC: Number(data.BTCBRL.bid)
        }
    }
    finally {
        clearTimeout(timeoutId)
    }
}
