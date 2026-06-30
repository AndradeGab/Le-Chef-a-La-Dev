// 🧠 carrinho
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 💾 salvar carrinho
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// 🍽️ adicionar item
function addItem(name, price, qty = 1) {

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({
            id: Date.now(),
            name,
            price,
            qty
        });
    }

    saveCart();
}

// 🛒 contador do carrinho
function updateCartCount() {

    const count = cart.reduce((sum, item) => sum + item.qty, 0);

    const badge = document.getElementById("cartCount");

    if (badge) {
        badge.innerText = count;
    }
}

// 🌙 tema escuro (toggle)
function toggleTheme() {
    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
}

// 🚀 tudo inicia aqui (ÚNICO DOMCONTENTLOADED)
document.addEventListener("DOMContentLoaded", () => {

    // 🛒 aplica contador inicial
    updateCartCount();

    // 🌙 aplica tema salvo
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
        document.body.classList.add("dark");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
});

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".card").forEach(card => {

        let qty = 1;

        const minus = card.querySelector(".minus");
        const plus = card.querySelector(".plus");
        const qtyValue = card.querySelector(".qty-value");
        const btn = card.querySelector(".add-btn");

        minus.addEventListener("click", () => {
            if (qty > 1) qty--;
            qtyValue.innerText = qty;
        });

        plus.addEventListener("click", () => {
            qty++;
            qtyValue.innerText = qty;
        });

        btn.addEventListener("click", () => {

            const name = card.querySelector("h3").innerText;

            const price = parseFloat(
                card.querySelector(".price").innerText
                    .replace("R$", "")
                    .replace(",", ".")
            );

            addItem(name, price, qty);

            // reset
            qty = 1;
            qtyValue.innerText = qty;

            // feedback visual
            btn.innerText = "Ajouté ✔";
            setTimeout(() => {
                btn.innerText = "Ajouter";
            }, 800);
        });

    });

});