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

    if (navMenu && hamburger) {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu && hamburger) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Initialize scroll-in animations
    const animated = document.querySelectorAll('.feature-card, .pricing-card, .download-card, .coming-soon-card');
    animated.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    animateOnScroll();

    // Typing effect for hero title (disabled - using new animation)
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     setTimeout(() => typeWriter(heroTitle, 50), 500);
    // }

    // Initialize Three.js wireframe globe (thin white lines)
    initWireframeGlobe();

    // Initialize typing animation and stars
    initTypingAnimation();
    createStars();
});

// Scroll-triggered reveal
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
window.addEventListener('scroll', animateOnScroll);

// Navbar scroll styling
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}
window.addEventListener('scroll', handleNavbarScroll);

// Typewriter
function typeWriter(element, speed = 50) {
    const staticText = "Private. Secure. ";
    const textToType = "Untraceable.";
    element.innerHTML = `${staticText}<span class="gradient-text"></span>`;
    const gradientSpan = element.querySelector('.gradient-text');
    let i = 0;
    (function type() {
        if (i < textToType.length) {
            gradientSpan.textContent += textToType.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    })();
}

// Payment modal
function initiatePayment(plan) {
    const modal = document.getElementById('paymentModal');
    const selectedPlanInput = document.getElementById('selectedPlan');
    if (!modal || !selectedPlanInput) return;
    const planNames = {
        'pro': 'Pro Plan - $9.99/month',
        'enterprise': 'Enterprise Plan - $29.99/month'
    };
    selectedPlanInput.value = planNames[plan] || plan;
    modal.style.display = 'block';
    modal.style.opacity = '0';
    setTimeout(() => { modal.style.opacity = '1'; }, 10);
}
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (!modal) return;
    modal.style.opacity = '0';
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}
window.addEventListener('click', function(event) {
    const modal = document.getElementById('paymentModal');
    if (event.target === modal) closePaymentModal();
});

function processPayment() {
    const email = document.getElementById('email')?.value;
    const cardNumber = document.getElementById('cardNumber')?.value;
    const expiry = document.getElementById('expiry')?.value;
    const cvv = document.getElementById('cvv')?.value;
    if (!email || !cardNumber || !expiry || !cvv) {
        alert('Please fill in all payment details');
        return;
    }
    const submitButton = document.querySelector('.modal-content .btn-primary');
    if (!submitButton) return;
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitButton.disabled = true;
    setTimeout(() => {
        alert('Payment processed successfully! Welcome to Crypsis Pro!');
        closePaymentModal();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        const ids = ['email','cardNumber','expiry','cvv'];
        ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    }, 2000);
}

// Download helpers
function downloadApp(platform) {
    const downloadUrls = {
        'windows': 'https://download.crypsis.com/windows/Crypsis-Setup.exe',
        'android': 'https://play.google.com/store/apps/details?id=com.crypsis.app',
        'linux': 'https://download.crypsis.com/linux/Crypsis.AppImage'
    };
    const url = downloadUrls[platform];
    const platformNames = { windows:'Windows', android:'Android', linux:'Linux' };
    if (url && confirm(`Download Crypsis for ${platformNames[platform]}?`)) {
        window.open(url, '_blank');
    }
}
function openWebApp() {
    window.open('https://app.securemessenger.com', '_blank');
}

// Input formatting
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            if (formattedValue.length > 19) formattedValue = formattedValue.substr(0, 19);
            e.target.value = formattedValue;
        });
    }
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) value = value.substring(0, 2) + '/' + value.substring(2, 4);
            e.target.value = value;
        });
    }
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 4);
        });
    }
});

// Stats animation when hero is visible
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateStats, 1000);
                heroObserver.unobserve(entry.target);
            }
        });
    });
    heroObserver.observe(heroSection);
});

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

// --- Wireframe Globe (Three.js + three-globe) ---
function initWireframeGlobe() {
    const container = document.getElementById('globe-canvas');
    if (!container) return;

    // Check if Three.js loaded properly
    if (!window.THREE || !window.ThreeGlobe) {
        console.warn('Three.js or ThreeGlobe not loaded, skipping globe visualization');
        // Add a fallback visual
        container.innerHTML = '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border: 1px solid #333; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #1a1a1a, #000000);"><i class="fas fa-globe" style="font-size: 150px; color: #333;"></i></div>';
        return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    try {
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 0); // transparent
        container.innerHTML = '';
        container.appendChild(renderer.domElement);
        renderer.domElement.style.display = 'block';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
    camera.position.z = 320; // pull back to avoid any clipping

    // Soft light so lines are crisp
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);

    let usedFallback = false;
    let globe;
    try {
        // three-globe setup
        globe = new ThreeGlobe()
            .showAtmosphere(false)
            .globeMaterial(new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0, transparent: true }))
            .showGraticules(true);

        // Graticules (thin white)
        globe.graticulesMaterial(new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.85, transparent: true }));

        // Load land polygons from topojson (world-110m)
        fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
            .then(res => res.json())
            .then(worldData => {
                const topo = window.topojson || window.topojsonClient || topojson;
                if (!topo) return; // if topojson not present, skip strokes
                const land = topo.feature(worldData, worldData.objects.countries);
                globe.polygonsData(land.features)
                    .polygonCapMaterial(new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0, transparent: true }))
                    .polygonSideColor(() => 'rgba(255,255,255,0.12)')
                    .polygonStrokeColor(() => 'rgba(255,255,255,0.9)')
                    .polygonAltitude(() => 0.002);
            })
            .catch(() => {});

        globe.scale.setScalar(0.9); // fit within canvas without clipping
        scene.add(globe);
    } catch (e) {
        usedFallback = true;
    }

    if (usedFallback || !globe) {
        // Basic wireframe sphere fallback (safe radius to avoid clipping)
        const sphereGeom = new THREE.SphereGeometry(95, 64, 64);
        const sphereMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
        globe = new THREE.Mesh(sphereGeom, sphereMat);
        globe.scale.setScalar(0.9);
        scene.add(globe);
    }

    // Auto-rotate
    const rotationSpeed = 0.0025;
    function animate() {
        if (globe) globe.rotation.y += rotationSpeed;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

        // Resize handler
        window.addEventListener('resize', () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            // keep scale conservative after resize
            if (globe && globe.scale) globe.scale.setScalar(0.9);
        });
    } catch (error) {
        console.warn('Error initializing Three.js globe:', error);
        // Fallback to simple icon
        container.innerHTML = '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"><i class="fas fa-globe" style="font-size: 150px; color: #333; animation: pulse 3s infinite;"></i></div>';
    }
}

// Keyboard support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closePaymentModal();
    if (e.ctrlKey && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        const sections = ['features', 'pricing', 'download'];
        const currentSection = getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            scrollToSection(sections[currentIndex + 1]);
        }
        if (e.key === 'ArrowUp' && currentIndex > 0) {
            scrollToSection(sections[currentIndex - 1]);
        }
    }
});
function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) currentSection = section.id;
    });
    return currentSection;
}

// Typing Animation for "Untraceable"
function initTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;

    const words = ['Untraceable.', 'Protected.', 'Encrypted.', 'Anonymous.', 'Invisible.'];
    let wordIndex = 0;
    let isDeleting = false;

    function typeWord() {
        const currentWord = words[wordIndex];

        if (!isDeleting) {
            // Typing
            const currentLength = typingText.querySelectorAll('.letter').length;
            if (currentLength < currentWord.length) {
                const letter = document.createElement('span');
                letter.className = 'letter';
                letter.textContent = currentWord[currentLength];
                letter.style.animationDelay = `${currentLength * 0.08}s`;
                typingText.appendChild(letter);
                setTimeout(typeWord, 120);
            } else {
                // Finished typing, wait then delete
                setTimeout(() => {
                    isDeleting = true;
                    typeWord();
                }, 3000);
            }
        } else {
            // Deleting
            const letters = typingText.querySelectorAll('.letter');
            if (letters.length > 0) {
                letters[letters.length - 1].style.animation = 'fadeOutLetter 0.1s forwards';
                setTimeout(() => {
                    if (letters[letters.length - 1]) {
                        letters[letters.length - 1].remove();
                    }
                }, 100);
                setTimeout(typeWord, 60);
            } else {
                // Finished deleting, move to next word
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typeWord, 600);
            }
        }
    }

    // Start with a slight delay for better effect
    setTimeout(typeWord, 1000);
}

// Create Twinkling Stars
function createStars() {
    const starsContainer = document.getElementById('stars-container');
    if (!starsContainer) return;

    const numberOfStars = 50; // Reduced for more subtle effect

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random size
        const size = Math.random();
        if (size < 0.3) {
            star.classList.add('small');
        } else if (size > 0.8) {
            star.classList.add('large');
        }

        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        // Random animation delay
        star.style.animationDelay = `${Math.random() * 3}s`;

        starsContainer.appendChild(star);
    }
}
