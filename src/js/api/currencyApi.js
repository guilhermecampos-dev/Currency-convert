const CURRENCY_API_URL =
    "https://economia.awesomeapi.com.br/last/" +
    "USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL,CAD-BRL,AUD-BRL,JPY-BRL,CHF-BRL,ARS-BRL,ZAR-BRL"


export const getCurrencyRates = async ({ signal } = {}) => {
    const controller = new AbortController()
    const cancelRequest = () => controller.abort()
    let timedOut = false

    signal?.addEventListener("abort", cancelRequest, { once: true })
    if (signal?.aborted) {
        cancelRequest()
    }

    const timeoutId = setTimeout(() => {
        if (!controller.signal.aborted) {
            timedOut = true
            controller.abort()
        }
    }, 10000)

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

        if (controller.signal.aborted) {
            throw new DOMException("Request aborted", "AbortError")
        }

        const rates = {
            BRL: 1,
            USD: Number(data.USDBRL.bid),
            EUR: Number(data.EURBRL.bid),
            GBP: Number(data.GBPBRL.bid),
            CAD: Number(data.CADBRL.bid),
            AUD: Number(data.AUDBRL.bid),
            JPY: Number(data.JPYBRL.bid),
            CHF: Number(data.CHFBRL.bid),
            ARS: Number(data.ARSBRL.bid),
            ZAR: Number(data.ZARBRL.bid),
            BTC: Number(data.BTCBRL.bid)
        }

        const timestamps = {}
        Object.keys(rates).forEach((currency) => {
            if (currency !== "BRL") {
                const timestamp = Number(data[`${currency}BRL`]?.timestamp)
                timestamps[currency] = Number.isFinite(timestamp) && timestamp > 0
                    ? timestamp
                    : null
            }
        })

        return { rates, timestamps }
    }
    catch (error) {
        if (controller.signal.aborted) {
            throw new DOMException(
                timedOut ? "Request timed out" : "Request canceled",
                timedOut ? "TimeoutError" : "AbortError"
            )
        }
        throw error
    }
    finally {
        clearTimeout(timeoutId)
        signal?.removeEventListener("abort", cancelRequest)
    }
}
