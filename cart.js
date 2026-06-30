let isCheckingOut = false;
// 🧠 carrega carrinho do navegador
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 💾 salvar alterações
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// 🛒 renderiza o carrinho na tela
function renderCart() {

    const container = document.getElementById("cartList");
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p class='empty'>Votre panier est vide 🥐</p>";
        updateTotal();
        return;
    }

    cart.forEach(item => {

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
      <span>
        ${item.name} <strong>x${item.qty}</strong>
      </span>

      <span>
        R$ ${(item.price * item.qty).toFixed(2).replace(".", ",")}
        <span class="remove">✖</span>
      </span>
    `;

        // ❌ remover item inteiro
        div.querySelector(".remove").addEventListener("click", () => {

            cart = cart.filter(i => i.id !== item.id);

            saveCart();
            renderCart();
        });

        container.appendChild(div);
    });

    updateTotal();
}

// 💰 calcula total
function updateTotal() {

    const total = cart.reduce((sum, item) => {
        return sum + (item.price * item.qty);
    }, 0);

    document.getElementById("cartTotal").innerText =
        total.toFixed(2).replace(".", ",");
}

// 🚀 inicializa carrinho ao abrir página
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});

document.addEventListener("DOMContentLoaded", () => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
        document.body.classList.add("dark");
    }
});

function toggleTheme() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

function checkout() {

  if (isCheckingOut) return;
  isCheckingOut = true;

  const overlay = document.getElementById("checkoutOverlay");
  const text = overlay.querySelector("p");
  const sound = document.getElementById("confirmSound");

  overlay.classList.remove("hidden");
  text.innerText = "Traitement de la commande...";

  setTimeout(() => {

    text.innerText = "Commande confirmée 🍷";

    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }

    cart = [];
    saveCart();

    // ❌ NÃO chama updateCartCount aqui

    setTimeout(() => {
      overlay.classList.add("hidden");
      isCheckingOut = false;
    }, 2000);

  }, 2000);
}