document.addEventListener("DOMContentLoaded", function () {
  // Referencias a los contenedores de los formularios
  const loginContainer = document.getElementById("login-form-container");
  const registerContainer = document.getElementById("register-form-container");
  const showRegisterLink = document.getElementById("show-register-form");
  const showLoginLink = document.getElementById("show-login-form");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const captchaText = document.getElementById("captcha-text");
  const captchaInput = document.getElementById("login-captcha");
  let currentCaptcha = "";

  // --- LÓGICA PARA CAMBIAR ENTRE FORMULARIOS ---
  showRegisterLink.addEventListener("click", function (e) {
    e.preventDefault();
    loginContainer.style.display = "none";
    registerContainer.style.display = "block";
  });
  showLoginLink.addEventListener("click", function (e) {
    e.preventDefault();
    registerContainer.style.display = "none";
    loginContainer.style.display = "block";
    generateCaptcha();
  });

  // --- LÓGICA DEL CAPTCHA ---
  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    captchaText.textContent = result;
    currentCaptcha = result;
  }

  // --- LÓGICA DE ALMACENAMIENTO DE USUARIOS ---
  function getUsers() {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  }
  function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  function initializeDefaultUser() {
    const users = getUsers();
    if (!users.find((user) => user.username === "admin")) {
      users.push({
        name: "Administrador",
        lastname: "del Sitio",
        username: "admin",
        password: "123",
      });
      saveUsers(users);
    }
  }

  // --- LÓGICA DE REGISTRO 
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const lastname = document.getElementById('register-lastname').value;
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        const users = getUsers();
        if (users.find(user => user.username === username)) {
            alert('El nombre de usuario ya está en uso.');
            return;
        }

        const newUser = { name, lastname, username, password };
        users.push(newUser);
        saveUsers(users);

        alert('¡Registro exitoso! Iniciando sesión...');
        
        //  Inicia sesión automáticamente ---
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        // Redirige al index
        window.location.href = 'index.html'; 
    });

  // --- LÓGICA DE INICIO DE SESIÓN 
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        if (captchaInput.value.toLowerCase() !== currentCaptcha.toLowerCase()) {
            alert('El Captcha es incorrecto.');
            generateCaptcha();
            captchaInput.value = '';
            return;
        }

        const users = getUsers();
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Guarda al usuario en localStorage ---
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Redirige al index
            window.location.href = 'index.html'; 
        } else {
            alert('Usuario o contraseña incorrectos.');
            generateCaptcha();
            captchaInput.value = '';
        }
    });

    // ===== INICIO DE LA LÓGICA DE ADMINISTRADOR =====
    // Comprobamos si las credenciales son las del administrador
   /* if (username === "admin" && password === "123") {
      alert("¡Bienvenido, Administrador!");
      // Guardamos el rol en la memoria del navegador para recordarlo en otras páginas
      localStorage.setItem("userRole", "admin");
      // Redirigimos a la nueva página de administrador
      window.location.href = "admin.html";
      return; // Detenemos la ejecución para no continuar como usuario normal
    }
    // ===== FIN DE LA LÓGICA DE ADMINISTRADOR =====

    const users = getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      alert(`¡Bienvenido, ${user.name}! Inicio de sesión exitoso.`);
      localStorage.setItem("userRole", "user"); // Guardamos el rol de usuario normal
      window.location.href = "index.html";
    } else {
      alert("Usuario o contraseña incorrectos.");
    }*/
	initializeDefaultUser();
    generateCaptcha();
    captchaInput.value = "";
  });