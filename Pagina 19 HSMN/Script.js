
        // Counter Animation
        function animateCounter() {
            const counterElement = document.getElementById('hermanos-count');
            const jubiladosElement = document.getElementById('jubilados-count');
            const targetCount = 196; // Número de hermanos activos
            const targetJubilados = 15; // Número de hermanos jubilados
            const duration = 2000;
            
            // Animate active members counter
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

            // Animate jubilados counter
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
            
            // Update indicators
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

        // Auto-advance carousel
        function startCarouselAutoPlay() {
            setInterval(nextSlide, 5000);
        }

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Intersection Observer for animations
        function observeElements() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Trigger counter animation when section is visible
                        if (entry.target.id === 'hermanos') {
                            animateCounter();
                        }
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            });

            // Observe all fade-in elements
            document.querySelectorAll('.fade-in, .section').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                observer.observe(el);
            });
        }

        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', function() {
            createIndicators();
            startCarouselAutoPlay();
            observeElements();
        });
 
        // Video functionality
function showVideo() {
    const videoOverlay = document.getElementById('videoOverlay');
    const welcomeVideo = document.getElementById('welcomeVideo');
    
    // Show the video overlay
    videoOverlay.style.display = 'flex';
    document.body.classList.add('video-playing');
    
    // Play the video
    welcomeVideo.play().catch(e => {
        console.log('Error playing video:', e);
        // If autoplay fails, show play button or skip to main content
        setTimeout(() => {
            closeVideo();
        }, 1000);
    });
    
    // Auto-close video when it ends
    welcomeVideo.addEventListener('ended', closeVideo);
}

function closeVideo() {
    const videoOverlay = document.getElementById('videoOverlay');
    const videoContainer = document.getElementById('videoContainer');
    const welcomeVideo = document.getElementById('welcomeVideo');
    
    // Add closing animation
    videoContainer.classList.add('closing');
    videoOverlay.classList.add('hidden');
    
    // Pause and reset video
    welcomeVideo.pause();
    welcomeVideo.currentTime = 0;
    
    // Remove video playing class from body
    document.body.classList.remove('video-playing');
    
    // Hide overlay after animation
    setTimeout(() => {
        videoOverlay.style.display = 'none';
        videoContainer.classList.remove('closing');
        videoOverlay.classList.remove('hidden');
    }, 500);
}

let isVideoMuted = true;

        // Función para alternar mute/unmute
        function toggleMute() {
            const video = document.getElementById('welcomeVideo');
            const muteBtn = document.getElementById('muteBtn');
            const muteIcon = document.getElementById('muteIcon');
            const audioIndicator = document.getElementById('audioIndicator');
            const audioStatus = document.getElementById('audioStatus');

            if (isVideoMuted) {
                // Unmute
                video.muted = false;
                isVideoMuted = false;
                
                // Cambiar estilos y texto
                muteBtn.classList.remove('muted');
                muteBtn.classList.add('unmuted');
                muteIcon.className = 'icon-volume-on';
                muteBtn.setAttribute('aria-label', 'Silenciar audio');
                
                audioIndicator.classList.remove('muted');
                audioIndicator.classList.add('unmuted');
                audioStatus.textContent = 'Audio activado';
                
                // Intentar reproducir con sonido
                video.play().catch(e => {
                    console.log('Error al reproducir con sonido:', e);
                    // Si falla, volver a mute
                    toggleMute();
                });
            } else {
                // Mute
                video.muted = true;
                isVideoMuted = true;
                
                // Cambiar estilos y texto
                muteBtn.classList.remove('unmuted');
                muteBtn.classList.add('muted');
                muteIcon.className = 'icon-volume-off';
                muteBtn.setAttribute('aria-label', 'Activar sonido');
                
                audioIndicator.classList.remove('unmuted');
                audioIndicator.classList.add('muted');
                audioStatus.textContent = 'Audio silenciado';
            }
        }
        document.addEventListener('DOMContentLoaded', (event) => {
    const audio = document.getElementById('miAudio');
    audio.load();
});