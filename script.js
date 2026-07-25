// SMOOTH SCROLLING FOR NAVIGATION LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// FORM VALIDATION
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[placeholder="Your Name"]').value.trim();
        const email = this.querySelector('input[placeholder="Your Email"]').value.trim();
        const company = this.querySelector('input[placeholder="Your Company"]').value.trim();
        const message = this.querySelector('textarea').value.trim();
        
        // Validation
        if (!name) {
            alert('Please enter your name');
            return;
        }
        if (!email || !validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        if (!company) {
            alert('Please enter your company name');
            return;
        }
        if (!message) {
            alert('Please enter your message');
            return;
        }
        
        // Success message
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

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards
document.querySelectorAll('.service-card, .about-card, .project-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ACTIVE NAVIGATION LINK HIGHLIGHTING
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight) {
            const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
            navLinks.forEach(link => link.style.color = 'white');
            
            const activeLink = document.querySelector(`.nav-menu a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.style.color = '#ff6600';
            }
        }
    });
});

// MOBILE MENU TOGGLE (for future responsive menu)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// PHONE CALL HANDLER
document.querySelectorAll('.hero-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const phoneNumber = this.textContent.match(/\d+/g).join('');
        // On mobile, this would initiate a call
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            window.location.href = `tel:+91${phoneNumber}`;
        } else {
            alert('Call: +91 ' + phoneNumber);
        }
    });
});

// COUNTER ANIMATION (for statistics if added)
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// PAGE LOAD ANIMATION
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// INITIAL PAGE OPACITY
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
setTimeout(() => {
    document.body.style.opacity = '1';
}, 100);
