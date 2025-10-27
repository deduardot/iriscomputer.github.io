// detalle_producto.js
document.addEventListener("DOMContentLoaded", function() {
    const pageTitle = document.getElementById('page-title');
    const productName = document.getElementById('productName');
    const productCategory = document.getElementById('productCategory');
    const productPrice = document.getElementById('productPrice');
    const productStock = document.getElementById('productStock');
    const productLongDescription = document.getElementById('productLongDescription');
    const productSpecs = document.getElementById('productSpecs');
    const mainProductImage = document.getElementById('mainProductImage');
    const mainImageContainer = document.getElementById('main-image-container'); // Para el zoom
    const thumbnailGallery = document.getElementById('thumbnailGallery');
    const quantityInput = document.getElementById('quantityInput');
    const minusBtn = document.getElementById('minusBtn');
    const plusBtn = document.getElementById('plusBtn');
    const addToCartBtn = document.getElementById('addToCartBtn');
    
    // Elementos de Calificación
    const productStars = document.getElementById('productStars');
    const ratingValue = document.getElementById('ratingValue');
    const reviewsCount = document.getElementById('reviewsCount');
    const reviewSummary = document.getElementById('reviewSummary');

    let currentProduct = null;
    let initialQuantity = 1; // Para el input de cantidad

    // --- FUNCIONES DE CALIFICACIÓN ---
    function generateStars(rating) {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                starsHtml += '<span class="star">★</span>'; // Estrella completa
            } else if (rating > i - 1 && rating < i) {
                // Media estrella o estrella parcial
                const percentage = (rating - (i - 1)) * 100;
                starsHtml += `<span class="star half" style="--half-star-width: ${percentage}%;">★</span>`;
            } else {
                starsHtml += '<span class="star half" style="--half-star-width: 0%;">★</span>'; // Estrella vacía
            }
        }
        return starsHtml;
    }

    function generateReviewBars(totalReviews) {
        // Valores de ejemplo para las distribuciones (puedes hacerlos dinámicos si tienes data real)
        const distribution = {
            5: 0.71, // 71%
            4: 0.09, // 9%
            3: 0.06, // 6%
            2: 0.04, // 4%
            1: 0.10  // 10%
        };

        let html = '';
        for (let i = 5; i >= 1; i--) {
            const count = Math.round(totalReviews * distribution[i]);
            const percentage = (distribution[i] * 100).toFixed(0);
            html += `
                <div class="review-bar-container">
                    <span class="star-label">${i} estrella${i !== 1 ? 's' : ''}</span>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${percentage}%;"></div>
                    </div>
                    <span class="percentage-label">${percentage}%</span>
                </div>
            `;
        }
        reviewSummary.innerHTML = html;
    }


    // --- FUNCIÓN PARA CARGAR LOS DETALLES DEL PRODUCTO ---
    function loadProductDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (!productId) {
            productName.textContent = 'Producto no encontrado';
            return;
        }

        currentProduct = productos.find(p => p.id === productId);

        if (currentProduct) {
            pageTitle.textContent = currentProduct.nombre + " - Iris Computer";
            productName.textContent = currentProduct.nombre;
            productCategory.textContent = currentProduct.especificaciones.tipo;
            productPrice.textContent = `Bs. ${currentProduct.precio.toFixed(2)}`;
            productStock.textContent = `Stock disponible: ${currentProduct.especificaciones.stock || 'N/A'}`;
            productLongDescription.textContent = currentProduct.descripcionCorta; // Usamos la corta por ahora

            // Rellenar especificaciones
            productSpecs.innerHTML = '';
            for (const specKey in currentProduct.especificaciones) {
                const li = document.createElement('li');
                const keyFormatted = specKey.charAt(0).toUpperCase() + specKey.slice(1);
                li.textContent = `${keyFormatted}: ${currentProduct.especificaciones[specKey]}`;
                productSpecs.appendChild(li);
            }

            // Rellenar imagen principal y miniaturas (si hay más imágenes)
            mainProductImage.src = currentProduct.imagen;
            mainProductImage.alt = currentProduct.nombre;
            
            // Si hay otras imágenes, las puedes añadir aquí a thumbnailGallery
            // Por simplicidad, solo añadimos la imagen principal como miniatura
            thumbnailGallery.innerHTML = `
                <img src="${currentProduct.imagen}" class="thumbnail active" data-src="${currentProduct.imagen}" alt="Miniatura">
            `;
            // Si tuvieras un array de 'otrasImagenes' en el producto:
            // currentProduct.otrasImagenes.forEach(img => {
            //     thumbnailGallery.innerHTML += `<img src="${img}" class="thumbnail" data-src="${img}" alt="Miniatura">`;
            // });

            // Rellenar calificación
            if (currentProduct.calificacion && currentProduct.reviews !== undefined) {
                productStars.innerHTML = generateStars(currentProduct.calificacion);
                ratingValue.textContent = currentProduct.calificacion.toFixed(1) + ' de 5';
                reviewsCount.textContent = `(${currentProduct.reviews} calificaciones globales)`;
                generateReviewBars(currentProduct.reviews); // Genera las barras de reseñas
            } else {
                productStars.innerHTML = 'Sin calificaciones';
                ratingValue.style.display = 'none';
                reviewsCount.style.display = 'none';
                reviewSummary.innerHTML = '<p>Este producto aún no tiene calificaciones.</p>';
            }

            // Inicializar cantidad
            quantityInput.value = initialQuantity;
            quantityInput.max = currentProduct.especificaciones.stock; // Máximo stock disponible

        } else {
            productName.textContent = 'Producto no encontrado';
            mainProductImage.src = '';
        }
    }

    // --- FUNCIONALIDAD DE CANTIDAD ---
    minusBtn.addEventListener('click', () => {
        let currentVal = parseInt(quantityInput.value);
        if (currentVal > 1) {
            quantityInput.value = currentVal - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        let currentVal = parseInt(quantityInput.value);
        let maxStock = parseInt(quantityInput.max);
        if (currentVal < maxStock) { // No exceder el stock
            quantityInput.value = currentVal + 1;
        } else if (isNaN(maxStock)) { // Si no hay stock definido, permite seguir
             quantityInput.value = currentVal + 1;
        }
    });

    quantityInput.addEventListener('change', () => {
        let currentVal = parseInt(quantityInput.value);
        let maxStock = parseInt(quantityInput.max);

        if (isNaN(currentVal) || currentVal < 1) {
            quantityInput.value = 1;
        } else if (currentVal > maxStock) {
            quantityInput.value = maxStock;
            alert(`Solo hay ${maxStock} unidades disponibles.`);
        }
    });

    // --- FUNCIONALIDAD DE AÑADIR AL CARRITO ---
    addToCartBtn.addEventListener('click', () => {
        if (!currentProduct) return;

        const userString = localStorage.getItem('currentUser');
        if (!userString) {
            alert('Por favor, inicia sesión para añadir productos al carrito.');
            window.location.href = 'iniciarsesion.html';
            return;
        }

        const user = JSON.parse(userString);
        const cartKey = `cart_${user.username}`;
        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

        const quantityToAdd = parseInt(quantityInput.value);
        if (isNaN(quantityToAdd) || quantityToAdd < 1) {
            alert('Por favor, ingresa una cantidad válida.');
            return;
        }

        let existingProductInCart = cart.find(item => item.id === currentProduct.id);

        if (existingProductInCart) {
            if (existingProductInCart.quantity + quantityToAdd > currentProduct.especificaciones.stock) {
                 alert(`No puedes añadir tantas unidades. Solo hay ${currentProduct.especificaciones.stock - existingProductInCart.quantity} unidades más disponibles.`);
                 return;
            }
            existingProductInCart.quantity += quantityToAdd;
        } else {
            if (quantityToAdd > currentProduct.especificaciones.stock) {
                alert(`No puedes añadir tantas unidades. Solo hay ${currentProduct.especificaciones.stock} disponibles.`);
                return;
            }
            cart.push({
                id: currentProduct.id,
                nombre: currentProduct.nombre,
                precio: currentProduct.precio,
                imagen: currentProduct.imagen,
                quantity: quantityToAdd
            });
        }

        localStorage.setItem(cartKey, JSON.stringify(cart));
        window.updateCartCounter();
        alert(`${quantityToAdd} ${currentProduct.nombre}(s) añadido(s) al carrito.`);
    });

    // --- FUNCIONALIDAD DE ZOOM EN LA IMAGEN ---
    let isZoomed = false;

    mainImageContainer.addEventListener('mousemove', (e) => {
        if (!isZoomed) return;

        const rect = mainImageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        mainProductImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    });

    mainImageContainer.addEventListener('mouseenter', () => {
        isZoomed = true;
        mainProductImage.classList.add('zoomed');
    });

    mainImageContainer.addEventListener('mouseleave', () => {
        isZoomed = false;
        mainProductImage.classList.remove('zoomed');
        mainProductImage.style.transformOrigin = 'center center'; // Restablecer origen
    });

    // --- EVENT LISTENERS PARA LAS MINIATURAS ---
    thumbnailGallery.addEventListener('click', (e) => {
        if (e.target.classList.contains('thumbnail')) {
            // Actualiza la imagen principal
            mainProductImage.src = e.target.dataset.src;
            // Marca la miniatura activa
            document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
            e.target.classList.add('active');
        }
    });

    // --- EJECUCIÓN AL CARGAR LA PÁGINA ---
    loadProductDetails();
    // Llama al contador del carrito al cargar (de script1.js)
    if (window.updateCartCounter) {
        window.updateCartCounter();
    }
});