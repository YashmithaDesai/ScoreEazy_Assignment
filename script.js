// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// FAQ Accordion Functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Form Submission Handling
const bookingForm = document.querySelector('.booking-form');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.education || !data.concern) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Booking Session...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you! Your consultation has been booked. We will contact you within 24 hours to confirm your session.');
            
            // Reset form
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Enhanced Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered animation delay
            setTimeout(() => {
                entry.target.classList.add('fade-in-up');
            }, index * 100);
        }
    });
}, observerOptions);

// Staggered animations for different sections
const slideInLeftObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('slide-in-left');
            }, index * 150);
        }
    });
}, observerOptions);

const slideInRightObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('slide-in-right');
            }, index * 150);
        }
    });
}, observerOptions);

const scaleInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('scale-in');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Hero section animations
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    const heroStats = document.querySelector('.hero-stats');
    const heroImage = document.querySelector('.hero-image');

    if (heroTitle) heroTitle.classList.add('slide-in-left');
    if (heroSubtitle) setTimeout(() => heroSubtitle.classList.add('slide-in-left'), 200);
    if (heroCta) setTimeout(() => heroCta.classList.add('slide-in-left'), 400);
    if (heroStats) setTimeout(() => heroStats.classList.add('slide-in-left'), 600);
    if (heroImage) heroImage.classList.add('slide-in-right');

    // About section animations
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach((card, index) => {
        slideInLeftObserver.observe(card);
    });

    // Benefits section animations
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach((item, index) => {
        scaleInObserver.observe(item);
    });

    // Testimonials animations
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        slideInRightObserver.observe(card);
    });

    // Steps animations
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        observer.observe(step);
    });

    // FAQ animations
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        observer.observe(item);
    });

    // Contact form animation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        slideInRightObserver.observe(contactForm);
    }

    // Contact info animation
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        slideInLeftObserver.observe(contactInfo);
    }
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (text.includes('+')) {
                animateCounter(statNumber, number);
                statNumber.textContent = number + '+';
            } else if (text.includes('%')) {
                animateCounter(statNumber, number);
                statNumber.textContent = number + '%';
            } else {
                statNumber.textContent = text; // For "24/7"
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stat elements
document.addEventListener('DOMContentLoaded', () => {
    const statElements = document.querySelectorAll('.stat');
    statElements.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading class to body
document.body.classList.add('loading');

// Preloader (if needed)
const preloader = document.createElement('div');
preloader.className = 'preloader';
preloader.innerHTML = `
    <div class="loader">
        <div class="spinner"></div>
        <p>Loading Scoreazy...</p>
    </div>
`;

// Add preloader styles
const preloaderStyles = document.createElement('style');
preloaderStyles.textContent = `
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .loader {
        text-align: center;
        color: white;
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    body.loaded .preloader {
        opacity: 0;
        pointer-events: none;
    }
`;

document.head.appendChild(preloaderStyles);
document.body.appendChild(preloader);

// Remove preloader after page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.remove();
    }, 500);
});

// Enhanced Form Validation
function validateForm() {
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const value = field.value.trim();
        
        if (!value) {
            field.style.borderColor = '#EF4444';
            isValid = false;
        } else {
            field.style.borderColor = '#E5E7EB';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.style.borderColor = '#EF4444';
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Add real-time validation
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('.booking-form input, .booking-form select, .booking-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateForm();
        });
        
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                input.style.borderColor = '#4F46E5';
            }
        });
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #3182ce;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 4px 12px rgba(49, 130, 206, 0.3);
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for scroll to top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-2px)';
    scrollToTopBtn.style.boxShadow = '0 6px 20px rgba(49, 130, 206, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
    scrollToTopBtn.style.boxShadow = '0 4px 12px rgba(49, 130, 206, 0.3)';
});

// Additional Interactive Animations
document.addEventListener('DOMContentLoaded', () => {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Animate numbers on scroll
    const animateNumbers = () => {
        const numbers = document.querySelectorAll('.stat-number');
        numbers.forEach(number => {
            const target = parseInt(number.textContent.replace(/\D/g, ''));
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    number.textContent = target + (number.textContent.includes('+') ? '+' : '') + (number.textContent.includes('%') ? '%' : '');
                    clearInterval(timer);
                } else {
                    number.textContent = Math.floor(current) + (number.textContent.includes('+') ? '+' : '') + (number.textContent.includes('%') ? '%' : '');
                }
            }, 30);
        });
    };

    // Trigger number animation when stats come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Store the original content
        const originalContent = heroTitle.innerHTML;
        
        // Create a temporary container to extract text
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = originalContent;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';
        
        // Clear the title
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < plainText.length) {
                const currentText = plainText.substring(0, i + 1);
                
                // Reconstruct the HTML with proper highlighting
                let reconstructedHTML = '';
                let textIndex = 0;
                
                // Find the highlight span
                const highlightMatch = originalContent.match(/<span class="highlight">(.*?)<\/span>/);
                
                if (highlightMatch) {
                    const beforeHighlight = originalContent.substring(0, originalContent.indexOf('<span class="highlight">'));
                    const highlightText = highlightMatch[1];
                    const afterHighlight = originalContent.substring(originalContent.indexOf('</span>') + 7);
                    
                    const beforeText = beforeHighlight.replace(/<[^>]*>/g, '');
                    const afterText = afterHighlight.replace(/<[^>]*>/g, '');
                    
                    if (currentText.length <= beforeText.length) {
                        // Still typing before highlight
                        reconstructedHTML = currentText;
                    } else if (currentText.length <= beforeText.length + highlightText.length) {
                        // Typing the highlight text
                        const highlightProgress = currentText.length - beforeText.length;
                        reconstructedHTML = beforeHighlight + highlightText.substring(0, highlightProgress);
                    } else {
                        // Typing after highlight
                        const afterProgress = currentText.length - beforeText.length - highlightText.length;
                        reconstructedHTML = beforeHighlight + highlightText + '</span>' + afterText.substring(0, afterProgress);
                    }
                } else {
                    // No highlight span, just type normally
                    reconstructedHTML = currentText;
                }
                
                heroTitle.innerHTML = reconstructedHTML;
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Add floating animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.animation = 'float 1s ease-in-out infinite';
        });
        button.addEventListener('mouseleave', () => {
            button.style.animation = 'none';
        });
    });

    // Add ripple effect to buttons
    const addRippleEffect = (event) => {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    };

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', addRippleEffect);
    });
});

// Add ripple effect styles
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

console.log('Scoreazy Counseling & Mentorship Program - Landing Page Loaded Successfully!'); 