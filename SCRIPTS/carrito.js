document.addEventListener("DOMContentLoaded", function() {
    
    const itemsContainer = document.getElementById('cart-items-container');
    const subtotalElement = document.getElementById('summary-subtotal');
    const totalElement = document.getElementById('summary-total');

    let currentUser = null;
    let cartKey = null;
    let cart = [];

    // 1. Verifica si el usuario está logueado
    function checkUser() {
        const userString = localStorage.getItem('currentUser');
        if (!userString) {
            alert('Debes iniciar sesión para ver tu carrito.');
            window.location.href = 'iniciosesion.html';
            return false;
        }
        
        currentUser = JSON.parse(userString);
        cartKey = `cart_${currentUser.username}`;
        cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        return true;
    }

    // 2. Muestra los productos en el carrito
    function displayCart() {
        itemsContainer.innerHTML = ''; // Limpia el contenedor
        let subtotal = 0;

        if (cart.length === 0) {
            itemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
            updateSummary(0);
            return;
        }

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            
            const itemTotal = item.precio * item.quantity;
            subtotal += itemTotal;

            itemElement.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.nombre}</h4>
                    <p class="cart-item-price">Bs. ${item.precio.toFixed(2)}</pre>
                    <div class="cart-item-quantity">
                        <label>Cantidad:</label>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                    </div>
                </div>
                <div class="cart-item-actions">
                    <span class="cart-item-total-price">Bs. ${itemTotal.toFixed(2)}</span>
                    <button class="remove-item-btn" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            itemsContainer.appendChild(itemElement);
        });

        // Añade listeners a los botones de eliminar y inputs de cantidad
        addEventListeners();
        // Actualiza el resumen
        updateSummary(subtotal);
    }

    // 3. Actualiza el resumen de la compra
    function updateSummary(subtotal) {
        subtotalElement.textContent = `Bs. ${subtotal.toFixed(2)}`;
        totalElement.textContent = `Bs. ${subtotal.toFixed(2)}`; // (Añadir envío si quieres)
    }

    // 4. Añade listeners para botones de eliminar y cambiar cantidad
    function addEventListeners() {
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.id;
                removeItem(productId);
            });
        });

        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const productId = this.dataset.id;
                const newQuantity = parseInt(this.value);
                updateQuantity(productId, newQuantity);
            });
        });
    }

    // 5. Función para eliminar un item
    function removeItem(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        displayCart();
        window.updateCartCounter(); // Actualiza el contador del header
    }

    // 6. Función para actualizar cantidad
    function updateQuantity(productId, newQuantity) {
        if (newQuantity < 1) {
            removeItem(productId);
            return;
        }
        
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
        }
        saveCart();
        displayCart();
        window.updateCartCounter(); // Actualiza el contador del header
    }

    // 7. Función para guardar el carrito en localStorage
    function saveCart() {
        localStorage.setItem(cartKey, JSON.stringify(cart));
    }

    // --- Ejecución Inicial ---
    if (checkUser()) {
        displayCart();
    }
});