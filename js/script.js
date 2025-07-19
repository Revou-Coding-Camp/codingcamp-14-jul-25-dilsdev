// js/script.js
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize form handling
    initializeForm();
});

// Function to initialize welcome message
function initializeWelcome() {
    const userName = prompt("Please enter your name:") || "Guest";
    const welcomeText = document.getElementById('welcome-text');
    if (welcomeText) {
        welcomeText.textContent = `Hi ${userName}!`;
    }
}

// Function to show different sections
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    // Close mobile menu if open
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('active');
    
    // Update active nav link
    updateActiveNavLink(sectionId);
}

// Function to update active navigation link
function updateActiveNavLink(activeSection) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[onclick="showSection('${activeSection}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Function to toggle mobile menu
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const hamburger = document.querySelector('.hamburger');
    hamburger.classList.toggle('active');
}

// Function to initialize form handling
function initializeForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
}

// Function to handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    // Clear previous error messages
    clearErrorMessages();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    // Validate form
    const isValid = validateForm(formData);
    
    if (isValid) {
        // Display form results
        displayFormResults(formData);
        // Clear form
        document.getElementById('contact-form').reset();
    }
}

// Function to validate form data
function validateForm(formData) {
    let isValid = true;
    
    // Name validation
    if (formData.name.length < 2) {
        showError('name-error', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showError('email-error', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[0-9\-\s\(\)]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
        showError('phone-error', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Message validation
    if (formData.message.length < 10) {
        showError('message-error', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

// Function to show error messages
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Function to clear error messages
function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.style.display = 'none';
        element.textContent = '';
    });
}

// Function to display form results
function displayFormResults(formData) {
    const resultsDiv = document.getElementById('form-results');
    const resultsContent = document.getElementById('results-content');
    
    if (resultsDiv && resultsContent) {
        // Create results HTML
        const resultsHTML = `
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Message:</strong> ${formData.message}</p>
            <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        `;
        
        resultsContent.innerHTML = resultsHTML;
        resultsDiv.style.display = 'block';
        
        // Scroll to results
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

// Function to hide form results
function hideResults() {
    const resultsDiv = document.getElementById('form-results');
    if (resultsDiv) {
        resultsDiv.style.display = 'none';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    
    if (!navbar.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scrolling for better UX
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add loading animation for form submission
function showLoadingState() {
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
    }
}

function hideLoadingState() {
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.innerHTML = 'Send Message';
        submitBtn.disabled = false;
    }
}

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Add fade-in animation for sections
function fadeInSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.opacity = '0';
        section.style.display = 'block';
        
        setTimeout(() => {
            section.style.transition = 'opacity 0.5s ease-in-out';
            section.style.opacity = '1';
        }, 50);
    }
}

// Enhanced section switching with animations
function showSectionWithAnimation(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
        section.style.opacity = '0';
    });
    
    // Show selected section with fade-in
    fadeInSection(sectionId);
    
    // Close mobile menu if open
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('active');
    
    // Update active nav link
    updateActiveNavLink(sectionId);
}

// Initialize intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .stat-card, .vision-card, .mission-card, .office-circle');
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    .nav-link.active {
        color: var(--secondary-color);
        font-weight: 700;
    }
    
    .form-group.error input,
    .form-group.error textarea {
        border-color: var(--accent-color);
        background-color: rgba(231, 76, 60, 0.05);
    }
`;
document.head.appendChild(style);

// Advanced form features
class FormHandler {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.fields = ['name', 'email', 'phone', 'message'];
        this.init();
    }

    init() {
        if (this.form) {
            this.addRealTimeValidation();
            this.addFormSubmissionHandler();
        }
    }

    addRealTimeValidation() {
        this.fields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                field.addEventListener('blur', () => this.validateField(fieldName));
                field.addEventListener('input', () => this.clearFieldError(fieldName));
            }
        });
    }

    validateField(fieldName) {
        const field = document.getElementById(fieldName);
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters long';
                    isValid = false;
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    errorMessage = 'Name should only contain letters and spaces';
                    isValid = false;
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;

            case 'phone':
                const phoneRegex = /^[\+]?[0-9\-\s\(\)]{10,}$/;
                if (!phoneRegex.test(value)) {
                    errorMessage = 'Please enter a valid phone number (min 10 digits)';
                    isValid = false;
                }
                break;

            case 'message':
                if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters long';
                    isValid = false;
                } else if (value.length > 500) {
                    errorMessage = 'Message should not exceed 500 characters';
                    isValid = false;
                }
                break;
        }

        this.displayFieldError(fieldName, errorMessage, !isValid);
        return isValid;
    }

    displayFieldError(fieldName, message, hasError) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const fieldElement = document.getElementById(fieldName);
        const formGroup = fieldElement.closest('.form-group');

        if (hasError) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            formGroup.classList.add('error');
        } else {
            errorElement.style.display = 'none';
            formGroup.classList.remove('error');
        }
    }

    clearFieldError(fieldName) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const fieldElement = document.getElementById(fieldName);
        const formGroup = fieldElement.closest('.form-group');

        if (fieldElement.value.trim().length > 0) {
            errorElement.style.display = 'none';
            formGroup.classList.remove('error');
        }
    }

    addFormSubmissionHandler() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmission();
        });
    }

    handleSubmission() {
        showLoadingState();
        
        // Validate all fields
        let isFormValid = true;
        const formData = {};
        
        this.fields.forEach(fieldName => {
            const isFieldValid = this.validateField(fieldName);
            if (!isFieldValid) {
                isFormValid = false;
            }
            formData[fieldName] = document.getElementById(fieldName).value.trim();
        });

        // Simulate form submission delay
        setTimeout(() => {
            hideLoadingState();
            
            if (isFormValid) {
                this.displaySuccessMessage();
                displayFormResults(formData);
                this.form.reset();
                this.clearAllErrors();
            } else {
                this.displayErrorMessage();
            }
        }, 1500);
    }

    displaySuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h4>Message Sent Successfully!</h4>
                <p>Thank you for contacting us. We'll get back to you soon.</p>
            </div>
        `;
        
        this.form.insertAdjacentElement('beforebegin', successMessage);
        
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }

    displayErrorMessage() {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error-message';
        errorMessage.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <h4>Please Fix the Errors</h4>
                <p>Please correct the highlighted fields and try again.</p>
            </div>
        `;
        
        this.form.insertAdjacentElement('beforebegin', errorMessage);
        
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    }

    clearAllErrors() {
        this.fields.forEach(fieldName => {
            this.displayFieldError(fieldName, '', false);
        });
    }
}

// Enhanced navigation system
class NavigationManager {
    constructor() {
        this.currentSection = 'home';
        this.init();
    }

    init() {
        this.addKeyboardNavigation();
        this.addHashNavigation();
        this.updateURLHash();
    }

    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                switch (e.key) {
                    case '1':
                        e.preventDefault();
                        this.navigateToSection('home');
                        break;
                    case '2':
                        e.preventDefault();
                        this.navigateToSection('profile');
                        break;
                    case '3':
                        e.preventDefault();
                        this.navigateToSection('contact');
                        break;
                }
            }
        });
    }

    addHashNavigation() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (hash && ['home', 'profile', 'contact'].includes(hash)) {
                this.navigateToSection(hash);
            }
        });

        // Handle initial hash
        const initialHash = window.location.hash.substring(1);
        if (initialHash && ['home', 'profile', 'contact'].includes(initialHash)) {
            this.navigateToSection(initialHash);
        }
    }

    navigateToSection(sectionId) {
        this.currentSection = sectionId;
        showSectionWithAnimation(sectionId);
        this.updateURLHash();
        this.trackPageView(sectionId);
    }

    updateURLHash() {
        history.replaceState(null, null, `#${this.currentSection}`);
    }

    trackPageView(section) {
        // Simple analytics tracking simulation
        console.log(`Page view: ${section} at ${new Date().toISOString()}`);
    }
}

// Enhanced animation system
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupCounterAnimations();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Special handling for counter elements
                    if (entry.target.classList.contains('stat-number')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe various elements
        const elementsToAnimate = document.querySelectorAll(`
            .service-card, .stat-card, .vision-card, .mission-card, 
            .office-circle, .contact-item, .about-section p
        `);
        
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }

    setupHoverEffects() {
        // Add particle effect on service card hover
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.createParticleEffect(card);
            });
        });
    }

    createParticleEffect(element) {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--secondary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: particle-float 1s ease-out forwards;
            `;
            
            const rect = element.getBoundingClientRect();
            particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    setupCounterAnimations() {
        // Add keyframe for particle animation
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes particle-float {
                0% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-50px) scale(0.5);
                }
            }
        `;
        document.head.appendChild(particleStyle);
    }
}

// Theme manager for additional customization
class ThemeManager {
    constructor() {
        this.currentTheme = 'default';
        this.init();
    }

    init() {
        this.addThemeToggle();
        this.loadSavedTheme();
    }

    addThemeToggle() {
        // Add theme toggle button (optional feature)
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: var(--secondary-color);
            color: white;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
            display: none; /* Hidden by default, can be enabled */
        `;
        
        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        document.body.appendChild(themeToggle);
    }

    toggleTheme() {
        // Implementation for dark/light theme toggle
        document.body.classList.toggle('dark-theme');
        this.currentTheme = this.currentTheme === 'default' ? 'dark' : 'default';
        this.saveTheme();
    }

    saveTheme() {
        // Note: localStorage not available in Claude artifacts
        // This would work in a real environment
        console.log(`Theme saved: ${this.currentTheme}`);
    }

    loadSavedTheme() {
        // Note: localStorage not available in Claude artifacts
        // This would work in a real environment
        console.log('Theme loaded from storage');
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            pageLoadTime: 0,
            formSubmissions: 0,
            sectionViews: {}
        };
        this.init();
    }

    init() {
        this.measurePageLoadTime();
        this.trackUserInteractions();
    }

    measurePageLoadTime() {
        window.addEventListener('load', () => {
            this.metrics.pageLoadTime = performance.now();
            console.log(`Page loaded in ${this.metrics.pageLoadTime.toFixed(2)}ms`);
        });
    }

    trackUserInteractions() {
        // Track form submissions
        document.addEventListener('submit', () => {
            this.metrics.formSubmissions++;
            console.log(`Form submissions: ${this.metrics.formSubmissions}`);
        });

        // Track section views
        const originalShowSection = window.showSection;
        window.showSection = (sectionId) => {
            this.metrics.sectionViews[sectionId] = (this.metrics.sectionViews[sectionId] || 0) + 1;
            console.log(`Section views:`, this.metrics.sectionViews);
            return originalShowSection(sectionId);
        };
    }

    getMetrics() {
        return this.metrics;
    }
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing functionality first
    initializeWelcome();
    
    // Initialize enhanced features
    const formHandler = new FormHandler();
    const navigationManager = new NavigationManager();
    const animationManager = new AnimationManager();
    const themeManager = new ThemeManager();
    const performanceMonitor = new PerformanceMonitor();
    
    // Add enhanced CSS for new features
    const enhancedStyles = document.createElement('style');
    enhancedStyles.textContent = `
        .success-message,
        .form-error-message {
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            animation: slideInDown 0.3s ease-out;
        }
        
        .success-message {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .form-error-message {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .success-content i,
        .error-content i {
            font-size: 1.5rem;
        }
        
        .success-content h4,
        .error-content h4 {
            margin: 0 0 0.25rem 0;
            font-size: 1.1rem;
        }
        
        .success-content p,
        .error-content p {
            margin: 0;
            font-size: 0.9rem;
        }
        
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .dark-theme {
            --primary-color: #34495e;
            --secondary-color: #5dade2;
            --text-color: #ecf0f1;
            --light-bg: #2c3e50;
            --white: #34495e;
        }
        
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }
        
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid var(--secondary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(enhancedStyles);
    
    console.log('Techflow Solutions Portfolio - All systems initialized');
});