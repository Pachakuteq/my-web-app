console.log('Hello from external JS!');

// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project cards and sections
document.querySelectorAll('.project-card, .header-block, .section-block').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Add typing effect to main heading
const mainHeading = document.querySelector('.header-block h1');
if (mainHeading) {
    const text = mainHeading.textContent;
    mainHeading.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            mainHeading.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    typeWriter();
}

// Animated counter for technologies
const techCount = document.querySelectorAll('.technologies-list li').length;
const techHeading = document.querySelector('.technologies-footer h1');
if (techHeading && techCount > 0) {
    techHeading.textContent += ` (${techCount})`;
}

// Add hover sound effect (optional - can be annoying, comment out if you don't like it)
document.querySelectorAll('.technologies-list li').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
});

const menuToggle = document.getElementById('menuToggle');
const navCenter = document.querySelector('.nav-center');

if (menuToggle && navCenter) {
    menuToggle.addEventListener('click', () => {
        navCenter.classList.toggle('active');
        menuToggle.textContent = navCenter.classList.contains('active') ? '✕' : '☰';
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navCenter.classList.remove('active');
            menuToggle.textContent = '☰';
        }
    });
}

const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}