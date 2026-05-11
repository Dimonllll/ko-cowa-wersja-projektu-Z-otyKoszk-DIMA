// ==================== DANE POCZĄTKOWE ====================
let products = [
    { id: 1, name: "Czarna koszulka", price: 129, category: "moda", image: "👕", inStock: true },
    { id: 2, name: "Biała koszulka", price: 99, category: "moda", image: "👚", inStock: true },
    { id: 3, name: "Spodnie dżinsowe", price: 199, category: "moda", image: "👖", inStock: true },
    { id: 4, name: "Kurtka zimowa", price: 349, category: "moda", image: "🧥", inStock: true },
    { id: 5, name: "Smartphone XYZ", price: 1299, category: "elektronika", image: "📱", inStock: true },
    { id: 6, name: "Słuchawki bezprzewodowe", price: 249, category: "elektronika", image: "🎧", inStock: true },
    { id: 7, name: "Laptop Pro", price: 3999, category: "elektronika", image: "💻", inStock: true },
    { id: 8, name: "Powerbank 20000mAh", price: 89, category: "elektronika", image: "🔋", inStock: true },
    { id: 9, name: "Krem nawilżający", price: 45, category: "uroda", image: "🧴", inStock: true },
    { id: 10, name: "Szminka matowa", price: 29, category: "uroda", image: "💄", inStock: true },
    { id: 11, name: "Zestaw pędzli", price: 79, category: "uroda", image: "🖌️", inStock: true },
    { id: 12, name: "Naszywki na rzęsy", price: 19, category: "uroda", image: "👁️", inStock: true },
    { id: 13, name: "Srebrny pierścionek", price: 159, category: "bizuteria", image: "💍", inStock: true },
    { id: 14, name: "Złoty naszyjnik", price: 299, category: "bizuteria", image: "📿", inStock: true },
    { id: 15, name: "Bransoletka z diamentami", price: 499, category: "bizuteria", image: "✨", inStock: true },
    { id: 16, name: "Poduszka dekoracyjna", price: 49, category: "dom", image: "🛋️", inStock: true },
    { id: 17, name: "Lampa stołowa", price: 89, category: "dom", image: "💡", inStock: true },
    { id: 18, name: "Zestaw pościeli", price: 129, category: "dom", image: "🛏️", inStock: true },
    { id: 19, name: "Hantle 2kg", price: 39, category: "sport", image: "🏋️", inStock: true },
    { id: 20, name: "Mata do jogi", price: 79, category: "sport", image: "🧘", inStock: true }
];

let users = [];
try {
    const storedUsers = localStorage.getItem("zk_users");
    if (storedUsers) users = JSON.parse(storedUsers);
    else {
        users = [
            { id: 1, name: "Admin", email: "admin@zk.pl", password: "admin123", isAdmin: true },
            { id: 2, name: "Jan Kowalski", email: "jan@example.com", password: "jan123", isAdmin: false }
        ];
        saveUsers();
    }
} catch(e) { console.error(e); }

function saveUsers() { localStorage.setItem("zk_users", JSON.stringify(users)); }

let currentUser = null;
let cart = [];
let favorites = [];

try {
    const storedCart = localStorage.getItem("zk_cart");
    if (storedCart) cart = JSON.parse(storedCart);
    const storedFav = localStorage.getItem("zk_favorites");
    if (storedFav) favorites = JSON.parse(storedFav);
} catch(e) {}

function saveCart() { localStorage.setItem("zk_cart", JSON.stringify(cart)); updateCartCount(); }
function saveFavorites() { localStorage.setItem("zk_favorites", JSON.stringify(favorites)); }
function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartCount").innerText = total;
}
let currentCategory = "all";
let searchQuery = "";

function renderProducts() {
    let filtered = products.filter(p => 
        (currentCategory === "all" || p.category === currentCategory) &&
        (searchQuery === "" || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    const container = document.getElementById("productsContainer");
    const noResults = document.getElementById("noResults");
    if (filtered.length === 0) {
        container.innerHTML = "";
        noResults.style.display = "block";
        return;
    }
    noResults.style.display = "none";
    container.innerHTML = filtered.map(p => `
        <div class="product-card" data-id="${p.id}">
            <div class="product-img">${p.image}</div>
            <div class="product-info">
                <div class="product-title">${p.name}</div>
                <div class="product-price">${p.price} zł</div>
                <div class="product-category">${p.category.toUpperCase()}</div>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${p.id}">🛒 Dodaj do koszyka</button>
                    <button class="add-to-fav" data-id="${p.id}">❤️ Ulubione</button>
                </div>
            </div>
        </div>
    `).join("");
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute("data-id"));
            addToCart(id);
        });
    });
    document.querySelectorAll(".add-to-fav").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute("data-id"));
            toggleFavorite(id);
        });
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existing = cart.find(item => item.id === productId);
    if (existing) existing.quantity++;
    else cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
    saveCart();
    showMessage("Dodano do koszyka", "#d4af37");
}

function toggleFavorite(productId) {
    const idx = favorites.indexOf(productId);
    if (idx === -1) {
        favorites.push(productId);
        showMessage("Dodano do ulubionych", "#ff6b6b");
    } else {
        favorites.splice(idx, 1);
        showMessage("Usunięto z ulubionych", "#999");
    }
    saveFavorites();
}

function showMessage(text, bgColor) {
    let msg = document.getElementById("tempMessage");
    if (!msg) {
        msg = document.createElement("div");
        msg.id = "tempMessage";
        msg.style.position = "fixed";
        msg.style.bottom = "20px";
        msg.style.left = "50%";
        msg.style.transform = "translateX(-50%)";
        msg.style.backgroundColor = bgColor;
        msg.style.color = "white";
        msg.style.padding = "10px 20px";
        msg.style.borderRadius = "30px";
        msg.style.zIndex = "2000";
        msg.style.fontWeight = "bold";
        document.body.appendChild(msg);
    }
    msg.style.backgroundColor = bgColor;
    msg.innerText = text;
    msg.style.display = "block";
    setTimeout(() => { msg.style.display = "none"; }, 1500);
}

function updateUIForUser() {
    const authSection = document.getElementById("authSection");
    const userPanel = document.getElementById("userPanel");
    const userNameDisplay = document.getElementById("userNameDisplay");
    if (currentUser) {
        authSection.style.display = "none";
        userPanel.style.display = "flex";
        userNameDisplay.innerText = currentUser.name;
        if (currentUser.isAdmin) {
            let adminBtn = document.getElementById("adminPanelBtn");
            if (!adminBtn) {
                adminBtn = document.createElement("button");
                adminBtn.id = "adminPanelBtn";
                adminBtn.className = "action-btn";
                adminBtn.innerHTML = "👑 Panel Admina";
                adminBtn.style.background = "#d4af37";
                adminBtn.style.color = "white";
                document.querySelector(".header-actions").prepend(adminBtn);
                adminBtn.addEventListener("click", () => openAdminPanel());
            }
        } else {
            const btn = document.getElementById("adminPanelBtn");
            if (btn) btn.remove();
        }
    } else {
        authSection.style.display = "flex";
        userPanel.style.display = "none";
        const btn = document.getElementById("adminPanelBtn");
        if (btn) btn.remove();
    }
}

function openAdminPanel() {
    if (!currentUser || !currentUser.isAdmin) return;
    renderAdminUsers();
    renderAdminProducts();
    document.getElementById("adminPanel").style.display = "flex";
}

function renderAdminUsers() {
    const container = document.getElementById("usersList");
    container.innerHTML = users.map(u => `
        <div>
            <span><strong>${u.name}</strong> (${u.email}) ${u.isAdmin ? "👑 ADMIN" : ""}</span>
            ${!u.isAdmin ? `<button class="delete-user-btn" data-id="${u.id}">Usuń</button>` : ""}
        </div>
    `).join("");
    document.querySelectorAll(".delete-user-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(btn.getAttribute("data-id"));
            users = users.filter(u => u.id !== id);
            saveUsers();
            renderAdminUsers();
        });
    });
}

function renderAdminProducts() {
    const container = document.getElementById("productsListAdmin");
    container.innerHTML = products.map(p => `
        <div>
            <span>${p.name} - ${p.price} zł (${p.category})</span>
            <button class="delete-product-btn" data-id="${p.id}">Usuń</button>
        </div>
    `).join("");
    document.querySelectorAll(".delete-product-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(btn.getAttribute("data-id"));
            products = products.filter(p => p.id !== id);
            renderProducts();
            renderAdminProducts();
        });
    });
}

function addNewProduct(name, price, category) {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    products.push({ id: newId, name, price, category, image: "📦", inStock: true });
    renderProducts();
    if (currentUser && currentUser.isAdmin) renderAdminProducts();
}

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartCount();
    const savedUser = sessionStorage.getItem("zk_currentUser");
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            updateUIForUser();
        } catch(e) {}
    }
    const modalAuth = document.getElementById("authModal");
    const modalCart = document.getElementById("cartModal");
    const modalFav = document.getElementById("favoritesModal");
    const adminModal = document.getElementById("adminPanel");
    document.getElementById("loginBtn").onclick = () => { modalAuth.style.display = "flex"; document.getElementById("loginForm").style.display = "block"; document.getElementById("registerForm").style.display = "none"; };
    document.getElementById("registerBtn").onclick = () => { modalAuth.style.display = "flex"; document.getElementById("registerForm").style.display = "block"; document.getElementById("loginForm").style.display = "none"; };
    document.querySelectorAll(".close-modal").forEach(btn => {
        btn.onclick = function() {
            modalAuth.style.display = "none";
            modalCart.style.display = "none";
            modalFav.style.display = "none";
            adminModal.style.display = "none";
        };
    });
    document.getElementById("switchToRegister").onclick = (e) => { e.preventDefault(); document.getElementById("loginForm").style.display = "none"; document.getElementById("registerForm").style.display = "block"; };
    document.getElementById("switchToLogin").onclick = (e) => { e.preventDefault(); document.getElementById("registerForm").style.display = "none"; document.getElementById("loginForm").style.display = "block"; };
    document.getElementById("submitLogin").onclick = () => {
        const email = document.getElementById("loginEmail").value.trim();
        const pass = document.getElementById("loginPassword").value.trim();
        const user = users.find(u => u.email === email && u.password === pass);
        if (user) {
            currentUser = user;
            sessionStorage.setItem("zk_currentUser", JSON.stringify(user));
            updateUIForUser();
            modalAuth.style.display = "none";
            showMessage(`Witaj ${user.name}!`, "#4caf50");
        } else alert("Błędny email lub hasło");
    };
    document.getElementById("submitRegister").onclick = () => {
        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const pass = document.getElementById("regPassword").value.trim();
        const adminCode = document.getElementById("regAdminCode").value.trim();
        if (!name || !email || !pass) { alert("Wypełnij wszystkie pola"); return; }
        if (users.some(u => u.email === email)) { alert("Email już istnieje"); return; }
        const isAdmin = (adminCode === "admin123");
        const newUser = { id: Date.now(), name, email, password: pass, isAdmin };
        users.push(newUser);
        saveUsers();
        currentUser = newUser;
        sessionStorage.setItem("zk_currentUser", JSON.stringify(newUser));
        updateUIForUser();
        modalAuth.style.display = "none";
        showMessage(`Zarejestrowano! Witaj ${name}`, "#4caf50");
    };
    document.getElementById("logoutBtn").onclick = () => {
        currentUser = null;
        sessionStorage.removeItem("zk_currentUser");
        updateUIForUser();
        showMessage("Wylogowano", "#999");
    };
    document.getElementById("cartBtn").onclick = () => {
        const cartContainer = document.getElementById("cartItems");
        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Koszyk jest pusty</p>";
            document.getElementById("cartTotal").innerText = "Łącznie: 0 zł";
        } else {
            cartContainer.innerHTML = cart.map(item => {
                const product = products.find(p => p.id === item.id);
                const price = product ? product.price : item.price;
                return `
                    <div data-id="${item.id}">
                        <span class="cart-item-title">${item.name}</span>
                        <span class="cart-item-price">${price} zł</span>
                        <div class="cart-item-qty">
                            <button class="cart-qty-minus" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="cart-qty-plus" data-id="${item.id}">+</button>
                        </div>
                        <span class="cart-item-total">${(price * item.quantity).toFixed(2)} zł</span>
                        <button class="remove-item-btn" data-id="${item.id}">Usuń</button>
                    </div>
                `;
            }).join("");
            const total = cart.reduce((sum, item) => {
                const product = products.find(p => p.id === item.id);
                const price = product ? product.price : item.price;
                return sum + (price * item.quantity);
            }, 0);
            document.getElementById("cartTotal").innerText = `Łącznie: ${total.toFixed(2)} zł`;
            document.querySelectorAll(".cart-qty-minus").forEach(btn => {
                btn.onclick = () => { changeQty(parseInt(btn.getAttribute("data-id")), -1); document.getElementById("cartBtn").click(); };
            });
            document.querySelectorAll(".cart-qty-plus").forEach(btn => {
                btn.onclick = () => { changeQty(parseInt(btn.getAttribute("data-id")), 1); document.getElementById("cartBtn").click(); };
            });
            document.querySelectorAll(".remove-item-btn").forEach(btn => {
                btn.onclick = () => { removeCartItem(parseInt(btn.getAttribute("data-id"))); document.getElementById("cartBtn").click(); };
            });
        }
        modalCart.style.display = "flex";
    };
    document.getElementById("favoritesBtn").onclick = () => {
        const favContainer = document.getElementById("favoritesItems");
        const favProducts = products.filter(p => favorites.includes(p.id));
        if (favProducts.length === 0) favContainer.innerHTML = "<p>Brak ulubionych produktów</p>";
        else {
            favContainer.innerHTML = favProducts.map(p => `
                <div data-id="${p.id}">
                    <span>${p.name} - ${p.price} zł</span>
                    <button class="remove-fav-btn" data-id="${p.id}">Usuń</button>
                </div>
            `).join("");
            document.querySelectorAll(".remove-fav-btn").forEach(btn => {
                btn.onclick = () => {
                    const id = parseInt(btn.getAttribute("data-id"));
                    favorites = favorites.filter(f => f !== id);
                    saveFavorites();
                    document.getElementById("favoritesBtn").click();
                };
            });
        }
        modalFav.style.display = "flex";
    };
    function changeQty(id, delta) {
        const idx = cart.findIndex(i => i.id === id);
        if (idx === -1) return;
        const newQty = cart[idx].quantity + delta;
        if (newQty <= 0) cart.splice(idx, 1);
        else cart[idx].quantity = newQty;
        saveCart();
    }
    function removeCartItem(id) {
        cart = cart.filter(i => i.id !== id);
        saveCart();
    }
    document.getElementById("checkoutBtn").onclick = () => {
        if (cart.length === 0) alert("Koszyk jest pusty");
        else {
            alert("Przejście do płatności (demo)");
            document.getElementById("cartModal").style.display = "none";
        }
    };
    document.getElementById("addProductBtn").onclick = () => {
        const name = prompt("Nazwa produktu:");
        if (!name) return;
        const price = parseFloat(prompt("Cena (zł):"));
        if (isNaN(price)) return;
        const cat = prompt("Kategoria (moda, elektronika, uroda, bizuteria, dom, sport):");
        if (!cat) return;
        addNewProduct(name, price, cat);
    };
    document.querySelectorAll(".category-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            currentCategory = link.getAttribute("data-cat");
            renderProducts();
        });
    });
    document.getElementById("searchBtn").onclick = () => {
        searchQuery = document.getElementById("searchInput").value.trim();
        renderProducts();
    };
    document.getElementById("searchInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            searchQuery = e.target.value.trim();
            renderProducts();
        }
    });
    document.querySelectorAll(".admin-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const tab = btn.getAttribute("data-tab");
            document.querySelectorAll(".admin-tab-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            document.querySelectorAll(".admin-tab-content").forEach(c => c.classList.remove("active"));
            if (tab === "users") document.getElementById("adminUsersTab").classList.add("active");
            else document.getElementById("adminProductsTab").classList.add("active");
        });
    });
    window.onclick = function(e) {
        if (e.target.classList.contains("modal")) e.target.style.display = "none";
    };
});
