// LOADING SPINNER
const loadingOverlay = document.getElementById('loadingOverlay');
if (loadingOverlay) {
    window.addEventListener('load', () => {
        loadingOverlay.classList.add('hidden');
        document.body.style.opacity = '1';
    });

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
}

// SMOOTH SCROLLING FOR NAVIGATION LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FORM VALIDATION
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = this.querySelector('input[placeholder="Your Name"]').value.trim();
        const email = this.querySelector('input[placeholder="Your Email"]').value.trim();
        const phone = this.querySelector('input[placeholder="Your Phone Number"]').value.trim();
        const message = this.querySelector('textarea').value.trim();

        if (!name) {
            alert('Please enter your name');
            return;
        }
        if (!email || !validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        if (!phone) {
            alert('Please enter your phone number');
            return;
        }
        if (!message) {
            alert('Please enter your message');
            return;
        }

        alert('Thank you for reaching out! We will get back to you soon.');
        this.reset();
    });
}

// EMAIL VALIDATION HELPER
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// SCROLL ANIMATION FOR CARDS
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards
document.querySelectorAll('.service-card, .about-card, .gallery-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ACTIVE NAVIGATION LINK HIGHLIGHTING
const navbar = document.querySelector('.navbar');
const progressBar = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
const navLinks = Array.from(document.querySelectorAll('.nav-menu a[href^="#"]'));
const sections = document.querySelectorAll('section[id]');

function updateScrollUI() {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

    if (progressBar) {
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }

    if (navbar) {
        navbar.classList.toggle('scrolled', scrollTop > 40);
    }

    if (backToTop) {
        backToTop.classList.toggle('show', scrollTop > 500);
    }
}

window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

if (navLinks.length && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    const isActive = link.getAttribute('href') === `#${entry.target.id}`;
                    link.classList.toggle('active', isActive);
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => sectionObserver.observe(section));
}

// MOBILE MENU TOGGLE (for future responsive menu)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}
