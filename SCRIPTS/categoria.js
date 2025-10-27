// categoria.js
document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. LEER LA CATEGORÍA DE LA URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const categoryType = urlParams.get('tipo'); // Obtiene "Laptop", "CPU", etc.

    // --- 2. FILTRAR LOS PRODUCTOS ---
    // Filtra la lista de 'productos' (de busqueda.js)
    const filteredProducts = productos.filter(product => 
        product.especificaciones.tipo === categoryType
    );

    // --- 3. ACTUALIZAR EL TÍTULO DE LA PÁGINA ---
    const titleElement = document.getElementById('category-title');
    if (categoryType) {
        titleElement.textContent = `Mostrando Categoría: ${categoryType}`;
    } else {
        titleElement.textContent = 'Categoría no encontrada';
    }

    // --- 4. COPIA LAS MISMAS FUNCIONES DE 'productos.js' ---
    // (Estas son necesarias para mostrar productos, el modal y añadir al carrito)
    
    const productsContainer = document.getElementById("productsContainer");
    const productModal = document.getElementById("productModal");
    const closeButtons = document.querySelectorAll(".close-button");
    const modalProductName = document.getElementById("modalProductName");
    const modalProductImage = document.getElementById("modalProductImage");
    const modalProductPrice = document.getElementById("modalProductPrice");
    const modalProductDesc = document.getElementById("modalProductDesc");
    const modalProductSpecs = document.getElementById("modalProductSpecs");
    const modalProductStock = document.getElementById("modalProductStock");

    function displayProducts(productsToDisplay) {
        productsContainer.innerHTML = ''; 
        
        if (productsToDisplay.length === 0) {
            productsContainer.innerHTML = `<p>No se encontraron productos en esta categoría.</p>`;
            return;
        }

        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.imagen}" alt="${product.nombre}">
                <h3>${product.nombre}</h3>
                <p>Bs. ${product.precio.toFixed(2)}</p>
                <button class="info-button" data-id="${product.id}">Info</button>
                <button class="add-cart-button" data-id="${product.id}">Añadir al Carrito</button>
            `;
            productsContainer.appendChild(productCard);
        });

        document.querySelectorAll('.info-button').forEach(button => {
            button.addEventListener('click', function() {
                showProductModal(this.dataset.id);
            });
        });
        document.querySelectorAll('.add-cart-button').forEach(button => {
            button.addEventListener('click', function() {
                addProductToCart(this.dataset.id);
            });
        });
    }

    function addProductToCart(productId) {
        const userString = localStorage.getItem('currentUser');
        if (!userString) {
            alert('Por favor, inicia sesión para añadir productos al carrito.');
            window.location.href = 'iniciosesion.html';
            return;
        }
        const user = JSON.parse(userString);
        const cartKey = `cart_${user.username}`; 
        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        let existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            const productToAdd = productos.find(p => p.id === productId);
            if (productToAdd) {
                cart.push({
                    id: productToAdd.id,
                    nombre: productToAdd.nombre,
                    precio: productToAdd.precio,
                    imagen: productToAdd.imagen,
                    quantity: 1
                });
            }
        }
        localStorage.setItem(cartKey, JSON.stringify(cart));
        window.updateCartCounter(); // Llama a la función global de script1.js
        alert('¡Producto añadido al carrito!');
    }

    function showProductModal(productId) {
        const product = productos.find(p => p.id === productId);
        if (product) {
            modalProductName.textContent = product.nombre;
            modalProductImage.src = product.imagen;
            modalProductImage.alt = product.nombre;
            modalProductPrice.textContent = `Bs. ${product.precio.toFixed(2)}`;
            modalProductDesc.textContent = product.descripcionCorta;
            modalProductSpecs.innerHTML = ''; 
            for (const specKey in product.especificaciones) {
                // No mostramos el 'tipo' en las especificaciones ya que es obvio
                if (specKey !== 'tipo') {
                    const li = document.createElement('li');
                    const keyFormatted = specKey.charAt(0).toUpperCase() + specKey.slice(1);
                    li.textContent = `${keyFormatted}: ${product.especificaciones[specKey]}`;
                    modalProductSpecs.appendChild(li);
                }
            }
            productModal.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        }
    }
    
    function closeProductModal() {
        productModal.classList.remove('active');
        document.body.style.overflow = ''; 
    }
    
    closeButtons.forEach(button => {
        button.addEventListener('click', closeProductModal);
    });
    
    window.addEventListener('click', function(event) {
        if (event.target == productModal) {
            closeProductModal();
        }
    });

    // --- 5. EJECUTAR LA FUNCIÓN ---
    // Llama a displayProducts con la lista que filtramos al principio
    displayProducts(filteredProducts);
});