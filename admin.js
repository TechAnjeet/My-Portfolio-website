// ============================================
// Global State
// ============================================
const state = {
    profile: null,
    skills: [],
    projects: [],
    testimonials: [],
    messages: [],
    currentFilter: 'all'
};

// ============================================
// API Functions
// ============================================
const API = {
    // Profile
    async getProfile() {
        const response = await fetch('tables/profile?limit=1');
        const data = await response.json();
        return data.data[0] || null;
    },

    async saveProfile(profileData) {
        const id = profileData.id;
        const method = id ? 'PUT' : 'POST';
        const url = id ? `tables/profile/${id}` : 'tables/profile';
        
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profileData)
        });
        return await response.json();
    },

    // Skills
    async getSkills() {
        const response = await fetch('tables/skills?limit=100&sort=order');
        const data = await response.json();
        return data.data || [];
    },

    async saveSkill(skillData) {
        const id = skillData.id;
        const method = id ? 'PUT' : 'POST';
        const url = id ? `tables/skills/${id}` : 'tables/skills';
        
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(skillData)
        });
        return await response.json();
    },

    async deleteSkill(id) {
        await fetch(`tables/skills/${id}`, { method: 'DELETE' });
    },

    // Projects
    async getProjects() {
        const response = await fetch('tables/projects?limit=100&sort=order');
        const data = await response.json();
        return data.data || [];
    },

    async saveProject(projectData) {
        const id = projectData.id;
        const method = id ? 'PUT' : 'POST';
        const url = id ? `tables/projects/${id}` : 'tables/projects';
        
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData)
        });
        return await response.json();
    },

    async deleteProject(id) {
        await fetch(`tables/projects/${id}`, { method: 'DELETE' });
    },

    // Testimonials
    async getTestimonials() {
        const response = await fetch('tables/testimonials?limit=100&sort=order');
        const data = await response.json();
        return data.data || [];
    },

    async saveTestimonial(testimonialData) {
        const id = testimonialData.id;
        const method = id ? 'PUT' : 'POST';
        const url = id ? `tables/testimonials/${id}` : 'tables/testimonials';
        
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testimonialData)
        });
        return await response.json();
    },

    async deleteTestimonial(id) {
        await fetch(`tables/testimonials/${id}`, { method: 'DELETE' });
    },

    // Messages
    async getMessages() {
        const response = await fetch('tables/contact_messages?limit=100');
        const data = await response.json();
        return data.data || [];
    },

    async updateMessage(id, updates) {
        const response = await fetch(`tables/contact_messages/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        return await response.json();
    },

    async deleteMessage(id) {
        await fetch(`tables/contact_messages/${id}`, { method: 'DELETE' });
    }
};

// ============================================
// Navigation
// ============================================
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        const section = item.dataset.section;
        
        // Update nav items
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Update sections
        document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
        document.getElementById(section).classList.add('active');
    });
});

// ============================================
// Toast Notification
// ============================================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// Profile Management
// ============================================
const profileForm = document.getElementById('profileForm');

async function loadProfile() {
    const profile = await API.getProfile();
    
    if (profile) {
        state.profile = profile;
        
        // Fill form
        document.getElementById('profileId').value = profile.id || '';
        profileForm.name.value = profile.name || '';
        profileForm.title.value = profile.title || '';
        profileForm.bio.value = profile.bio || '';
        profileForm.email.value = profile.email || '';
        profileForm.phone.value = profile.phone || '';
        profileForm.location.value = profile.location || '';
        profileForm.avatar_url.value = profile.avatar_url || '';
        profileForm.resume_url.value = profile.resume_url || '';
        profileForm.github_url.value = profile.github_url || '';
        profileForm.linkedin_url.value = profile.linkedin_url || '';
        profileForm.twitter_url.value = profile.twitter_url || '';
        profileForm.instagram_url.value = profile.instagram_url || '';
    }
}

profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(profileForm);
    const profileData = Object.fromEntries(formData);
    
    // Convert empty id to undefined
    if (!profileData.id) delete profileData.id;
    
    try {
        await API.saveProfile(profileData);
        showToast('Profile saved successfully!', 'success');
        await loadProfile();
    } catch (error) {
        showToast('Failed to save profile', 'error');
        console.error(error);
    }
});

// ============================================
// Skills Management
// ============================================
const skillModal = document.getElementById('skillModal');
const skillForm = document.getElementById('skillForm');

async function loadSkills() {
    state.skills = await API.getSkills();
    renderSkills();
}

function renderSkills() {
    const tbody = document.querySelector('#skillsTable tbody');
    
    if (state.skills.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state"><i class="fas fa-code"></i><h3>No skills yet</h3><p>Click "Add Skill" to get started</p></td></tr>';
        return;
    }
    
    tbody.innerHTML = state.skills.map(skill => `
        <tr>
            <td>${skill.name}</td>
            <td><span class="tech-tag">${skill.category}</span></td>
            <td>${skill.level}%</td>
            <td><i class="${skill.icon || 'fas fa-code'}"></i></td>
            <td>${skill.order}</td>
            <td>
                <div class="table-actions">
                    <button class="icon-btn" onclick="editSkill('${skill.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="icon-btn delete" onclick="deleteSkill('${skill.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

document.getElementById('addSkillBtn').addEventListener('click', () => {
    document.getElementById('skillModalTitle').textContent = 'Add Skill';
    skillForm.reset();
    document.getElementById('skillId').value = '';
    skillModal.classList.add('active');
});

window.editSkill = (id) => {
    const skill = state.skills.find(s => s.id === id);
    if (!skill) return;
    
    document.getElementById('skillModalTitle').textContent = 'Edit Skill';
    document.getElementById('skillId').value = skill.id;
    skillForm.name.value = skill.name;
    skillForm.category.value = skill.category;
    skillForm.level.value = skill.level;
    skillForm.icon.value = skill.icon || '';
    skillForm.order.value = skill.order || 0;
    
    skillModal.classList.add('active');
};

window.deleteSkill = async (id) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    try {
        await API.deleteSkill(id);
        showToast('Skill deleted successfully!', 'success');
        await loadSkills();
    } catch (error) {
        showToast('Failed to delete skill', 'error');
        console.error(error);
    }
};

skillForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(skillForm);
    const skillData = {
        name: formData.get('name'),
        category: formData.get('category'),
        level: parseInt(formData.get('level')),
        icon: formData.get('icon'),
        order: parseInt(formData.get('order'))
    };
    
    const id = document.getElementById('skillId').value;
    if (id) skillData.id = id;
    
    try {
        await API.saveSkill(skillData);
        showToast('Skill saved successfully!', 'success');
        skillModal.classList.remove('active');
        await loadSkills();
    } catch (error) {
        showToast('Failed to save skill', 'error');
        console.error(error);
    }
});

// ============================================
// Projects Management
// ============================================
const projectModal = document.getElementById('projectModal');
const projectForm = document.getElementById('projectForm');

async function loadProjects() {
    state.projects = await API.getProjects();
    renderProjects();
}

function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    
    if (state.projects.length === 0) {
        grid.innerHTML = '<div class="empty-state"><i class="fas fa-briefcase"></i><h3>No projects yet</h3><p>Click "Add Project" to get started</p></div>';
        return;
    }
    
    grid.innerHTML = state.projects.map(project => `
        <div class="project-card">
            <div class="project-image">
                <img src="${project.image_url || ''}" alt="${project.title}">
            </div>
            <div class="project-content">
                <div class="project-category">${project.category}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description || ''}</p>
                ${project.technologies ? `
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                ` : ''}
                <div class="card-actions">
                    <button class="btn btn-sm btn-primary" onclick="editProject('${project.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProject('${project.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

document.getElementById('addProjectBtn').addEventListener('click', () => {
    document.getElementById('projectModalTitle').textContent = 'Add Project';
    projectForm.reset();
    document.getElementById('projectId').value = '';
    projectModal.classList.add('active');
});

window.editProject = (id) => {
    const project = state.projects.find(p => p.id === id);
    if (!project) return;
    
    document.getElementById('projectModalTitle').textContent = 'Edit Project';
    document.getElementById('projectId').value = project.id;
    projectForm.title.value = project.title;
    projectForm.description.value = project.description || '';
    projectForm.category.value = project.category;
    projectForm.featured.value = project.featured ? 'true' : 'false';
    projectForm.image_url.value = project.image_url || '';
    projectForm.demo_url.value = project.demo_url || '';
    projectForm.github_url.value = project.github_url || '';
    projectForm.technologies.value = project.technologies ? project.technologies.join(', ') : '';
    projectForm.order.value = project.order || 0;
    
    projectModal.classList.add('active');
};

window.deleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
        await API.deleteProject(id);
        showToast('Project deleted successfully!', 'success');
        await loadProjects();
    } catch (error) {
        showToast('Failed to delete project', 'error');
        console.error(error);
    }
};

projectForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(projectForm);
    const projectData = {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        featured: formData.get('featured') === 'true',
        image_url: formData.get('image_url'),
        demo_url: formData.get('demo_url'),
        github_url: formData.get('github_url'),
        technologies: formData.get('technologies').split(',').map(t => t.trim()).filter(t => t),
        order: parseInt(formData.get('order'))
    };
    
    const id = document.getElementById('projectId').value;
    if (id) projectData.id = id;
    
    try {
        await API.saveProject(projectData);
        showToast('Project saved successfully!', 'success');
        projectModal.classList.remove('active');
        await loadProjects();
    } catch (error) {
        showToast('Failed to save project', 'error');
        console.error(error);
    }
});

// ============================================
// Testimonials Management
// ============================================
const testimonialModal = document.getElementById('testimonialModal');
const testimonialForm = document.getElementById('testimonialForm');

async function loadTestimonials() {
    state.testimonials = await API.getTestimonials();
    renderTestimonials();
}

function renderTestimonials() {
    const grid = document.getElementById('testimonialsGrid');
    
    if (state.testimonials.length === 0) {
        grid.innerHTML = '<div class="empty-state"><i class="fas fa-comments"></i><h3>No testimonials yet</h3><p>Click "Add Testimonial" to get started</p></div>';
        return;
    }
    
    grid.innerHTML = state.testimonials.map(testimonial => `
        <div class="testimonial-card">
            <div class="testimonial-content">
                <div class="testimonial-rating">
                    ${Array(testimonial.rating || 5).fill('<i class="fas fa-star"></i>').join('')}
                </div>
                <h3 class="testimonial-name">${testimonial.name}</h3>
                <p class="testimonial-position">${testimonial.position}${testimonial.company ? ` at ${testimonial.company}` : ''}</p>
                <p class="testimonial-text">"${testimonial.content}"</p>
                <div class="card-actions">
                    <button class="btn btn-sm btn-primary" onclick="editTestimonial('${testimonial.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteTestimonial('${testimonial.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

document.getElementById('addTestimonialBtn').addEventListener('click', () => {
    document.getElementById('testimonialModalTitle').textContent = 'Add Testimonial';
    testimonialForm.reset();
    document.getElementById('testimonialId').value = '';
    testimonialModal.classList.add('active');
});

window.editTestimonial = (id) => {
    const testimonial = state.testimonials.find(t => t.id === id);
    if (!testimonial) return;
    
    document.getElementById('testimonialModalTitle').textContent = 'Edit Testimonial';
    document.getElementById('testimonialId').value = testimonial.id;
    testimonialForm.name.value = testimonial.name;
    testimonialForm.position.value = testimonial.position;
    testimonialForm.company.value = testimonial.company || '';
    testimonialForm.content.value = testimonial.content;
    testimonialForm.avatar_url.value = testimonial.avatar_url || '';
    testimonialForm.rating.value = testimonial.rating || 5;
    testimonialForm.featured.value = testimonial.featured ? 'true' : 'false';
    testimonialForm.order.value = testimonial.order || 0;
    
    testimonialModal.classList.add('active');
};

window.deleteTestimonial = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
        await API.deleteTestimonial(id);
        showToast('Testimonial deleted successfully!', 'success');
        await loadTestimonials();
    } catch (error) {
        showToast('Failed to delete testimonial', 'error');
        console.error(error);
    }
};

testimonialForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(testimonialForm);
    const testimonialData = {
        name: formData.get('name'),
        position: formData.get('position'),
        company: formData.get('company'),
        content: formData.get('content'),
        avatar_url: formData.get('avatar_url'),
        rating: parseInt(formData.get('rating')),
        featured: formData.get('featured') === 'true',
        order: parseInt(formData.get('order'))
    };
    
    const id = document.getElementById('testimonialId').value;
    if (id) testimonialData.id = id;
    
    try {
        await API.saveTestimonial(testimonialData);
        showToast('Testimonial saved successfully!', 'success');
        testimonialModal.classList.remove('active');
        await loadTestimonials();
    } catch (error) {
        showToast('Failed to save testimonial', 'error');
        console.error(error);
    }
});

// ============================================
// Messages Management
// ============================================
async function loadMessages() {
    state.messages = await API.getMessages();
    renderMessages();
    updateMessagesBadge();
}

function renderMessages() {
    const list = document.getElementById('messagesList');
    
    const filtered = state.currentFilter === 'all' 
        ? state.messages 
        : state.messages.filter(m => m.status === state.currentFilter);
    
    if (filtered.length === 0) {
        list.innerHTML = '<div class="empty-state"><i class="fas fa-envelope"></i><h3>No messages</h3><p>Your contact messages will appear here</p></div>';
        return;
    }
    
    list.innerHTML = filtered.map(message => `
        <div class="message-card ${message.read ? '' : 'unread'}">
            <div class="message-header">
                <div class="message-sender">
                    <h4>${message.name}</h4>
                    <p>${message.email}</p>
                </div>
                <div class="message-meta">
                    <span class="status-badge ${message.status}">${message.status}</span>
                    <span>${new Date(message.created_at).toLocaleDateString()}</span>
                </div>
            </div>
            <div class="message-subject">${message.subject}</div>
            <div class="message-content">${message.message}</div>
            <div class="message-actions">
                ${!message.read ? `<button class="btn btn-sm btn-success" onclick="markAsRead('${message.id}')">
                    <i class="fas fa-check"></i> Mark as Read
                </button>` : ''}
                <button class="btn btn-sm btn-danger" onclick="deleteMessage('${message.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function updateMessagesBadge() {
    const unreadCount = state.messages.filter(m => !m.read).length;
    document.getElementById('messagesBadge').textContent = unreadCount;
}

window.markAsRead = async (id) => {
    try {
        await API.updateMessage(id, { read: true, status: 'read' });
        showToast('Message marked as read', 'success');
        await loadMessages();
    } catch (error) {
        showToast('Failed to update message', 'error');
        console.error(error);
    }
};

window.deleteMessage = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
        await API.deleteMessage(id);
        showToast('Message deleted successfully!', 'success');
        await loadMessages();
    } catch (error) {
        showToast('Failed to delete message', 'error');
        console.error(error);
    }
};

// Message filter buttons
document.querySelectorAll('.filter-buttons .btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-buttons .btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        state.currentFilter = btn.dataset.filter;
        renderMessages();
    });
});

// ============================================
// Modal Controls
// ============================================
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').classList.remove('active');
    });
});

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// ============================================
// Initialize Application
// ============================================
async function initAdmin() {
    await Promise.all([
        loadProfile(),
        loadSkills(),
        loadProjects(),
        loadTestimonials(),
        loadMessages()
    ]);
}

initAdmin();
