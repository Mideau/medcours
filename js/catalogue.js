/**
 * =====================================================
 * CATALOGUE DES COURS - MedCours
 * =====================================================
 * 
 * Ce fichier contient toutes les données du site.
 * Modifiez-le pour ajouter/supprimer des années, matières et cours.
 * 
 * STRUCTURE:
 * - YEARS: Liste des années d'études
 * - SUBJECTS: Matières par année
 * - COURSES: Cours par année et matière
 * 
 * =====================================================
 */

const CATALOGUE = {

    // ===================================================
    // ANNÉES D'ÉTUDES
    // ===================================================
    // Ajoutez ou modifiez les années ici
    // id: identifiant unique (utilisé dans le code)
    // name: nom affiché
    // description: texte sous le nom
    
    years: [
        {
            id: "p1",
            name: "P1",
            description: "Première année"
        },
        {
            id: "p2",
            name: "P2",
            description: "Deuxième année"
        },
        {
            id: "d1",
            name: "D1",
            description: "Troisième année"
        },
        {
            id: "d2",
            name: "D2",
            description: "Quatrième année"
        }
    ],

    // ===================================================
    // MATIÈRES PAR ANNÉE
    // ===================================================
    // Chaque année a sa propre liste de matières
    // id: identifiant unique
    // name: nom affiché
    // icon: type d'icône (anatomy, physio, histo, bio, pharma, micro, cardio, neuro, general)
    
    subjects: {
        "p1": [
            { id: "anatomie", name: "Anatomie", icon: "anatomy" },
            { id: "physiologie", name: "Physiologie", icon: "physio" },
            { id: "histologie", name: "Histologie", icon: "histo" },
            { id: "biochimie", name: "Biochimie", icon: "bio" }
        ],
        "p2": [
            { id: "anatomie", name: "Anatomie", icon: "anatomy" },
            { id: "histologie", name: "Histologie", icon: "histo" },
            { id: "pharmacologie", name: "Pharmacologie", icon: "pharma" },
            { id: "microbiologie", name: "Microbiologie", icon: "micro" }
        ],
        "d1": [
            { id: "cardiologie", name: "Cardiologie", icon: "cardio" },
            { id: "neurologie", name: "Neurologie", icon: "neuro" },
            { id: "pharmacologie", name: "Pharmacologie", icon: "pharma" }
        ],
        "d2": [
            { id: "medecine-interne", name: "Médecine interne", icon: "general" },
            { id: "chirurgie", name: "Chirurgie", icon: "anatomy" }
        ]
    },

    // ===================================================
    // COURS PAR ANNÉE ET MATIÈRE
    // ===================================================
    // Format de la clé: "annee-matiere" (ex: "p1-anatomie")
    // 
    // Pour chaque cours:
    // - id: identifiant unique
    // - title: titre du cours
    // - type: "Cours", "TD", "TP", ou "Annales"
    // - pdf: chemin vers le fichier PDF (depuis la racine du site)
    // - date: date de mise à jour (optionnel)
    
    courses: {
        "p1-anatomie": [
            {
                id: "anat-intro",
                title: "Introduction à l'anatomie",
                type: "Cours",
                pdf: "pdfs/anatomie-intro.pdf",
                date: "15 Jan 2024"
            },
            {
                id: "anat-td1",
                title: "TD 1 — Les tissus",
                type: "TD",
                pdf: "pdfs/anatomie-td1.pdf",
                date: "22 Jan 2024"
            },
            {
                id: "anat-tp1",
                title: "TP 1 — Dissection",
                type: "TP",
                pdf: "pdfs/anatomie-tp1.pdf",
                date: "25 Jan 2024"
            },
            {
                id: "anat-annales",
                title: "Annales 2023",
                type: "Annales",
                pdf: "pdfs/anatomie-annales-2023.pdf",
                date: "Juin 2023"
            }
        ],
        "p1-physiologie": [
            {
                id: "physio-1",
                title: "Physiologie — Chapitre 1",
                type: "Cours",
                pdf: "pdfs/physio-1.pdf",
                date: "10 Jan 2024"
            },
            {
                id: "physio-2",
                title: "Physiologie — Chapitre 2",
                type: "Cours",
                pdf: "pdfs/physio-2.pdf",
                date: "17 Jan 2024"
            },
            {
                id: "physio-td1",
                title: "TD 1 — Électrophysiologie",
                type: "TD",
                pdf: "pdfs/physio-td1.pdf",
                date: "20 Jan 2024"
            }
        ],
        "p1-histologie": [
            {
                id: "histo-intro",
                title: "Introduction à l'histologie",
                type: "Cours",
                pdf: "pdfs/histo-intro.pdf",
                date: "12 Jan 2024"
            }
        ],
        "p1-biochimie": [
            {
                id: "biochim-1",
                title: "Les glucides",
                type: "Cours",
                pdf: "pdfs/biochimie-glucides.pdf",
                date: "8 Jan 2024"
            },
            {
                id: "biochim-2",
                title: "Les lipides",
                type: "Cours",
                pdf: "pdfs/biochimie-lipides.pdf",
                date: "15 Jan 2024"
            }
        ],
        "p2-anatomie": [
            {
                id: "anat-thorax",
                title: "Anatomie du thorax",
                type: "Cours",
                pdf: "pdfs/anatomie-thorax.pdf",
                date: "5 Sep 2024"
            }
        ],
        "p2-histologie": [
            {
                id: "histo-td1",
                title: "TD 1 — Épithélium",
                type: "TD",
                pdf: "pdfs/histo-td1.pdf",
                date: "10 Sep 2024"
            },
            {
                id: "histo-td2",
                title: "TD 2 — Tissus conjonctifs",
                type: "TD",
                pdf: "pdfs/histo-td2.pdf",
                date: "17 Sep 2024"
            }
        ],
        "p2-pharmacologie": [
            {
                id: "pharma-intro",
                title: "Introduction à la pharmacologie",
                type: "Cours",
                pdf: "pdfs/pharma-intro.pdf",
                date: "3 Sep 2024"
            }
        ],
        "p2-microbiologie": [
            {
                id: "micro-bact",
                title: "Bactériologie générale",
                type: "Cours",
                pdf: "pdfs/micro-bacterio.pdf",
                date: "6 Sep 2024"
            }
        ],
        "d1-cardiologie": [
            {
                id: "cardio-1",
                title: "Physiologie cardiaque",
                type: "Cours",
                pdf: "pdfs/cardio-physio.pdf",
                date: "2 Sep 2024"
            }
        ],
        "d1-neurologie": [
            {
                id: "neuro-1",
                title: "Neuroanatomie",
                type: "Cours",
                pdf: "pdfs/neuro-anatomie.pdf",
                date: "4 Sep 2024"
            }
        ],
        "d1-pharmacologie": [
            {
                id: "pharma-avance",
                title: "Pharmacologie avancée",
                type: "Cours",
                pdf: "pdfs/pharma-avance.pdf",
                date: "8 Sep 2024"
            }
        ],
        "d2-medecine-interne": [
            {
                id: "med-int-1",
                title: "Sémiologie générale",
                type: "Cours",
                pdf: "pdfs/med-int-semio.pdf",
                date: "1 Sep 2024"
            }
        ],
        "d2-chirurgie": [
            {
                id: "chir-1",
                title: "Bases de la chirurgie",
                type: "Cours",
                pdf: "pdfs/chirurgie-bases.pdf",
                date: "5 Sep 2024"
            }
        ]
    }
};

// =====================================================
// NE PAS MODIFIER CI-DESSOUS
// (Export pour utilisation dans app.js)
// =====================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CATALOGUE;
}
