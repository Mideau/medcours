/**
 * =====================================================
 * CATALOGUE DES COURS - Faczone
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
            { id: "anatomie",  name: "Anatomie",                         icon: "anatomy" },
            { id: "histologie", name: "Histologie",                       icon: "histo"   },
            { id: "genetique",  name: "Génétique & Biologie Moléculaire", icon: "bio"     }
        ],
        "p2": [
            { id: "anatomie",     name: "Anatomie",      icon: "anatomy" },
            { id: "histologie",   name: "Histologie",    icon: "histo"   },
            { id: "pharmacologie", name: "Pharmacologie", icon: "pharma" }
        ],
        "d1": [
            { id: "neurologie",   name: "Neurologie",   icon: "neuro"    },
            { id: "pharmacologie", name: "Pharmacologie", icon: "pharma" },
            { id: "techniques",   name: "Techniques",   icon: "general"  },
            { id: "semiologie",   name: "Sémiologie",   icon: "cardio"   }
        ],
        "d2": [
            { id: "medecine-interne", name: "Médecine Interne", icon: "general" },
            { id: "chirurgie",        name: "Chirurgie",         icon: "anatomy" }
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

        // ----- P1 -----
        "p1-anatomie": [
            { id: "p1-anat-1", title: "L'Ovaire",                       type: "Cours", pdf: "pdfs/L'OVAIRE.pdf" },
            { id: "p1-anat-2", title: "L'Utérus",                        type: "Cours", pdf: "pdfs/L'UTERUS.pdf" },
            { id: "p1-anat-3", title: "Topographie Générale du Thorax",   type: "Cours", pdf: "pdfs/TOPOGRAHIE GENERALE DU THORAX.pdf" },
            { id: "p1-anat-4", title: "Topographie de l'Abdomen",         type: "Cours", pdf: "pdfs/topographie de l abdomen.pdf" },
            { id: "p1-anat-5", title: "Trachée, Bronches et Poumons",     type: "Cours", pdf: "pdfs/TRACHEE - BRONCHES - POUMONS.pdf" },
            { id: "p1-anat-6", title: "Appareil Génital Féminin",         type: "Cours", pdf: "pdfs/Appareil génital féminin cours pwp -om.pdf" }
        ],

        "p1-histologie": [
            { id: "p1-histo-1", title: "Endosomes et Lysosomes", type: "Cours", pdf: "pdfs/Endosome Lysosomes cours Etudiants.pdf" }
        ],

        "p1-genetique": [
            { id: "p1-gen-1", title: "Éléments de Génétique Moléculaire",         type: "Cours", pdf: "pdfs/ELEMENTS  DE GENETIQUE (BIOLOGIE) MOLECULAIRE - Copie.pdf" },
            { id: "p1-gen-2", title: "Suite — Éléments de Génétique Moléculaire", type: "Cours", pdf: "pdfs/SUITE-ELEMENTS DE GENETIQUE MOLECULAIRE.pdf" },
            { id: "p1-gen-3", title: "Les Acides Nucléiques",                      type: "Cours", pdf: "pdfs/acides nucléiques étudiant.pdf" },
            { id: "p1-gen-4", title: "Traduction",                                 type: "Cours", pdf: "pdfs/traduc 2 - Copie.pdf" },
            { id: "p1-gen-5", title: "Transcription",                              type: "Cours", pdf: "pdfs/trans 2 - Copie.pdf" },
            { id: "p1-gen-6", title: "Explorations Cytogénétiques",                type: "Cours", pdf: "pdfs/Expllorations cytogénétiques (2).pdf" },
            { id: "p1-gen-7", title: "Malformations Congénitales",                 type: "Cours", pdf: "pdfs/MALFORMATIONS CONGENITALESPrésentation1.pdf" },
            { id: "p1-gen-8", title: "Embryologie de l'Appareil Génital",          type: "Cours", pdf: "pdfs/EMBRYOLOGIE DE L'APPAREIL GENITAl( MASCULIN  ET FEMININ) - première partie-Copie.pdf" }
        ],

        // ----- P2 -----
        "p2-anatomie": [
            { id: "p2-anat-1", title: "Le Foie",        type: "Cours", pdf: "pdfs/Foie.pdf" },
            { id: "p2-anat-2", title: "Les Surrénales",  type: "Cours", pdf: "pdfs/SURRENALES L2 last.pdf" }
        ],

        "p2-histologie": [
            { id: "p2-histo-1", title: "Histologie de l'Appareil Respiratoire", type: "Cours", pdf: "pdfs/cours Ndiaga histologie appareil respiratoire .pdf" },
            { id: "p2-histo-2", title: "Histologie de l'Appareil Génital Mâle", type: "Cours", pdf: "pdfs/Appareil Génital mâle Histo..pdf" }
        ],

        "p2-pharmacologie": [
            { id: "p2-pharma-1", title: "Les Stéroïdes", type: "Cours", pdf: "pdfs/FMPO-L2S1-STEROIDES-STD (1).pdf" }
        ],

        // ----- D1 -----
        "d1-neurologie": [
            { id: "d1-neuro-1", title: "Motilité Volontaire",     type: "Cours", pdf: "pdfs/Motilité volontaire.pdf" },
            { id: "d1-neuro-2", title: "Présentation Neurologie", type: "Cours", pdf: "pdfs/Présentation1.pdf" }
        ],

        "d1-pharmacologie": [
            { id: "d1-pharma-1", title: "Métabolisme des Médicaments",         type: "Cours", pdf: "pdfs/METABOLISME_MDCTS.pdf" },
            { id: "d1-pharma-2", title: "Éléments de Pharmacocinétique",        type: "Cours", pdf: "pdfs/ELEMENTS_PK.pdf" },
            { id: "d1-pharma-3", title: "Mécanismes d'Action des Médicaments",  type: "Cours", pdf: "pdfs/MECANISME D'ACTION DES MEDICAMENTS 070217 DER.pdf" }
        ],

        "d1-techniques": [
            { id: "d1-tech-1", title: "Les Techniques", type: "Cours", pdf: "pdfs/Les Techniques D1 PWER.pdf" }
        ],

        "d1-semiologie": [
            { id: "d1-semio-1", title: "Séméiologie des Splénomégalies", type: "Cours", pdf: "pdfs/séméiologie des SPLENOMEGALIES.pdf" },
            { id: "d1-semio-2", title: "Sémiologie de l'Anémie",          type: "Cours", pdf: "pdfs/sémio anémie  2017.pdf", date: "2017" }
        ],

        // ----- D2 -----
        "d2-medecine-interne": [
            { id: "d2-med-1", title: "CAT devant une Hémorragie Digestive",    type: "Cours", pdf: "pdfs/Conduite à tenir devant une hémorragie digestve.pdf" },
            { id: "d2-med-2", title: "Abcès du Poumon",                         type: "Cours", pdf: "pdfs/ABCES DU POUMON.pdf" },
            { id: "d2-med-3", title: "Bronchopneumopathies Aiguës Virales",     type: "Cours", pdf: "pdfs/Bronchopneumopathies aiguës virales.pdf" },
            { id: "d2-med-4", title: "Cancer de l'Œsophage",                   type: "Cours", pdf: "pdfs/Cancer de l'oesophage 2016-2017.pdf", date: "2016-2017" },
            { id: "d2-med-5", title: "L'Asthme",                                type: "Cours", pdf: "pdfs/asthme DII 2016 n°2.pdf", date: "2016" },
            { id: "d2-med-6", title: "Artériopathie Oblitérante — Ischémie Critique", type: "Cours", pdf: "pdfs/ACOMI  ISCH CRITIQUE.pdf" },
            { id: "d2-med-7", title: "Cardiopathies Congénitales Cyanogènes",   type: "Cours", pdf: "pdfs/Cardiopathies congénitales cyanogénes Dakar Janv 2017.pdf", date: "Jan 2017" },
            { id: "d2-med-8", title: "Pityriasis Versicolor",                   type: "Cours", pdf: "pdfs/PITYRIASIS VERSICOLOR.pdf" }
        ],

        "d2-chirurgie": [
            { id: "d2-chir-1", title: "Appendicite Aiguë",         type: "Cours", pdf: "pdfs/Appendicite aiguë - Copie.pdf" },
            { id: "d2-chir-2", title: "Contusions Abdominales",     type: "Cours", pdf: "pdfs/contusions abdominales.pdf" },
            { id: "d2-chir-3", title: "Atrésie de l'Œsophage",     type: "Cours", pdf: "pdfs/ATRESIE DE L'OESOPHAGE.pdf" }
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


// =====================================================
// BIBLIOTHÈQUE — Livres open source en PDF
// =====================================================
// Pour ajouter un livre :
// 1. Placez votre PDF dans le dossier pdfs/
// 2. Copiez un bloc ci-dessous et modifiez les champs
//
// Champs :
// - id       : identifiant unique (ex: "livre-1")
// - title    : titre du livre
// - author   : auteur(s)
// - description : courte description
// - category : catégorie (ex: "Anatomie", "Physiologie", "Biochimie"...)
// - pdf      : chemin vers le fichier PDF (depuis la racine du site)
// - date     : année ou date de publication (optionnel)

const BIBLIOTHEQUE = [];


// =====================================================
// EXAMENS — Sujets et annales d'examens
// =====================================================
// Pour ajouter un examen :
// 1. Placez votre PDF dans le dossier pdfs/
// 2. Copiez un bloc ci-dessous et modifiez les champs
//
// Champs :
// - id      : identifiant unique
// - title   : intitulé de l'examen
// - subject : matière concernée
// - year    : année d'études (ex: "P1", "P2", "D1", "D2")
// - type    : type d'épreuve ("QCM", "Rédaction", "Oral", "Pratique")
// - pdf     : chemin vers le fichier PDF
// - date    : date de l'examen (ex: "Juin 2023")

const EXAMENS = [];


// =====================================================
// TRAVAUX PRATIQUES — Fiches et supports de TP
// =====================================================
// Pour ajouter un TP :
// 1. Placez votre PDF dans le dossier pdfs/
// 2. Copiez un bloc ci-dessous et modifiez les champs
//
// Champs :
// - id      : identifiant unique
// - title   : titre du TP
// - subject : matière
// - year    : année d'études
// - type    : type ("TP Pratique", "Compte-rendu", "Protocole", "Rapport")
// - pdf     : chemin vers le fichier PDF
// - date    : date de mise à jour (optionnel)

const TRAVAUX_PRATIQUES = [];
