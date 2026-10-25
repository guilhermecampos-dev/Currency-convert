import { currencies } from "../data/currencies.js"

export const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat(currencies[currency].locale, {
        style: "currency",
        currency,
        ...(currency === "BTC" ? {
            minimumFractionDigits: 2,
            maximumFractionDigits: 8
        } : {})
    }).format(value)
}
