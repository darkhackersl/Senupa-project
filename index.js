// Firebase Configuration and Initialization
const firebaseConfig = {
    apiKey: "AIzaSyAXTwuy5ACKCRCO4M18_v8f_Bwie2gRIeU",
    authDomain: "mr-gadgets.firebaseapp.com",
    projectId: "mr-gadgets",
    storageBucket: "mr-gadgets.firebasestorage.app",
    messagingSenderId: "144245989215",
    appId: "1:144245989215:web:71e02602c87bf0087aa0ea",
    measurementId: "G-R6H4WRR6V4"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.loadFromLocalStorage();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.updateTotal();
        this.saveToLocalStorage();
        this.updateCartUI();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateTotal();
        this.saveToLocalStorage();
        this.updateCartUI();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = parseInt(quantity);
            this.updateTotal();
            this.saveToLocalStorage();
            this.updateCartUI();
        }
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    loadFromLocalStorage() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
            this.updateTotal();
        }
    }

    updateCartUI() {
        const cartBadge = document.getElementById('badge');
        if (cartBadge) {
            cartBadge.textContent = this.items.reduce((sum, item) => sum + item.quantity, 0);
        }
    }
}

// Product Management
class ProductManager {
    constructor() {
        this.products = [];
        this.categories = [];
        this.fetchProducts();
    }

    async fetchProducts() {
        try {
            const snapshot = await db.collection('products').get();
            this.products = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            this.displayProducts();
            this.setupCategories();
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    displayProducts(filters = {}) {
        const productList = document.querySelector('.product-list');
        if (!productList) return;

        let filteredProducts = this.products;

        // Apply filters
        if (filters.category) {
            filteredProducts = filteredProducts.filter(product => 
                product.category === filters.category
            );
        }
        if (filters.priceRange) {
            filteredProducts = filteredProducts.filter(product => 
                product.price >= filters.priceRange[0] && 
                product.price <= filters.priceRange[1]
            );
        }

        productList.innerHTML = filteredProducts.map(product => `
            <div class="product-item" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <p>${product.description}</p>
                <div class="product-actions">
                    <button onclick="addToCart('${product.id}')" class="add-to-cart">
                        Add to Cart
                    </button>
                    <button onclick="addToWishlist('${product.id}')" class="add-to-wishlist">
                        ♡
                    </button>
                </div>
            </div>
        `).join('');
    }

    setupCategories() {
        this.categories = [...new Set(this.products.map(product => product.category))];
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.innerHTML = `
                <option value="">All Categories</option>
                ${this.categories.map(category => `
                    <option value="${category}">${category}</option>
                `).join('')}
            `;
        }
    }
}

// User Profile Management
class UserProfile {
    constructor() {
        this.currentUser = null;
        this.setupAuthStateListener();
    }

    setupAuthStateListener() {
        auth.onAuthStateChanged(user => {
            this.currentUser = user;
            this.updateUIForAuth();
        });
    }

    updateUIForAuth() {
        const authButtons = document.querySelector('.auth-buttons');
        const userProfile = document.querySelector('.user-profile');
        
        if (this.currentUser) {
            if (authButtons) authButtons.style.display = 'none';
            if (userProfile) {
                userProfile.style.display = 'block';
                userProfile.innerHTML = `
                    <span>Welcome, ${this.currentUser.email}</span>
                    <button onclick="logout()">Logout</button>
                `;
            }
        } else {
            if (authButtons) authButtons.style.display = 'block';
            if (userProfile) userProfile.style.display = 'none';
        }
    }
}

// Search Functionality
function setupSearch() {
    const searchInput = document.getElementById('input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const products = document.querySelectorAll('.product-item');
            
            products.forEach(product => {
                const title = product.querySelector('h3').textContent.toLowerCase();
                const description = product.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    }
}

// Initialize Components
const cart = new ShoppingCart();
const productManager = new ProductManager();
const userProfile = new UserProfile();

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    setupSearch();
    
    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            try {
                await fetch('https://formspree.io/f/xeoqavon', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                alert('Message sent successfully!');
                contactForm.reset();
            } catch (error) {
                console.error('Error sending message:', error);
                alert('Failed to send message. Please try again.');
            }
        });
    }
});

// Global Functions
function addToCart(productId) {
    const product = productManager.products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product
