# MedCours — Bibliothèque de cours de médecine en PDF

![MedCours](https://img.shields.io/badge/MedCours-MVP-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

Un site web MVP simple et élégant pour accéder à des cours de médecine au format PDF, classés par année et par matière.

---

## 🚀 Démarrage rapide

### Option 1 : Serveur local (recommandé)

Pour une expérience optimale avec l'affichage des PDFs :

```bash
# Avec Node.js (npx)
npx serve .

# OU avec Python 3
python3 -m http.server 8000

# OU avec PHP
php -S localhost:8000
```

Puis ouvrez `http://localhost:8000` (ou le port indiqué) dans votre navigateur.

### Option 2 : Double-clic sur index.html

Vous pouvez ouvrir `index.html` directement dans votre navigateur. 
⚠️ **Note** : L'affichage des PDFs peut être limité. Utilisez le bouton "Télécharger" si nécessaire.

---

## 📁 Structure du projet

```
medcours/
├── index.html          # Page principale (toutes les vues)
├── css/
│   └── style.css       # Styles (design médical premium)
├── js/
│   ├── catalogue.js    # 📚 DONNÉES DES COURS (à modifier)
│   └── app.js          # Logique de l'application
├── pdfs/               # 📄 VOS FICHIERS PDF ICI
│   ├── anatomie-intro.pdf
│   ├── anatomie-td1.pdf
│   └── ...
└── README.md           # Ce fichier
```

---

## 📚 Comment ajouter vos propres cours

### Étape 1 : Ajouter vos PDFs

Placez vos fichiers PDF dans le dossier `pdfs/`.

Exemple :
```
pdfs/
├── mon-cours-anatomie.pdf
├── td-physiologie-1.pdf
└── annales-2024.pdf
```

### Étape 2 : Modifier le catalogue

Ouvrez le fichier `js/catalogue.js` et modifiez les données.

#### Ajouter une nouvelle année

```javascript
years: [
    { id: "p1", name: "P1", description: "Première année" },
    { id: "p2", name: "P2", description: "Deuxième année" },
    // Ajoutez ici :
    { id: "d3", name: "D3", description: "Cinquième année" }
]
```

#### Ajouter des matières pour une année

```javascript
subjects: {
    "p1": [
        { id: "anatomie", name: "Anatomie", icon: "anatomy" },
        // Ajoutez ici :
        { id: "embryologie", name: "Embryologie", icon: "histo" }
    ],
    // Pour la nouvelle année D3 :
    "d3": [
        { id: "pediatrie", name: "Pédiatrie", icon: "cardio" },
        { id: "gynecologie", name: "Gynécologie", icon: "general" }
    ]
}
```

#### Ajouter des cours

```javascript
courses: {
    // Clé = "annee-matiere"
    "p1-anatomie": [
        {
            id: "anat-1",                    // Identifiant unique
            title: "Mon nouveau cours",       // Titre affiché
            type: "Cours",                    // Cours, TD, TP, ou Annales
            pdf: "pdfs/mon-cours.pdf",        // Chemin vers le PDF
            date: "20 Jan 2024"               // Date (optionnel)
        }
    ],
    // Nouvelle matière :
    "d3-pediatrie": [
        {
            id: "ped-1",
            title: "Introduction à la pédiatrie",
            type: "Cours",
            pdf: "pdfs/pediatrie-intro.pdf",
            date: "5 Mar 2024"
        }
    ]
}
```

### Icônes disponibles pour les matières

| Icône | Description |
|-------|-------------|
| `anatomy` | Anatomie |
| `physio` | Physiologie (ECG) |
| `histo` | Histologie (cellule) |
| `bio` | Biochimie |
| `pharma` | Pharmacologie (croix médicale) |
| `micro` | Microbiologie |
| `cardio` | Cardiologie (cœur) |
| `neuro` | Neurologie (cerveau) |
| `general` | Général (graduation) |

---

## 🎨 Personnalisation

### Couleurs

Les couleurs principales sont définies dans `css/style.css` :

```css
:root {
    --primary: #1E3A8A;        /* Bleu médical principal */
    --primary-dark: #1E3070;   /* Bleu foncé (hover) */
    --primary-light: #3B5BA9;  /* Bleu clair */
    /* ... */
}
```

### Logo

Le logo "MedCours" est un SVG intégré dans `index.html`. Recherchez `<svg class="logo-icon"` pour le modifier.

---

## 🎯 Présentation investisseur

Points clés à mettre en avant :

1. **Problème** : Les étudiants en médecine ont du mal à organiser et retrouver leurs cours.

2. **Solution** : Une plateforme simple et intuitive pour accéder à tous les cours PDF, classés par année et matière.

3. **Démonstration** :
   - Montrer la navigation fluide (Accueil → Année → Matière → Cours)
   - Montrer la recherche et les filtres
   - Montrer l'ouverture/téléchargement d'un PDF

4. **MVP** : 
   - Site fonctionnel en < 30 secondes
   - Pas de compte nécessaire
   - Fonctionne hors-ligne

5. **Roadmap potentielle** :
   - Authentification utilisateur
   - Upload de cours par la communauté
   - Système de favoris
   - Mode sombre
   - Application mobile

---

## 📋 Fonctionnalités actuelles

- ✅ Navigation par année → matière → cours
- ✅ Affichage des PDFs intégré
- ✅ Téléchargement des PDFs
- ✅ Recherche par titre de cours
- ✅ Filtres par type (Cours/TD/TP/Annales)
- ✅ Design responsive (mobile + desktop)
- ✅ Catalogue modifiable facilement (JSON)

## 🚧 Éléments de prototype (désactivés)

- 🔒 Bouton "Connexion" (visible mais désactivé)
- 🔒 Bouton "Créer un compte" (visible mais désactivé)

---

## 📄 Licence

Projet prototype — Usage éducatif et démonstration.

---

**MedCours** — *Vos cours de médecine, simplement.*
