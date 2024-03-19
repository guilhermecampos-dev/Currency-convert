const convertButton = document.querySelector(".buttonconvert")
const currencySelect = document.querySelector(".currency-coin-converted")

function convertValues(){
    const inputCurrencyValue = document.querySelector(".input-currency").value
    const currencyValueToConvert = document.querySelector(".currency-value")
    const currencyValueConverted = document.querySelector(".currency-value-convert")

   
    const dolarToday = 5.03 
    const euroToday = 5.46


    if(currencySelect.value == "dolar"){
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en", {
            style: "currency",
            currency: "USD"
        }).format (inputCurrencyValue / dolarToday)
    }

    if(currencySelect.value == "euro"){
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style:"currency",
            currency: "EUR"
        }).format (inputCurrencyValue / euroToday)
    }

    currencyValueToConvert.innerHTML = new Intl.NumberFormat("en", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue)

    


}

function changeCurrency(){
    const currencyName = document.getElementById("currency-text")
    const currencyImage = document.querySelector(".logo-converted")

    if(currencySelect.value == "dolar"){
        currencyName.innerHTML = "USD"
        currencyImage.src = "./assets/Dolar.png"
    }

    
    if(currencySelect.value == "euro"){
        currencyName.innerHTML = "€"
        currencyImage.src = "./assets/Euro.png"
}

    convertValues()
}

currencySelect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues)