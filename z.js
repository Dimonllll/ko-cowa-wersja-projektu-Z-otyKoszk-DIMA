(function() {
    const productsData = [
        { id: 101, title: 'buty damskie', price: 1499, category: 'fashion', img: '1.jpg' },
        { id: 102, title: 'Koszulka czarna / fioletowa', price: 129, category: 'fashion', img: 'shirt-1.jpg' },
        { id: 103, title: 'bluza', price: 499, category: 'home', img: '3.jpg' },
        { id: 104, title: 'buty', price: 189, category: 'sport', img: 'sports-1.jpg' },
        { id: 105, title: 'czapka', price: 349, category: 'fashion', img: '4.jpg' },
        { id: 106, title: 'Szminka matowa – fiolet', price: 59, category: 'beauty', img: 'perfume.jpg' },
        { id: 201, title: 'bluza', price: 2499, category: 'fashion', img: '2.jpg' },
        { id: 202, title: 'bluza lol', price: 3999, category: 'fashion', img: '3.jpg' },
        { id: 203, title: 'czapka', price: 25, category: 'fashion', img: '4.jpg' },
        { id: 204, title: 'buty', price: 899, category: 'fashion', img: '1.jpg' },
        { id: 205, title: 'bluza', price: 129, category: 'fashion', img: '2.jpg' },
        { id: 206, title: 'bluza', price: 249, category: 'fashion', img: '3.jpg' },
        { id: 207, title: 'buty sportowe extra', price: 89, category: 'sport', img: 'sports-2.jpg' },
        { id: 208, title: 'Kurtka zimowa czarna', price: 299, category: 'fashion', img: 'jacket-1.jpg' },
        { id: 107, title: 'czapka grotesk', price: 89, category: 'home', img: '4.jpg' },
        { id: 108, title: 'Płaszcz czarny oversize', price: 599, category: 'fashion', img: 'jacket-2.jpg' },
        { id: 301, title: 'Buty sportowe 1', price: 249, category: 'sport', img: 'shoe-1.jpg' },
        { id: 302, title: 'Buty sportowe 2', price: 279, category: 'sport', img: 'shoe-2.jpg' },
        { id: 303, title: 'Buty eleganckie', price: 329, category: 'fashion', img: 'shoe-3.jpg' },
        { id: 304, title: 'Trampki', price: 199, category: 'fashion', img: 'shoe-4.jpg' },
        { id: 305, title: 'Buty do biegania', price: 289, category: 'sport', img: 'shoe-5.jpg' },
        { id: 306, title: 'Koszula biała', price: 99, category: 'fashion', img: 'shirt-2.jpg' },
        { id: 307, title: 'Kurtka jeansowa', price: 199, category: 'fashion', img: 'jacket-3.jpg' },
        { id: 308, title: 'Kurtka puchowa', price: 399, category: 'fashion', img: 'jacket-4.jpg' },
        { id: 309, title: 'Kurtka skórzana', price: 499, category: 'fashion', img: 'jacket-5.jpg' },
        { id: 310, title: 'Kurtka softshell', price: 219, category: 'sport', img: 'jacket-6.jpg' },
        { id: 311, title: 'Spodenki jeansowe', price: 79, category: 'fashion', img: 'shorts-1.jpg' },
        { id: 312, title: 'Spodenki sportowe', price: 69, category: 'sport', img: 'shorts-2.jpg' },
        { id: 313, title: 'Zegarek klasyczny', price: 399, category: 'electronics', img: 'watch-1.jpg' },
        { id: 314, title: 'Zegarek sportowy', price: 299, category: 'electronics', img: 'watch-2.jpg' },
        { id: 315, title: 'Zegarek elegancki', price: 599, category: 'jewellery', img: 'watch-3.jpg' },
        { id: 316, title: 'Zegarek old', price: 449, category: 'jewellery', img: 'watch-4.jpg' },
        { id: 324, title: 'Kolczyki srebrne', price: 99, category: 'jewellery', img: 'jewellery-1.jpg' },
        { id: 325, title: 'Pierścionek', price: 299999, category: 'jewellery', img: 'jewellery-2.jpg' },
        { id: 326, title: 'Złoty łańcuszek', price: 49999, category: 'jewellery', img: 'jewellery-3.jpg' },
        { id: 321, title: 'Perfumy damskie', price: 179, category: 'beauty', img: 'perfume.jpg' },
        { id: 322, title: 'Szampon do włosów', price: 29, category: 'beauty', img: 'shampoo.jpg' },
        { id: 317, title: 'Bluza dresowa', price: 119, category: 'sport', img: 'clothes-1.jpg' },
        { id: 327, title: 'buty sportowe', price: 829, category: 'sport', img: 'sports-3.jpg' },
        { id: 328, title: 'buty sportowe', price: 779, category: 'sport', img: 'sports-4.jpg' },
        { id: 329, title: 'buty sportowe', price: 569, category: 'sport', img: 'sports-5.jpg' },
        { id: 330, title: 'buty sportowe', price: 349, category: 'sport', img: 'sports-6.jpg' },
        { id: 318, title: 'Bluza z kapturem', price: 139, category: 'home', img: 'clothes-2.jpg' },
        { id: 319, title: 'buty na obcasie', price: 299, category: 'fashion', img: 'party-wear-1.jpg' },
        { id: 320, title: 'buty na szpinkach', price: 259, category: 'fashion', img: 'party-wear-2.jpg' },
        { id: 323, title: 'Pasek skórzany', price: 89, category: 'fashion', img: 'belt.jpg' }
    ];

    let cart = {};
    let favorites = [];
    let currentCategory = 'all';
    let searchQuery = '';

    const productsGrid = document.getElementById('productsGrid');
    const cartCountSpan = document.querySelector('.js-cart-count');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalSpan = document.getElementById('cartTotal');
    const categoryFilters = document.querySelectorAll('.js-category-filter');
    const searchInput = document.querySelector('.js-search-input');
    const searchForm = document.querySelector('.js-search-form');
    const searchBtn = document.querySelector('.js-search-btn');
    const themeToggle = document.querySelector('.js-theme-toggle');
    const body = document.body;
    const payButton = document.querySelector('.js-pay-button');
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    const registerLink = document.getElementById('registerLink');
    const cartIcon = document.querySelector('.js-cart-icon');
    const toastContainer = document.getElementById('toastContainer');

    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const detailCard = document.getElementById('detail-card');
    const detailBlik = document.getElementById('detail-blik');
    const detailTransfer = document.getElementById('detail-transfer');
    const detailPaypal = document.getElementById('detail-paypal');
    const cardNumber = document.getElementById('cardNumber');
    const cardExpiry = document.getElementById('cardExpiry');
    const cardCvv = document.getElementById('cardCvv');
    const blikCode = document.getElementById('blikCode');

    const favoritesSidebar = document.getElementById('favoritesSidebar');
    const favoritesSidebarContent = document.getElementById('favoritesSidebarContent');
    const favoritesToggleBtn = document.getElementById('favoritesToggleBtn');
    const favoritesSidebarClose = document.getElementById('favoritesSidebarClose');
    const favoritesOverlay = document.getElementById('favoritesOverlay');

    function showToast(message) {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    function smoothScroll(targetSelector) {
        const target = document.querySelector(targetSelector);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function updateCartCountDisplay() {
        const totalItems = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
        if (cartCountSpan) cartCountSpan.textContent = totalItems;
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) cart = JSON.parse(savedCart);
    }

    function saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    function loadFavorites() {
        const savedFav = localStorage.getItem('favorites');
        if (savedFav) favorites = JSON.parse(savedFav);
    }

    function renderCart() {
        if (!cartItemsContainer || !cartTotalSpan) return;
        const cartItems = Object.entries(cart);
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<div class="cart-empty">Koszyk jest pusty. Dodaj produkty.</div>';
            cartTotalSpan.textContent = 'Łącznie: 0 zł';
            updateCartCountDisplay();
            return;
        }
        let html = '';
        let total = 0;
        cartItems.forEach(([id, item]) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            html += `
                <li class="cart-item" data-id="${id}">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">${item.price} zł</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="cart-qty-btn cart-decrease" data-id="${id}" title="Zmniejsz ilość">−</button>
                        <span>${item.quantity}</span>
                        <button class="cart-qty-btn cart-increase" data-id="${id}" title="Zwiększ ilość">+</button>
                        <button class="cart-item-remove" data-id="${id}" title="Usuń z koszyka">Usuń</button>
                    </div>
                </li>
            `;
        });
        cartItemsContainer.innerHTML = `<ul class="cart-items" style="list-style:none;">${html}</ul>`;
        cartTotalSpan.textContent = `Łącznie: ${total} zł`;
        updateCartCountDisplay();

        document.querySelectorAll('.cart-decrease').forEach(btn => btn.addEventListener('click', (e) => {
            e.preventDefault();
            changeQuantity(btn.dataset.id, -1);
        }));
        document.querySelectorAll('.cart-increase').forEach(btn => btn.addEventListener('click', (e) => {
            e.preventDefault();
            changeQuantity(btn.dataset.id, 1);
        }));
        document.querySelectorAll('.cart-item-remove').forEach(btn => btn.addEventListener('click', (e) => {
            e.preventDefault();
            removeFromCart(btn.dataset.id);
        }));
    }

    function addToCart(id, title, price) {
        if (cart[id]) cart[id].quantity += 1;
        else cart[id] = { title, price, quantity: 1 };
        renderCart();
        showToast(`Dodano do koszyka: ${title}`);
        saveCart();
    }

    function removeFromCart(id) {
        delete cart[id];
        renderCart();
        showToast('Produkt usunięty z koszyka');
        saveCart();
    }

    function changeQuantity(id, delta) {
        if (cart[id]) {
            const newQty = cart[id].quantity + delta;
            if (newQty <= 0) removeFromCart(id);
            else {
                cart[id].quantity = newQty;
                renderCart();
                saveCart();
            }
        }
    }

    function toggleFavorite(id) {
        const index = favorites.indexOf(id);
        const product = productsData.find(p => p.id == id);
        if (!product) return;
        if (index === -1) {
            favorites.push(id);
            showToast(`Dodano do ulubionych: ${product.title}`);
        } else {
            favorites.splice(index, 1);
            showToast(`Usunięto z ulubionych: ${product.title}`);
        }
        document.querySelectorAll(`.js-fav-btn[data-id="${id}"]`).forEach(btn => {
            if (favorites.includes(id)) btn.classList.add('active');
            else btn.classList.remove('active');
        });
        renderFavoritesSidebar();
        saveFavorites();
    }

    function renderFavoritesSidebar() {
        if (!favoritesSidebarContent) return;
        if (favorites.length === 0) {
            favoritesSidebarContent.innerHTML = '<div class="favorites-empty">Nie masz jeszcze ulubionych produktów. Kliknij serduszko przy produkcie.</div>';
            return;
        }
        const favProducts = productsData.filter(p => favorites.includes(p.id));
        favoritesSidebarContent.innerHTML = favProducts.map(p => `
            <div class="favorites-sidebar-item" data-id="${p.id}">
                <img src="${p.img}" alt="${p.title}" class="favorites-sidebar-item-img" onerror="this.src='https://via.placeholder.com/60?text=No+img'">
                <div class="favorites-sidebar-item-info">
                    <div class="favorites-sidebar-item-title">${p.title}</div>
                    <div class="favorites-sidebar-item-price">${p.price} zł</div>
                </div>
                <div class="favorites-sidebar-item-actions">
                    <button class="favorites-sidebar-item-add" data-id="${p.id}" title="Dodaj do koszyka">➕</button>
                    <button class="favorites-sidebar-item-remove" data-id="${p.id}" title="Usuń z ulubionych">🗑️</button>
                </div>
            </div>
        `).join('');
        document.querySelectorAll('.favorites-sidebar-item-add').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = Number(btn.dataset.id);
                const product = productsData.find(p => p.id == id);
                if (product) addToCart(id, product.title, product.price);
            });
        });
        document.querySelectorAll('.favorites-sidebar-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = Number(btn.dataset.id);
                toggleFavorite(id);
            });
        });
    }

    function openFavoritesSidebar() {
        favoritesSidebar.classList.add('open');
        favoritesOverlay.classList.add('active');
        renderFavoritesSidebar();
    }

    function closeFavoritesSidebar() {
        favoritesSidebar.classList.remove('open');
        favoritesOverlay.classList.remove('active');
    }

    function attachProductButtons() {
        document.querySelectorAll('.js-add-to-cart').forEach(btn => {
            btn.removeEventListener('click', handleAddToCart);
            btn.addEventListener('click', handleAddToCart);
        });
        document.querySelectorAll('.js-fav-btn').forEach(btn => {
            btn.removeEventListener('click', handleToggleFav);
            btn.addEventListener('click', handleToggleFav);
        });
        document.querySelectorAll('.product-img').forEach(imgDiv => {
            imgDiv.removeEventListener('click', handleImageClick);
            imgDiv.addEventListener('click', handleImageClick);
        });
    }

    function handleAddToCart(e) {
        e.preventDefault();
        const card = e.currentTarget.closest('.product-card');
        if (!card) return;
        const id = Number(card.dataset.id);
        const title = card.querySelector('.product-title').textContent;
        const price = parseFloat(card.dataset.price);
        addToCart(id, title, price);
    }

    function handleToggleFav(e) {
        e.preventDefault();
        const id = Number(e.currentTarget.dataset.id);
        toggleFavorite(id);
    }

    function handleImageClick(e) {
        e.stopPropagation();
        const img = this.querySelector('img');
        if (img && img.src) {}
    }

    function renderProducts() {
        if (!productsGrid) return;
        productsGrid.innerHTML = productsData.map(p => `
            <div class="product-card js-product-card" data-category="${p.category}" data-id="${p.id}" data-price="${p.price}">
                <div class="product-img">
                    <img src="${p.img}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/200?text=Produkt'">
                </div>
                <div class="product-info">
                    <div class="product-category">${p.category}</div>
                    <h3 class="product-title">${p.title}</h3>
                    <div class="product-price">${p.price} zł</div>
                    <div class="product-actions">
                        <button class="btn-add js-add-to-cart" data-id="${p.id}" title="Dodaj do koszyka">➕ Dodaj</button>
                        <button class="btn-fav js-fav-btn ${favorites.includes(p.id) ? 'active' : ''}" data-id="${p.id}" title="Dodaj do ulubionych">❤️</button>
                    </div>
                </div>
            </div>
        `).join('');
        attachProductButtons();
    }

    function filterProducts() {
        const categoryToUse = currentCategory;
        const query = searchQuery.trim().toLowerCase();
        document.querySelectorAll('.js-product-card').forEach(card => {
            const cardCategory = card.dataset.category;
            const titleEl = card.querySelector('.product-title');
            const title = titleEl ? titleEl.textContent.toLowerCase() : '';
            const categoryMatch = (categoryToUse === 'all') || (cardCategory === categoryToUse);
            const searchMatch = (query === '') || title.includes(query);
            card.style.display = (categoryMatch && searchMatch) ? '' : 'none';
        });
    }

    function handleSearch(e) {
        e.preventDefault();
        if (searchInput) searchQuery = searchInput.value;
        filterProducts();
    }

    function updatePaymentDetails() {
        const selected = document.querySelector('input[name="payment"]:checked').value;
        detailCard.style.display = 'none';
        detailBlik.style.display = 'none';
        detailTransfer.style.display = 'none';
        detailPaypal.style.display = 'none';
        if (selected === 'card') detailCard.style.display = 'flex';
        else if (selected === 'blik') detailBlik.style.display = 'flex';
        else if (selected === 'transfer') detailTransfer.style.display = 'flex';
        else if (selected === 'paypal') detailPaypal.style.display = 'flex';
    }

    function handlePayment() {
        const selected = document.querySelector('input[name="payment"]:checked').value;
        let valid = true;
        if (selected === 'card') {
            if (!cardNumber.value || !cardExpiry.value || !cardCvv.value) {
                showToast('Wypełnij wszystkie dane karty');
                valid = false;
            }
        } else if (selected === 'blik') {
            const code = blikCode.value;
            if (!/^\d{6}$/.test(code)) {
                showToast('Kod BLIK musi składać się z 6 cyfr');
                valid = false;
            }
        }
        if (valid) {
            cart = {};
            renderCart();
            saveCart();
            showToast('Płatność zakończona sukcesem! Dziękujemy.');
            if (selected === 'card') {
                cardNumber.value = '';
                cardExpiry.value = '';
                cardCvv.value = '';
            } else if (selected === 'blik') {
                blikCode.value = '';
            }
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            body.classList.toggle('light-theme');
            themeToggle.textContent = body.classList.contains('light-theme') ? '☀️' : '🌙';
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.add('active');
        });
    }
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            loginModal.classList.remove('active');
            loginError.textContent = '';
        });
    }
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.classList.remove('active');
    });
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Zalogowano pomyślnie (demo)');
            loginModal.classList.remove('active');
            loginError.textContent = '';
        });
    }
    if (registerLink) {
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Rejestracja demo – konto utworzone');
        });
    }

    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScroll('#cartSection');
        });
    }

    if (favoritesToggleBtn) {
        favoritesToggleBtn.addEventListener('click', openFavoritesSidebar);
    }
    if (favoritesSidebarClose) {
        favoritesSidebarClose.addEventListener('click', closeFavoritesSidebar);
    }
    if (favoritesOverlay) {
        favoritesOverlay.addEventListener('click', closeFavoritesSidebar);
    }

    categoryFilters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            e.preventDefault();
            const category = filter.dataset.category;
            categoryFilters.forEach(el => el.classList.remove('active'));
            filter.classList.add('active');
            currentCategory = category;
            filterProducts();
        });
    });

    if (searchForm) searchForm.addEventListener('submit', handleSearch);
    if (searchBtn) searchBtn.addEventListener('click', handleSearch);

    paymentRadios.forEach(radio => radio.addEventListener('change', updatePaymentDetails));
    if (payButton) payButton.addEventListener('click', handlePayment);

    const cyberModeBtn = document.getElementById('cyberModeBtn');
    let cyberModeActive = localStorage.getItem('cyberMode') === 'true';
    function setCyberMode(active) {
        if (active) {
            document.body.classList.add('cyber-mode');
            if (cyberModeBtn) cyberModeBtn.innerHTML = '⚡ Cyber Mode ON';
        } else {
            document.body.classList.remove('cyber-mode');
            if (cyberModeBtn) cyberModeBtn.innerHTML = '💠 Cyber Mode';
        }
        localStorage.setItem('cyberMode', active);
        cyberModeActive = active;
    }
    if (cyberModeBtn) {
        cyberModeBtn.addEventListener('click', () => setCyberMode(!cyberModeActive));
    }
    setCyberMode(cyberModeActive);

    function startScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-load, .product-card, .cat-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        animatedElements.forEach(el => observer.observe(el));
    }

    function init() {
        loadCart();
        loadFavorites();
        renderProducts();
        renderCart();
        renderFavoritesSidebar();
        updatePaymentDetails();
        startScrollAnimations();
        updateCartCountDisplay();
        document.querySelectorAll('.js-fav-btn').forEach(btn => {
            const id = Number(btn.dataset.id);
            if (favorites.includes(id)) btn.classList.add('active');
            else btn.classList.remove('active');
        });
    }

    init();
})();