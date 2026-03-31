/**
 * ARQUIVO: script.js
 * Descrição: Lógica de animação Hero, Accordion, Carrossel, Modais e EmailJS
 */

// 1. CONFIGURAÇÃO TAILWIND
if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        theme: {
            extend: {
                animation: {
                    'scroll-up': 'up 150s linear infinite',
                    'scroll-down': 'down 170s linear infinite',
                    'scroll-up-slow': 'up 160s linear infinite',
                },
                keyframes: {
                    'up': { 'from': { transform: 'translateY(0)' }, 'to': { transform: 'translateY(-50%)' } },
                    'down': { 'from': { transform: 'translateY(-50%)' }, 'to': { transform: 'translateY(0)' } }
                }
            }
        }
    };
}

// 2. VARIÁVEIS GLOBAIS PARA NOTÍCIAS
let currentNews = 0;
let autoPlayNews;

// 3. FUNÇÕES GLOBAIS DE NOTÍCIAS (Funcionam com onclick)
function updateNews() {
    const newsItems = document.querySelectorAll('.news-item');
    const newsDots = document.querySelectorAll('.news-dot');
    
    if (newsItems.length === 0) return;

    newsItems.forEach((item, index) => {
        if (index === currentNews) {
            item.classList.remove('opacity-0', 'translate-y-8', 'pointer-events-none', 'absolute');
            item.classList.add('opacity-100', 'translate-y-0', 'relative');
            if (newsDots[index]) {
                newsDots[index].classList.remove('bg-gray-600');
                newsDots[index].classList.add('bg-white');
            }
        } else {
            item.classList.add('opacity-0', 'translate-y-8', 'pointer-events-none', 'absolute');
            item.classList.remove('opacity-100', 'translate-y-0', 'relative');
            if (newsDots[index]) {
                newsDots[index].classList.remove('bg-white');
                newsDots[index].classList.add('bg-gray-600');
            }
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

// 4. FUNÇÕES GLOBAIS DE MODAIS
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
// 5. INICIALIZAÇÃO E LÓGICA DE DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // --- INJEÇÃO DE ESTILO PARA MOBILE/TABLET (CORREÇÃO DA IMAGEM HERO) ---
    const style = document.createElement('style');
    style.innerHTML = `
        @media (max-width: 1024px) {
            .hero-bg {
                /* 1. Resetamos as posições negativas que causavam o zoom */
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;

                /* 2. Ajustamos o zoom. 
                'cover' é o padrão, mas se quiser a imagem AINDA mais longe (menor), 
                você pode usar uma porcentagem, ex: 110% */
                background-size: cover !important; 
                
                /* 3. Centraliza o ponto de foco (importante para não cortar o Cristo) */
                background-position: center 20% !important; 

                /* 4. Travas de segurança contra movimento */
                transform: none !important;
                animation: none !important;
        }
    }
    `;
    document.head.appendChild(style);

    // Inicializar EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init("qtUrnVDfcTSRNgoxo");
    }

    // Inicializar Notícias
    updateNews();
    autoPlayNews = setInterval(() => {
        const items = document.querySelectorAll('.news-item');
        if (items.length > 0) {
            currentNews = (currentNews + 1) % items.length;
            updateNews();
        }
    }, 15000);

    // Parallax Hero
    const bg = document.querySelector(".hero-bg");
    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;
    
    document.addEventListener("mousemove", (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animateHero() {
        // CORREÇÃO: Só aplica a animação se for Desktop (> 1024px)
        if (window.innerWidth > 1024) {
            currentX += (mouseX * 12 - currentX) * 0.2;
            currentY += (mouseY * 12 - currentY) * 0.2;
            if (bg) bg.style.transform = `translate3d(${-currentX}%, ${-currentY}%, 0)`;
        } else {
            // Garante que no mobile o transform seja limpo
            if (bg) bg.style.transform = 'none';
        }
        requestAnimationFrame(animateHero);
    }
    animateHero();

    // Accordion
    document.querySelectorAll('.accordion-header').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const isOpen = content.style.maxHeight !== '0px' && content.style.maxHeight !== '';
            document.querySelectorAll('.accordion-content').forEach(c => {
                c.style.maxHeight = '0px';
                if (c.previousElementSibling.querySelector('.icon-arrow')) 
                    c.previousElementSibling.querySelector('.icon-arrow').style.transform = 'rotate(0deg)';
            });
            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
                if (button.querySelector('.icon-arrow')) button.querySelector('.icon-arrow').style.transform = 'rotate(180deg)';
            }
        });
    });

    // EmailJS Formulário
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const btn = document.getElementById('submit-btn');
            const originalText = btn.innerText;
            btn.innerText = "ENVIANDO...";
            btn.disabled = true;
            emailjs.sendForm('service_qtUrnVDfcTSRNgox', 'template_tnsxepv', this)
                .then(() => {
                    alert('Obrigado! Seu email foi enviado com sucesso. Em breve retornaremos.');
                    contactForm.reset();
                })
                .finally(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
        });
    }

    // Inicializar AOS
    if (typeof AOS !== 'undefined') AOS.init({ duration: 1000, once: true });
});

// Fechar modais ao clicar fora
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('fixed')) {
        document.querySelectorAll('.fixed:not(.hidden)').forEach(m => m.classList.add('hidden'));
        document.body.style.overflow = 'auto';
    }
});

// --- LÓGICA DO CARROSSEL DE DEPOIMENTOS ---
const track = document.getElementById('carousel-track');
const indicatorsContainer = document.getElementById('indicators-container');
const cards = document.querySelectorAll('.testimonial-card');

if (track && cards.length > 0) {
    let currentIndex = 0;
    
    // Limpar container caso o script rode duas vezes
    indicatorsContainer.innerHTML = '';

    // 1. Criar os indicadores
    cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `h-2 rounded-full transition-all duration-300 ${i === 0 ? 'bg-black w-6' : 'bg-gray-300 w-2'}`;
        dot.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(dot);
    });

    const dots = indicatorsContainer.querySelectorAll('button');

  function goToSlide(index) {
    if (!track || cards.length === 0) return;
    
    currentIndex = index;
    
    // 1. Cálculo dinâmico: No mobile, o card ocupa quase tudo. No PC, menos.
    // Usamos o container pai (track) para saber quanto deslocar exatamente.
    const gap = 24; // equivalente ao gap-6 do Tailwind
    const cardWidth = cards[0].offsetWidth;
    
    // 2. Cálculo do deslocamento considerando o gap
    const offset = currentIndex * (cardWidth + gap);
    
    track.style.transform = `translateX(-${offset}px)`;
    
    // 3. Atualizar visual dos pontinhos (seu código original estava excelente aqui)
    const dots = indicatorsContainer.querySelectorAll('button');
    dots.forEach((dot, i) => {
        if (i === currentIndex) {
            dot.classList.add('bg-black', 'w-6');
            dot.classList.remove('bg-gray-300', 'w-2');
        } else {
            dot.classList.remove('bg-black', 'w-6');
            dot.classList.add('bg-gray-300', 'w-2');
        }
    });
}

    // Auto-play
    let autoPlayInterval = 5000;
    let autoPlayCarousel = setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        goToSlide(currentIndex);
    }, autoPlayInterval);

    // Pausar/Reiniciar ao interagir
    track.addEventListener('mouseenter', () => clearInterval(autoPlayCarousel));
    track.addEventListener('mouseleave', () => {
        autoPlayCarousel = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            goToSlide(currentIndex);
        }, autoPlayInterval);
    });

    // Ajustar posição se a tela mudar de tamanho
    window.addEventListener('resize', () => goToSlide(currentIndex));
}

   // Lógica para abrir/fechar o menu
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    // Fecha o menu ao clicar em qualquer link
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });

  // Bloquear clique direito apenas nas imagens
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        // Opcional: alert("Imagens protegidas por direitos autorais.");
    }
}, false);

// Impede o atalho Ctrl+S (Salvar página) que baixaria as imagens
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
    }
});