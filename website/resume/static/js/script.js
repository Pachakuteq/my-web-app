console.log('Hello from external JS!');

//  Smooth scroll for navigation links
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

///----------------------------------------------------------------------- Typing effect for main heading in home.html
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
    // Get HTML content to preserve BR tags
    const html = elem.innerHTML;
    const lines = html.split('<br>');
    
    elem.innerHTML = '';
    
    lines.forEach((line, lineIndex) => {
        const words = line.trim().split(' ');
        
        words.forEach((word, wordIndex) => {
            const span = document.createElement('span');
            const i = document.createElement('i');
            i.textContent = word;
            i.style.animationDelay = `${(lineIndex * words.length + wordIndex) * 0.1}s`;
            span.appendChild(i);
            elem.appendChild(span);
            
            // Add space after word (except last word in line)
            if (wordIndex < words.length - 1) {
                elem.appendChild(document.createTextNode(' '));
            }
        });
        
        // Add line break after each line (except last)
        if (lineIndex < lines.length - 1) {
            elem.appendChild(document.createElement('br'));
        }
    });
});


//  ---------------------------------------------------------------------- animation of the particle in the background
// Particle Network Animation with geometric figures
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Array of colors to randomly choose from
const colors = ['#000000', '#1f2a2d', '#f8ddb0', '#bcd8e7', '#e58f65'];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4; // Reduced from 0.8 to 0.4 (slower)
        this.vy = (Math.random() - 0.5) * 0.4; // Reduced from 0.8 to 0.4 (slower)
        this.radius = 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.colorChangeInterval = Math.random() * 3000 + 2000;
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
const activeShapes = new Map(); // Track shapes with fade in/out
const shapeStability = new Map(); // Track how long shapes have existed

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function findConnectedParticles() {
    const connections = [];
    
    for (let i = 0; i < particles.length; i++) {
        const connected = [i];
        
        for (let j = 0; j < particles.length; j++) {
            if (i === j) continue;
            
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                connected.push(j);
            }
        }
        
        if (connected.length >= 3) {
            connections.push(connected);
        }
    }
    
    return connections;
}

function drawGeometricShape(indices, opacity = 1) {
    if (indices.length < 3) return;
    
    // Take first 3-6 particles to form a shape
    const shapeSize = Math.min(indices.length, Math.floor(Math.random() * 4) + 3);
    const shapeIndices = indices.slice(0, shapeSize);
    
    // Random color with transparency
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    let r, g, b;
    
    if (randomColor.startsWith('#')) {
        const hex = randomColor.replace('#', '');
        r = parseInt(hex.substr(0, 2), 16);
        g = parseInt(hex.substr(2, 2), 16);
        b = parseInt(hex.substr(4, 2), 16);
    }
    
    // Draw filled shape with controlled opacity
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.15 * opacity})`;
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.4 * opacity})`;
    ctx.lineWidth = 1.5;
    
    ctx.beginPath();
    ctx.moveTo(particles[shapeIndices[0]].x, particles[shapeIndices[0]].y);
    
    for (let i = 1; i < shapeIndices.length; i++) {
        ctx.lineTo(particles[shapeIndices[i]].x, particles[shapeIndices[i]].y);
    }
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function connectParticles() {
    const currentShapes = new Set();
    const fadeSpeed = 0.03; // Controls fade speed
    const stabilityThreshold = 3000; // Milliseconds particles must stay connected before shape appears
    const currentTime = Date.now();
    
    for (let i = 0; i < particles.length; i++) {
        const connected = [i];
        
        for (let j = 0; j < particles.length; j++) {
            if (i === j) continue;
            
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                connected.push(j);
                
                // Draw connection line
                const color = particles[i].color;
                let r, g, b;
                
                if (color.startsWith('#')) {
                    const hex = color.replace('#', '');
                    r = parseInt(hex.substr(0, 2), 16);
                    g = parseInt(hex.substr(2, 2), 16);
                    b = parseInt(hex.substr(4, 2), 16);
                }
                
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${1 - distance / 150})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
        
        // Check if shape should be drawn (3+ particles connected)
        if (connected.length >= 3) {
            const shapeKey = connected.sort((a, b) => a - b).join('-');
            currentShapes.add(shapeKey);
            
            // Track stability - how long has this shape existed?
            if (!shapeStability.has(shapeKey)) {
                shapeStability.set(shapeKey, currentTime);
            }
            
            const shapeAge = currentTime - shapeStability.get(shapeKey);
            
            // Only draw if shape has been stable long enough
            if (shapeAge >= stabilityThreshold) {
                // Get or create shape opacity
                if (!activeShapes.has(shapeKey)) {
                    activeShapes.set(shapeKey, { opacity: 0, color: colors[Math.floor(Math.random() * colors.length)] });
                }
                
                const shapeData = activeShapes.get(shapeKey);
                
                // Fade in
                if (shapeData.opacity < 1) {
                    shapeData.opacity = Math.min(1, shapeData.opacity + fadeSpeed);
                }
                
                drawGeometricShape(connected, shapeData.opacity);
            }
        }
    }
    
    // Clean up stability tracking for shapes that no longer exist
    for (let key of shapeStability.keys()) {
        if (!currentShapes.has(key)) {
            shapeStability.delete(key);
        }
    }
    
    // Fade out shapes that no longer exist
    for (let [key, shapeData] of activeShapes.entries()) {
        if (!currentShapes.has(key) || !shapeStability.has(key)) {
            shapeData.opacity = Math.max(0, shapeData.opacity - fadeSpeed);
            
            if (shapeData.opacity > 0) {
                const indices = key.split('-').map(Number);
                drawGeometricShape(indices, shapeData.opacity);
            } else {
                activeShapes.delete(key);
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

//----------------------------------------------------------------------- animation of custom cursor
// === Custom animated symbol cursor ===

// Create the glowing dot
const cursorDot = document.createElement('div');
cursorDot.classList.add('cursor-dot');
document.body.appendChild(cursorDot);

// Create the outline ring
const cursorOutline = document.createElement('div');
cursorOutline.classList.add('cursor-outline');
document.body.appendChild(cursorOutline);

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

// Mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows instantly
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
});

// Smooth outline follow animation
function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
    
    requestAnimationFrame(animateOutline);
}
animateOutline();

// Hover scaling for interactive elements
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

// ✨ Click "pop" effect
document.addEventListener('click', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1.8)';
    cursorDot.style.opacity = '0.8';
    setTimeout(() => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.opacity = '1';
    }, 120);
});

// Hide default cursor
document.body.style.cursor = 'none';
document.querySelectorAll('a, button').forEach(el => {
    el.style.cursor = 'none';
});

//----------------------------------------------------------------------- Owl Carousel for about age - more section

// Initialize each Owl Carousel separately
$(document).ready(function () {
  $(".custom-carousel").each(function() {
    var itemCount = $(this).find('.item').length;
    
    $(this).owlCarousel({
      autoWidth: true,
      loop: false,
      items: itemCount, // Show all items
      margin: 15,
      nav: false,
      dots: true
    });
  });

  // Click handler for toggle active state
  $(".custom-carousel .item").click(function () {
    $(this).toggleClass("active"); // Simply toggle on the clicked item
  });
});


///----------------------------------------------------------------------- Resume page card expansion
// Toggle card expansion
function toggleCard(card) {
  const details = card.querySelector('.card-details');
  const isExpanded = details.classList.contains('expanded');
  
  // Close all other cards
  document.querySelectorAll('.card-details.expanded').forEach(detail => {
    if (detail !== details) {
      detail.classList.remove('expanded');
      detail.parentElement.classList.remove('expanded');
    }
  });
  
  // Toggle current card
  if (isExpanded) {
    details.classList.remove('expanded');
    card.classList.remove('expanded');
  } else {
    details.classList.add('expanded');
    card.classList.add('expanded');
  }
}

// Resume page toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const showExperienceBtn = document.getElementById('show-experience');
  const showProjectsBtn = document.getElementById('show-projects');
  const experienceSection = document.getElementById('experience-section');
  const projectsSection = document.getElementById('projects-section');
  const mainOptions = document.getElementById('main-options');
  const backButtons = document.querySelectorAll('.back-btn');

  // Show Experience Section
  if (showExperienceBtn) {
    showExperienceBtn.addEventListener('click', () => {
      mainOptions.style.display = 'none';
      experienceSection.classList.remove('hidden');
      experienceSection.classList.add('visible');
    });
  }

  // Show Projects Section
  if (showProjectsBtn) {
    showProjectsBtn.addEventListener('click', () => {
      mainOptions.style.display = 'none';
      projectsSection.classList.remove('hidden');
      projectsSection.classList.add('visible');
    });
  }

  // Back Button Functionality
  backButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSection = btn.getAttribute('data-target');
      const section = document.getElementById(targetSection);
      
      section.classList.remove('visible');
      section.classList.add('hidden');
      mainOptions.style.display = 'flex';

      // ADD THIS LINE - Scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Close all expanded cards when going back
      document.querySelectorAll('.card-details.expanded').forEach(detail => {
        detail.classList.remove('expanded');
        detail.parentElement.classList.remove('expanded');
      });
    });
  });

  // ADD THIS - Click listeners for all cards
  document.querySelectorAll('.experience-card, .project-card').forEach(card => {
    card.addEventListener('click', function(e) {
      // Only toggle if not clicking on a link or button inside the card
      if (!e.target.closest('a, button')) {
        toggleCard(this);
      }
    });
  });
});

// Project Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
  const projectList = document.getElementById('projectList');
  const prevBtn = document.getElementById('prevProject');
  const nextBtn = document.getElementById('nextProject');
  const currentProjectSpan = document.getElementById('currentProject');
  const totalProjectsSpan = document.getElementById('totalProjects');
  
  if (projectList && prevBtn && nextBtn) {
    const projects = projectList.querySelectorAll('.project-card');
    const totalProjects = projects.length;
    let currentIndex = 0;
    
    // Set total projects count
    if (totalProjectsSpan) {
      totalProjectsSpan.textContent = totalProjects;
    }
    
    function updateCarousel() {
      const offset = -currentIndex * 100;
      projectList.style.transform = `translateX(${offset}%)`;
      
      // Update counter
      if (currentProjectSpan) {
        currentProjectSpan.textContent = currentIndex + 1;
      }
      
      // Update button states
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === totalProjects - 1;
    }
    
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
    
    nextBtn.addEventListener('click', () => {
      if (currentIndex < totalProjects - 1) {
        currentIndex++;
        updateCarousel();
      }
    });
    
    // Initialize
    updateCarousel();
  }
});

//--------------------------------------------------------------------------------------wandering logo animation for home  page
// Wandering Logo on HOME Page with Drag and Navbar Docking
document.addEventListener('DOMContentLoaded', () => {
  // Only run on about page
  if (!document.querySelector('.home-page')) return;
  
  const logo = document.querySelector('.logo img');
  const navbar = document.querySelector('.navbar');
  
  if (!logo || !navbar) return;
  
  // Hide the original navbar logo on about page
  logo.style.opacity = '0';
  
  // Create a clone of the logo for animation
  const wanderingLogo = logo.cloneNode(true);
  wanderingLogo.classList.add('wandering-logo');
  wanderingLogo.style.position = 'fixed';
  wanderingLogo.style.zIndex = '999';
  wanderingLogo.style.width = '120px';
  wanderingLogo.style.height = 'auto';
  wanderingLogo.style.opacity = '0.9';
  wanderingLogo.style.cursor = 'grab';
  wanderingLogo.style.transition = 'width 0.3s ease, opacity 0.3s ease';
  document.body.appendChild(wanderingLogo);
  
  // Random starting position
  function getRandomStartPosition() {
    const margin = 150;
    return {
      x: margin + Math.random() * (window.innerWidth - margin * 2),
      y: margin + Math.random() * (window.innerHeight - margin * 2)
    };
  }
  
  const startPos = getRandomStartPosition();
  let currentX = startPos.x;
  let currentY = startPos.y;
  let targetX = currentX;
  let targetY = currentY;
  let isDragging = false;
  let isDocked = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let undockTimeout = null;
  
  function getNavbarLogoPosition() {
    const logoRect = logo.getBoundingClientRect();
    return {
      x: logoRect.left + logoRect.width / 2,
      y: logoRect.top + logoRect.height / 2
    };
  }
  
  function getRandomTarget() {
    const radius = 200;
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * radius;
    
    let newX = currentX + Math.cos(angle) * distance;
    let newY = currentY + Math.sin(angle) * distance;
    
    const margin = 150;
    newX = Math.max(margin, Math.min(window.innerWidth - margin, newX));
    newY = Math.max(margin, Math.min(window.innerHeight - margin, newY));
    
    return { x: newX, y: newY };
  }
  
  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }
  
  function createFirework(x, y) {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788'];
    const particleCount = 30; // More particles!
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'firework-particle';
      particle.style.position = 'fixed';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.width = '8px'; // Slightly bigger
      particle.style.height = '8px';
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1000';
      particle.style.boxShadow = `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;
      document.body.appendChild(particle);
      
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 3 + Math.random() * 3; // Faster
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      let px = x;
      let py = y;
      let opacity = 1;
      let scale = 1;
      
      function animateParticle() {
        px += vx;
        py += vy;
        opacity -= 0.015;
        scale += 0.02;
        
        particle.style.left = px + 'px';
        particle.style.top = py + 'px';
        particle.style.opacity = opacity;
        particle.style.transform = `scale(${scale})`;
        
        if (opacity > 0) {
          requestAnimationFrame(animateParticle);
        } else {
          particle.remove();
        }
      }
      
      animateParticle();
    }
  }
  
  function dockToNavbar() {
    isDocked = true;
    const navPos = getNavbarLogoPosition();
    currentX = navPos.x;
    currentY = navPos.y;
    targetX = navPos.x;
    targetY = navPos.y;
    
    wanderingLogo.style.width = '39px'; // Navbar size
    wanderingLogo.style.left = navPos.x + 'px';
    wanderingLogo.style.top = navPos.y + 'px';
    
    // Fireworks!
    createFirework(navPos.x, navPos.y);
    
    // Show original logo
    logo.style.opacity = '1';
    
    // Hide wandering logo after fireworks
    setTimeout(() => {
      wanderingLogo.style.opacity = '0';
    }, 300);
    
    // Undock after 2 minutes (120000ms)
    undockTimeout = setTimeout(() => {
      undockFromNavbar();
    }, 120000);
  }
  
  function undockFromNavbar() {
    isDocked = false;
    logo.style.opacity = '0';
    wanderingLogo.style.opacity = '0.9';
    wanderingLogo.style.width = '120px';
    
    const navPos = getNavbarLogoPosition();
    currentX = navPos.x;
    currentY = navPos.y;
    
    const newTarget = getRandomTarget();
    targetX = newTarget.x;
    targetY = newTarget.y;
  }
  
  function isNearNavbar(x, y) {
    const navPos = getNavbarLogoPosition();
    const distance = Math.sqrt(
      Math.pow(x - navPos.x, 2) + Math.pow(y - navPos.y, 2)
    );
    return distance < 80; // Snap distance
  }
  
  function animate() {
    if (!isDragging && !isDocked) {
      currentX = lerp(currentX, targetX, 0.005);
      currentY = lerp(currentY, targetY, 0.005);
      
      const time = Date.now() * 0.0005;
      const floatX = Math.sin(time * 0.5) * 8;
      const floatY = Math.cos(time * 0.7) * 8;
      
      wanderingLogo.style.left = (currentX + floatX) + 'px';
      wanderingLogo.style.top = (currentY + floatY) + 'px';
      
      const distanceToTarget = Math.sqrt(
        Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
      );
      
      if (distanceToTarget < 20) {
        const newTarget = getRandomTarget();
        targetX = newTarget.x;
        targetY = newTarget.y;
      }
    }
    
    wanderingLogo.style.transform = 'translate(-50%, -50%)';
    requestAnimationFrame(animate);
  }
  
  // Drag functionality
  wanderingLogo.addEventListener('mousedown', (e) => {
    if (isDocked) {
      // Cancel undock timeout if dragging while docked
      if (undockTimeout) {
        clearTimeout(undockTimeout);
        undockTimeout = null;
      }
      isDocked = false;
      logo.style.opacity = '0';
      wanderingLogo.style.opacity = '0.9';
      wanderingLogo.style.width = '120px';
    }
    
    isDragging = true;
    wanderingLogo.style.cursor = 'grabbing';
    
    const rect = wanderingLogo.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left - rect.width / 2;
    dragOffsetY = e.clientY - rect.top - rect.height / 2;
    
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      currentX = e.clientX - dragOffsetX;
      currentY = e.clientY - dragOffsetY;
      
      wanderingLogo.style.left = currentX + 'px';
      wanderingLogo.style.top = currentY + 'px';
      
      // Visual feedback when near navbar
      if (isNearNavbar(currentX, currentY)) {
        wanderingLogo.style.opacity = '0.6';
      } else {
        wanderingLogo.style.opacity = '0.9';
      }
    }
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      wanderingLogo.style.cursor = 'grab';
      
      // Check if dropped near navbar
      if (isNearNavbar(currentX, currentY)) {
        dockToNavbar();
      } else {
        // Set new target from current dragged position
        targetX = currentX;
        targetY = currentY;
        wanderingLogo.style.opacity = '0.9';
        
        // Get new random target after a brief pause
        setTimeout(() => {
          const newTarget = getRandomTarget();
          targetX = newTarget.x;
          targetY = newTarget.y;
        }, 500);
      }
    }
  });
  
  // Set initial random target (different from start position)
  targetX = currentX;
  targetY = currentY;
  
  setTimeout(() => {
    const initialTarget = getRandomTarget();
    targetX = initialTarget.x;
    targetY = initialTarget.y;
  }, 1000);
  
  animate();
  
  // Update on window resize
  window.addEventListener('resize', () => {
    if (!isDocked) {
      const newTarget = getRandomTarget();
      targetX = newTarget.x;
      targetY = newTarget.y;
    }
  });
});

