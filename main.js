// ============================================
// Global State & Configuration
// ============================================
const state = {
    profile: null,
    skills: [],
    projects: [],
    testimonials: [],
    currentTestimonial: 0,
    projectsPage: 1,
    projectsLimit: 6,
    totalProjects: 0
};

const typingTexts = [
    'Full Stack Developer',
    'Web Designer',
    'UI/UX Enthusiast',
    'Problem Solver',
    'Tech Innovator'
];

// ============================================
// API Functions
// ============================================
const API = {
    // Get profile data
    async getProfile() {
        try {
            const response = await fetch('tables/profile?limit=1');
            const data = await response.json();
            return data.data[0] || null;
        } catch (error) {
            console.error('Error fetching profile:', error);
            return null;
        }
    },

    // Get all skills
    async getSkills() {
        try {
            const response = await fetch('tables/skills?limit=100&sort=order');
            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.error('Error fetching skills:', error);
            return [];
        }
    },

    // Get projects with pagination
    async getProjects(page = 1, limit = 6) {
        try {
            const response = await fetch(`tables/projects?page=${page}&limit=${limit}&sort=order`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching projects:', error);
            return { data: [], total: 0 };
        }
    },

    // Get testimonials
    async getTestimonials() {
        try {
            const response = await fetch('tables/testimonials?limit=100&sort=order');
            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            return [];
        }
    },

    // Submit contact form
    async submitContact(formData) {
        try {
            const response = await fetch('tables/contact_messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    status: 'new',
                    read: false
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Error submitting contact form:', error);
            throw error;
        }
    }
};

// ============================================
// Preloader
// ============================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// ============================================
// Navigation
// ============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
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

// Smooth scroll and close mobile menu
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// Typing Animation
// ============================================
function typeText(element, texts, index = 0, charIndex = 0, isDeleting = false) {
    const currentText = texts[index];
    
    if (!isDeleting && charIndex <= currentText.length) {
        element.textContent = currentText.substring(0, charIndex);
        charIndex++;
        setTimeout(() => typeText(element, texts, index, charIndex, false), 100);
    } else if (isDeleting && charIndex >= 0) {
        element.textContent = currentText.substring(0, charIndex);
        charIndex--;
        setTimeout(() => typeText(element, texts, index, charIndex, true), 50);
    } else if (!isDeleting && charIndex > currentText.length) {
        setTimeout(() => typeText(element, texts, index, charIndex, true), 2000);
    } else if (isDeleting && charIndex < 0) {
        index = (index + 1) % texts.length;
        setTimeout(() => typeText(element, texts, index, 0, false), 500);
    }
}

// ============================================
// Load Profile Data
// ============================================
async function loadProfile() {
    const profile = await API.getProfile();
    if (!profile) return;
    
    state.profile = profile;
    
    // Update hero section
    document.getElementById('heroName').textContent = profile.name || 'Anjeet Tech 2.0';
    document.getElementById('heroDescription').textContent = profile.bio || 'Crafting exceptional digital experiences with modern technologies';
    
    if (profile.avatar_url) {
        document.getElementById('heroAvatar').src = profile.avatar_url;
    }
    
    // Update about section
    document.getElementById('aboutDescription').innerHTML = `<p>${profile.bio || 'I\'m a passionate developer dedicated to creating innovative and user-friendly digital solutions.'}</p>`;
    document.getElementById('profileEmail').textContent = profile.email || 'contact@anjeettech.com';
    document.getElementById('profilePhone').textContent = profile.phone || '+1 234 567 890';
    document.getElementById('profileLocation').textContent = profile.location || 'San Francisco, CA';
    
    // Update contact section
    document.getElementById('contactEmail').textContent = profile.email || 'contact@anjeettech.com';
    document.getElementById('contactPhone').textContent = profile.phone || '+1 234 567 890';
    document.getElementById('contactLocation').textContent = profile.location || 'San Francisco, CA, USA';
    
    // Update resume button
    if (profile.resume_url) {
        const resumeBtn = document.getElementById('downloadResumeBtn');
        resumeBtn.href = profile.resume_url;
        resumeBtn.target = '_blank';
    }
    
    // Update social links
    const socialHTML = generateSocialLinks(profile);
    document.getElementById('heroSocial').innerHTML = socialHTML;
    document.getElementById('contactSocial').innerHTML = socialHTML;
    document.getElementById('footerSocial').innerHTML = socialHTML;
}

function generateSocialLinks(profile) {
    const socials = [
        { url: profile.github_url, icon: 'fab fa-github' },
        { url: profile.linkedin_url, icon: 'fab fa-linkedin' },
        { url: profile.twitter_url, icon: 'fab fa-twitter' },
        { url: profile.instagram_url, icon: 'fab fa-instagram' }
    ];
    
    return socials
        .filter(social => social.url)
        .map(social => `<a href="${social.url}" target="_blank"><i class="${social.icon}"></i></a>`)
        .join('');
}

// ============================================
// Load Skills
// ============================================
async function loadSkills() {
    const skills = await API.getSkills();
    state.skills = skills;
    renderSkills(skills);
}

function renderSkills(skills) {
    const grid = document.getElementById('skillsGrid');
    
    if (skills.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No skills available yet.</p>';
        return;
    }
    
    grid.innerHTML = skills.map(skill => `
        <div class="skill-card" data-category="${skill.category}" data-aos="fade-up">
            <div class="skill-icon">
                <i class="${skill.icon || 'fas fa-code'}"></i>
            </div>
            <h3 class="skill-name">${skill.name}</h3>
            <div class="skill-level">${skill.level || 0}%</div>
            <div class="skill-progress">
                <div class="skill-progress-bar" style="width: ${skill.level || 0}%"></div>
            </div>
        </div>
    `).join('');
}

// Skills filter
document.querySelectorAll('.skills-filter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.skills-filter .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        const filteredSkills = filter === 'all' 
            ? state.skills 
            : state.skills.filter(skill => skill.category === filter);
        
        renderSkills(filteredSkills);
    });
});

// ============================================
// Load Projects
// ============================================
async function loadProjects(append = false) {
    const response = await API.getProjects(state.projectsPage, state.projectsLimit);
    const projects = response.data || [];
    state.totalProjects = response.total || 0;
    
    if (append) {
        state.projects = [...state.projects, ...projects];
    } else {
        state.projects = projects;
    }
    
    renderProjects(state.projects);
    updateLoadMoreButton();
}

function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    
    if (projects.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: var(--text-secondary); grid-column: 1/-1;">No projects available yet.</p>';
        return;
    }
    
    grid.innerHTML = projects.map(project => `
        <div class="project-card" data-category="${project.category}" data-aos="fade-up">
            <div class="project-image">
                <img src="${project.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop'}" alt="${project.title}">
                <div class="project-overlay">
                    <div class="project-links">
                        ${project.demo_url ? `<a href="${project.demo_url}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i></a>` : ''}
                        ${project.github_url ? `<a href="${project.github_url}" target="_blank" class="project-link"><i class="fab fa-github"></i></a>` : ''}
                    </div>
                </div>
            </div>
            <div class="project-content">
                <div class="project-category">${project.category || 'Project'}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description || ''}</p>
                <div class="project-technologies">
                    ${project.technologies ? project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('') : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreProjects');
    const loadedCount = state.projects.length;
    
    if (loadedCount >= state.totalProjects) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-flex';
    }
}

// Load more projects
document.getElementById('loadMoreProjects').addEventListener('click', async () => {
    state.projectsPage++;
    await loadProjects(true);
});

// Projects filter
document.querySelectorAll('.projects-filter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.projects-filter .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        const filteredProjects = filter === 'all' 
            ? state.projects 
            : state.projects.filter(project => project.category === filter);
        
        renderProjects(filteredProjects);
    });
});

// ============================================
// Load Testimonials
// ============================================
async function loadTestimonials() {
    const testimonials = await API.getTestimonials();
    state.testimonials = testimonials;
    renderTestimonials();
}

function renderTestimonials() {
    const slider = document.getElementById('testimonialsSlider');
    const dots = document.getElementById('testimonialDots');
    
    if (state.testimonials.length === 0) {
        slider.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No testimonials available yet.</p>';
        return;
    }
    
    slider.innerHTML = `
        <div class="testimonial-track">
            ${state.testimonials.map(testimonial => `
                <div class="testimonial-card" data-aos="fade-up">
                    <div class="testimonial-avatar">
                        <img src="${testimonial.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(testimonial.name)}" alt="${testimonial.name}">
                    </div>
                    <div class="testimonial-rating">
                        ${generateStars(testimonial.rating || 5)}
                    </div>
                    <p class="testimonial-content">"${testimonial.content}"</p>
                    <h4 class="testimonial-name">${testimonial.name}</h4>
                    <p class="testimonial-position">${testimonial.position}${testimonial.company ? ` at ${testimonial.company}` : ''}</p>
                </div>
            `).join('')}
        </div>
    `;
    
    dots.innerHTML = state.testimonials.map((_, index) => 
        `<span class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`
    ).join('');
    
    // Add dot click listeners
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            goToTestimonial(index);
        });
    });
    
    updateTestimonialSlider();
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<i class="fas fa-star${i <= rating ? '' : '-o'}"></i>`;
    }
    return stars;
}

function goToTestimonial(index) {
    state.currentTestimonial = index;
    updateTestimonialSlider();
}

function updateTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    if (track) {
        track.style.transform = `translateX(-${state.currentTestimonial * 100}%)`;
    }
    
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === state.currentTestimonial);
    });
}

// Testimonial navigation
document.getElementById('testimonialPrev').addEventListener('click', () => {
    state.currentTestimonial = (state.currentTestimonial - 1 + state.testimonials.length) % state.testimonials.length;
    updateTestimonialSlider();
});

document.getElementById('testimonialNext').addEventListener('click', () => {
    state.currentTestimonial = (state.currentTestimonial + 1) % state.testimonials.length;
    updateTestimonialSlider();
});

// Auto-rotate testimonials
setInterval(() => {
    if (state.testimonials.length > 1) {
        state.currentTestimonial = (state.currentTestimonial + 1) % state.testimonials.length;
        updateTestimonialSlider();
    }
}, 8000);

// ============================================
// Contact Form
// ============================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        subject: contactForm.subject.value,
        message: contactForm.message.value
    };
    
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        await API.submitContact(formData);
        
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Thank you! Your message has been sent successfully.';
        contactForm.reset();
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    } catch (error) {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Oops! Something went wrong. Please try again.';
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// ============================================
// Stats Counter Animation
// ============================================
function animateCounter(element, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when about section is in view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const projectsCount = document.getElementById('projectsCount');
            const clientsCount = document.getElementById('clientsCount');
            
            animateCounter(projectsCount, state.totalProjects || 50);
            animateCounter(clientsCount, 30);
            
            aboutObserver.disconnect();
        }
    });
}, observerOptions);

const aboutSection = document.getElementById('about');
if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// ============================================
// Back to Top Button
// ============================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Initialize AOS (Animate On Scroll)
// ============================================
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ============================================
// Initialize Application
// ============================================
async function initApp() {
    // Start typing animation
    const typingElement = document.getElementById('typingText');
    if (typingElement) {
        typeText(typingElement, typingTexts);
    }
    
    // Load all data
    await Promise.all([
        loadProfile(),
        loadSkills(),
        loadProjects(),
        loadTestimonials()
    ]);
    
    // Refresh AOS after content loads
    setTimeout(() => {
        AOS.refresh();
    }, 500);
}

// Start the application
initApp();
