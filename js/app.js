/**
 * =====================================================
 * Faczone - Application JavaScript
 * =====================================================
 */

// État de l'application
let currentYear = null;
let currentSubject = null;
let currentFilter = 'all';

// Icônes SVG pour les matières
const ICONS = {
    anatomy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M12 6v12M8 12h8"/>
    </svg>`,
    physio: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>`,
    histo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>`,
    bio: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4"/>
    </svg>`,
    pharma: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/>
        <path d="M12 8v8M8 12h8"/>
    </svg>`,
    micro: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="4"/>
        <circle cx="12" cy="12" r="8"/>
        <line x1="12" y1="2" x2="12" y2="4"/>
        <line x1="12" y1="20" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="4" y2="12"/>
        <line x1="20" y1="12" x2="22" y2="12"/>
    </svg>`,
    cardio: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>`,
    neuro: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
        <path d="M12 2c-2.5 2.5-4 5.5-4 10s1.5 7.5 4 10"/>
        <path d="M12 2c2.5 2.5 4 5.5 4 10s-1.5 7.5-4 10"/>
        <path d="M2 12h20"/>
    </svg>`,
    general: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>`,
    pdf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
    </svg>`,
    year: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>`
};

// =====================================================
// NAVIGATION
// =====================================================

function showPage(pageId) {
    // Masquer toutes les pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Afficher la page demandée
    const page = document.getElementById(`page-${pageId}`);
    if (page) {
        page.classList.add('active');
    }
    
    // Actions spécifiques par page
    if (pageId === 'years') {
        renderYears();
    }
    
    // Scroll en haut
    window.scrollTo(0, 0);
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

// =====================================================
// RENDU DES ANNÉES
// =====================================================

function renderYears() {
    const grid = document.getElementById('years-grid');
    grid.innerHTML = '';
    
    CATALOGUE.years.forEach((year, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.animationDelay = `${index * 0.05}s`;
        card.onclick = () => selectYear(year.id);
        
        card.innerHTML = `
            <div class="card-icon">${ICONS.year}</div>
            <h3 class="card-title">${year.name}</h3>
            <p class="card-subtitle">${year.description}</p>
            <div class="card-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function selectYear(yearId) {
    currentYear = yearId;
    const yearData = CATALOGUE.years.find(y => y.id === yearId);
    
    // Mettre à jour le breadcrumb
    document.getElementById('breadcrumb-year').textContent = yearData.name;
    document.getElementById('subjects-subtitle').textContent = 
        `Matières disponibles pour l'année ${yearData.name}`;
    
    // Afficher les matières
    renderSubjects(yearId);
    showPage('subjects');
}

// =====================================================
// RENDU DES MATIÈRES
// =====================================================

function renderSubjects(yearId) {
    const grid = document.getElementById('subjects-grid');
    const subjects = CATALOGUE.subjects[yearId] || [];
    
    grid.innerHTML = '';
    
    if (subjects.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <p>Aucune matière disponible pour cette année.</p>
            </div>
        `;
        return;
    }
    
    subjects.forEach((subject, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.animationDelay = `${index * 0.05}s`;
        card.onclick = () => selectSubject(subject.id);
        
        const icon = ICONS[subject.icon] || ICONS.general;
        
        card.innerHTML = `
            <div class="card-icon">${icon}</div>
            <h3 class="card-title">${subject.name}</h3>
            <p class="card-subtitle">${countCourses(yearId, subject.id)} documents</p>
            <div class="card-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function countCourses(yearId, subjectId) {
    const key = `${yearId}-${subjectId}`;
    const courses = CATALOGUE.courses[key] || [];
    return courses.length;
}

function selectSubject(subjectId) {
    currentSubject = subjectId;
    const yearData = CATALOGUE.years.find(y => y.id === currentYear);
    const subjectData = CATALOGUE.subjects[currentYear].find(s => s.id === subjectId);
    
    // Mettre à jour les breadcrumbs et titres
    document.getElementById('breadcrumb-year-link').textContent = yearData.name;
    document.getElementById('breadcrumb-subject').textContent = subjectData.name;
    document.getElementById('courses-title').textContent = 
        `${subjectData.name} — ${yearData.name}`;
    
    // Réinitialiser la recherche et les filtres
    document.getElementById('search-input').value = '';
    currentFilter = 'all';
    updateFilterButtons();
    
    // Afficher les cours
    renderCourses();
    showPage('courses');
}

function goBackToSubjects() {
    showPage('subjects');
}

// =====================================================
// RENDU DES COURS
// =====================================================

function renderCourses() {
    const list = document.getElementById('courses-list');
    const noResults = document.getElementById('no-results');
    const key = `${currentYear}-${currentSubject}`;
    let courses = CATALOGUE.courses[key] || [];
    
    // Appliquer la recherche
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    if (searchTerm) {
        courses = courses.filter(c => 
            c.title.toLowerCase().includes(searchTerm)
        );
    }
    
    // Appliquer le filtre par type
    if (currentFilter !== 'all') {
        courses = courses.filter(c => c.type === currentFilter);
    }
    
    // Mettre à jour le compteur
    document.getElementById('courses-count').textContent = 
        `${courses.length} document${courses.length > 1 ? 's' : ''} disponible${courses.length > 1 ? 's' : ''}`;
    
    list.innerHTML = '';
    
    if (courses.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    courses.forEach((course, index) => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.style.animationDelay = `${index * 0.03}s`;
        
        const badgeClass = course.type.toLowerCase();
        
        card.innerHTML = `
            <div class="course-icon">${ICONS.pdf}</div>
            <div class="course-info">
                <div class="course-header">
                    <span class="course-title">${course.title}</span>
                    <span class="course-badge ${badgeClass}">${course.type}</span>
                </div>
                ${course.date ? `<span class="course-date">Mis à jour: ${course.date}</span>` : ''}
            </div>
            <div class="course-actions">
                <button class="btn-action btn-view" onclick="viewPdf('${course.id}')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                    <span>Voir</span>
                </button>
                <a class="btn-action btn-dl" href="${course.pdf}" download>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    <span>Télécharger</span>
                </a>
            </div>
        `;
        
        list.appendChild(card);
    });
}

function filterCourses() {
    renderCourses();
}

function setFilter(filter) {
    currentFilter = filter;
    updateFilterButtons();
    renderCourses();
}

function updateFilterButtons() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// =====================================================
// VISIONNEUSE PDF
// =====================================================

function viewPdf(courseId) {
    const key = `${currentYear}-${currentSubject}`;
    const courses = CATALOGUE.courses[key] || [];
    const course = courses.find(c => c.id === courseId);
    
    if (!course) return;
    
    // Mettre à jour le viewer
    document.getElementById('viewer-title').textContent = course.title;
    document.getElementById('viewer-download').href = course.pdf;
    document.getElementById('fallback-download').href = course.pdf;
    
    const iframe = document.getElementById('pdf-viewer');
    const fallback = document.getElementById('viewer-fallback');
    
    // Essayer d'afficher le PDF
    iframe.src = course.pdf;
    iframe.style.display = 'block';
    fallback.style.display = 'none';
    
    // Gérer les erreurs de chargement
    iframe.onerror = function() {
        iframe.style.display = 'none';
        fallback.style.display = 'flex';
    };
    
    showPage('viewer');
}

function goBackToCourses() {
    // Nettoyer l'iframe
    document.getElementById('pdf-viewer').src = '';
    showPage('courses');
}

// =====================================================
// INITIALISATION
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    // Afficher la page d'accueil par défaut
    showPage('home');
    
    // Fermer le menu mobile quand on clique ailleurs
    document.addEventListener('click', function(e) {
        const menu = document.getElementById('mobileMenu');
        const btn = document.querySelector('.mobile-menu-btn');
        
        if (!menu.contains(e.target) && !btn.contains(e.target)) {
            menu.classList.remove('active');
        }
    });
    
    // Gestion du clavier pour la recherche
    document.getElementById('search-input').addEventListener('keyup', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            filterCourses();
        }
    });
});

// Détecter si on ouvre le fichier en local (file://)
// et afficher un message si nécessaire
if (window.location.protocol === 'file:') {
    console.info(`
╔══════════════════════════════════════════════════════════════╗
║                          Faczone                             ║
║                                                              ║
║  ⚠️  Vous ouvrez ce fichier en mode local (file://)          ║
║                                                              ║
║  Les PDFs peuvent ne pas s'afficher correctement.            ║
║  Pour une meilleure expérience, lancez un serveur local :    ║
║                                                              ║
║  Option 1: npx serve .                                       ║
║  Option 2: python3 -m http.server 8000                       ║
║  Option 3: php -S localhost:8000                             ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
    `);
}
