// State Management
let cart = JSON.parse(localStorage.getItem('stitchmaster_cart')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    initHeroSlider();
    initSalesTicker();
});

// Cart Functions
function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    countElements.forEach(el => el.textContent = totalItems);
    localStorage.setItem('stitchmaster_cart', JSON.stringify(cart));
}

function addToCart(product) {
    // Inventory Logic: Mock stock check
    const stockLevel = Math.floor(Math.random() * 10); 
    if (stockLevel === 0) {
        showNotification(`Sorry, ${product.name} is currently out of stock!`);
        return;
    }

    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

// Sales Ticker (Mock API logic)
function initSalesTicker() {
    const ticker = document.getElementById('sales-ticker');
    if (!ticker) return;

    const locations = ['London', 'New York', 'Dubai', 'Paris', 'Tokyo', 'Mumbai'];
    const products = ['Silk Thread', 'Cotton Fabric', 'Industrial Needle', 'Singer Part #123'];

    setInterval(() => {
        const loc = locations[Math.floor(Math.random() * locations.length)];
        const prod = products[Math.floor(Math.random() * products.length)];
        
        ticker.innerHTML = `<span><i class="fas fa-shopping-cart"></i> Someone in <strong>${loc}</strong> just bought <strong>${prod}</strong></span>`;
        ticker.style.display = 'flex';
        ticker.classList.add('fade-in');

        setTimeout(() => {
            ticker.style.display = 'none';
        }, 5000);
    }, 15000);
}

// Global Notification
function showNotification(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = msg;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 100);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}
