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
    initCopyrightYear();
    initWeatherWidget();
    initSubmissionsTracker();
    initQuiz();
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
        card.addEventListener('mouseenter', () => {
            card.style.transitionDelay = '0s';
        });

        card.addEventListener('mousemove', (e) => {
            card.style.transitionDelay = '0s';
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transitionDelay = '0s';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
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

/* ============================================
   WORLDTIMEAPI — COPYRIGHT YEAR
   Fetches the current date/time from the
   WorldTimeAPI (worldtimeapi.org) for Sydney,
   Australia, then injects the real year into
   the footer copyright notice.
   ============================================ */
function initCopyrightYear() {
    fetch('https://worldtimeapi.org/api/timezone/Australia/Sydney')
        .then(response => response.json())
        .then(data => {
            // data.datetime looks like "2026-03-31T08:05:21.123+11:00"
            const year = new Date(data.datetime).getFullYear();
            const yearEl = document.getElementById('copyright-year');
            if (yearEl) {
                yearEl.textContent = year;
            }
        })
        .catch(() => {
            // If the API is unreachable, silently fall back to the
            // hardcoded year already in the HTML — no broken UI.
        });
}

/* ============================================
   WEATHER API INTEGRATION
   Fetches current weather from our Vercel
   Serverless Function (/api/weather)
   ============================================ */
function initWeatherWidget() {
    const tempEl = document.getElementById('weather-temp');
    const descEl = document.getElementById('weather-desc');
    const iconEl = document.getElementById('weather-icon');
    const windEl = document.getElementById('weather-wind');
    const humEl = document.getElementById('weather-humidity');

    if (!tempEl) return; // If not on a page with the widget

    // Call our own backend safely
    fetch('/api/weather')
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather API error');
            }
            return response.json();
        })
        .then(data => {
            tempEl.textContent = `${data.temp}°C`;
            descEl.textContent = data.description;
            // OpenWeather provides an icon code
            iconEl.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
            iconEl.style.display = 'block';
            windEl.innerHTML = `<i class="fas fa-wind"></i> ${data.wind_speed} m/s`;
            humEl.innerHTML = `<i class="fas fa-tint"></i> ${data.humidity}%`;
        })
        .catch(err => {
            console.error('Failed to load weather widget:', err);
            tempEl.textContent = '—°C';
            descEl.textContent = 'Weather Unavailable';
        });
}

/* ============================================
   FORM SUBMISSIONS TRACKER
   Fetches /api/submissions and renders live
   count cards for each JotForm form.
   ============================================ */
const FORM_ICONS = {
    '260737827140862': 'fa-hand-sparkles',   // Pledge
    '260737955450868': 'fa-comments',        // Feedback
    '260871636009055': 'fa-envelope',        // Contact
};

function initSubmissionsTracker() {
    const container = document.getElementById('submission-cards');
    if (!container) return;

    function renderCards(forms) {
        container.innerHTML = forms.map(form => {
            const icon = FORM_ICONS[form.id] || 'fa-file-alt';
            const hasCount = form.count !== null && form.count !== undefined;
            return `
                <div class="sub-card">
                    <div class="sub-card-label">
                        <i class="fas ${icon}"></i>
                        ${form.label}
                    </div>
                    <div class="sub-card-count${hasCount ? '' : ' error'}">
                        ${hasCount ? form.count : '—'}
                    </div>
                </div>
            `;
        }).join('');

        // Show the refresh note
        const note = document.getElementById('submissions-note');
        if (note) note.style.display = 'block';

        // Trigger animated count-up for each card
        container.querySelectorAll('.sub-card-count:not(.error)').forEach(el => {
            const target = parseInt(el.textContent, 10);
            if (isNaN(target)) return;
            const duration = 1200;
            const startTime = performance.now();
            function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
            function tick(now) {
                const progress = Math.min((now - startTime) / duration, 1);
                el.textContent = Math.floor(easeOut(progress) * target);
                if (progress < 1) requestAnimationFrame(tick);
                else el.textContent = target;
            }
            requestAnimationFrame(tick);
        });
    }

    function fetchSubmissions() {
        fetch('/api/submissions')
            .then(r => {
                if (!r.ok) throw new Error('Non-OK response');
                return r.json();
            })
            .then(data => {
                if (data && data.forms) renderCards(data.forms);
            })
            .catch(err => {
                console.error('Submissions tracker error:', err);
                // Show fallback cards so the UI is not broken
                container.innerHTML = `
                    <div class="sub-card">
                        <div class="sub-card-label"><i class="fas fa-hand-sparkles"></i> Pledge Form</div>
                        <div class="sub-card-count error">Unavailable</div>
                    </div>
                    <div class="sub-card">
                        <div class="sub-card-label"><i class="fas fa-comments"></i> Feedback Form</div>
                        <div class="sub-card-count error">Unavailable</div>
                    </div>
                    <div class="sub-card">
                        <div class="sub-card-label"><i class="fas fa-envelope"></i> Contact Form</div>
                        <div class="sub-card-count error">Unavailable</div>
                    </div>
                `;
            });
    }

    // Initial fetch
    fetchSubmissions();

    // Auto-refresh every 60 seconds
    setInterval(fetchSubmissions, 60_000);
}

/* ============================================
   SOLUTIONS QUIZ
   ============================================ */
function initQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    const submitBtn = document.getElementById('submit-quiz');
    const restartBtn = document.getElementById('restart-quiz');
    const resultDiv = document.getElementById('quiz-result');
    
    if (!quizContainer) return;

    const questions = [
        {
            question: "What is the most common form of litter in urban areas?",
            options: ["Plastic bottles", "Cigarette butts", "Food wrappers", "Paper"],
            answer: 1
        },
        {
            question: "How long does it take for a plastic bottle to decompose?",
            options: ["10 years", "50 years", "450 years", "1000 years"],
            answer: 2
        },
        {
            question: "Which of the following is the most effective way to reduce littering overall?",
            options: ["Ignoring it", "More public bins and education", "Waiting for rain to wash it away", "Burning waste in public"],
            answer: 1
        },
        {
            question: "Where does most uncollected litter eventually end up?",
            options: ["In space", "Evaporates entirely", "In forests", "In the ocean"],
            answer: 3
        },
        {
            question: "What happens to microplastics generated from litter breakdown?",
            options: ["They dissolve completely", "They turn into safe soil", "They enter the food chain", "They purify the water"],
            answer: 2
        }
    ];

    let userAnswers = new Array(questions.length).fill(null);

    function renderQuiz() {
        quizContainer.innerHTML = '';
        userAnswers = new Array(questions.length).fill(null);
        resultDiv.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
        restartBtn.style.display = 'none';

        questions.forEach((q, qIndex) => {
            const block = document.createElement('div');
            block.className = 'quiz-question-block';
            
            const qText = document.createElement('div');
            qText.className = 'quiz-question-text';
            qText.textContent = `${qIndex + 1}. ${q.question}`;
            block.appendChild(qText);

            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'quiz-options';

            q.options.forEach((optText, oIndex) => {
                const label = document.createElement('label');
                label.className = 'quiz-option';
                label.innerHTML = `
                    <input type="radio" name="question${qIndex}" value="${oIndex}">
                    <span>${optText}</span>
                `;
                
                label.querySelector('input').addEventListener('change', (e) => {
                    userAnswers[qIndex] = parseInt(e.target.value);
                });

                optionsContainer.appendChild(label);
            });

            block.appendChild(optionsContainer);
            quizContainer.appendChild(block);
        });
    }

    submitBtn.addEventListener('click', () => {
        if (userAnswers.includes(null)) {
            alert('Please answer all questions before submitting.');
            return;
        }

        let score = 0;
        const blocks = quizContainer.querySelectorAll('.quiz-question-block');
        
        userAnswers.forEach((ans, qIndex) => {
            const isCorrect = (ans === questions[qIndex].answer);
            if (isCorrect) score++;

            const options = blocks[qIndex].querySelectorAll('.quiz-option');
            // Disable all inputs
            options.forEach((opt, oIndex) => {
                opt.querySelector('input').disabled = true;
                if (oIndex === questions[qIndex].answer) {
                    opt.classList.add('correct');
                } else if (oIndex === ans && !isCorrect) {
                    opt.classList.add('incorrect');
                }
            });
        });

        resultDiv.style.display = 'block';
        if (score === questions.length) {
            resultDiv.innerHTML = `<span style="color: var(--primary-vivid);">Perfect Score! ${score}/${questions.length}</span> 🎉 Thank you for your environmental awareness!`;
        } else if (score >= questions.length / 2) {
            resultDiv.innerHTML = `<span style="color: var(--primary);">Good Job! ${score}/${questions.length}</span> 👍 Let's keep learning to protect our environment.`;
        } else {
            resultDiv.innerHTML = `<span style="color: #dc3545;">You scored ${score}/${questions.length}</span>. Every bit of knowledge helps us build a cleaner community!`;
        }

        submitBtn.style.display = 'none';
        restartBtn.style.display = 'inline-flex';
    });

    restartBtn.addEventListener('click', renderQuiz);

    // Initial render
    renderQuiz();
}
