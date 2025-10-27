// Espera a que todo el contenido del HTML se haya cargado para ejecutar el script.
document.addEventListener("DOMContentLoaded", function () {
	
	// --- FUNCIÓN GLOBAL PARA ACTUALIZAR EL CONTADOR ---
    // La hacemos global (window.) para llamarla desde otros scripts
    window.updateCartCounter = function() {
        const userString = localStorage.getItem('currentUser');
        const counterElement = document.getElementById('cart-counter');
        if (!counterElement) return;

        if (userString) {
            const user = JSON.parse(userString);
            const cartKey = `cart_${user.username}`;
            const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
            
            // Suma la 'quantity' de todos los items
            const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
            
            counterElement.textContent = totalItems;
            counterElement.style.display = totalItems > 0 ? 'flex' : 'none';
        } else {
            counterElement.style.display = 'none'; // Oculto si no hay sesión
        }
    }
	
	// LÓGICA DE BIENVENIDA Y SESIÓN ---
    function checkLoginStatus() {
        // 1. Busca al usuario en localStorage
        const userString = localStorage.getItem('currentUser');
        
        // 2. Encuentra el contenedor de los enlaces de la derecha
        const headerRight = document.querySelector('.header-right');
        if (!headerRight) return; // Si no hay header, no hace nada

        // 3. Encuentra el enlace específico de "Iniciar Sesión"
        const loginLink = headerRight.querySelector('a[href="iniciosesion.html"]');

        if (userString) {
            // --- SI EL USUARIO EXISTE (Sesión iniciada) ---
            const user = JSON.parse(userString);
            
            // Oculta el enlace "Iniciar Sesión"
            if (loginLink) {
                loginLink.style.setProperty('display', 'none', 'important');
            }

            // Crea el mensaje de bienvenida
            const welcomeMessage = document.createElement('span');
            welcomeMessage.textContent = `Hola, ${user.name}`;
            welcomeMessage.className = 'nav-link'; // Para que tenga el mismo estilo

            // Crea el enlace de "Cerrar Sesión"
            const logoutLink = document.createElement('a');
            logoutLink.textContent = 'Cerrar Sesión';
            logoutLink.href = '#'; // Es un enlace funcional
            logoutLink.className = 'nav-link';
            logoutLink.style.cursor = 'pointer'; // Muestra la manito

            // Añade el evento de clic para cerrar sesión
            logoutLink.addEventListener('click', function(e) {
                e.preventDefault(); // Evita que la página salte
                localStorage.removeItem('currentUser'); // Borra al usuario
                window.location.reload(); // Recarga la página
            });

            // Añade los nuevos elementos al header (antes del carrito)
            headerRight.prepend(logoutLink);
            headerRight.prepend(welcomeMessage);

        } else {
            // --- SI EL USUARIO NO EXISTE (Sesión no iniciada) ---
            // Asegura que el enlace de login esté visible
            if (loginLink) {
                loginLink.style.removeProperty('display');
            }
        }
    }
    
    // Ejecuta la función al cargar la página
    checkLoginStatus();

	
  /* =================================================== */
  /* ====== LÓGICA PARA TODOS LOS MENÚS DESPLEGABLES ====== */
  /* =================================================== */

  // Selecciona TODOS los botones que tienen la clase 'dropdown-btn'.
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");

  dropdownBtns.forEach((btn) => {
    // A cada botón le asigna un detector de clics.
    btn.addEventListener("click", function (event) {
      event.preventDefault(); // Evita que la página se recargue.

      // Busca el contenido del menú que está justo después del botón presionado.
      const dropdownContent = this.nextElementSibling;

      // Cierra cualquier otro menú que ya esté abierto antes de abrir el nuevo.
      document
        .querySelectorAll(".dropdown-content.show")
        .forEach((openDropdown) => {
          if (openDropdown !== dropdownContent) {
            openDropdown.classList.remove("show");
          }
        });

      // Muestra u oculta el menú actual.
      dropdownContent.classList.toggle("show");
    });
  });

  // Cierra todos los menús si el usuario hace clic en cualquier otra parte de la pantalla.
  window.addEventListener("click", function (event) {
    if (!event.target.matches(".dropdown-btn")) {
      document
        .querySelectorAll(".dropdown-content.show")
        .forEach((openDropdown) => {
          openDropdown.classList.remove("show");
        });
    }
  });

  /* ======================================== */
  /* ====== LÓGICA PARA CAMBIAR DE TEMA ====== */
  /* ======================================== */

  const themeLightBtn = document.getElementById("theme-light");
  const themeDarkBtn = document.getElementById("theme-dark");
  const body = document.body;

  // --> CAMBIO: Función para aplicar el tema guardado en la memoria del navegador.
  const applyTheme = () => {
    // Obtiene el tema guardado. Si no hay ninguno, usará 'dark' como predeterminado.
    const savedTheme = localStorage.getItem("theme") || "dark";

    if (savedTheme === "light") {
      body.classList.add("light-theme"); // Añade la clase para el tema claro.
    } else {
      body.classList.remove("light-theme"); // Quita la clase para usar el tema oscuro.
    }
  };

  // Revisa si los botones existen antes de añadirles funcionalidad.
  if (themeLightBtn && themeDarkBtn) {
    themeLightBtn.addEventListener("click", (evento) => {
      evento.preventDefault();
      body.classList.add("light-theme");
      localStorage.setItem("theme", "light"); // --> CAMBIO: Guarda la preferencia.
    });

    themeDarkBtn.addEventListener("click", (evento) => {
      evento.preventDefault();
      body.classList.remove("light-theme");
      localStorage.setItem("theme", "dark"); // --> CAMBIO: Guarda la preferencia.
    });
  }

  /* =============================================== */
  /* ====== LÓGICA PARA SLIDER DE IMÁGENES AUTOMÁTICO ====== */
  /* =============================================== */

  let slideIndex = 0;
  const slides = document.querySelectorAll(".slide");

  function showSlides() {
    if (slides.length === 0) return; // No hacer nada si no hay slides.

    slides.forEach((slide) => slide.classList.remove("active"));

    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }

    slides[slideIndex - 1].classList.add("active");
    setTimeout(showSlides, 3000); // Cambia la imagen cada 3 segundos.
  }

  /* =================================================== */
  /* ====== LÓGICA PARA LA CUENTA REGRESIVA (TIMER) ====== */
  /* =================================================== */

  function startCountdown() {
    const timerElement = document.getElementById("timer");
    if (!timerElement) return; // Salir si no existe el temporizador en la página.

    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 2); // La oferta dura 2 horas desde que se carga.

    const interval = setInterval(function () {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        clearInterval(interval);
        timerElement.innerHTML = "¡Oferta Terminada!";
        return;
      }

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      timerElement.innerHTML =
        (hours < 10 ? "0" + hours : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds);
    }, 1000);
  }

  /* ================================================= */
  /* ====== LÓGICA PARA FORMULARIO DE SUSCRIPCIÓN ====== */
  /* ================================================= */

  const newsletterForm = document.querySelector(".newsletter-form");
  const notification = document.getElementById("notification-message");

  if (newsletterForm && notification) {
    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita que la página se recargue.
      notification.classList.add("show"); // Muestra la notificación.

      // Oculta la notificación después de 4 segundos.
      setTimeout(() => {
        notification.classList.remove("show");
      }, 4000);

      event.target.elements.email.value = ""; // Limpia el campo de email.
    });
  }

  /* =================================================== */
  /* ====== LÓGICA PARA MENÚ LATERAL DE NAVEGACIÓN ====== */
  /* =================================================== */

  const openMenuBtn = document.getElementById("open-side-menu-btn");
  const closeMenuBtn = document.getElementById("close-side-menu-btn");
  const sideMenu = document.getElementById("side-navigation-menu");
  const pageOverlay = document.getElementById("page-overlay");

  if (openMenuBtn && sideMenu && pageOverlay) {
    // Función para abrir el menú
    const openSideMenu = () => {
      sideMenu.classList.add("show");
      pageOverlay.classList.add("show");
    };

    // Función para cerrar el menú
    const closeSideMenu = () => {
      sideMenu.classList.remove("show");
      pageOverlay.classList.remove("show");
    };

    // Abrir el menú
    openMenuBtn.addEventListener("click", openSideMenu);

    // Cerrar con el botón X
    if (closeMenuBtn) {
      closeMenuBtn.addEventListener("click", closeSideMenu);
    }

    // Cerrar haciendo clic en el fondo oscuro
    pageOverlay.addEventListener("click", closeSideMenu);

    // Cerrar al hacer clic en un enlace del menú
    const menuLinks = sideMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", closeSideMenu);
    });
  }

  /* =================================================== */
  /* ====== LÓGICA PARA CARRUSEL DE OFERTAS FLASH ====== */
  /* =================================================== */

  const offerCarousel = document.querySelector(".offer-carousel-wrapper");
  // Solo ejecuta este código si el carrusel existe en la página
  if (offerCarousel) {
    const prevBtn = document.getElementById("prev-offer-btn");
    const nextBtn = document.getElementById("next-offer-btn");
    const offerCards = document.querySelectorAll(".offer-card");
    
    let currentIndex = 0;
    const totalOffers = offerCards.length;

    function updateCarousel() {
      // Mueve el wrapper horizontalmente basado en el índice actual
      offerCarousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Evento para el botón "Siguiente"
    nextBtn.addEventListener("click", () => {
      currentIndex++;
      if (currentIndex >= totalOffers) {
        currentIndex = 0; // Vuelve al principio si llega al final
      }
      updateCarousel();
    });

    // Evento para el botón "Anterior"
    prevBtn.addEventListener("click", () => {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = totalOffers - 1; // Va al final si está en el principio
      }
      updateCarousel();
    });

    // Opcional: Deslizamiento automático cada 5 segundos
    setInterval(() => {
        nextBtn.click();
    }, 5000);
  }
  // --- INICIAR FUNCIONES AUTOMÁTICAS ---
  // Se llaman al final para asegurar que todo esté listo.
  applyTheme(); // --> CAMBIO: Aplica el tema guardado al cargar la página.
  showSlides();
  startCountdown();

  /* ================================================================ */
  /* ====== LÓGICA PARA CAMBIAR DE IDIOMA ====== */
  /* ================================================================ */

  // 1. Todas las traducciones están aquí
  const translations = {
    es: {
      nav_mapa: "Mapa del Sitio",
      nav_nosotros: "Sobre Nosotros",
      nav_productos: "Productos",
      nav_contactos: "Contactos",
      search_placeholder: "Buscar productos...",
      nav_tema: "Tema",
      nav_claro: "Claro",
      nav_oscuro: "Oscuro",
      nav_idioma: "Idioma",
      nav_iniciar_sesion: "Iniciar Sesión / Registrarse",
      serv_envio_titulo: "Envío Rápido y Seguro",
      serv_envio_desc: "Recibe tus componentes en tiempo récord.",
      serv_garantia_titulo: "Garantía de 12 Meses",
      serv_garantia_desc: "Cobertura total contra defectos de fábrica.",
      serv_precios_titulo: "Precios Competitivos",
      serv_precios_desc: "Calidad premium al mejor precio del mercado.",
      serv_pagos_titulo: "Múltiples Pagos",
      serv_pagos_desc:
        "Aceptamos tarjetas de débito, crédito y transferencias.",
      mapa_titulo: "Mapa del Sitio",
      mapa_en_pagina: "En Esta Página",
      mapa_servicios: "🏆 Servicios y Ventajas",
      mapa_oferta: "🔥 Oferta Flash",
      mapa_productos: "🖥️ Productos",
      mapa_opiniones: "⭐ Opiniones",
      mapa_suscripcion: "✉️ Suscripción",
      mapa_otras_paginas: "Otras Páginas",
      mapa_catalogo: "📖 Catálogo Completo",
      mapa_nosotros: "🏢 Sobre Nosotros",
      mapa_contacto: "📞 Contacto",
      mapa_sesion: "👤 Iniciar Sesión",
      flash_titulo: "🔥 Oferta Flash - Solo Hoy 🔥",
      flash_producto: "Procesador Ryzen 7 4700G",
      flash_boton: "¡Comprar Ahora!",
      flash_tiempo: "Tiempo restante:",
      recomendados_titulo: "Productos Recomendados",
      testimonios_titulo: "Lo que dicen nuestros clientes",
      testimonio1:
        '"Excelente servicio y los mejores precios en La Paz. La calidad de los componentes es insuperable."',
      testimonio2:
        '"Mi nueva PC gamer corre todo a ultra. ¡Gracias Iris Computer por el armado profesional y rápido!"',
      testimonio3:
        '"Fácil de comprar y el envío a Santa Cruz fue rapidísimo. El monitor llegó en perfectas condiciones."',
      suscripcion_titulo: "¡No te pierdas ninguna oferta!",
      suscripcion_desc:
        "Suscríbete a nuestro boletín para recibir descuentos exclusivos y novedades.",
      suscripcion_placeholder: "Ingresa tu correo electrónico...",
      suscripcion_boton: "Suscribirme",
      redes_titulo: "Síguenos en nuestras redes",
      footer_derechos: "© 2025 Iris computer. Todos los derechos reservados.",
      catalogo_titulo_pagina: "Todos los Productos - Tienda de Computación",
      nav_mapa: "Mapa del Sitio",
      nav_nosotros: "Sobre Nosotros",
      nav_productos: "Productos",
      nav_contactos: "Contactos",
      search_placeholder: "Buscar productos...",
      nav_tema: "Tema",
      nav_claro: "Claro",
      nav_oscuro: "Oscuro",
      nav_idioma: "Idioma",
      nav_iniciar_sesion: "Iniciar Sesión / Registrarse",
      footer_derechos: "© 2025 Iris computer. Todos los derechos reservados.",
      catalogo_titulo_pagina: "Todos los Productos - Tienda de Computación",
      catalogo_titulo: "Nuestro Catálogo Completo",
      modal_desc_titulo: "Descripción Completa",
      modal_specs_titulo: "Especificaciones",
      modal_boton_cerrar: "Cerrar",
      modal_boton_seleccionar: "Seleccionar",
      nosotros_titulo_pagina: "Sobre Nosotros - Iris Computer",
      nosotros_hero_titulo: "Nuestra Pasión es la Tecnología",
      nosotros_hero_desc:
        "Conectando Bolivia con el futuro, un componente a la vez.",
      nosotros_historia_titulo: "Nuestra Historia",
      nosotros_historia_desc:
        "Iris Computer nació en 2020 de la visión de un pequeño grupo de entusiastas de la tecnología en Santa Cruz. Lo que comenzó como un modesto taller de ensamblaje de PCs personalizadas, rápidamente se convirtió en un referente de calidad y confianza. Impulsados por la pasión y el compromiso, hemos crecido para convertirnos en uno de los principales proveedores de componentes de Bolivia, siempre manteniendo nuestro espíritu original: ofrecer potencia y rendimiento accesibles para todos.",
      nosotros_mision_titulo: "Nuestra Misión",
      nosotros_mision_desc:
        "Empoderar a cada boliviano, desde gamers y creadores de contenido hasta profesionales y estudiantes, con la mejor tecnología y un servicio al cliente excepcional que guíe y apoye cada paso de su viaje digital.",
      nosotros_vision_titulo: "Nuestra Visión",
      nosotros_vision_desc:
        "Ser la empresa de tecnología más confiable y querida de Bolivia, liderando la innovación y fomentando una comunidad donde la pasión por el hardware y el software nos una para construir el futuro.",
      nosotros_valores_titulo: "Nuestros Valores",
      nosotros_valor1_titulo: "Confianza",
      nosotros_valor1_desc:
        "Actuamos con integridad y transparencia en cada interacción.",
      nosotros_valor2_titulo: "Calidad",
      nosotros_valor2_desc:
        "Ofrecemos solo productos que cumplen con los más altos estándares.",
      nosotros_valor3_titulo: "Pasión",
      nosotros_valor3_desc:
        "Amamos lo que hacemos y compartimos ese entusiasmo con nuestros clientes.",
      nosotros_valor4_titulo: "Comunidad",
      nosotros_valor4_desc:
        "Construimos relaciones duraderas con clientes y colaboradores.",
      nosotros_equipo_titulo: "Conoce a Nuestro Equipo",
      nosotros_equipo1_cargo: "Fundador y CEO",
      nosotros_equipo2_cargo: "Gerente de Ventas",
      nosotros_equipo3_cargo: "Técnico Especialista",
      contacto_titulo_pagina: "Contacto | Iris Computer",
      contacto_titulo_principal: "Contáctanos",
      contacto_subtitulo:
        "Estamos listos para ayudarte con tus consultas técnicas y pedidos.",
      contacto_form_titulo: "Envíanos un Mensaje Directo",
      contacto_form_nombre: "Nombre Completo:",
      contacto_form_email: "Correo Electrónico:",
      contacto_form_asunto: "Asunto:",
      contacto_form_mensaje: "Mensaje:",
      contacto_form_boton: "Enviar Mensaje",
      contacto_info_titulo: "Información de Contacto",
      contacto_info_ubicacion: "Nuestra Ubicación",
      contacto_info_telefono: "Teléfono",
      contacto_info_email: "Email",
      contacto_info_horario: "Horario de Atención",
      contacto_mapa_titulo: "Encuéntranos en el Mapa",
      login_titulo_pagina: "Iniciar Sesión / Registrarse",
      login_titulo: "Iniciar Sesión",
      login_usuario: "Usuario",
      login_contrasena: "Contraseña",
      login_captcha: "Captcha",
      login_captcha_placeholder: "Escribe el texto de arriba",
      login_boton: "Ingresar",
      login_no_cuenta: "¿No tienes cuenta?",
      login_registrate: "Regístrate",
      register_titulo: "Crear Cuenta",
      register_nombre: "Nombre",
      register_apellido: "Apellido",
      register_usuario: "Usuario",
      register_contrasena: "Contraseña",
      register_confirmar_contrasena: "Confirmar Contraseña",
      register_boton: "Registrarse",
      register_si_cuenta: "¿Ya tienes cuenta?",
      register_inicia_sesion: "Inicia Sesión",
      admin_titulo_pagina: "Panel de Administrador - Iris Computer",
      admin_titulo: "Panel de Administrador",
      admin_bienvenida:
        "Bienvenido. Aquí tienes un resumen confidencial del estado de la empresa.",
      admin_ventas_titulo: "Resumen de Ventas (Octubre 2025)",
      admin_ventas_ingresos: "Ingresos del Mes:",
      admin_ventas_pedidos: "Pedidos Totales:",
      admin_ventas_ticket: "Ticket Promedio:",
      admin_inventario_titulo: "Estado del Inventario",
      admin_inventario_productos: "Productos en Catálogo:",
      admin_inventario_stock_bajo: "Productos con Bajo Stock (<5):",
      admin_inventario_valor: "Valor Total del Inventario:",
      admin_usuarios_titulo: "Actividad de Usuarios",
      admin_usuarios_nuevos: "Nuevos Registros (Mes):",
      admin_usuarios_activos: "Usuarios Activos Hoy:",
      admin_usuarios_ultimo_pedido: "Último Pedido:",
      admin_cerrar_sesion: "Cerrar Sesión",
    },
    en: {
      nav_mapa: "Site Map",
      nav_nosotros: "About Us",
      nav_productos: "Products",
      nav_contactos: "Contact",
      search_placeholder: "Search products...",
      nav_tema: "Theme",
      nav_claro: "Light",
      nav_oscuro: "Dark",
      nav_idioma: "Language",
      nav_iniciar_sesion: "Login / Register",
      serv_envio_titulo: "Fast and Secure Shipping",
      serv_envio_desc: "Receive your components in record time.",
      serv_garantia_titulo: "12-Month Warranty",
      serv_garantia_desc: "Full coverage against manufacturing defects.",
      serv_precios_titulo: "Competitive Prices",
      serv_precios_desc: "Premium quality at the best market price.",
      serv_pagos_titulo: "Multiple Payments",
      serv_pagos_desc: "We accept debit, credit cards, and transfers.",
      mapa_titulo: "Site Map",
      mapa_en_pagina: "On This Page",
      mapa_servicios: "🏆 Services & Advantages",
      mapa_oferta: "🔥 Flash Sale",
      mapa_productos: "🖥️ Products",
      mapa_opiniones: "⭐ Reviews",
      mapa_suscripcion: "✉️ Subscription",
      mapa_otras_paginas: "Other Pages",
      mapa_catalogo: "📖 Full Catalog",
      mapa_nosotros: "🏢 About Us",
      mapa_contacto: "📞 Contact",
      mapa_sesion: "👤 Login",
      flash_titulo: "🔥 Flash Sale - Today Only 🔥",
      flash_producto: "Ryzen 7 4700G Processor",
      flash_boton: "Buy Now!",
      flash_tiempo: "Time left:",
      recomendados_titulo: "Recommended Products",
      testimonios_titulo: "What our customers say",
      testimonio1:
        '"Excellent service and the best prices in La Paz. The quality of the components is unbeatable."',
      testimonio2:
        '"My new gaming PC runs everything on ultra. Thanks, Iris Computer, for the professional and fast assembly!"',
      testimonio3:
        '"Easy to buy and shipping to Santa Cruz was very fast. The monitor arrived in perfect condition."',
      suscripcion_titulo: "Don't miss any offers!",
      suscripcion_desc:
        "Subscribe to our newsletter to receive exclusive discounts and news.",
      suscripcion_placeholder: "Enter your email...",
      suscripcion_boton: "Subscribe",
      redes_titulo: "Follow us on our networks",
      footer_derechos: "© 2025 Iris computer. All rights reserved.",
	  nav_categorias: "Categories",
      cat_almacenamiento: "Storage",
      cat_cpu: "CPU",
      cat_fuente: "Power Supply",
      cat_gabinete: "Case",
      cat_gpu: "GPU",
      cat_laptop: "Laptop",
      cat_ram: "RAM Memory",
      cat_monitor: "Monitor",
      cat_placa: "Motherboard",
      cat_refri: "Cooling",

      nav_mapa: "Site Map",
      nav_nosotros: "About Us",
      nav_productos: "Products",
      nav_contactos: "Contact",
      search_placeholder: "Search products...",
      nav_tema: "Theme",
      nav_claro: "Light",
      nav_oscuro: "Dark",
      nav_idioma: "Language",
      nav_iniciar_sesion: "Login / Register",
      footer_derechos: "© 2025 Iris computer. All rights reserved.",
      catalogo_titulo_pagina: "All Products - Computer Store",
      catalogo_titulo: "Our Full Catalog",
      modal_desc_titulo: "Full Description",
      modal_specs_titulo: "Specifications",
      modal_boton_cerrar: "Close",
      modal_boton_seleccionar: "Select",
      nosotros_titulo_pagina: "About Us - Iris Computer",
      nosotros_hero_titulo: "Our Passion is Technology",
      nosotros_hero_desc:
        "Connecting Bolivia to the future, one component at a time.",
      nosotros_historia_titulo: "Our History",
      nosotros_historia_desc:
        "Iris Computer was born in 2020 from the vision of a small group of technology enthusiasts in Santa Cruz. What began as a modest custom PC assembly workshop quickly became a benchmark for quality and trust. Driven by passion and commitment, we have grown to become one of Bolivia's leading component suppliers, always maintaining our original spirit: to offer accessible power and performance for everyone.",
      nosotros_mision_titulo: "Our Mission",
      nosotros_mision_desc:
        "To empower every Bolivian, from gamers and content creators to professionals and students, with the best technology and exceptional customer service that guides and supports every step of their digital journey.",
      nosotros_vision_titulo: "Our Vision",
      nosotros_vision_desc:
        "To be the most trusted and beloved technology company in Bolivia, leading innovation and fostering a community where the passion for hardware and software unites us to build the future.",
      nosotros_valores_titulo: "Our Values",
      nosotros_valor1_titulo: "Trust",
      nosotros_valor1_desc:
        "We act with integrity and transparency in every interaction.",
      nosotros_valor2_titulo: "Quality",
      nosotros_valor2_desc:
        "We only offer products that meet the highest standards.",
      nosotros_valor3_titulo: "Passion",
      nosotros_valor3_desc:
        "We love what we do and share that enthusiasm with our customers.",
      nosotros_valor4_titulo: "Community",
      nosotros_valor4_desc:
        "We build lasting relationships with customers and partners.",
      nosotros_equipo_titulo: "Meet Our Team",
      nosotros_equipo1_cargo: "Founder & CEO",
      nosotros_equipo2_cargo: "Sales Manager",
      nosotros_equipo3_cargo: "Specialist Technician",
      contacto_titulo_pagina: "Contact | Iris Computer",
      contacto_titulo_principal: "Contact Us",
      contacto_subtitulo:
        "We are ready to help you with your technical inquiries and orders.",
      contacto_form_titulo: "Send Us a Direct Message",
      contacto_form_nombre: "Full Name:",
      contacto_form_email: "Email Address:",
      contacto_form_asunto: "Subject:",
      contacto_form_mensaje: "Message:",
      contacto_form_boton: "Send Message",
      contacto_info_titulo: "Contact Information",
      contacto_info_ubicacion: "Our Location",
      contacto_info_telefono: "Phone",
      contacto_info_email: "Email",
      contacto_info_horario: "Business Hours",
      contacto_mapa_titulo: "Find Us on the Map",
      login_titulo_pagina: "Login / Register",
      login_titulo: "Login",
      login_usuario: "Username",
      login_contrasena: "Password",
      login_captcha: "Captcha",
      login_captcha_placeholder: "Type the text above",
      login_boton: "Login",
      login_no_cuenta: "Don't have an account?",
      login_registrate: "Sign Up",
      register_titulo: "Create Account",
      register_nombre: "First Name",
      register_apellido: "Last Name",
      register_usuario: "Username",
      register_contrasena: "Password",
      register_confirmar_contrasena: "Confirm Password",
      register_boton: "Sign Up",
      register_si_cuenta: "Already have an account?",
      register_inicia_sesion: "Login",
      admin_titulo_pagina: "Admin Panel - Iris Computer",
      admin_titulo: "Administrator Panel",
      admin_bienvenida:
        "Welcome. Here is a confidential summary of the company's status.",
      admin_ventas_titulo: "Sales Summary (October 2025)",
      admin_ventas_ingresos: "Monthly Revenue:",
      admin_ventas_pedidos: "Total Orders:",
      admin_ventas_ticket: "Average Ticket:",
      admin_inventario_titulo: "Inventory Status",
      admin_inventario_productos: "Products in Catalog:",
      admin_inventario_stock_bajo: "Low Stock Products (<5):",
      admin_inventario_valor: "Total Inventory Value:",
      admin_usuarios_titulo: "User Activity",
      admin_usuarios_nuevos: "New Registrations (Month):",
      admin_usuarios_activos: "Active Users Today:",
      admin_usuarios_ultimo_pedido: "Last Order:",
      admin_cerrar_sesion: "Logout",
    },
  };

  // 2. Esta función busca y aplica la traducción
  const translatePage = (language) => {
    document.querySelectorAll("[data-key]").forEach((element) => {
      const key = element.getAttribute("data-key");
      const translation = translations[language][key];

      if (translation) {
        if (element.placeholder !== undefined) {
          element.placeholder = translation;
        } else {
          element.textContent = translation;
        }
      }
    });
    // Guarda el idioma elegido
    localStorage.setItem("language", language);
  };

  // 3. Conectamos los botones
  const langEsBtn = document.getElementById("lang-es");
  const langEnBtn = document.getElementById("lang-en");

  if (langEsBtn && langEnBtn) {
    langEnBtn.addEventListener("click", (e) => {
      e.preventDefault();
      translatePage("en");
    });

    langEsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      translatePage("es");
    });
  }

  // 4. Aplicamos el idioma guardado al cargar la página
  const savedLanguage = localStorage.getItem("language") || "es";
  translatePage(savedLanguage);
});


