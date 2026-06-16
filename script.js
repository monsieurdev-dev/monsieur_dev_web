// ===== Main JavaScript =====
document.addEventListener('DOMContentLoaded', function() {
    // Update year in footer
    updateYear();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Like button functionality
    initLikeButton();
    
    // Comment functionality
    initComments();
    
    // Smooth scroll for navigation links
    initSmoothScroll();
    
    // Scroll animations
    initScrollAnimations();
});

// ===== Update Year =====
function updateYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===== Mobile Menu =====
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', function() {
            navList.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navList.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
    }
}

// ===== Like Button =====
function initLikeButton() {
    const likeBtn = document.getElementById('likeBtn');
    
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            const btnText = this.querySelector('.btn-text');
            const btnIcon = this.querySelector('.btn-icon');
            
            // Toggle like state
            this.classList.toggle('liked');
            
            if (this.classList.contains('liked')) {
                btnText.textContent = 'J\'aime !';
                btnIcon.textContent = '❤️';
                this.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                
                // Add animation
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            } else {
                btnText.textContent = 'J\'aime cette blague';
                btnIcon.textContent = '👍';
                this.style.background = 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))';
            }
        });
    }
}

// ===== Comments =====
function initComments() {
    const commentInput = document.getElementById('commentInput');
    const submitComment = document.getElementById('submitComment');
    const commentSuccess = document.getElementById('commentSuccess');
    const commentsList = document.getElementById('commentsList');
    const toggleComments = document.getElementById('toggleComments');
    
    // Submit comment
    if (submitComment && commentInput && commentsList) {
        submitComment.addEventListener('click', function() {
            const commentText = commentInput.value.trim();
            
            if (commentText) {
                // Create new comment element
                const commentItem = document.createElement('div');
                commentItem.className = 'comment-item';
                commentItem.style.animation = 'fadeInUp 0.3s ease-out';
                
                commentItem.innerHTML = `
                    <div class="comment-avatar">👤</div>
                    <div class="comment-content">
                        <p class="comment-text">${escapeHtml(commentText)}</p>
                    </div>
                `;
                
                // Add to comments list
                commentsList.insertBefore(commentItem, commentsList.firstChild);
                
                // Clear input and show success message
                commentInput.value = '';
                commentSuccess.classList.add('show');
                
                // Hide success message after 3 seconds
                setTimeout(() => {
                    commentSuccess.classList.remove('show');
                }, 3000);
            } else {
                commentInput.placeholder = 'Veuillez écrire un commentaire...';
                commentInput.focus();
            }
        });
    }
    
    // Toggle comments visibility
    if (toggleComments && commentsList) {
        let commentsVisible = true;
        
        toggleComments.addEventListener('click', function() {
            commentsVisible = !commentsVisible;
            
            if (commentsVisible) {
                commentsList.style.display = 'flex';
                this.textContent = 'Masquer les commentaires';
            } else {
                commentsList.style.display = 'none';
                this.textContent = 'Voir tous les commentaires';
            }
        });
    }
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
    
    // Make hero section visible immediately
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
}

// ===== Utility Functions =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== Header Scroll Effect =====
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;
    
    if (header) {
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
    }
    
    lastScroll = currentScroll;
});

// ===== Active Navigation Link =====
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
