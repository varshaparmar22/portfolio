document.addEventListener('DOMContentLoaded', function() {

    const urlParams = new URLSearchParams(window.location.search);
    const showSection = urlParams.get('show');
    
    if (showSection === 'projects') {
        // Hide hero section
        const hero = document.getElementById('hero');
        if (hero) {
            hero.style.display = 'none';
        }
        
        // Show projects section
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.style.display = 'block';
            projectsSection.style.opacity = '1';
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (hamburger && navLinks) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });

    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function setActiveNavItem() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === current) {
                item.classList.add('active');
            }
        });
    }
    
    // Run once on page load
    setActiveNavItem();
    
    // Run on scroll
    window.addEventListener('scroll', setActiveNavItem);
    
    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.timeline-item, .project-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.timeline-item, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

    });
});


// Add this code after the existing DOMContentLoaded event listener
document.addEventListener('click', function(e) {
    // Check if the clicked element or its parent has the project-card class
    const projectCard = e.target.closest('.project-card');
    if (projectCard) {
        e.preventDefault();
        
        // Get the project ID from the card's data attribute or other identifier
        const projectId = projectCard.getAttribute('data-project-id') || 
                         projectCard.closest('[data-project-id]')?.getAttribute('data-project-id');
        
        if (projectId) {
            // Store the current scroll position if needed
            sessionStorage.setItem('scrollPosition', window.scrollY);
            
            // Navigate to the project content page with the from=projects parameter
            window.location.href = `project-content-${projectId}.html?from=projects`;
        }
    }
});

// Update the back_to_projects function to maintain consistency
function back_to_projects() {
    window.location.href = "index.html?show=projects#projects";
}