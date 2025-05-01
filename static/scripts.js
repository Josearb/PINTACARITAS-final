document.addEventListener('DOMContentLoaded', function() {
    // Función para resaltar el enlace activo en la navegación
    function highlightActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.navbar a');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    highlightActiveNavLink();

    // Configuración de la galería mosaico
    const modal = document.getElementById('imageModal');
    if (!modal) return;
    
    const modalImg = document.getElementById('expandedImage');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const mosaicItems = document.querySelectorAll('.mosaic-item');
    const prevBtn = document.getElementById('prevImage');
    const nextBtn = document.getElementById('nextImage');
    
    let currentImageIndex = 0;
    const images = Array.from(mosaicItems).map(item => ({
        src: item.querySelector('img').src,
        alt: item.querySelector('img').alt,
        caption: item.querySelector('.mosaic-overlay p')?.textContent || ''
    }));

    // Función para abrir el modal
    function openModal(index) {
        currentImageIndex = index;
        modalImg.src = images[index].src;
        modalImg.alt = images[index].alt;
        modalCaption.textContent = images[index].caption;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Verificar si la imagen es más grande que la pantalla
        setTimeout(() => {
            const img = new Image();
            img.src = modalImg.src;
            img.onload = function() {
                if (img.width > window.innerWidth || img.height > window.innerHeight) {
                    modalImg.classList.add('zoom');
                } else {
                    modalImg.classList.remove('zoom');
                }
            };
        }, 100);
    }

    // Función para cerrar el modal
    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Navegación entre imágenes
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        openModal(currentImageIndex);
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        openModal(currentImageIndex);
    }

    // Configurar eventos
    mosaicItems.forEach((item, index) => {
        const img = item.querySelector('img');
        img.addEventListener('click', () => openModal(index));
    });

    closeModal.addEventListener('click', closeModalFunc);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Cerrar modal al hacer clic fuera o en la imagen
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target === modalImg) {
            closeModalFunc();
        }
    });

    // Eventos de teclado
    document.addEventListener('keydown', function(e) {
        if (modal.style.display !== 'block') return;
        
        switch(e.key) {
            case 'Escape':
                closeModalFunc();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });

    // Permitir scroll con rueda del ratón
    modal.addEventListener('wheel', function(e) {
        // Permitir el scroll normal
        if (modal.scrollHeight > modal.clientHeight) {
            return;
        }
        
        // Navegar entre imágenes con la rueda
        e.preventDefault();
        if (e.deltaY > 0) {
            showNextImage();
        } else {
            showPrevImage();
        }
    });

    // Prevenir que el scroll del cuerpo se active cuando el modal está abierto
    modal.addEventListener('touchmove', function(e) {
        if (modal.scrollHeight <= modal.clientHeight) {
            e.preventDefault();
        }
    }, { passive: false });
});

document.addEventListener('DOMContentLoaded', function() {
    // Animación de cambio de color para el título
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            pageTitle.style.color = `hsl(${hue}, 80%, 50%)`;
        }, 100);
    }

    // Efecto de movimiento al hacer scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .cta-container, .featured-gallery');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Inicializar elementos con opacidad 0 para la animación
    const initAnimations = () => {
        const elementsToAnimate = document.querySelectorAll('.service-card, .cta-container, .featured-gallery');
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });
    };

    // Configurar observador de intersección para animaciones
    const setupIntersectionObserver = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.service-card, .cta-container, .featured-gallery').forEach(el => {
            observer.observe(el);
        });
    };

    // Inicializar
    initAnimations();
    window.addEventListener('scroll', animateOnScroll);
    setupIntersectionObserver();

    // Efecto especial para el botón de reserva
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
            ctaButton.style.transform = 'scale(1.1)';
        });
        
        ctaButton.addEventListener('mouseleave', () => {
            ctaButton.style.transform = 'scale(1)';
        });
        
        ctaButton.addEventListener('click', () => {
            ctaButton.classList.add('animate__animated', 'animate__rubberBand');
            setTimeout(() => {
                ctaButton.classList.remove('animate__animated', 'animate__rubberBand');
            }, 1000);
        });
    }
});