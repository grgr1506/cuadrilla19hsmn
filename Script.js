// Counter Animation
function animateCounter() {
    const counterElement = document.getElementById('hermanos-count');
    const jubiladosElement = document.getElementById('jubilados-count');
    const targetCount = 196; // Número de hermanos activos
    const targetJubilados = 15; // Número de hermanos jubilados
    const duration = 2000;
    
    const incrementActive = targetCount / (duration / 16);
    let currentCount = 0;

    function updateActiveCounter() {
        currentCount += incrementActive;
        if (currentCount >= targetCount) {
            counterElement.textContent = targetCount;
        } else {
            counterElement.textContent = Math.floor(currentCount);
            requestAnimationFrame(updateActiveCounter);
        }
    }

    const incrementJubilados = targetJubilados / (duration / 16);
    let currentJubilados = 0;

    function updateJubiladosCounter() {
        currentJubilados += incrementJubilados;
        if (currentJubilados >= targetJubilados) {
            jubiladosElement.textContent = targetJubilados;
        } else {
            jubiladosElement.textContent = Math.floor(currentJubilados);
            requestAnimationFrame(updateJubiladosCounter);
        }
    }

    updateActiveCounter();
    updateJubiladosCounter();
}

// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function createIndicators() {
    const indicatorsContainer = document.getElementById('indicators');
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
}

function updateCarousel() {
    const carousel = document.getElementById('photo-carousel');
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

function startCarouselAutoPlay() {
    setInterval(nextSlide, 5000);
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Cerrar el menú en móviles si está abierto
            const navList = document.getElementById('nav-list');
            const navOverlay = document.getElementById('nav-overlay');
            const hamburger = document.getElementById('hamburger');
            if(navList.classList.contains('active')) {
                navList.classList.remove('active');
                navOverlay.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('nav-open');
            }

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Menú Móvil (Hamburger)
document.getElementById('hamburger')?.addEventListener('click', function() {
    const navList = document.getElementById('nav-list');
    const navOverlay = document.getElementById('nav-overlay');
    this.classList.toggle('active');
    navList.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.classList.toggle('nav-open');
});

// Intersection Observer for fade-in animations
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                if (entry.target.id === 'hermanos') {
                    animateCounter();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.fade-in, .section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// =========================================
// INTRO ANIMATION (SPLASH SCREEN LOGIC)
// =========================================
function playIntroSequence() {
    const introScreen = document.getElementById('intro-screen');
    const introLogo = document.getElementById('intro-logo');
    const introSenor = document.getElementById('intro-senor');

    // 1. Bloquear el scroll mientras sucede la intro
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    // 2. Mostrar el Logo de la Cuadrilla (Medio segundo después de cargar)
    setTimeout(() => {
        introLogo.classList.add('show-intro');
    }, 500);

    // 3. Ocultar Logo y Mostrar al Señor de los Milagros
    setTimeout(() => {
        introLogo.classList.remove('show-intro');
        introSenor.classList.add('show-intro');
    }, 3500); // Aparece a los 3.5 segundos

    // 4. Desvanecer toda la pantalla negra y mostrar la web
    setTimeout(() => {
        introScreen.classList.add('hide-screen');
        document.body.style.overflow = ''; // Restaurar el scroll normal
    }, 7000); // La web se revela a los 7 segundos
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    createIndicators();
    startCarouselAutoPlay();
    observeElements();
    
    // Iniciar la secuencia de introducción
    playIntroSequence();
});