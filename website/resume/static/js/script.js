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
//  const techCount = document.querySelectorAll('.technologies-list li').length;
//  const techHeading = document.querySelector('.technologies-footer h2');
//  if (techHeading && techCount > 0) {
//      techHeading.textContent += ` (${techCount})`;
//  }

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

const swiftUpElements = document.querySelectorAll('.swift-up-text');

swiftUpElements.forEach(elem => {

	const words = elem.textContent.split(' ');
	elem.innerHTML = '';

	words.forEach((el, index) => {
		words[index] = `<span><i>${words[index]}</i></span>`;
	});

	elem.innerHTML = words.join(' ');

	const children = document.querySelectorAll('span > i');
	children.forEach((node, index) => {
		node.style.animationDelay = `${index * .2}s`;
	});

});

// Particle Network Animation with random colors
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Array of colors to randomly choose from
const colors = ['#293241', '#ee6c4d', '#3d5a80', '#98c1d9', '#e0fbfc', '#ee6c4d'];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.colorChangeInterval = Math.random() * 3000 + 2000; // 2-5 seconds
        this.lastColorChange = Date.now();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        // Change color randomly
        if (Date.now() - this.lastColorChange > this.colorChangeInterval) {
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.lastColorChange = Date.now();
            this.colorChangeInterval = Math.random() * 3000 + 2000;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
const particleCount = 80;

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                // Use color from one of the particles
                const color = particles[i].color;
                let r, g, b;
                
                if (color.startsWith('#')) {
                    const hex = color.replace('#', '');
                    r = parseInt(hex.substr(0, 2), 16);
                    g = parseInt(hex.substr(2, 2), 16);
                    b = parseInt(hex.substr(4, 2), 16);
                } else {
                    const rgb = color.match(/\d+/g);
                    r = rgb[0];
                    g = rgb[1];
                    b = rgb[2];
                }
                
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${1 - distance / 150})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
}

animate();

// Subtle custom cursor
const cursorDot = document.createElement('div');
cursorDot.classList.add('cursor-dot');
document.body.appendChild(cursorDot);

const cursorOutline = document.createElement('div');
cursorOutline.classList.add('cursor-outline');
document.body.appendChild(cursorOutline);

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows immediately
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

// Smooth outline animation
function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    
    requestAnimationFrame(animateOutline);
}

animateOutline();

// Scale up on hover
const hoverElements = document.querySelectorAll('a, button, .nav-links a, .content-section a');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Hide default cursor
document.body.style.cursor = 'none';
document.querySelectorAll('a, button').forEach(el => {
    el.style.cursor = 'none';
});

// Carousel functionality
const carouselPositions = {
    hobbies: 0,
    experience: 0,
    beyond: 0
};

function moveCarousel(carouselId, direction) {
    const track = document.getElementById(`${carouselId}-track`);
    const items = track.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    
    carouselPositions[carouselId] += direction;
    
    // Loop around
    if (carouselPositions[carouselId] < 0) {
        carouselPositions[carouselId] = totalItems - 1;
    } else if (carouselPositions[carouselId] >= totalItems) {
        carouselPositions[carouselId] = 0;
    }
    
    const offset = -carouselPositions[carouselId] * 100;
    track.style.transform = `translateX(${offset}%)`;
}