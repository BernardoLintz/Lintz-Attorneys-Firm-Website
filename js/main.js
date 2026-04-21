/**
 * ARQUIVO: script.js
 * Descrição: Lógica de animação Hero, Accordion, Carrossel, Modais e Envio de Formulário
 */

// 2. VARIÁVEIS GLOBAIS
let currentNews = 0;
let autoPlayNews;
let animationId; // Controle do Parallax

// 3. FUNÇÕES DE NOTÍCIAS
function updateNews() {
    const newsItems = document.querySelectorAll('.news-item');
    const newsDots = document.querySelectorAll('.news-dot');
    
    if (newsItems.length === 0) return;

    newsItems.forEach((item, index) => {
        const isActive = index === currentNews;
        if (isActive) {
            item.classList.remove('opacity-0', 'translate-y-8', 'pointer-events-none', 'absolute');
            item.classList.add('opacity-100', 'translate-y-0', 'relative');
        } else {
            item.classList.add('opacity-0', 'translate-y-8', 'pointer-events-none', 'absolute');
            item.classList.remove('opacity-100', 'translate-y-0', 'relative');
        }
        
        if (newsDots[index]) {
            newsDots[index].classList.toggle('bg-white', isActive);
            newsDots[index].classList.toggle('bg-gray-600', !isActive);
            // Acessibilidade
            newsDots[index].setAttribute('aria-current', isActive ? 'true' : 'false');
        }
    });
}

function goToNews(index) {
    currentNews = index;
    updateNews();
    clearInterval(autoPlayNews);
    autoPlayNews = setInterval(() => {
        const items = document.querySelectorAll('.news-item');
        currentNews = (currentNews + 1) % items.length;
        updateNews();
    }, 15000);
}

// 4. FUNÇÕES DE MODAIS
function openModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) {
        m.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) {
        m.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// 5. INICIALIZAÇÃO E LÓGICA DE DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // --- MENU MOBILE ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        const toggleMenu = () => {
            const isOpen = mobileMenu.classList.contains('translate-x-0');
            mobileMenu.classList.toggle('translate-x-full', isOpen);
            mobileMenu.classList.toggle('translate-x-0', !isOpen);
            
            // Sincronização de Acessibilidade
            menuBtn.setAttribute('aria-expanded', !isOpen);
            mobileMenu.setAttribute('aria-hidden', isOpen);
            document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
        };

        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // --- ENVIO DE FORMULÁRIO (FETCH PHP) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const btn = document.getElementById('submit-btn');
            const originalText = btn.innerText;
            const formData = new FormData(this);

            // Validação e Higienização rápida
            const emailField = formData.get('user_email');
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField)) {
                Toastify({ text: "E-mail inválido", style: { background: "#E11D48" } }).showToast();
                return;
            }

            btn.innerText = "ENVIANDO...";
            btn.disabled = true;

            fetch('/send_email.php', { method: 'POST', body: formData })
            .then(async r => {
                if (r.ok) {
                    Toastify({ text: "Enviado com sucesso!", style: { background: "black" } }).showToast();
                    contactForm.reset();
                } else { throw new Error(); }
            })
            .catch(() => {
                Toastify({ text: "Erro ao enviar", style: { background: "#E11D48" } }).showToast();
            })
            .finally(() => {
                btn.innerText = originalText;
                btn.disabled = false;
            });
        });
    }

    // --- PARALLAX HERO (BLOQUEADO PARA MOBILE/TABLET) ---
    const bg = document.querySelector(".hero-bg");
    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;
    
    if (window.innerWidth > 1024) {
        document.addEventListener("mousemove", (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        function animateHero() {
            // Só processa se estiver no desktop e visível
            if (window.innerWidth > 1024 && window.scrollY < window.innerHeight && bg) {
                const targetX = mouseX * 12;
                const targetY = mouseY * 12;
                currentX += (targetX - currentX) * 0.1; 
                currentY += (targetY - currentY) * 0.1;
                bg.style.transform = `translate3d(${-currentX}%, ${-currentY}%, 0)`;
                animationId = requestAnimationFrame(animateHero);
            } else {
                if (bg) bg.style.transform = 'none';
                cancelAnimationFrame(animationId);
            }
        }
        animateHero();
    }

    // --- ACCORDION (COM ATRIBUTOS ARIA) ---
    document.querySelectorAll('.accordion-header').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const isOpen = content.style.maxHeight !== '0px' && content.style.maxHeight !== '';
            
            // Fecha outros
            document.querySelectorAll('.accordion-content').forEach(c => {
                c.style.maxHeight = '0px';
                c.previousElementSibling.setAttribute('aria-expanded', 'false');
                const arrow = c.previousElementSibling.querySelector('.icon-arrow');
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            });

            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
                button.setAttribute('aria-expanded', 'true');
                const arrow = button.querySelector('.icon-arrow');
                if (arrow) arrow.style.transform = 'rotate(180deg)';
            }
        });
    });

    // --- CARROSSEL DE DEPOIMENTOS ---
    const track = document.getElementById('carousel-track');
    const indicatorsContainer = document.getElementById('indicators-container');
    const cards = document.querySelectorAll('.testimonial-card');

    if (track && cards.length > 0) {
        let currentIndex = 0;
        let autoPlayCarousel;

        const goToSlide = (index) => {
            currentIndex = index;
            const gap = 24; 
            const offset = currentIndex * (cards[0].offsetWidth + gap);
            track.style.transform = `translateX(-${offset}px)`;
            
            const dots = indicatorsContainer.querySelectorAll('button');
            dots.forEach((dot, i) => {
                dot.classList.toggle('bg-black', i === currentIndex);
                dot.classList.toggle('w-6', i === currentIndex);
                dot.classList.toggle('bg-gray-300', i !== currentIndex);
                dot.classList.toggle('w-2', i !== currentIndex);
            });
        };

        const startAutoPlay = () => {
            clearInterval(autoPlayCarousel);
            autoPlayCarousel = setInterval(() => {
                currentIndex = (currentIndex + 1) % cards.length;
                goToSlide(currentIndex);
            }, 5000);
        };

        indicatorsContainer.innerHTML = '';
        cards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = `h-2 rounded-full transition-all duration-300 ${i === 0 ? 'bg-black w-6' : 'bg-gray-300 w-2'}`;
            dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(i);
                startAutoPlay();
            });
            indicatorsContainer.appendChild(dot);
        });

        startAutoPlay();
        track.addEventListener('mouseenter', () => clearInterval(autoPlayCarousel));
        track.addEventListener('mouseleave', startAutoPlay);
        window.addEventListener('resize', () => goToSlide(currentIndex));
    }

    // Inicialização Notícias
    updateNews();
    autoPlayNews = setInterval(() => {
        const items = document.querySelectorAll('.news-item');
        if (items.length > 0) {
            currentNews = (currentNews + 1) % items.length;
            updateNews();
        }
    }, 15000);

    // Visibility Change (Performance)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) clearInterval(autoPlayNews);
        else updateNews();
    });

    if (typeof AOS !== 'undefined') AOS.init({ duration: 1000, once: true });
});

// --- SEGURANÇA ---
document.addEventListener('contextmenu', e => { if (e.target.tagName === 'IMG') e.preventDefault(); });
document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key === 's') e.preventDefault(); });
window.addEventListener('click', e => {
    if (e.target.classList.contains('fixed') && e.target.id !== 'mobile-menu') {
        e.target.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});