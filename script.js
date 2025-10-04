// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});

// Payment functionality
function initiatePayment(plan) {
    const modal = document.getElementById('paymentModal');
    const selectedPlanInput = document.getElementById('selectedPlan');
    
    // Set the selected plan
    const planNames = {
        'pro': 'Pro Plan - $9.99/month',
        'enterprise': 'Enterprise Plan - $29.99/month'
    };
    
    selectedPlanInput.value = planNames[plan] || plan;
    modal.style.display = 'block';
    
    // Add animation
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function processPayment() {
    const email = document.getElementById('email').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    
    // Basic validation
    if (!email || !cardNumber || !expiry || !cvv) {
        alert('Please fill in all payment details');
        return;
    }
    
    // Simulate payment processing
    const submitButton = document.querySelector('.modal-content .btn-primary');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert('Payment processed successfully! Welcome to SecureMessenger Pro!');
        closePaymentModal();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Clear form
        document.getElementById('email').value = '';
        document.getElementById('cardNumber').value = '';
        document.getElementById('expiry').value = '';
        document.getElementById('cvv').value = '';
    }, 2000);
}

// Download functionality
function downloadApp(platform) {
    const downloadUrls = {
        'windows': 'https://download.securemessenger.com/windows/SecureMessenger-Setup.exe',
        'macos': 'https://download.securemessenger.com/macos/SecureMessenger.dmg',
        'android': 'https://play.google.com/store/apps/details?id=com.securemessenger.app',
        'ios': 'https://apps.apple.com/app/securemessenger/id123456789',
        'linux': 'https://download.securemessenger.com/linux/SecureMessenger.AppImage'
    };
    
    const url = downloadUrls[platform];
    if (url) {
        // Show download confirmation
        const platformNames = {
            'windows': 'Windows',
            'macos': 'macOS',
            'android': 'Android',
            'ios': 'iOS',
            'linux': 'Linux'
        };
        
        if (confirm(`Download SecureMessenger for ${platformNames[platform]}?`)) {
            window.open(url, '_blank');
        }
    }
}

function openWebApp() {
    window.open('https://app.securemessenger.com', '_blank');
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('paymentModal');
    if (event.target === modal) {
        closePaymentModal();
    }
});

// Form validation and formatting
document.addEventListener('DOMContentLoaded', function() {
    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            if (formattedValue.length > 19) {
                formattedValue = formattedValue.substr(0, 19);
            }
            e.target.value = formattedValue;
        });
    }
    
    // Expiry date formatting
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // CVV formatting
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 4);
        });
    }
});

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .pricing-card, .download-card, .coming-soon-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Set initial state for animated elements
    const elements = document.querySelectorAll('.feature-card, .pricing-card, .download-card, .coming-soon-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Add scroll listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger initial animation check
    animateOnScroll();
});

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// Typing effect for hero title
function typeWriter(element, text, speed = 100, callback) {
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    
    type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text1 = 'Private. Secure. ';
        const text2 = 'Untraceable.';

        setTimeout(() => {
            heroTitle.innerHTML = ''; // Clear existing content
            typeWriter(heroTitle, text1, 50, () => {
                const span = document.createElement('span');
                span.className = 'gradient-text';
                heroTitle.appendChild(span);
                typeWriter(span, text2, 50);
            });
        }, 500);
    }
});

// Progress bar animations
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 2s ease-in-out';
            bar.style.width = width;
        }, 500);
    });
}

// Initialize progress bar animations when coming soon section is visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            observer.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const comingSoonSection = document.querySelector('.coming-soon');
    if (comingSoonSection) {
        observer.observe(comingSoonSection);
    }
});

// Add loading states for buttons
function addLoadingState(button, text = 'Loading...') {
    const originalText = button.innerHTML;
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
    button.disabled = true;
    
    return function removeLoadingState() {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Enhanced download function with loading states
function downloadAppWithLoading(platform) {
    const button = event.target;
    const removeLoading = addLoadingState(button, 'Preparing Download...');
    
    setTimeout(() => {
        downloadApp(platform);
        removeLoading();
    }, 1000);
}

// Update download buttons to use loading states
document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.download-card .btn-primary');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('onclick')?.match(/downloadApp\('(\w+)'\)/)?.[1];
            if (platform) {
                downloadAppWithLoading(platform);
            }
        });
    });
});

// Mouse cursor reactivity
let mouseX = 0;
let mouseY = 0;
let isTyping = false;
let isScrolling = false;

// Track mouse movement
document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create cursor trail effect
    createCursorTrail();
    
    // Add glow effect to elements under cursor
    addGlowEffect(e.target);
});

// Track typing
document.addEventListener('keydown', function(e) {
    isTyping = true;
    document.body.classList.add('typing-active');
    
    // Add typing animation to text elements
    addTypingEffect();
    
    setTimeout(() => {
        isTyping = false;
        document.body.classList.remove('typing-active');
    }, 1000);
});

// Track scrolling
let scrollTimeout;
window.addEventListener('scroll', function() {
    isScrolling = true;
    document.body.classList.add('scrolling-active');
    
    // Add scroll glow effect
    addScrollGlow();
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
        document.body.classList.remove('scrolling-active');
    }, 150);
});

// Create cursor trail effect
function createCursorTrail() {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = mouseX + 'px';
    trail.style.top = mouseY + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 500);
}

// Add glow effect to elements under cursor
function addGlowEffect(element) {
    // Remove previous glow
    document.querySelectorAll('.cursor-glow').forEach(el => {
        el.classList.remove('cursor-glow');
    });
    
    // Add glow to interactive elements
    if (element.matches('button, a, input, .feature-card, .pricing-card, .download-card')) {
        element.classList.add('cursor-glow');
    }
}

// Add typing effect
function addTypingEffect() {
    const textElements = document.querySelectorAll('h1, h2, h3, p, .nav-link');
    textElements.forEach(element => {
        element.classList.add('typing-pulse');
        setTimeout(() => {
            element.classList.remove('typing-pulse');
        }, 200);
    });
}

// Add scroll glow effect
function addScrollGlow() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.classList.add('scroll-glow');
        } else {
            section.classList.remove('scroll-glow');
        }
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('paymentModal');
        if (modal && modal.style.display === 'block') {
            closePaymentModal();
        }
    }
    
    // Navigate sections with arrow keys
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        const sections = ['features', 'pricing', 'download'];
        const currentSection = getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        if (currentIndex < sections.length - 1) {
            scrollToSection(sections[currentIndex + 1]);
        }
    }
    
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        const sections = ['features', 'pricing', 'download'];
        const currentSection = getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        if (currentIndex > 0) {
            scrollToSection(sections[currentIndex - 1]);
        }
    }
});

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.id;
        }
    });
    
    return currentSection;
}

// Add smooth reveal animations for stats
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const isNumber = !isNaN(parseFloat(target));
        
        if (isNumber && target !== '0') {
            const finalValue = parseFloat(target);
            let currentValue = 0;
            const increment = finalValue / 50;
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentValue);
                }
            }, 30);
        }
    });
}

// Initialize stats animation when hero section is visible
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateStats, 1000);
                    heroObserver.unobserve(entry.target);
                }
            });
        });
        
        heroObserver.observe(heroSection);
    }
});

// Add error handling for payment processing
function handlePaymentError(error) {
    console.error('Payment error:', error);
    alert('Payment failed. Please check your details and try again.');
    
    const submitButton = document.querySelector('.modal-content .btn-primary');
    if (submitButton) {
        submitButton.innerHTML = '<i class="fas fa-lock"></i> Complete Payment';
        submitButton.disabled = false;
    }
}

// Enhanced payment processing with error handling
function processPaymentWithErrorHandling() {
    try {
        processPayment();
    } catch (error) {
        handlePaymentError(error);
    }
}

// Update payment button to use error handling
document.addEventListener('DOMContentLoaded', function() {
    const paymentButton = document.querySelector('.modal-content .btn-primary');
    if (paymentButton) {
        paymentButton.setAttribute('onclick', 'processPaymentWithErrorHandling()');
    }
});

// 3D Globe
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('globe-canvas');
    if (!canvas) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 1.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Globe
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('earth_texture.jpg');
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.3,
        roughness: 0.7
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        globe.rotation.y += 0.002;
        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
});