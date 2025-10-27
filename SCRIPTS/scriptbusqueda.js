document.addEventListener("DOMContentLoaded", function () {
  // --- Define todas tus constantes ---
  const searchBar = document.getElementById("searchBar");
  const productsContainer = document.getElementById("productsContainer");
  const productModal = document.getElementById("productModal");
  const closeButtons = document.querySelectorAll(".close-button");
  const modalProductName = document.getElementById("modalProductName");
  const modalProductImage = document.getElementById("modalProductImage");
  const modalProductPrice = document.getElementById("modalProductPrice");
  const modalProductDesc = document.getElementById("modalProductDesc");
  const modalProductSpecs = document.getElementById("modalProductSpecs");
  const modalProductStock = document.getElementById("modalProductStock");
  
  function addProductToCart(productId) {
        // 1. Revisa si el usuario inició sesión
        const userString = localStorage.getItem('currentUser');
        if (!userString) {
            alert('Por favor, inicia sesión para añadir productos al carrito.');
            window.location.href = 'iniciosesion.html';
            return;
        }

        const user = JSON.parse(userString);
        const cartKey = `cart_${user.username}`; // Clave única para el carrito del usuario

        // 2. Carga el carrito del usuario (o crea uno vacío)
        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

        // 3. Busca el producto en el carrito
        let existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            // Si ya existe, solo aumenta la cantidad
            existingProduct.quantity += 1;
        } else {
            // Si es nuevo, busca los detalles en la "base de datos"
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

        // 4. Guarda el carrito actualizado en localStorage
        localStorage.setItem(cartKey, JSON.stringify(cart));
        
        // 5. Actualiza el contador global
        if (window.updateCartCounter) {
            window.updateCartCounter();
        }
        
        alert('¡Producto añadido al carrito!');
    }

  // 1. Obtiene los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const searchQueryFromURL = urlParams.get("q");

  // --- Define todas tus funciones ---

  // Función para mostrar los productos en la página
  function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = "";

    if (productsToDisplay.length === 0) {
      productsContainer.innerHTML =
        "<p>No se encontraron productos que coincidan con su búsqueda.</p>";
      return;
    }

    productsToDisplay.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      productCard.innerHTML = `
                <img src="${product.imagen}" alt="${product.nombre}">
                <h3>${product.nombre}</h3>
                <p>Bs. ${product.precio.toFixed(2)}</p>
                <button class="info-button" data-id="${
                  product.id
                }">Info</button>
				<a href="detalle_producto.html?id=${product.id}" class="details-button">Detalles</a>
                <button class="add-cart-button" data-id="${product.id}">Añadir al Carrito</button>
            `;
      productsContainer.appendChild(productCard);
    });

    // Añadir listeners a los botones de info después de crearlos
    document.querySelectorAll(".info-button").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.dataset.id;
        showProductModal(productId);
      });
    });
	document.querySelectorAll('.add-cart-button').forEach(button => {
            button.addEventListener('click', function() {
                addProductToCart(this.dataset.id);
            });
        });
  }

  // Función para mostrar la ventana modal
  function showProductModal(productId) {
    const product = productos.find((p) => p.id === productId);

    if (product) {
      modalProductName.textContent = product.nombre;
      modalProductImage.src = product.imagen;
      modalProductImage.alt = product.nombre;
      modalProductPrice.textContent = `Bs. ${product.precio.toFixed(2)}`;
      modalProductDesc.textContent = product.descripcionCorta;

      modalProductSpecs.innerHTML = "";
      for (const specKey in product.especificaciones) {
        const li = document.createElement("li");
        li.textContent = `${
          specKey.charAt(0).toUpperCase() + specKey.slice(1)
        }: ${product.especificaciones[specKey]}`;
        modalProductSpecs.appendChild(li);
      }
      modalProductStock.textContent = `Stock: ${product.especificaciones.stock} unidades`;

      productModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  // Función para cerrar la ventana modal
  function closeProductModal() {
    productModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // --- Asigna los listeners (eventos) ---

  // Event listeners para cerrar el modal
  closeButtons.forEach((button) => {
    button.addEventListener("click", closeProductModal);
  });

  window.addEventListener("click", function (event) {
    if (event.target == productModal) {
      closeProductModal();
    }
  });

  // Lógica de búsqueda (cuando el usuario escribe en la página)
  searchBar.addEventListener("keyup", function () {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredProducts = productos.filter(
      (product) =>
        product.nombre.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
  });

  // --- CÓDIGO QUE SE EJECUTA AL CARGAR LA PÁGINA ---
  if (searchQueryFromURL) {
    // Pone el término en la barra de búsqueda de busqueda.html
    searchBar.value = searchQueryFromURL;

    // Filtra los productos basándose en ese término
    const searchTerm = searchQueryFromURL.toLowerCase();
    const filteredProducts = productos.filter(
      (product) =>
        product.nombre.toLowerCase().includes(searchTerm) 
    );

    // Muestra SOLO los productos filtrados
    displayProducts(filteredProducts);
  } else {
    // Si no hay término de búsqueda, muestra todos los productos
    displayProducts(productos);
  }
});
