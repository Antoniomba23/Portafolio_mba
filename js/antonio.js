// Versión mejorada del script de desofuscación
document.addEventListener('DOMContentLoaded', function() {
    const loadEmailLinks = () => {
        const emailElements = document.querySelectorAll('.email-obfuscated');
        
        emailElements.forEach(el => {
            try {
                const email = el.getAttribute('data-email');
                if (!email) return;
                
                const mailtoLink = document.createElement('a');
                mailtoLink.href = `mailto:${email}`;
                mailtoLink.textContent = email;
                mailtoLink.classList.add('email-link');
                mailtoLink.setAttribute('aria-label', `Enviar email a ${email}`);
                
                // Limpiar y añadir el nuevo elemento
                el.innerHTML = '';
                el.appendChild(mailtoLink);
                
                // Opcional: Analytics/tracking
                mailtoLink.addEventListener('click', () => {
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'email_click', {
                            'event_category': 'Contacto',
                            'event_label': 'Email click'
                        });
                    }
                });
            } catch (error) {
                console.error('Error al procesar email:', error);
                el.textContent = email; // Fallback básico
            }
        });
    };

    // Cargar inmediatamente
    loadEmailLinks();
    
    // Opcional: Recargar si se usa AJAX/SPA
    document.addEventListener('ajaxComplete', loadEmailLinks);
});




// Cambiar clase activa al navegar
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
        
        // Marcar como activo según la página actual
        if(link.href === window.location.href) {
            link.classList.add('active');
        }
    });
});

// Script para desofuscar email y manejar navegación
document.addEventListener('DOMContentLoaded', function() {
    // Desofuscación de email
    const emailElements = document.querySelectorAll('.email-obfuscated');
    emailElements.forEach(el => {
        const email = el.getAttribute('data-email');
        const mailtoLink = document.createElement('a');
        mailtoLink.href = `mailto:${email}`;
        mailtoLink.textContent = email;
        mailtoLink.classList.add('email-link');
        el.innerHTML = '';
        el.appendChild(mailtoLink);
    });

    // Manejar clase activa en navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        // Marcar como activo si coincide con la página actual
        if(link.href === window.location.href) {
            link.classList.add('active');
        }
        
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Añadir al archivo antonio.js para tracking de descargas
document.addEventListener('DOMContentLoaded', function() {
    const cvLink = document.querySelector('.cv-download');
    if(cvLink) {
        cvLink.addEventListener('click', function() {
            // Aquí puedes añadir tracking (Google Analytics, etc.)
            console.log('CV descargado');
            if(typeof gtag !== 'undefined') {
                gtag('event', 'descarga_cv', {
                    'event_category': 'engagement',
                    'event_label': 'Descarga CV'
                });
            }
        });
    }
});



// Bot de bienvenida - YoBot
document.addEventListener('DOMContentLoaded', function() {
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotButton = document.getElementById('chatbot-button');
    const closeChatbot = document.getElementById('close-chatbot');
    const userInput = document.getElementById('user-input');
    const sendMessage = document.getElementById('send-message');
    const chatbotMessages = document.getElementById('chatbot-messages');
    
    // Mostrar/ocultar chatbot
    chatbotButton.addEventListener('click', function() {
        chatbotContainer.style.display = chatbotContainer.style.display === 'flex' ? 'none' : 'flex';
    });
    
    closeChatbot.addEventListener('click', function() {
        chatbotContainer.style.display = 'none';
    });
    
    // Mensaje de bienvenida inicial
    setTimeout(() => {
        addBotMessage("¡Hola! Soy Antonio, tu asistente personal. ¿En qué puedo ayudarte hoy?");
    }, 3000);
    
    // Respuestas predefinidas de YoBot
    const responses = {
        // Saludos
        "hola": "¡Hola! Soy Antonio, tu asistente virtual. ¿En qué puedo ayudarte hoy? 😊",
        "buenos dias": "¡Buenos días! ☀️ Soy Antonio, el asistente de Antonio MBA NZANG. ¿Cómo puedo ayudarte?",
        "buenas tardes": "¡Buenas tardes! 🌇 Aquí Antonio, el asistente virtual de Antonio MBA NZANG. ¿Qué necesitas saber?",
        "buenas noches": "¡Buenas noches! 🌙 Aunque yo no duermo, estoy aquí para ayudarte. Soy Antonio, el bot personal de Antonio MBA NZANG.",

        // Presentación
        "quien eres": "¡Soy Antonio! 🤖 Un asistente virtual programado por Antonio MBA NZANG para guiarte por su portafolio profesional.",
        "que eres": "Soy un chatbot llamado Antonio, creado por Antonio MBA NZANG para ofrecerte información sobre su trayectoria y proyectos.",
        "como funcionas": "Fui desarrollado por Antonio MBA NZANG usando tecnologías web modernas. Analizo tus mensajes para proporcionar respuestas útiles sobre su trabajo.",

        // Sobre Antonio MBA NZANG
        "antonio": "Antonio MBA NZANG es un profesional con experiencia en:<br>- Desarrollo multiplataforma<br>- Seguridad informática<br>- Gestión de proyectos tecnológicos<br>¿Qué te gustaría saber específicamente?",
        "quien es antonio": "Antonio MBA NZANG es un desarrollador full-stack especializado en crear soluciones tecnológicas innovadoras y seguras.",
        "que hace antonio": "Antonio MBA NZANG se dedica al desarrollo de software, consultoría tecnológica y formación en programación. ¿Quieres detalles sobre algún área específica?",

        // Habilidades de Antonio MBA NZANG
        "habilidades": "Antonio MBA NZANG domina:<br>- Desarrollo móvil (Flutter, React Native)<br>- Seguridad informática y ethical hacking<br>- Arquitectura de software<br>- Inteligencia Artificial aplicada<br>¿Qué área te interesa más?",
        "tecnologias": "📌 Lenguajes principales: Dart, JavaScript, Python<br>📌 Frameworks: Flutter, React, Node.js<br>📌 Seguridad: OWASP, Pentesting<br>📌 DevOps: Docker, CI/CD<br>¿Quieres detalles sobre alguna tecnología?",

        // Experiencia profesional
        "experiencia": "Antonio MBA NZANG tiene:<br>🔹 +5 años en desarrollo de software<br>🔹 Certificaciones en ciberseguridad<br>🔹 Experiencia liderando equipos técnicos<br>Revisa su <a href='assets/documentos/CV_Antonio_MBA_NZANG.pdf' target='_blank'>CV completo</a> para más detalles.",
        "trayectoria": "La trayectoria profesional de Antonio MBA NZANG incluye:<br>- Desarrollo de aplicaciones empresariales<br>- Consultoría de seguridad para startups<br>- Docencia en programación<br>¿Qué aspecto te interesa conocer?",

        // Proyectos
        "proyectos": "Proyectos destacados de Antonio MBA NZANG:<br>📱 <a href='proyectos.html#app-financiera'>Sistema bancario móvil</a><br>🔒 <a href='proyectos.html#seguridad'>Plataforma de seguridad</a><br>🌐 <a href='proyectos.html#web'>E-commerce escalable</a><br>¿Sobre cuál quieres información?",
        "portfolio": "El portafolio completo de Antonio MBA NZANG está disponible <a href='proyectos.html'>aquí</a>. Incluye casos de estudio detallados.",

        // Contacto
        "contacto": "Puedes contactar a Antonio MBA NZANG por:<br>📧 <a href='mailto:contacto@antoniombanzang.com'>contacto@antoniombanzang.com</a><br>📱 <a href='https://linkedin.com/in/antoniombanzang' target='_blank'>LinkedIn</a><br>💻 <a href='https://github.com/antoniombanzang' target='_blank'>GitHub</a>",
        "email": "El correo profesional de Antonio MBA NZANG es: <a href='mailto:contacto@antoniombanzang.com'>contacto@antoniombanzang.com</a>",
        "linkedin": "Conecta con Antonio MBA NZANG en: <a href='https://linkedin.com/in/antoniombanzang' target='_blank'>LinkedIn</a> para oportunidades profesionales.",

        // Educación
        "formacion": "Antonio MBA NZANG tiene:<br>🎓 Grado en Ingeniería Informática<br>📚 Máster en Ciberseguridad<br>🏅 Certificaciones en cloud computing y desarrollo ágil",
        
        // Agradecimientos
        "gracias": "¡De nada! 😊 Recuerda que estoy aquí para ayudarte a conocer mejor a Antonio MBA NZANG. ¿Necesitas algo más?",
        
        // Default
        "default": "Disculpa, no entendí completamente. Como asistente de Antonio MBA NZANG, puedo hablar sobre:<br>- Su experiencia profesional<br>- Proyectos destacados<br>- Habilidades técnicas<br>- Formación académica<br>¿Qué te gustaría saber?"
    };
    
    // Enviar mensaje
    function sendUserMessage() {
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
            userInput.value = '';
            setTimeout(() => {
                const reply = getBotResponse(message.toLowerCase());
                addBotMessage(reply);
            }, 800);
        }
    }
    
    sendMessage.addEventListener('click', sendUserMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendUserMessage();
    });
    
    // Funciones auxiliares
    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message bot-message';
        messageDiv.innerHTML = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message user-message';
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function getBotResponse(message) {
        message = message.toLowerCase();
        
        // Saludos
        if (/hola|hi|hello|saludos/.test(message)) return responses["hola"];
        if (/buenos\s*d[ií]as|buen\s*d[ií]a/.test(message)) return responses["buenos dias"];
        if (/buenas\s*tardes/.test(message)) return responses["buenas tardes"];
        if (/buenas\s*noches/.test(message)) return responses["buenas noches"];
        
        // Sobre el bot
        if (/quien\s*eres|que\s*eres|presentate/.test(message)) return responses["quien eres"];
        if (/como\s*funcionas|como\s*trabajas/.test(message)) return responses["como funcionas"];
        
        // Sobre Antonio MBA NZANG
        if (/antonio|mba|nzang/.test(message)) return responses["antonio"];
        if (/quien\s*es\s*antonio|hablame\s*de\s*antonio/.test(message)) return responses["quien es antonio"];
        if (/que\s*hace\s*antonio|a\s*que\s*se\s*dedica/.test(message)) return responses["que hace antonio"];
        
        // Habilidades
        if (/habilidad|que\s*sabe|especialidad/.test(message)) return responses["habilidades"];
        if (/tecnolog[ií]a|lenguaje|framework|herramienta/.test(message)) return responses["tecnologias"];
        
        // Experiencia
        if (/experien|curric|trayectoria|cv/.test(message)) return responses["experiencia"];
        if (/trabajo|empleo|laboral|profesional/.test(message)) return responses["trayectoria"];
        
        // Proyectos
        if (/proyecto|portfolio|trabajos|realizaci[oó]n/.test(message)) return responses["proyectos"];
        
        // Contacto
        if (/contact|email|correo|linkedin|redes|github/.test(message)) return responses["contacto"];
        
        // Educación
        if (/formaci[oó]n|estudio|educaci[oó]n|acad[eé]mico/.test(message)) return responses["formacion"];
        
        // Agradecimientos
        if (/gracias|thanks|agradezco/.test(message)) return responses["gracias"];
        
        return responses["default"];
    }
});