// State Management
let cart = JSON.parse(localStorage.getItem('stitchmaster_cart')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    initHeroSlider();
    initSalesTicker();
    initMobileMenu();
    initAccountDashboard();
    initAuthCheck();
});

// Authentication Check
function initAuthCheck() {
    const isLoginPage = window.location.pathname.includes('login.html');
    const isAccountPage = window.location.pathname.includes('account.html');
    const isLoggedIn = localStorage.getItem('stitchmaster_logged_in') === 'true';

    // Redirect if accessing account while logged out
    if (isAccountPage && !isLoggedIn) {
        window.location.href = 'login.html';
    }

    // Redirect if accessing login while already logged in
    if (isLoginPage && isLoggedIn) {
        window.location.href = 'account.html';
    }

    // Update Navigation Links
    const accountLinks = document.querySelectorAll('a[href="account.html"], a[href="login.html"]');
    accountLinks.forEach(link => {
        if (isLoggedIn) {
            link.href = 'account.html';
            link.textContent = 'Account';
        } else {
            link.href = 'login.html';
            link.textContent = 'Login';
        }
    });
}

// Account Dashboard Logic
function initAccountDashboard() {
    const sidebarItems = document.querySelectorAll('.dashboard-sidebar li[data-section]');
    const tabContents = document.querySelectorAll('.tab-content');
    const logoutBtn = document.getElementById('logout-btn');

    if (sidebarItems.length > 0) {
        sidebarItems.forEach(item => {
            item.addEventListener('click', () => {
                const sectionId = item.getAttribute('data-section');

                // Update Sidebar
                sidebarItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Update Content
                tabContents.forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.id === `${sectionId}-section`) {
                        tab.classList.add('active');
                    }
                });
            });
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('stitchmaster_logged_in'); 
                showNotification('Logging out...');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }
        });
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

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
