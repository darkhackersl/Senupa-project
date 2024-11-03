class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.loadCart();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.updateTotal();
        this.saveCart();
        this.updateCartUI();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateTotal();
        this.saveCart();
        this.updateCartUI();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = parseInt(quantity);
            this.updateTotal();
            this.saveCart();
            this.updateCartUI();
        }
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
            this.updateTotal();
        }
    }

    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = this.items.reduce((sum, item) => sum + item.quantity, 0);
        }

        // Update cart page if it exists
        const cartItemsContainer = document.getElementById('cart-items');
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = this.items.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h3>${item.name}</h3>
                        <p>$${item.price}</p>
                        <input type="number" value="${item.quantity}" min="1" onchange="cart.updateQuantity('${item.id}', this.value)">
                        <button onclick="cart.removeItem('${item.id}')">Remove</button>
                    </div>
                </div>
            `).join('');

            const totalElement = document.getElementById('cart-total');
            if (totalElement) {
                totalElement.textContent = `$${this.total.toFixed(2)}`;
            }
        }
    }
}

// Initialize cart
const cart = new Cart();
