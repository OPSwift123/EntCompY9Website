document.addEventListener("DOMContentLoaded", () => {
    // Inject Navbar and Footer
    Promise.all([
        fetch('components/navbar.html').then(response => response.text()),
        fetch('components/footer.html').then(response => response.text())
    ]).then(([navbarHtml, footerHtml]) => {
        
        // Insert Navbar at the beginning of the body
        document.body.insertAdjacentHTML('afterbegin', navbarHtml);
        
        // Insert Footer at the end of the body
        document.body.insertAdjacentHTML('beforeend', footerHtml);
        
        // Initialize interactive elements once inserted
        initNavigation();
        highlightCurrentPage();
    });

    // Initialize Scroll Animations (Intersection Observer)
    initScrollAnimations();
});

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
