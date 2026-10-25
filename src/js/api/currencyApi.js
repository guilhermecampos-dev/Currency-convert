const CURRENCY_API_URL =
    "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL"


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

        return {
            BRL: 1,
            USD: Number(data.USDBRL.bid),
            EUR: Number(data.EURBRL.bid),
            GBP: Number(data.GBPBRL.bid),
            BTC: Number(data.BTCBRL.bid)
        }
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
