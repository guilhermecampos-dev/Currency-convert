(() => {
    const storageKey = "currency-theme"
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
    let preference = "system"

    try {
        const savedTheme = localStorage.getItem(storageKey)
        if (["system", "light", "dark"].includes(savedTheme)) {
            preference = savedTheme
        }
    }
    catch {
        // Sem armazenamento disponível, usamos a preferência do sistema.
    }

    const applyTheme = () => {
        const theme = preference === "system"
            ? (systemTheme.matches ? "dark" : "light")
            : preference

        document.documentElement.dataset.theme = theme
    }

    // Aplica as cores antes de renderizar o conteúdo da página.
    applyTheme()
    systemTheme.addEventListener("change", applyTheme)

    document.addEventListener("DOMContentLoaded", () => {
        const themeSelect = document.querySelector("#theme")
        themeSelect.value = preference

        themeSelect.addEventListener("change", () => {
            preference = themeSelect.value
            applyTheme()

            try {
                localStorage.setItem(storageKey, preference)
            }
            catch {
                // A escolha continua válida nesta página mesmo sem persistência.
            }
        })
    })
})()
