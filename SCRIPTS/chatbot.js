document.addEventListener("DOMContentLoaded", () => {
  // --- Seleccionar elementos del DOM ---
  const toggleBtn = document.getElementById("chatbot-toggle-btn");
  const chatWindow = document.getElementById("chat-window");
  const messagesContainer = document.getElementById("chat-messages");
  const inputField = document.getElementById("chat-input");
  const sendBtn = document.getElementById("chat-send-btn");

  let userName = null;

  // --- Función para mostrar/ocultar la ventana del chat ---
  toggleBtn.addEventListener("click", () => {
    chatWindow.classList.toggle("show");
  });

  // --- Función para añadir un mensaje a la pantalla ---
  function addMessage(htmlContent, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", `${sender}-message`);
    messageElement.innerHTML = htmlContent; // Usamos innerHTML para permitir enlaces
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // --- Función para generar la respuesta del bot ---
  function generateBotResponse(userInput) {
    const input = userInput.toLowerCase();
    let response = `Lo siento, ${
      userName || "amigo"
    }, no estoy seguro de cómo responder a eso. ¿Puedes preguntar de otra manera?`;

    if (
      userName === null &&
      (input.includes("me llamo") || input.includes("soy"))
    ) {
      let potentialName = input.split("me llamo")[1] || input.split("soy")[1];
      if (potentialName) {
        userName = potentialName.trim().replace(/^\w/, (c) => c.toUpperCase());
        response = `¡Encantado de conocerte, ${userName}! ¿Cómo puedo ayudarte hoy?`;
      }
    } else if (input.includes("hola") || input.includes("buenos días")) {
      response = `¡Hola, ${userName || "qué tal"}! ¿En qué puedo ayudarte?`;

      // ===== INICIO DE LA NUEVA FUNCIONALIDAD (GPS) =====
    } else if (
      input.includes("ubicación") ||
      input.includes("ubicacion") ||
      input.includes("dirección") ||
      input.includes("gps") ||
      input.includes("mapa") ||
      input.includes("dónde están")
    ) {
      response = `¡Claro! Nuestra tienda está en:<br>
      <strong>3ER Y 4TO ANILLO CALLE, Pedro Suárez Arana 3180, Santa Cruz de la Sierra.</strong><br><br>
      Puedes usar el siguiente enlace para obtener la ruta GPS directamente en Google Maps:<br>
      <a href="https://www.google.com/maps/place/Iris+Computer/@-17.793696,-63.2156783,17z/data=!3m1!4b1!4m6!3m5!1s0x93f1c325e0eb1d0f:0x1eb6a3557d7521cf!8m2!3d-17.793696!4d-63.213098!16s%2Fg%2F11r_drmw94?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D" target="_blank">Abrir ubicación en Google Maps</a>`;
      // ===== FIN DE LA NUEVA FUNCIONALIDAD (GPS) =====
    } else if (
      input.includes("contacto") ||
      input.includes("teléfono") ||
      input.includes("llamar")
    ) {
      response = `Nuestra información de contacto es:<br>
      <ul>
        <li><b>📞 Teléfono:</b> 78108887</li>
        <li><b>📧 Email:</b> ventas@iriscomputer.bo</li>
      </ul>
      Para más detalles, visita nuestra página de <a href="contactos.html" target="_blank">Contactos</a>.`;
    } else if (
      input.includes("empresa") ||
      input.includes("ustedes") ||
      input.includes("quiénes son") ||
      input.includes("acerca de")
    ) {
      response = `Somos <strong>Iris Computer</strong>, una empresa apasionada por la tecnología. Nos dedicamos a ofrecer los mejores componentes en Bolivia.<br><br>
      Puedes conocer toda nuestra historia en la página de <a href="nosotros.html" target="_blank">Sobre Nosotros</a>.`;
    } else if (input.includes("producto") || input.includes("catálogo")) {
      response = `Puedes ver todos nuestros productos en el catálogo. <a href="catalogo.html" target="_blank">Haz clic aquí para ir al catálogo</a>.`;
    } else if (input.includes("precio") || input.includes("costo")) {
      response = `Los precios varían según el producto. ¿Hay algún componente específico que te interese, ${
        userName || ""
      }?`;
    } else if (input.includes("garantía")) {
      response = `¡Sí! Todos nuestros productos nuevos tienen una garantía de 12 meses contra defectos de fábrica.`;
    } else if (input.includes("envío") || input.includes("entrega")) {
      response =
        "Hacemos envíos rápidos y seguros a toda Bolivia. Tu pedido llegará en tiempo récord.";
    } else if (input.includes("gracias") || input.includes("adiós")) {
      response = `¡De nada, ${
        userName || ""
      }! Si tienes más preguntas, no dudes en consultarme. ¡Que tengas un buen día!`;
    }

    setTimeout(() => {
      addMessage(response, "bot");
    }, 800);
  }

  // --- Función principal para manejar el envío de mensajes ---
  function handleSendMessage() {
    const userText = inputField.value.trim();
    if (userText === "") return;

    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", `user-message`);
    messageElement.textContent = userText;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    inputField.value = "";

    generateBotResponse(userText);
  }

  // --- Event Listeners para enviar mensaje ---
  sendBtn.addEventListener("click", handleSendMessage);
  inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  });

  // --- Mensaje de bienvenida inicial del bot ---
  setTimeout(() => {
    addMessage(
      "¡Bienvenido a Iris Computer! Soy tu asistente virtual. ¿Cuál es tu nombre?",
      "bot"
    );
  }, 1000);
});
