// ===== SISTEMA DE ANIMAÇÕES ELEGANTES =====
class AnimationController {
    constructor() {
        this.observers = new Map();
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupParallaxEffects();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, options);

        // Observar elementos
        document.addEventListener('DOMContentLoaded', () => {
            const elements = document.querySelectorAll('.service-card, .testimonial-card, .contact-item, .about-content, .hero-content, .credential');
            elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.6s ease';
                this.observer.observe(el);
            });
        });
    }

    animateElement(element) {
        const delay = Math.random() * 0.3;
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay * 1000);
    }

    setupScrollAnimations() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollAnimations();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateScrollAnimations() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        // Parallax no hero
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    }

    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-card, .image-placeholder');
            
            parallaxElements.forEach(element => {
                const speed = 0.3;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// ===== SISTEMA DE MENU ELEGANTE =====
class AdvancedMenu {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        this.setupHamburger();
        this.setupScrollEffects();
        this.setupMenuLinks();
    }

    setupHamburger() {
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
            
            // Adicionar efeito de blur no body
            document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    setupScrollEffects() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Header transparente
            if (currentScroll > 100) {
                this.header.style.background = 'rgba(255, 255, 255, 0.95)';
                this.header.style.backdropFilter = 'blur(20px)';
                this.header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                this.header.style.background = 'rgba(255, 255, 255, 0.9)';
                this.header.style.backdropFilter = 'blur(20px)';
                this.header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
            }
            
            // Hide/show header on scroll
            if (currentScroll > lastScroll && currentScroll > 200) {
                this.header.style.transform = 'translateY(-100%)';
            } else {
                this.header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }

    setupMenuLinks() {
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    // Fechar menu mobile
                    this.hamburger.classList.remove('active');
                    this.navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Smooth scroll
                    const targetPosition = target.offsetTop - 100;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===== SISTEMA DE FORMULÁRIO ELEGANTE =====
class AdvancedForm {
    constructor() {
        this.form = document.querySelector('.contact-form form');
        this.init();
    }

    init() {
        if (this.form) {
            this.setupFormValidation();
            this.setupFormSubmission();
            this.setupInputEffects();
        }
    }

    setupFormValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        field.classList.remove('error', 'success');
        
        // Validações específicas
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        }
        
        if (field.type === 'tel' && value) {
            const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
            isValid = phoneRegex.test(value);
        }
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
        }
        
        // Aplicar classes
        if (value && !isValid) {
            field.classList.add('error');
        } else if (value && isValid) {
            field.classList.add('success');
        }
    }

    setupFormSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = this.form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Animação de loading
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simular envio
            setTimeout(() => {
                this.showSuccessMessage();
                this.form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Limpar classes de validação
                this.form.querySelectorAll('input, textarea').forEach(input => {
                    input.classList.remove('error', 'success');
                });
            }, 2000);
        });
    }

    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'form-success';
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #27ae60;
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
                z-index: 10000;
                animation: slideInRight 0.5s ease;
            ">
                <i class="fas fa-check-circle"></i> Mensagem enviada com sucesso!
            </div>
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 5000);
    }

    setupInputEffects() {
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.borderColor = '#3498db';
                input.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.1)';
            });
            
            input.addEventListener('blur', () => {
                if (!input.classList.contains('error')) {
                    input.style.borderColor = '#e0e0e0';
                    input.style.boxShadow = 'none';
                }
            });
        });
    }
}

// ===== SISTEMA DE EFEITOS VISUAIS ELEGANTES =====
class VisualEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupHoverEffects();
        this.setupClickEffects();
        this.setupTypingEffect();
    }

    setupHoverEffects() {
        // Efeito sutil nos cards
        const cards = document.querySelectorAll('.service-card, .testimonial-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    setupClickEffects() {
        // Efeito de ripple nos botões
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255,255,255,0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                button.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    setupTypingEffect() {
        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            heroTitle.style.borderRight = '2px solid white';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 80);
                } else {
                    setTimeout(() => {
                        heroTitle.style.borderRight = 'none';
                    }, 1000);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todos os sistemas
    new AnimationController();
    new AdvancedMenu();
    new AdvancedForm();
    new VisualEffects();
    
    // Adicionar estilos CSS dinâmicos
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(100px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .form-group input.error,
        .form-group textarea.error {
            border-color: #e74c3c;
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
        }
        
        .form-group input.success,
        .form-group textarea.success {
            border-color: #27ae60;
            box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
        }
        
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            padding: 1rem;
            animation: slideDown 0.3s ease;
        }
        
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .header {
            transition: all 0.3s ease;
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .btn span {
            position: relative;
            z-index: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Adicionar classe de carregamento
    document.body.classList.add('loaded');
    
    // Efeito de carregamento inicial
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'none';
    }, 100);
}); 