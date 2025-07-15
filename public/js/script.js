// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicialização de todos os componentes
    initHeader();
    initFAQ();
    initAnimations();

    initSmoothScroll();
    initFormHandling();
    initUrgencyElements();
    
    console.log('SyncPost Landing Page carregada com sucesso!');
});

// Header com scroll effect
function initHeader() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Animações de entrada
function initAnimations() {
    // Intersection Observer para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elementos para animar
    const elementsToAnimate = document.querySelectorAll(
        '.step, .benefit, .story, .pricing-card, .faq-item'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // Animação das setas de sincronização
    animateSyncArrows();
}

// Animação das setas de sincronização
function animateSyncArrows() {
    const arrows = document.querySelectorAll('.arrow');
    
    setInterval(() => {
        arrows.forEach((arrow, index) => {
            setTimeout(() => {
                arrow.style.opacity = '1';
                arrow.style.transform = arrow.style.transform.replace('scale(1)', 'scale(1.2)');
                
                setTimeout(() => {
                    arrow.style.transform = arrow.style.transform.replace('scale(1.2)', 'scale(1)');
                }, 200);
            }, index * 150);
        });
    }, 3000);
}



// Smooth scroll para links internos
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Manipulação de formulários
function initFormHandling() {
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.getAttribute('href') === '#teste-gratuito' || 
                button.textContent.includes('Teste') || 
                button.textContent.includes('Começar')) {
                
                e.preventDefault();
                showSignupModal();
            }
        });
    });
}

// Modal de cadastro
function showSignupModal() {
    // Criar modal dinamicamente
    const modal = document.createElement('div');
    modal.className = 'signup-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Garanta Seu Acesso Exclusivo!</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="signup-form">
                        <div class="form-group">
                            <label for="name">Nome Completo</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp">WhatsApp (com DDD)</label>
                            <input type="tel" id="whatsapp" name="whatsapp" placeholder="(XX) XXXXX-XXXX" required>
                        </div>
                        <button type="submit" class="btn btn-primary btn-large btn-full">
                            Quero Garantir Meu Acesso e Bônus!
                        </button>
                    </form>
                    <p class="form-disclaimer">
                        🔒 Seus dados estão seguros. Não enviamos spam.
                    </p>
                </div>
            </div>
        </div>
    `;
    
    // Adicionar estilos do modal
    const modalStyles = `
        <style>
        .signup-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            animation: fadeIn 0.3s ease-out;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: relative;
            background: white;
            border-radius: 1rem;
            max-width: 500px;
            width: 100%;
            max-height: calc(100vh - 2rem);
            overflow-y: auto;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            animation: slideUp 0.3s ease-out;
            margin: auto;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #E5E7EB;
        }
        
        .modal-header h3 {
            margin: 0;
            color: #1F2937;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6B7280;
            padding: 0.5rem;
            border-radius: 0.5rem;
            transition: background-color 0.2s;
        }
        
        .modal-close:hover {
            background: #F3F4F6;
        }
        
        .modal-body {
            padding: 1.5rem;
        }
        
        .form-group {
            margin-bottom: 1rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #1F2937;
        }
        
        .form-group input,
        .form-group select {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #E5E7EB;
            border-radius: 0.5rem;
            font-size: 1rem;
            transition: border-color 0.2s;
        }
        
        .form-group input:focus,
        .form-group select:focus {
            outline: none;
            border-color: #6366F1;
        }
        
        .form-disclaimer {
            text-align: center;
            font-size: 0.875rem;
            color: #6B7280;
            margin-top: 1rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { 
                opacity: 0;
                transform: translateY(20px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Responsividade para dispositivos móveis */
        @media (max-width: 768px) {
            .modal-content {
                max-width: none;
                width: 100%;
                margin: 0;
                border-radius: 0.5rem;
            }
            
            .modal-header {
                padding: 1rem;
            }
            
            .modal-body {
                padding: 1rem;
            }
            
            .success-content {
                max-width: none;
                width: 100%;
                margin: 0;
                border-radius: 0.5rem;
                padding: 1.5rem;
            }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Event listeners do modal
    const closeModal = () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Prevenir fechamento ao clicar no conteúdo
    modal.querySelector('.modal-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Aplicar máscaras nos inputs
    const whatsappInput = modal.querySelector('#whatsapp');
    whatsappInput.addEventListener('input', (e) => {
        applyPhoneMask(e.target);
    });
    
    // Manipular envio do formulário
    modal.querySelector('.signup-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleSignup(new FormData(e.target));
        // Não fechar o modal aqui - será fechado após o processamento
    });
}

// Configuração do Google Sheets
const GOOGLE_SHEETS_CONFIG = {
    scriptUrl: 'https://script.google.com/macros/s/AKfycbzp6EhAg089LIfDii1UMbsnIonmVZyWxEkNSVbgaGL3fYP8ADR4HEnyL5GzGaAN72SxdQ/exec', // Substitua pelo seu Script ID
    sheetName: 'Leads'
};

// Funções de sanitização
function sanitizeText(text) {
    if (!text) return '';
    return text
        .trim()
        .replace(/[<>]/g, '') // Remove caracteres perigosos
        .replace(/\s+/g, ' ') // Remove espaços extras
        .substring(0, 100); // Limita a 100 caracteres
}

function sanitizeEmail(email) {
    if (!email) return '';
    return email
        .trim()
        .toLowerCase()
        .replace(/[<>]/g, '')
        .substring(0, 100);
}

function sanitizePhone(phone) {
    if (!phone) return '';
    // Remove tudo exceto números
    return phone.replace(/\D/g, '').substring(0, 15);
}

// Função para aplicar máscara de telefone
function applyPhoneMask(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length <= 2) {
        value = `(${value}`;
    } else if (value.length <= 6) {
        value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
    } else if (value.length <= 10) {
        value = `(${value.substring(0, 2)}) ${value.substring(2, 6)}-${value.substring(6)}`;
    } else {
        value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
    }
    
    input.value = value;
}

// Função para enviar dados para Google Sheets
async function sendToGoogleSheets(data) {
    try {
        console.log('Enviando dados para Google Sheets:', data);
        
        // Usar URLSearchParams para enviar dados como form data
        const params = new URLSearchParams();
        params.append('action', 'addLead');
        params.append('timestamp', new Date().toISOString());
        params.append('name', data.name);
        params.append('email', data.email);
        params.append('whatsapp', data.whatsapp);
        params.append('source', 'Landing Page');
        
        console.log('Parâmetros sendo enviados:', params.toString());
        
        const response = await fetch(GOOGLE_SHEETS_CONFIG.scriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString()
        });
        
        console.log('Resposta do Google Sheets:', response);
        console.log('Status:', response.status);
        console.log('OK:', response.ok);
        console.log('Type:', response.type);
        
        // Como estamos usando no-cors, não podemos ler a resposta
        // Mas podemos verificar se a requisição foi feita
        return true;
        
    } catch (error) {
        console.error('Erro ao enviar para Google Sheets:', error);
        console.error('Detalhes do erro:', error.message);
        return false;
    }
}

// Manipular cadastro
async function handleSignup(formData) {
    const rawData = Object.fromEntries(formData);
    
    // Sanitizar dados
    const sanitizedData = {
        name: sanitizeText(rawData.name),
        email: sanitizeEmail(rawData.email),
        whatsapp: sanitizePhone(rawData.whatsapp)
    };
    
    // Validações
    if (!sanitizedData.name || sanitizedData.name.length < 2) {
        showErrorMessage('Por favor, insira um nome válido.');
        return;
    }
    
    if (!sanitizedData.email || !sanitizedData.email.includes('@')) {
        showErrorMessage('Por favor, insira um email válido.');
        return;
    }
    
    if (!sanitizedData.whatsapp || sanitizedData.whatsapp.length < 10) {
        showErrorMessage('Por favor, insira um WhatsApp válido.');
        return;
    }
    
    // Fechar o modal de cadastro primeiro
    const modal = document.querySelector('.signup-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
    
    // Mostrar loading
    showLoadingMessage();
    
    // Enviar para Google Sheets
    const success = await sendToGoogleSheets(sanitizedData);
    
    if (success) {
        showSuccessMessage();
        
        // Tracking de conversão (opcional)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'lead_generated', {
                'event_category': 'engagement',
                'event_label': 'form_submit'
            });
        }
    } else {
        showErrorMessage('Erro ao processar cadastro. Tente novamente.');
    }
}

// Funções de mensagens
function showLoadingMessage() {
    // Remover mensagens anteriores
    const existingMessages = document.querySelectorAll('.loading-message, .success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    const message = document.createElement('div');
    message.className = 'loading-message';
    message.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <h3>Processando seu cadastro...</h3>
            <p>Aguarde um momento.</p>
        </div>
    `;
    
    const loadingStyles = `
        <style>
        .loading-message {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.8);
            animation: fadeIn 0.3s ease-out;
        }
        
        .loading-content {
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            text-align: center;
            max-width: 400px;
            width: 100%;
            animation: slideUp 0.3s ease-out;
            margin: auto;
        }
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #E5E7EB;
            border-top: 4px solid #6366F1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loading-content h3 {
            color: #1F2937;
            margin-bottom: 0.5rem;
        }
        
        .loading-content p {
            color: #6B7280;
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', loadingStyles);
    document.body.appendChild(message);
}

function showErrorMessage(errorText) {
    // Remover mensagens anteriores
    const existingMessages = document.querySelectorAll('.loading-message, .success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    const message = document.createElement('div');
    message.className = 'error-message';
    message.innerHTML = `
        <div class="error-content">
            <div class="error-icon">⚠️</div>
            <h3>Erro no Cadastro</h3>
            <p>${errorText}</p>
            <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">
                Tentar Novamente
            </button>
        </div>
    `;
    
    const errorStyles = `
        <style>
        .error-message {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.8);
            animation: fadeIn 0.3s ease-out;
        }
        
        .error-content {
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            text-align: center;
            max-width: 400px;
            width: 100%;
            animation: slideUp 0.3s ease-out;
            margin: auto;
        }
        
        .error-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .error-content h3 {
            color: #DC2626;
            margin-bottom: 1rem;
        }
        
        .error-content p {
            color: #6B7280;
            margin-bottom: 1.5rem;
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', errorStyles);
    document.body.appendChild(message);
}

// Mensagem de sucesso
function showSuccessMessage() {
    // Remover mensagens anteriores
    const existingMessages = document.querySelectorAll('.loading-message, .success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
                    <div class="success-content">
                <div class="success-icon">🎉</div>
                <h3>Cadastro Realizado com Sucesso!</h3>
                <p>Estamos em fase beta e trabalhando para lançar em breve! Assim que estivermos no ar, você será um dos primeiros a saber através do email cadastrado.</p>
                <p><strong>Fique ligado nas novidades! 🚀</strong></p>
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">
                    Entendi
                </button>
            </div>
    `;
    
    const successStyles = `
        <style>
        .success-message {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.8);
            animation: fadeIn 0.3s ease-out;
        }
        
        .success-content {
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            text-align: center;
            max-width: 400px;
            width: 100%;
            animation: slideUp 0.3s ease-out;
            margin: auto;
        }
        
        .success-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .success-content h3 {
            color: #10B981;
            margin-bottom: 1rem;
        }
        
        .success-content p {
            color: #6B7280;
            margin-bottom: 1.5rem;
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', successStyles);
    document.body.appendChild(message);
}

// Elementos de urgência dinâmicos
function initUrgencyElements() {
    // Contador de vagas restantes
    const spotsElement = document.getElementById('spots-left');
    if (spotsElement) {
        // Simular diminuição de vagas
        let spots = 23;
        setInterval(() => {
            if (Math.random() < 0.3 && spots > 5) {
                spots--;
                spotsElement.textContent = spots;
                
                // Efeito visual
                spotsElement.style.color = '#F59E0B';
                spotsElement.style.fontWeight = 'bold';
                setTimeout(() => {
                    spotsElement.style.color = '';
                    spotsElement.style.fontWeight = '';
                }, 1000);
            }
        }, 30000); // A cada 30 segundos
    }
    
    // Notificações de outros usuários se cadastrando
    showUserNotifications();
}

// Notificações de usuários se cadastrando
function showUserNotifications() {
    const names = [
        'Maria Silva', 'João Santos', 'Ana Costa', 'Carlos Mendes',
        'Fernanda Lima', 'Ricardo Oliveira', 'Juliana Ferreira',
        'Pedro Almeida', 'Camila Rodrigues', 'Bruno Martins'
    ];
    
    const cities = [
        'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador',
        'Brasília', 'Curitiba', 'Recife', 'Porto Alegre', 'Fortaleza'
    ];
    
    function showNotification() {
        const name = names[Math.floor(Math.random() * names.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        
        const notification = document.createElement('div');
        notification.className = 'user-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-avatar">👤</div>
                <div class="notification-text">
                    <strong>${name}</strong> de ${city}<br>
                    acabou de se cadastrar
                </div>
                <div class="notification-close">&times;</div>
            </div>
        `;
        
        const notificationStyles = `
            <style>
            .user-notification {
                position: fixed;
                bottom: 2rem;
                left: 2rem;
                background: white;
                border-radius: 0.75rem;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                border-left: 4px solid #10B981;
                z-index: 1000;
                animation: slideInLeft 0.5s ease-out;
                max-width: 300px;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                padding: 1rem;
                gap: 0.75rem;
            }
            
            .notification-avatar {
                font-size: 1.5rem;
                background: #F3F4F6;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification-text {
                flex: 1;
                font-size: 0.875rem;
                line-height: 1.4;
            }
            
            .notification-close {
                cursor: pointer;
                color: #6B7280;
                font-size: 1.25rem;
                padding: 0.25rem;
                border-radius: 0.25rem;
                transition: background-color 0.2s;
            }
            
            .notification-close:hover {
                background: #F3F4F6;
            }
            
            @keyframes slideInLeft {
                from {
                    transform: translateX(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutLeft {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(-100%);
                    opacity: 0;
                }
            }
            </style>
        `;
        
        if (!document.querySelector('style[data-notification-styles]')) {
            const style = document.createElement('style');
            style.setAttribute('data-notification-styles', 'true');
            style.textContent = notificationStyles.replace('<style>', '').replace('</style>', '');
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Fechar notificação
        const closeNotification = () => {
            notification.style.animation = 'slideOutLeft 0.5s ease-out';
            setTimeout(() => {
                if (notification.parentElement) {
                    document.body.removeChild(notification);
                }
            }, 500);
        };
        
        notification.querySelector('.notification-close').addEventListener('click', closeNotification);
        
        // Auto-fechar após 5 segundos
        setTimeout(closeNotification, 5000);
    }
    
    // Mostrar primeira notificação após 10 segundos
    setTimeout(() => {
        showNotification();
        
        // Depois mostrar a cada 45-90 segundos
        setInterval(() => {
            if (Math.random() < 0.7) {
                showNotification();
            }
        }, 60000 + Math.random() * 30000);
    }, 10000);
}

// Tracking de eventos (para analytics)
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    
    // Aqui você integraria com Google Analytics, Facebook Pixel, etc.
    // gtag('event', eventName, properties);
    // fbq('track', eventName, properties);
}

// Rastrear cliques em CTAs
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-primary')) {
        trackEvent('CTA_Click', {
            button_text: e.target.textContent.trim(),
            page_section: e.target.closest('section')?.className || 'unknown'
        });
    }
});

// Rastrear scroll depth
let maxScrollDepth = 0;
window.addEventListener('scroll', () => {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Rastrear marcos de scroll
        if ([25, 50, 75, 90].includes(scrollDepth)) {
            trackEvent('Scroll_Depth', { depth: scrollDepth });
        }
    }
});

// Rastrear tempo na página
let timeOnPage = 0;
setInterval(() => {
    timeOnPage += 10;
    
    // Rastrear marcos de tempo
    if ([30, 60, 120, 300].includes(timeOnPage)) {
        trackEvent('Time_On_Page', { seconds: timeOnPage });
    }
}, 10000);

