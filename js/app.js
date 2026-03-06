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
    if (pageId === 'years')              renderYears();
    if (pageId === 'bibliotheque')       renderBibliotheque();
    if (pageId === 'examens')            renderExamens();
    if (pageId === 'travaux-pratiques')  renderTP();

    // CTA banner : visible sur toutes les pages sauf le viewer, masqué si connecté
    const ctaBanner = document.getElementById('cta-banner');
    if (ctaBanner) {
        const loggedIn = !!getSession();
        ctaBanner.style.display = (pageId === 'viewer' || loggedIn) ? 'none' : 'block';
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
    document.getElementById('pdf-viewer').src = '';
    showPage(lastViewerOrigin);
}

// Viewer direct (sans contexte année/matière)
let lastViewerOrigin = 'courses';

function viewPdfDirect(title, pdfPath, origin) {
    lastViewerOrigin = origin || 'courses';
    document.getElementById('viewer-title').textContent = title;
    document.getElementById('viewer-download').href = pdfPath;
    document.getElementById('fallback-download').href = pdfPath;

    const iframe   = document.getElementById('pdf-viewer');
    const fallback = document.getElementById('viewer-fallback');
    iframe.src = pdfPath;
    iframe.style.display = 'block';
    fallback.style.display = 'none';
    iframe.onerror = function() {
        iframe.style.display = 'none';
        fallback.style.display = 'flex';
    };
    showPage('viewer');
}

// =====================================================
// BIBLIOTHÈQUE
// =====================================================

let libFilter = 'all';

function renderBibliotheque() {
    const grid     = document.getElementById('books-grid');
    const noRes    = document.getElementById('lib-no-results');
    const search   = document.getElementById('lib-search').value.toLowerCase();

    // Générer les boutons de filtre dynamiquement (une seule fois)
    buildLibFilters();

    let items = BIBLIOTHEQUE;
    if (libFilter !== 'all') items = items.filter(b => b.category === libFilter);
    if (search) items = items.filter(b =>
        b.title.toLowerCase().includes(search) ||
        b.author.toLowerCase().includes(search) ||
        b.description.toLowerCase().includes(search)
    );

    grid.innerHTML = '';
    if (items.length === 0) { noRes.style.display = 'block'; return; }
    noRes.style.display = 'none';

    items.forEach((book, i) => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.style.animationDelay = `${i * 0.04}s`;
        card.innerHTML = `
            <div class="book-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
            </div>
            <div class="book-info">
                <div class="book-header">
                    <span class="book-title">${book.title}</span>
                    <span class="book-badge">${book.category}</span>
                </div>
                <p class="book-author">${book.author}${book.date ? ' · ' + book.date : ''}</p>
                <p class="book-desc">${book.description}</p>
            </div>
            <div class="course-actions">
                <button class="btn-action btn-view" onclick="viewPdfDirect('${book.title.replace(/'/g,"\\'")}', '${book.pdf}', 'bibliotheque')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                    <span>Voir</span>
                </button>
                <a class="btn-action btn-dl" href="${book.pdf}" download>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    <span>Télécharger</span>
                </a>
            </div>
        `;
        grid.appendChild(card);
    });
}

let libFiltersBuilt = false;
function buildLibFilters() {
    if (libFiltersBuilt) return;
    const container = document.getElementById('lib-filters');
    const categories = [...new Set(BIBLIOTHEQUE.map(b => b.category))].sort();
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.filter = cat;
        btn.textContent = cat;
        btn.onclick = () => setLibFilter(cat);
        container.appendChild(btn);
    });
    libFiltersBuilt = true;
}

function setLibFilter(f) {
    libFilter = f;
    document.querySelectorAll('#lib-filters .filter-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.filter === f)
    );
    renderBibliotheque();
}

function filterBibliotheque() { renderBibliotheque(); }

// =====================================================
// EXAMENS
// =====================================================

let examFilter = 'all';

function renderExamens() {
    const list  = document.getElementById('exam-list');
    const noRes = document.getElementById('exam-no-results');
    const search = document.getElementById('exam-search').value.toLowerCase();

    let items = EXAMENS;
    if (examFilter !== 'all') items = items.filter(e => e.year === examFilter);
    if (search) items = items.filter(e =>
        e.title.toLowerCase().includes(search) ||
        e.subject.toLowerCase().includes(search)
    );

    list.innerHTML = '';
    if (items.length === 0) { noRes.style.display = 'block'; return; }
    noRes.style.display = 'none';

    items.forEach((exam, i) => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.style.animationDelay = `${i * 0.04}s`;
        card.innerHTML = `
            <div class="course-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 11l3 3L22 4"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
            </div>
            <div class="course-info">
                <div class="course-header">
                    <span class="course-title">${exam.title}</span>
                    <span class="course-badge cours">${exam.year}</span>
                    <span class="course-badge td">${exam.type}</span>
                </div>
                <span class="course-date">${exam.subject}${exam.date ? ' · ' + exam.date : ''}</span>
            </div>
            <div class="course-actions">
                <button class="btn-action btn-view" onclick="viewPdfDirect('${exam.title.replace(/'/g,"\\'")}', '${exam.pdf}', 'examens')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                    <span>Voir</span>
                </button>
                <a class="btn-action btn-dl" href="${exam.pdf}" download>
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

function setExamFilter(f) {
    examFilter = f;
    document.querySelectorAll('#page-examens .filter-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.filter === f)
    );
    renderExamens();
}

function filterExamens() { renderExamens(); }

// =====================================================
// TRAVAUX PRATIQUES
// =====================================================

let tpFilter = 'all';

function renderTP() {
    const list  = document.getElementById('tp-list');
    const noRes = document.getElementById('tp-no-results');
    const search = document.getElementById('tp-search').value.toLowerCase();

    let items = TRAVAUX_PRATIQUES;
    if (tpFilter !== 'all') items = items.filter(t => t.year === tpFilter);
    if (search) items = items.filter(t =>
        t.title.toLowerCase().includes(search) ||
        t.subject.toLowerCase().includes(search)
    );

    list.innerHTML = '';
    if (items.length === 0) { noRes.style.display = 'block'; return; }
    noRes.style.display = 'none';

    items.forEach((tp, i) => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.style.animationDelay = `${i * 0.04}s`;
        card.innerHTML = `
            <div class="course-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                </svg>
            </div>
            <div class="course-info">
                <div class="course-header">
                    <span class="course-title">${tp.title}</span>
                    <span class="course-badge cours">${tp.year}</span>
                    <span class="course-badge tp">${tp.type}</span>
                </div>
                <span class="course-date">${tp.subject}${tp.date ? ' · ' + tp.date : ''}</span>
            </div>
            <div class="course-actions">
                <button class="btn-action btn-view" onclick="viewPdfDirect('${tp.title.replace(/'/g,"\\'")}', '${tp.pdf}', 'travaux-pratiques')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                    <span>Voir</span>
                </button>
                <a class="btn-action btn-dl" href="${tp.pdf}" download>
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

function setTPFilter(f) {
    tpFilter = f;
    document.querySelectorAll('#page-travaux-pratiques .filter-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.filter === f)
    );
    renderTP();
}

function filterTP() { renderTP(); }

// =====================================================
// INITIALISATION
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    // Afficher la page d'accueil par défaut
    showPage('home');

    // Restaurer la session
    updateNavbar();

    // Fermer le menu mobile + dropdown quand on clique ailleurs
    document.addEventListener('click', function(e) {
        const menu = document.getElementById('mobileMenu');
        const btn = document.querySelector('.mobile-menu-btn');

        if (!menu.contains(e.target) && !btn.contains(e.target)) {
            menu.classList.remove('active');
        }

        const navUser   = document.getElementById('nav-user');
        const dropdown  = document.getElementById('user-dropdown');
        if (navUser && !navUser.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });

    // Gestion du clavier pour la recherche
    document.getElementById('search-input').addEventListener('keyup', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            filterCourses();
        }
    });

    // Fermer le modal avec Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.getElementById('auth-modal').classList.remove('open');
            document.body.style.overflow = '';
        }
    });
});

// =====================================================
// AUTHENTIFICATION
// =====================================================

const STORAGE_USERS   = 'faczone_users';
const STORAGE_SESSION = 'faczone_session';

function getUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_USERS) || '[]');
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

function getSession() {
    return JSON.parse(localStorage.getItem(STORAGE_SESSION) || 'null');
}

function saveSession(user) {
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(user));
}

function clearSession() {
    localStorage.removeItem(STORAGE_SESSION);
}

function hashPassword(pw) {
    // Simple deterministic hash for demo (not cryptographic)
    return btoa(encodeURIComponent(pw + '_faczone'));
}

function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

// --- Modal control ---

function openAuthModal(tab) {
    switchTab(tab || 'login');
    document.getElementById('auth-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
    // Close user dropdown if open
    document.getElementById('user-dropdown').classList.remove('open');
}

function closeAuthModal(event) {
    if (event && event.target !== document.getElementById('auth-modal')) return;
    document.getElementById('auth-modal').classList.remove('open');
    document.body.style.overflow = '';
    clearAuthForms();
}

function clearAuthForms() {
    ['login-email','login-password','reg-name','reg-email','reg-password','reg-confirm'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.value = ''; el.classList.remove('error'); }
    });
    document.getElementById('login-error').textContent = '';
    document.getElementById('register-error').textContent = '';
}

function switchTab(tab) {
    const isLogin = tab === 'login';
    document.getElementById('tab-login').classList.toggle('active', isLogin);
    document.getElementById('tab-register').classList.toggle('active', !isLogin);
    document.getElementById('form-login').classList.toggle('hidden', !isLogin);
    document.getElementById('form-register').classList.toggle('hidden', isLogin);
}

// --- Handlers ---

function handleLogin(e) {
    e.preventDefault();
    const email    = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;
    const errorEl  = document.getElementById('login-error');

    errorEl.textContent = '';
    const users = getUsers();
    const user  = users.find(u => u.email === email && u.password === hashPassword(password));

    if (!user) {
        errorEl.textContent = 'E-mail ou mot de passe incorrect.';
        document.getElementById('login-email').classList.add('error');
        document.getElementById('login-password').classList.add('error');
        return;
    }

    saveSession({ name: user.name, email: user.email });
    updateNavbar();
    document.getElementById('auth-modal').classList.remove('open');
    document.body.style.overflow = '';
    clearAuthForms();
    showToast(`Bienvenue, ${user.name.split(' ')[0]} !`, 'success');
}

function handleRegister(e) {
    e.preventDefault();
    const name     = document.getElementById('reg-name').value.trim();
    const email    = document.getElementById('reg-email').value.trim().toLowerCase();
    const password = document.getElementById('reg-password').value;
    const confirm  = document.getElementById('reg-confirm').value;
    const errorEl  = document.getElementById('register-error');

    errorEl.textContent = '';
    ['reg-name','reg-email','reg-password','reg-confirm'].forEach(id => {
        document.getElementById(id).classList.remove('error');
    });

    if (name.length < 2) {
        errorEl.textContent = 'Veuillez entrer votre prénom et nom.';
        document.getElementById('reg-name').classList.add('error');
        return;
    }
    if (password.length < 6) {
        errorEl.textContent = 'Le mot de passe doit contenir au moins 6 caractères.';
        document.getElementById('reg-password').classList.add('error');
        return;
    }
    if (password !== confirm) {
        errorEl.textContent = 'Les mots de passe ne correspondent pas.';
        document.getElementById('reg-confirm').classList.add('error');
        return;
    }

    const users = getUsers();
    if (users.find(u => u.email === email)) {
        errorEl.textContent = 'Un compte existe déjà avec cet e-mail.';
        document.getElementById('reg-email').classList.add('error');
        return;
    }

    const newUser = { name, email, password: hashPassword(password) };
    users.push(newUser);
    saveUsers(users);
    saveSession({ name, email });
    updateNavbar();
    document.getElementById('auth-modal').classList.remove('open');
    document.body.style.overflow = '';
    clearAuthForms();
    showToast(`Compte créé ! Bienvenue, ${name.split(' ')[0]} 🎉`, 'success');
}

function logout() {
    clearSession();
    document.getElementById('user-dropdown').classList.remove('open');
    updateNavbar();
    showToast('Vous avez été déconnecté.', '');
}

// --- Navbar state ---

function updateNavbar() {
    const session  = getSession();
    const navAuth  = document.getElementById('nav-auth');
    const navUser  = document.getElementById('nav-user');

    if (session) {
        navAuth.style.display = 'none';
        navUser.style.display = 'block';
        const initials = getInitials(session.name);
        document.getElementById('nav-avatar').textContent      = initials;
        document.getElementById('dropdown-avatar').textContent = initials;
        document.getElementById('nav-name').textContent        = session.name.split(' ')[0];
        document.getElementById('dropdown-name').textContent   = session.name;
        document.getElementById('dropdown-email').textContent  = session.email;
    } else {
        navAuth.style.display = 'flex';
        navUser.style.display = 'none';
    }

    // CTA banner
    const ctaBanner = document.getElementById('cta-banner');
    if (ctaBanner) {
        const activePage = document.querySelector('.page.active');
        const isViewer = activePage && activePage.id === 'page-viewer';
        ctaBanner.style.display = (session || isViewer) ? 'none' : 'block';
    }
}

function toggleUserDropdown() {
    document.getElementById('user-dropdown').classList.toggle('open');
}

// --- Helpers ---

function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const isText = input.type === 'text';
    input.type = isText ? 'password' : 'text';
    btn.innerHTML = isText
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
}

let toastTimer = null;

function showToast(message, type) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast' + (type ? ' ' + type : '');
    clearTimeout(toastTimer);
    // Force reflow
    void toast.offsetWidth;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

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
