/* ================================================================
   LUXURY REAL ESTATE LANDING PAGE - INTERACTIVITY
   ================================================================
   Handles:
   - Scroll-based navigation highlighting
   - Form submission with console logging
   - Smooth CTA button interactions
   - Property card animations
   ================================================================ */

// DOM Elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');
const ctaButtons = document.querySelectorAll('.cta-button, .hero-cta');

// ================================================================
// SCROLL TRACKING: Highlight active nav link based on scroll position
// ================================================================
function updateActiveNavLink() {
    let currentSection = '';

    // Iterate through all sections to find which one is in view
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    // Update nav link styles based on current section
    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// CSS for active state (dynamically added if not in stylesheet)
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #3A4B4E;
        border-bottom-color: #3A4B4E;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Listen to scroll events and update active nav link
window.addEventListener('scroll', updateActiveNavLink);

// ================================================================
// FORM SUBMISSION: Handle contact form with validation and logging
// ================================================================
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const emailInput = this.querySelector('input[type="email"]');
    const emailValue = emailInput.value.trim();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
        console.warn('Invalid email format:', emailValue);
        alert('Please enter a valid email address.');
        return;
    }

    // Log submission details (placeholder for backend integration)
    console.log('✓ Form Submission Log', {
        timestamp: new Date().toISOString(),
        email: emailValue,
        section: 'Contact Form',
        action: 'User initiated contact',
    });

    // Success feedback
    alert(`Thank you! We've received your request at ${emailValue}. Our team will be in touch shortly.`);

    // Reset form
    this.reset();
    emailInput.focus();
});

// ================================================================
// CTA BUTTON HANDLERS: Enhanced feedback for all CTA clicks
// ================================================================
ctaButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const buttonText = this.textContent.trim();

        console.log('✓ CTA Button Clicked', {
            timestamp: new Date().toISOString(),
            buttonLabel: buttonText,
            userAgent: navigator.userAgent,
        });

        // Handle "SCHEDULE A GOALS CALL" button
        if (buttonText === 'SCHEDULE A GOALS CALL') {
            console.log('→ Routing to: Schedule consultation flow');
            // In production, this would redirect or open a scheduling modal
            alert('Schedule a consultation: Coming soon! Redirect to booking system.');
        }

        // Handle "Explore Listings" button
        if (buttonText === 'Explore Listings') {
            console.log('→ Routing to: Property listings section');
            document.querySelector('#sell').scrollIntoView({ behavior: 'smooth' });
        }

        // Handle form submit button
        if (buttonText === 'Get Started') {
            console.log('→ Form submission initiated');
        }
    });
});

// ================================================================
// PROPERTY CARD INTERACTIONS: Log clicks on featured listings
// ================================================================
const propertyCards = document.querySelectorAll('.property-card');
propertyCards.forEach((card, index) => {
    card.addEventListener('click', function () {
        const location = this.querySelector('.property-location').textContent;
        const price = this.querySelector('.property-price').textContent;

        console.log('✓ Property Card Clicked', {
            timestamp: new Date().toISOString(),
            propertyIndex: index + 1,
            location: location,
            price: price,
            action: 'User viewed property details',
        });
    });

    // Add hover effect logging for analytics
    card.addEventListener('mouseenter', function () {
        const location = this.querySelector('.property-location').textContent;
        console.log(`→ Property hovered: ${location}`);
    });
});

// ================================================================
// PAGE PERFORMANCE & ANALYTICS LOGGING
// ================================================================
// Log initial page load metrics
window.addEventListener('load', function () {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

        console.log('✓ Page Load Complete', {
            timestamp: new Date().toISOString(),
            pageLoadTimeMs: pageLoadTime,
            domReadyMs: perfData.domContentLoadedEventEnd - perfData.navigationStart,
        });
    }
});

// ================================================================
// SMOOTH SCROLL ENHANCEMENT: Prevent jumpy scroll behavior
// ================================================================
// The CSS "scroll-behavior: smooth" handles this in most modern browsers,
// but this ensures compatibility and allows for enhanced scroll tracking
document.addEventListener('click', function (e) {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
        const targetId = target.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            e.preventDefault();
            targetSection.scrollIntoView({ behavior: 'smooth' });

            console.log('→ Smooth scroll to section:', targetId);
        }
    }
});

// ================================================================
// ACCESSIBILITY: Announce key interactions for screen readers
// ================================================================
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => announcement.remove(), 1000);
}

// Announce form success to screen readers
contactForm.addEventListener('submit', function () {
    announceToScreenReader('Your contact request has been submitted. Thank you!');
});

// ================================================================
// DEBUG MODE: Set window.luxuryDebug = true in console to enable
// ================================================================
window.luxuryDebug = false;

window.addEventListener('keydown', function (e) {
    // Enable debug mode with Ctrl+Shift+D
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        window.luxuryDebug = !window.luxuryDebug;
        console.log(`🔧 Debug Mode: ${window.luxuryDebug ? 'ENABLED' : 'DISABLED'}`);
    }
});
