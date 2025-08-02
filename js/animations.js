// ===== ANIMATIONS JAVASCRIPT FILE =====

// Advanced animation effects and interactions

// ===== PARALLAX EFFECTS =====
class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax]');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;
        
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        this.handleScroll();
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        
        this.elements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ===== CURSOR EFFECTS =====
class CustomCursor {
    constructor() {
        this.cursor = null;
        this.cursorDot = null;
        this.init();
    }

    init() {
        // Create custom cursor elements
        this.createCursorElements();
        
        // Add event listeners
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        document.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        
        // Add hover effects for interactive elements
        this.addHoverEffects();
    }

    createCursorElements() {
        // Create main cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #00d4ff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            transform: translate(-50%, -50%);
        `;

        // Create cursor dot
        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'custom-cursor-dot';
        this.cursorDot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #00d4ff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.15s ease;
            transform: translate(-50%, -50%);
        `;

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorDot);
    }

    handleMouseMove(e) {
        if (this.cursor && this.cursorDot) {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            this.cursorDot.style.left = e.clientX + 'px';
            this.cursorDot.style.top = e.clientY + 'px';
        }
    }

    handleMouseEnter() {
        if (this.cursor && this.cursorDot) {
            this.cursor.style.opacity = '1';
            this.cursorDot.style.opacity = '1';
        }
    }

    handleMouseLeave() {
        if (this.cursor && this.cursorDot) {
            this.cursor.style.opacity = '0';
            this.cursorDot.style.opacity = '0';
        }
    }

    addHoverEffects() {
        const interactiveElements = document.querySelectorAll('a, button, .btn, .skill-card, .project-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (this.cursor) {
                    this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    this.cursor.style.borderColor = '#4ecdc4';
                }
            });

            element.addEventListener('mouseleave', () => {
                if (this.cursor) {
                    this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                    this.cursor.style.borderColor = '#00d4ff';
                }
            });
        });
    }
}

// ===== TEXT ANIMATIONS =====
class TextAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initTypewriterEffect();
        this.initTextReveal();
        this.initGlitchEffect();
    }

    initTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid #00d4ff';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    element.style.borderRight = 'none';
                }
            };
            
            // Start typing when element is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    initTextReveal() {
        const textElements = document.querySelectorAll('[data-text-reveal]');
        
        textElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.cssText = `
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.3s ease;
                    transition-delay: ${index * 0.05}s;
                `;
                element.appendChild(span);
            });
            
            // Reveal text when in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const spans = entry.target.querySelectorAll('span');
                        spans.forEach(span => {
                            span.style.opacity = '1';
                            span.style.transform = 'translateY(0)';
                        });
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    initGlitchEffect() {
        const glitchElements = document.querySelectorAll('[data-glitch]');
        
        glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.createGlitchEffect(element);
            });
        });
    }

    createGlitchEffect(element) {
        const text = element.textContent;
        const glitchText = document.createElement('div');
        glitchText.textContent = text;
        glitchText.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            color: #ff6b6b;
            animation: glitch 0.3s ease-in-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(glitchText);
        
        setTimeout(() => {
            element.removeChild(glitchText);
        }, 300);
    }
}

// ===== PARTICLE SYSTEM =====
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas.bind(this));
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(this.animate.bind(this));
    }
}

// ===== SCROLL TRIGGERED ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initFadeInAnimations();
        this.initSlideAnimations();
        this.initScaleAnimations();
        this.initStaggerAnimations();
    }

    initFadeInAnimations() {
        const elements = document.querySelectorAll('[data-fade-in]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
            observer.observe(element);
        });
    }

    initSlideAnimations() {
        const elements = document.querySelectorAll('[data-slide-in]');
        
        elements.forEach(element => {
            const direction = element.getAttribute('data-slide-in') || 'left';
            const initialTransform = this.getSlideTransform(direction);
            
            element.style.transform = initialTransform;
            element.style.transition = 'transform 0.8s ease';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.transform = 'translate(0, 0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(element);
        });
    }

    getSlideTransform(direction) {
        switch (direction) {
            case 'left': return 'translateX(-100px)';
            case 'right': return 'translateX(100px)';
            case 'up': return 'translateY(-100px)';
            case 'down': return 'translateY(100px)';
            default: return 'translateX(-100px)';
        }
    }

    initScaleAnimations() {
        const elements = document.querySelectorAll('[data-scale-in]');
        
        elements.forEach(element => {
            element.style.transform = 'scale(0.8)';
            element.style.opacity = '0';
            element.style.transition = 'all 0.6s ease';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.transform = 'scale(1)';
                        entry.target.style.opacity = '1';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(element);
        });
    }

    initStaggerAnimations() {
        const containers = document.querySelectorAll('[data-stagger]');
        
        containers.forEach(container => {
            const children = container.children;
            const staggerDelay = parseFloat(container.getAttribute('data-stagger-delay')) || 0.1;
            
            Array.from(children).forEach((child, index) => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(30px)';
                child.style.transition = `all 0.6s ease ${index * staggerDelay}s`;
            });
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        Array.from(entry.target.children).forEach(child => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(container);
        });
    }
}

// ===== HOVER ANIMATIONS =====
class HoverAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initMagneticEffect();
        this.initTiltEffect();
        this.initRippleEffect();
    }

    initMagneticEffect() {
        const elements = document.querySelectorAll('[data-magnetic]');
        
        elements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    initTiltEffect() {
        const elements = document.querySelectorAll('[data-tilt]');
        
        elements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }

    initRippleEffect() {
        const elements = document.querySelectorAll('[data-ripple]');
        
        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = element.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(0, 212, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                element.style.position = 'relative';
                element.appendChild(ripple);
                
                setTimeout(() => {
                    element.removeChild(ripple);
                }, 600);
            });
        });
    }
}

// ===== LOADING ANIMATIONS =====
class LoadingAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initProgressBar();
        this.initCircularProgress();
        this.initSkeletonLoading();
    }

    initProgressBar() {
        const progressBars = document.querySelectorAll('[data-progress]');
        
        progressBars.forEach(bar => {
            const target = parseFloat(bar.getAttribute('data-progress'));
            const progress = bar.querySelector('.progress');
            
            if (progress) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            progress.style.width = target + '%';
                            observer.unobserve(entry.target);
                        }
                    });
                });
                
                observer.observe(bar);
            }
        });
    }

    initCircularProgress() {
        const circularProgress = document.querySelectorAll('[data-circular-progress]');
        
        circularProgress.forEach(element => {
            const target = parseFloat(element.getAttribute('data-circular-progress'));
            const svg = element.querySelector('svg');
            const circle = element.querySelector('circle');
            
            if (svg && circle) {
                const radius = circle.r.baseVal.value;
                const circumference = 2 * Math.PI * radius;
                
                circle.style.strokeDasharray = circumference;
                circle.style.strokeDashoffset = circumference;
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const offset = circumference - (target / 100) * circumference;
                            circle.style.strokeDashoffset = offset;
                            observer.unobserve(entry.target);
                        }
                    });
                });
                
                observer.observe(element);
            }
        });
    }

    initSkeletonLoading() {
        const skeletonElements = document.querySelectorAll('[data-skeleton]');
        
        skeletonElements.forEach(element => {
            element.style.cssText = `
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: skeleton-loading 1.5s infinite;
            `;
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animation classes
    new ParallaxEffect();
    new CustomCursor();
    new TextAnimations();
    new ParticleSystem();
    new ScrollAnimations();
    new HoverAnimations();
    new LoadingAnimations();
});

// ===== CSS ANIMATIONS (for dynamic styles) =====
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes skeleton-loading {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
`;
document.head.appendChild(style);
