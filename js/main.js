document.addEventListener("DOMContentLoaded", () => {
    // Inject Navbar and Footer
    Promise.all([
        fetch('components/navbar.html').then(response => response.text()),
        fetch('components/footer.html').then(response => response.text())
    ]).then(([navbarHtml, footerHtml]) => {
        
        // Insert Navbar at the beginning of the body (after scroll-progress and cursor-glow)
        const firstSection = document.querySelector('.hero') || document.querySelector('.page-header');
        if (firstSection) {
            firstSection.insertAdjacentHTML('beforebegin', navbarHtml);
        } else {
            document.body.insertAdjacentHTML('afterbegin', navbarHtml);
        }
        
        // Insert Footer at the end of the body
        document.body.insertAdjacentHTML('beforeend', footerHtml);
        
        // Initialize interactive elements once inserted
        initNavigation();
        highlightCurrentPage();
        initNavbarScroll();
    });

    // Initialize all interactive features
    initScrollAnimations();
    initScrollProgress();
    initCursorGlow();
    initParallax();
    initAnimatedCounters();
    initTiltCards();
    initComparisonSlider();
    initGalleryLightbox();
    initHeroParticles();
});

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger / close icon
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

function highlightCurrentPage() {
    // Get current page filename
    let path = window.location.pathname;
    let page = path.split("/").pop();
    if(page === '' || page === '/') page = 'index.html';

    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === page) {
            link.classList.add('active');
        }
    });
}

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const checkScroll = () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll(); // Check initial state
}

/* ============================================
   SCROLL ANIMATIONS (Intersection Observer)
   ============================================ */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    // After a short timeout (to allow component injection), observe elements
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.fade-in');
        animatedElements.forEach(el => observer.observe(el));
    }, 500);
}

/* ============================================
   SCROLL PROGRESS BAR
   ============================================ */
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    }, { passive: true });
}

/* ============================================
   CURSOR GLOW
   ============================================ */
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow) return;

    // Only on desktop
    if (window.matchMedia('(max-width: 768px)').matches) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        // Smooth follow
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

/* ============================================
   PARALLAX SCROLLING
   ============================================ */
function initParallax() {
    const heroImg = document.getElementById('heroParallax');
    if (!heroImg) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = document.getElementById('hero')?.offsetHeight || 800;
        
        if (scrollY < heroHeight) {
            const parallaxOffset = scrollY * 0.3;
            heroImg.style.transform = `translateY(${parallaxOffset}px) scale(1.1)`;
        }
    }, { passive: true });

    // Initial scale
    heroImg.style.transform = 'scale(1.1)';
}

/* ============================================
   ANIMATED COUNTERS
   ============================================ */
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();

    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.floor(easedProgress * target);

        element.textContent = prefix + formatNumber(current) + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = prefix + formatNumber(target) + suffix;
        }
    }

    requestAnimationFrame(update);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return num.toLocaleString();
    }
    return num.toString();
}

/* ============================================
   3D TILT EFFECT
   ============================================ */
function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');
    if (cards.length === 0) return;

    // Only on desktop
    if (window.matchMedia('(max-width: 768px)').matches) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/* ============================================
   BEFORE & AFTER COMPARISON SLIDER
   ============================================ */
function initComparisonSlider() {
    const container = document.getElementById('comparisonSlider');
    const handle = document.getElementById('comparisonHandle');
    if (!container || !handle) return;

    let isDragging = false;

    function updateSlider(x) {
        const rect = container.getBoundingClientRect();
        let position = ((x - rect.left) / rect.width) * 100;
        position = Math.max(2, Math.min(98, position));

        handle.style.left = position + '%';
        const afterImg = container.querySelector('.comparison-after');
        if (afterImg) {
            afterImg.style.clipPath = `inset(0 0 0 ${position}%)`;
        }
    }

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateSlider(e.clientX);
        e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            updateSlider(e.clientX);
        }
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Touch support
    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (isDragging) {
            updateSlider(e.touches[0].clientX);
        }
    }, { passive: true });

    window.addEventListener('touchend', () => {
        isDragging = false;
    });
}

/* ============================================
   IMAGE GALLERY LIGHTBOX
   ============================================ */
function initGalleryLightbox() {
    const gallery = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    
    if (!gallery || !lightbox) return;

    const items = gallery.querySelectorAll('.gallery-item');
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        const item = items[index];
        const src = item.dataset.src;
        const caption = item.dataset.caption;
        
        lightboxImg.src = src;
        lightboxImg.alt = caption;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigate(direction) {
        currentIndex = (currentIndex + direction + items.length) % items.length;
        const item = items[currentIndex];
        lightboxImg.src = item.dataset.src;
        lightboxImg.alt = item.dataset.caption;
        lightboxCaption.textContent = item.dataset.caption;
    }

    items.forEach((item, i) => {
        item.addEventListener('click', () => openLightbox(i));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => navigate(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigate(1));

    // Close on backdrop click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });
}

/* ============================================
   HERO PARTICLES
   ============================================ */
function initHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.opacity = Math.random() * 0.4 + 0.1;

        container.appendChild(particle);
    }
}
