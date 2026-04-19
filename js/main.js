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
                    'ticker': 'ticker 40s linear infinite', // Adicionado para os logos
                },
                keyframes: {
                    'up': { 'from': { transform: 'translateY(0)' }, 'to': { transform: 'translateY(-50%)' } },
                    'down': { 'from': { transform: 'translateY(-50%)' }, 'to': { transform: 'translateY(0)' } },
                    'ticker': { // Adicionado para movimento horizontal
                        '0%': { transform: 'translateX(0)' },
                        '100%': { transform: 'translateX(-50%)' }
                    }
                }
            }
        }
    };
}
// 2. VARIÁVEIS GLOBAIS
let currentNews = 0;
let autoPlayNews;

// 3. FUNÇÕES DE NOTÍCIAS
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
    
    // --- MENU MOBILE (Lógica 'Active' para deslize lateral) ---
   
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-menu'); // Adicionei o botão de fechar
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    const toggleMenu = () => {
        // Alterna as classes do Tailwind para deslizar
        mobileMenu.classList.toggle('translate-x-full');
        mobileMenu.classList.toggle('translate-x-0');
        
        // Trava o scroll
        const isOpen = mobileMenu.classList.contains('translate-x-0');
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    };

    menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu();
    });

    // Se o botão de fechar (X) existir, ele também deve funcionar
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleMenu);
    }

    // Fecha ao clicar nos links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.classList.remove('translate-x-0');
            document.body.style.overflow = 'auto';
        });
    });
}

    // --- EMAILJS ---
    if (typeof emailjs !== 'undefined') {
       emailjs.init(window.EMAILJS_PUBLIC_KEY);
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const btn = document.getElementById('submit-btn');
            const originalText = btn.innerText;
            btn.innerText = "ENVIANDO...";
            btn.disabled = true;

            // Certifique-se que o SERVICE_ID e TEMPLATE_ID estão corretos no seu painel
           emailjs.sendForm(window.SERVICE_ID, window.TEMPLATE_ID, this)
                .then(() => {
                    Toastify({
                        text: "Obrigado! Seu email foi enviado com sucesso.",
                        duration: 3000,
                        gravity: "top",
                        position: "center",
                        style: {
                            background: "black",
                            color: "white",
                            }
                }).showToast();
                  contactForm.reset();
                })
                .catch((error) => {
                     Toastify({
                        text: "Erro ao enviar o email.",
                        duration: 3000,
                        gravity: "top",
                        position: "center",
                        style: {
                            background: "black",
                            color: "white",
                            }
                }).showToast();
                    alert('Erro ao enviar: ' + JSON.stringify(error));
                })
                .finally(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
        });
    }

    // --- PARALLAX HERO (OTIMIZADO) ---
    const bg = document.querySelector(".hero-bg");
    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;
    
    document.addEventListener("mousemove", (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animateHero() {
        // Verifica: Se a tela for maior que 1024px E se o scroll for menor que a altura da tela
        if (window.innerWidth > 1024 && window.scrollY < window.innerHeight && bg) {
            currentX += (mouseX * 12 - currentX) * 0.1; 
            currentY += (mouseY * 12 - currentY) * 0.1;
            bg.style.transform = `translate3d(${-currentX}%, ${-currentY}%, 0)`;
        } else if (bg && window.innerWidth <= 1024) {
            // No mobile ou tablet, remove o transform para não bugar o layout
            bg.style.transform = 'none';
        }
        
        requestAnimationFrame(animateHero);
    }
    animateHero();

    // --- ACCORDION ---
    document.querySelectorAll('.accordion-header').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const isOpen = content.style.maxHeight !== '0px' && content.style.maxHeight !== '';
            
            document.querySelectorAll('.accordion-content').forEach(c => {
                c.style.maxHeight = '0px';
                const arrow = c.previousElementSibling.querySelector('.icon-arrow');
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            });

            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
                const arrow = button.querySelector('.icon-arrow');
                if (arrow) arrow.style.transform = 'rotate(180deg)';
            }
        });
    });

    // --- CARROSSEL DE DEPOIMENTOS ---
    // --- CARROSSEL DE DEPOIMENTOS ---
    const track = document.getElementById('carousel-track');
    const indicatorsContainer = document.getElementById('indicators-container');
    const cards = document.querySelectorAll('.testimonial-card');

    if (track && cards.length > 0) {
        let currentIndex = 0;
        let autoPlayCarousel; // Variável de controle

        indicatorsContainer.innerHTML = '';
        cards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = `h-2 rounded-full transition-all duration-300 ${i === 0 ? 'bg-black w-6' : 'bg-gray-300 w-2'}`;
            dot.addEventListener('click', () => {
                goToSlide(i);
                startAutoPlay(); // Reinicia o timer ao interagir
            });
            indicatorsContainer.appendChild(dot);
        });

        function goToSlide(index) {
            currentIndex = index;
            const gap = 24; 
            const cardWidth = cards[0].offsetWidth;
            const offset = currentIndex * (cardWidth + gap);
            
            track.style.transform = `translateX(-${offset}px)`;
            
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

        // Função para iniciar/reiniciar o autoplay
        function startAutoPlay() {
            clearInterval(autoPlayCarousel);
            autoPlayCarousel = setInterval(() => {
                currentIndex = (currentIndex + 1) % cards.length;
                goToSlide(currentIndex);
            }, 5000);
        }

        // Eventos de controle
        startAutoPlay(); // Inicia ao carregar
        
        track.addEventListener('mouseenter', () => clearInterval(autoPlayCarousel)); // Pausa
        track.addEventListener('mouseleave', startAutoPlay); // RETOMA (Isso faltava no seu código)
        
        window.addEventListener('resize', () => goToSlide(currentIndex));
    }

    // Notícias Inicialização
    updateNews();
    autoPlayNews = setInterval(() => {
        const items = document.querySelectorAll('.news-item');
        if (items.length > 0) {
            currentNews = (currentNews + 1) % items.length;
            updateNews();
        }
    }, 15000);

    if (typeof AOS !== 'undefined') AOS.init({ duration: 1000, once: true });
});

// --- PROTEÇÃO DE IMAGENS E SEGURANÇA ---
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
});

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') e.preventDefault();
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('fixed')) {
        document.querySelectorAll('.fixed:not(.hidden)').forEach(m => {
            if(m.id !== 'mobile-menu') { // Não fecha o menu mobile clicando fora se não desejar
                m.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }
});