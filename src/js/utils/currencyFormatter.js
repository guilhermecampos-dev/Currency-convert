export const formatCurrency = (value, currency) => {
    const locale = {
        BRL: "pt-BR",
        USD: "en-US",
        EUR: "de-DE",
        GBP: "en-GB",
        BTC: "en-US"
    }

    return new Intl.NumberFormat(locale[currency], {
        style: "currency",
        currency
    }).format(value)
}