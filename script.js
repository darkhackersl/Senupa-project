document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for your message!');
    this.reset();

});

document.querySelectorAll('.product-item button').forEach(button => {
    button.addEventListener('click', function() {
        cartCount++;
        document.getElementById('cart-count').innerText = cartCount;
        alert(`${this.parentElement.querySelector('h3').innerText} added to cart!`);
    });
});
