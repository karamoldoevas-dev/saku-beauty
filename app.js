const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cartCount");

let products = [];
let cart = [];

// Получаем товары через API
async function getProducts() {
    try {
        const response = await fetch(
            "https://dummyjson.com/products/category/beauty"
        );

        const data = await response.json();

        products = data.products;

        showProducts(products);

    } catch (error) {
        productList.textContent = "Something went wrong!";
        console.log(error);
    }
}

// Показываем товары на странице
function showProducts(items) {
    productList.innerHTML = "";

    items.forEach(product => {
        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button class="add-cart-button">
                Add to cart
            </button>
        `;

        card.querySelector(".add-cart-button")
            .addEventListener("click", () => {
                addToCart(product);
            });

        productList.appendChild(card);
    });
}
// Add product to cart
function addToCart(product) {
    cart.push(product);
    updateCart();
}

// Update cart
function updateCart() {
    cartCount.textContent = cart.length;

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty.";
    }

    cart.forEach((product, index) => {
        total += product.price;

        const item = document.createElement("div");
        item.className = "cart-item";

        item.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">

            <div class="cart-item-info">
                <h4>${product.title}</h4>
                <p>$${product.price}</p>
            </div>

            <button class="remove-item">✕</button>
        `;

        item.querySelector(".remove-item")
            .addEventListener("click", () => {
                cart.splice(index, 1);
                updateCart();
            });

        cartItems.appendChild(item);
    });

    cartTotal.textContent = total.toFixed(2);
}
const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

function openCart() {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("show");
}

function hideCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("show");
}

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", hideCart);
cartOverlay.addEventListener("click", hideCart);

const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page-section");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        const pageName = link.dataset.page;

        pages.forEach(page => {
            page.classList.toggle(
                "active",
                page.dataset.pageSection === pageName
            );
        });

        navLinks.forEach(item => {
            item.classList.toggle("active", item === link);
        });
    });
});

// Добавляем товар в корзину
function addToCart() {
    cart++;
    cartCount.textContent = cart;
}

// Поиск товаров
searchInput.addEventListener("input", function() {
    const searchValue = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchValue)
    );

    showProducts(filteredProducts);
});

// Запускаем сайт
getProducts();
const checkoutButton = document.getElementById("checkoutButton");

checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for your order! 💗");

    cart = [];
    updateCart();
    hideCart();
});