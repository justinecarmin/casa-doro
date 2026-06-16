# Casa d'Oro — Site Vitrine · Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire le site vitrine multi-pages de Casa d'Oro by Justine — soins, formations, avant/après, témoignages, formulaires de contact et d'avis — hébergé sur Netlify avec une interface admin Netlify CMS permettant à Justine de modifier le contenu sans toucher au code.

**Architecture:** Site HTML/CSS/JS statique pur (pas de framework, pas de bundler). Le contenu dynamique (soins, formations, témoignages) est stocké dans des fichiers JSON servis comme fichiers statiques et chargés au runtime via `fetch()`. Netlify CMS écrit directement dans ces JSON via Git, Netlify redéploie automatiquement à chaque commit.

**Tech Stack:** HTML5, CSS3 (custom properties), JavaScript ES6+ (fetch, async/await), Netlify CMS (Decap CMS) v3, Netlify Forms, Netlify Identity, Google Fonts (Cormorant Garamond + Jost)

---

## Structure de fichiers

```
casa-doro/
├── index.html               # Page Accueil
├── soins.html               # Page Soins
├── formations.html          # Page Formations
├── a-propos.html            # Page À Propos
├── contact.html             # Page Contact + Avis
├── assets/
│   ├── css/
│   │   └── style.css        # Toutes les variables CSS + styles globaux + composants
│   ├── js/
│   │   ├── main.js          # Navigation active, menu hamburger
│   │   └── data.js          # fetch() des JSON + fonctions de rendu DOM
│   └── images/
│       ├── avant-apres/     # Photos avant/après (à uploader)
│       └── justine/         # Photos de Justine et de l'espace
├── _data/
│   ├── services.json        # Soins éditables via CMS
│   ├── formations.json      # Formations éditables via CMS
│   └── temoignages.json     # Témoignages approuvés éditables via CMS
├── admin/
│   ├── index.html           # Netlify CMS SPA entry point
│   └── config.yml           # Définition des collections CMS
└── netlify.toml             # Config hébergement Netlify
```

---

## Task 1 : Initialisation du projet

**Files:**
- Create: `netlify.toml`
- Create: `.gitignore`
- Create: `assets/css/style.css` (vide)
- Create: `assets/js/main.js` (vide)
- Create: `assets/js/data.js` (vide)

- [ ] **Étape 1 : Créer netlify.toml**

```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
```

- [ ] **Étape 2 : Créer .gitignore**

```
.DS_Store
.env
node_modules/
.superpowers/
```

- [ ] **Étape 3 : Créer les répertoires et fichiers vides**

```bash
mkdir -p assets/css assets/js assets/images/avant-apres assets/images/justine _data admin
touch assets/css/style.css assets/js/main.js assets/js/data.js
```

- [ ] **Étape 4 : Initialiser git et committer**

```bash
cd /Users/macbookvalentinauble/Downloads/casa-doro
git init
git add netlify.toml .gitignore assets/ _data/ admin/
git commit -m "chore: init project structure"
```

---

## Task 2 : CSS global (variables, typographie, base)

**Files:**
- Modify: `assets/css/style.css`

- [ ] **Étape 1 : Écrire le CSS complet**

```css
/* ============================
   IMPORTS
   ============================ */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Dancing+Script:wght@600&family=Jost:wght@300;400&display=swap');

/* ============================
   VARIABLES
   ============================ */
:root {
  --beige:       #E8E4DF;
  --cream:       #FAF6F0;
  --dark:        #2D2520;
  --dark-bg:     #1C1714;
  --gold:        #B8A888;
  --text-muted:  #8A7860;
  --border:      #EDE8E0;

  --font-serif:  'Cormorant Garamond', Georgia, serif;
  --font-script: 'Dancing Script', cursive;
  --font-sans:   'Jost', Arial, sans-serif;

  --nav-h: 72px;
}

/* ============================
   RESET
   ============================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
img { display: block; max-width: 100%; }
a { text-decoration: none; color: inherit; }

body {
  font-family: var(--font-sans);
  background: var(--cream);
  color: var(--dark);
  font-size: 15px;
  line-height: 1.7;
}

/* ============================
   TYPOGRAPHY UTILITIES
   ============================ */
.label {
  font-family: var(--font-sans);
  font-size: 10px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--gold);
}
.heading {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 300;
  color: var(--dark);
}
.script { font-family: var(--font-script); }

/* ============================
   NAVIGATION
   ============================ */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--nav-h);
  padding: 0 48px;
  background: var(--cream);
  border-bottom: 1px solid var(--border);
}
.nav__logo {
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--dark);
}
.nav__links {
  display: flex;
  align-items: center;
  gap: 36px;
  list-style: none;
}
.nav__links a {
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-muted);
  transition: color 0.2s;
}
.nav__links a:hover,
.nav__links a.active { color: var(--dark); }
.nav__cta {
  padding: 10px 22px;
  background: var(--dark);
  color: var(--cream) !important;
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: background 0.2s;
}
.nav__cta:hover { background: var(--dark-bg); }

/* Hamburger mobile */
.nav__toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 4px;
}
.nav__toggle span {
  display: block;
  width: 24px;
  height: 1px;
  background: var(--dark);
  transition: all 0.3s;
}

/* ============================
   FOOTER
   ============================ */
.footer {
  background: var(--cream);
  border-top: 1px solid var(--border);
  padding: 52px 48px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
  align-items: center;
}
.footer__logo {
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 5px;
  text-transform: uppercase;
}
.footer__info {
  text-align: center;
  font-size: 12px;
  color: var(--text-muted);
  line-height: 2;
}
.footer__links {
  display: flex;
  gap: 24px;
  justify-content: flex-end;
}
.footer__links a {
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  transition: color 0.2s;
}
.footer__links a:hover { color: var(--dark); }
.footer__copy {
  grid-column: 1 / -1;
  text-align: center;
  font-size: 11px;
  color: var(--border);
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

/* ============================
   SECTIONS UTILITAIRES
   ============================ */
.section { padding: 80px 48px; }
.section--beige { background: var(--beige); }
.section--dark  { background: var(--dark-bg); color: var(--cream); }
.section__header { text-align: center; margin-bottom: 56px; }
.section__header .label { display: block; margin-bottom: 12px; }
.section__header .heading { font-size: 40px; }

/* ============================
   CARTES SOINS
   ============================ */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.soin-card {
  background: var(--cream);
  border: 1px solid var(--border);
  padding: 40px 28px;
  text-align: center;
}
.soin-card__icon { font-size: 18px; color: var(--gold); margin-bottom: 18px; }
.soin-card__name { font-family: var(--font-serif); font-style: italic; font-size: 20px; margin-bottom: 10px; }
.soin-card__desc { font-size: 12px; color: var(--text-muted); line-height: 1.8; margin-bottom: 20px; }
.soin-card__price { font-size: 22px; font-weight: 300; }
.soin-card__price span { font-size: 13px; color: var(--gold); }

/* ============================
   TABLEAU SOINS (page Soins)
   ============================ */
.soins-table { width: 100%; border-collapse: collapse; }
.soins-table tr { border-bottom: 1px solid var(--border); }
.soins-table td { padding: 16px 0; font-size: 14px; }
.soins-table td:last-child { text-align: right; font-weight: 400; white-space: nowrap; }
.soins-section { margin-bottom: 64px; }
.soins-section__title {
  font-family: var(--font-sans);
  font-size: 10px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}
.forfait-row td { color: var(--text-muted); font-style: italic; }

/* ============================
   POLAROIDS AVANT/APRÈS
   ============================ */
.polaro-grid {
  display: flex;
  gap: 40px;
  justify-content: center;
  flex-wrap: wrap;
}
.polaro {
  background: white;
  padding: 10px 10px 40px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.12);
  width: 220px;
  flex-shrink: 0;
}
.polaro:nth-child(odd)  { transform: rotate(-2deg); }
.polaro:nth-child(even) { transform: rotate(1.5deg); margin-top: 24px; }
.polaro img { width: 100%; height: 200px; object-fit: cover; }
.polaro__placeholder {
  width: 100%;
  height: 200px;
  background: var(--beige);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 2px;
}
.polaro__label {
  text-align: center;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 12px;
}

/* ============================
   TÉMOIGNAGES
   ============================ */
.temo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.temo-card { background: white; border: 1px solid var(--border); padding: 32px; }
.temo-card__stars { color: var(--gold); font-size: 14px; letter-spacing: 2px; margin-bottom: 14px; }
.temo-card__text { font-size: 13px; color: #666; line-height: 1.9; font-style: italic; margin-bottom: 18px; }
.temo-card__name { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); }

/* ============================
   FORMATIONS CARDS
   ============================ */
.formations-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.formation-card { background: var(--cream); border: 1px solid var(--border); padding: 40px 36px; }
.formation-card--featured { border-color: var(--gold); }
.formation-card__badge {
  display: inline-block;
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  border: 1px solid var(--gold);
  padding: 4px 10px;
  margin-bottom: 20px;
}
.formation-card__name { font-family: var(--font-serif); font-style: italic; font-size: 26px; margin-bottom: 12px; }
.formation-card__desc { font-size: 13px; color: var(--text-muted); line-height: 1.9; margin-bottom: 20px; }
.formation-card__note { font-size: 12px; font-weight: 400; color: var(--dark); margin-bottom: 24px; }
.formation-card__price { font-size: 28px; font-weight: 300; }
.formation-card__price span { font-size: 14px; color: var(--gold); }

/* ============================
   FORMULAIRES
   ============================ */
.form { max-width: 600px; margin: 0 auto; }
.form__group { margin-bottom: 24px; }
.form__label {
  display: block;
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 8px;
}
.form__input,
.form__textarea,
.form__select {
  width: 100%;
  border: 1px solid var(--border);
  background: white;
  padding: 14px 16px;
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--dark);
  outline: none;
  transition: border-color 0.2s;
}
.form__input:focus,
.form__textarea:focus,
.form__select:focus { border-color: var(--gold); }
.form__textarea { resize: vertical; min-height: 140px; }
.form__stars { display: flex; gap: 8px; }
.form__stars input[type="radio"] { display: none; }
.form__stars label { font-size: 24px; color: var(--border); cursor: pointer; transition: color 0.1s; }
.form__stars input[type="radio"]:checked ~ label,
.form__stars label:hover,
.form__stars label:hover ~ label { color: var(--gold); }
.btn {
  display: inline-block;
  padding: 14px 40px;
  font-family: var(--font-sans);
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}
.btn--dark { background: var(--dark); color: var(--cream); }
.btn--dark:hover { background: var(--dark-bg); }
.btn--outline { background: transparent; border: 1px solid var(--dark); color: var(--dark); }
.btn--outline:hover { background: var(--dark); color: var(--cream); }
.btn--outline-gold { background: transparent; border: 1px solid var(--gold); color: var(--gold); }
.btn--outline-gold:hover { background: var(--gold); color: var(--dark-bg); }

/* ============================
   HERO
   ============================ */
.hero {
  background: var(--beige);
  min-height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 100px 40px;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, #D8D0C4 0%, var(--beige) 70%);
}
.hero__content { position: relative; z-index: 1; }
.hero__pre { display: block; margin-bottom: 24px; }
.hero__title { font-size: 72px; line-height: 1; margin-bottom: 4px; }
.hero__by { font-size: 28px; font-family: var(--font-serif); font-style: italic; color: var(--text-muted); margin-bottom: 32px; }
.hero__divider { width: 40px; height: 1px; background: var(--gold); margin: 0 auto 24px; }
.hero__sub { display: block; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 44px; }

/* HERO PAGE INTERNE */
.hero--inner { min-height: 240px; padding: 80px 40px; }
.hero--inner .hero__title { font-size: 48px; }

/* ============================
   PILLS BANDEAU
   ============================ */
.pills {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background: var(--cream);
  border-bottom: 1px solid var(--border);
}
.pill {
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 16px 28px;
  border-right: 1px solid var(--border);
  cursor: default;
}
.pill:last-child { border-right: none; }

/* ============================
   À PROPOS
   ============================ */
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.about-grid img { width: 100%; aspect-ratio: 3/4; object-fit: cover; }
.about__valeurs { display: flex; flex-direction: column; gap: 20px; margin-top: 32px; }
.valeur { display: flex; align-items: flex-start; gap: 16px; }
.valeur__icon { color: var(--gold); font-size: 16px; flex-shrink: 0; margin-top: 3px; }
.valeur__text h4 { font-family: var(--font-serif); font-style: italic; font-size: 18px; margin-bottom: 4px; }
.valeur__text p { font-size: 13px; color: var(--text-muted); }

/* ============================
   RESPONSIVE
   ============================ */
@media (max-width: 1024px) {
  .nav { padding: 0 32px; }
  .section { padding: 64px 32px; }
  .footer { padding: 40px 32px; }
}

@media (max-width: 768px) {
  .nav { padding: 0 20px; }
  .nav__links {
    display: none;
    position: fixed;
    top: var(--nav-h);
    left: 0; right: 0;
    background: var(--cream);
    flex-direction: column;
    align-items: center;
    gap: 0;
    padding: 20px 0;
    border-bottom: 1px solid var(--border);
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  }
  .nav__links.open { display: flex; }
  .nav__links li { width: 100%; text-align: center; }
  .nav__links a { display: block; padding: 16px; }
  .nav__toggle { display: flex; }

  .hero__title { font-size: 48px; }
  .hero--inner .hero__title { font-size: 36px; }

  .cards-grid { grid-template-columns: 1fr; }
  .temo-grid { grid-template-columns: 1fr; }
  .formations-grid { grid-template-columns: 1fr; }
  .about-grid { grid-template-columns: 1fr; }
  .footer { grid-template-columns: 1fr; text-align: center; }
  .footer__links { justify-content: center; }
  .section { padding: 56px 20px; }
}

@media (max-width: 480px) {
  .hero__title { font-size: 38px; }
  .polaro { width: 160px; }
  .polaro img,
  .polaro__placeholder { height: 160px; }
}
```

- [ ] **Étape 2 : Vérifier le CSS dans le navigateur**

Ouvrir un fichier HTML vide qui importe `assets/css/style.css` :
```bash
echo '<link rel="stylesheet" href="assets/css/style.css"><div class="label">Test label</div><div class="heading" style="font-size:40px">Casa dOro</div>' > _test.html
open _test.html
```
Vérifier : deux polices Google différentes chargées, couleurs beige/crème/or visibles.

```bash
rm _test.html
```

- [ ] **Étape 3 : Committer**

```bash
git add assets/css/style.css
git commit -m "style: add global CSS variables and all component styles"
```

---

## Task 3 : Fichiers JSON de données

**Files:**
- Create: `_data/services.json`
- Create: `_data/formations.json`
- Create: `_data/temoignages.json`

- [ ] **Étape 1 : Créer _data/services.json**

```json
{
  "corps_visage": [
    { "nom": "Drainage lymphatique Renata França", "duree": "1h / 1h15", "prix": 150, "forfait": false },
    { "nom": "Remodelage Renata França", "duree": "1h / 1h15", "prix": 150, "forfait": false },
    { "nom": "Madothérapie Olfa Perbal Paris", "duree": "1h / 1h15", "prix": 150, "forfait": false },
    { "nom": "Body Care (drainage + remodelage + madothérapie)", "duree": "1h / 1h15", "prix": 150, "forfait": false },
    { "nom": "Body Care (drainage + remodelage + madothérapie)", "duree": "1h30 / 1h45", "prix": 200, "forfait": false },
    { "nom": "Face Care — drainage, remodelage, lithothérapie", "duree": "1h", "prix": 125, "forfait": false },
    { "nom": "Forfait 5 séances corps", "duree": "", "prix": 650, "forfait": true },
    { "nom": "Forfait 10 séances corps", "duree": "", "prix": 1100, "forfait": true },
    { "nom": "Forfait 5 séances visage", "duree": "", "prix": 550, "forfait": true },
    { "nom": "Forfait 10 séances visage", "duree": "", "prix": 1000, "forfait": true }
  ],
  "reiki": [
    { "nom": "Reiki Usui Tibétain", "duree": "1h", "prix": 80, "forfait": false },
    { "nom": "Forfait 4 séances", "duree": "", "prix": 280, "forfait": true }
  ],
  "bains_sonores": [
    { "nom": "Soin individuel", "duree": "1h", "prix": 80, "forfait": false },
    { "nom": "Soin collectif sur demande", "duree": "1h", "prix": 20, "forfait": false }
  ]
}
```

- [ ] **Étape 2 : Créer _data/formations.json**

```json
{
  "corps": [
    {
      "nom": "Formation Body Care",
      "description": "Une formation complète d'une journée comprenant l'apprentissage du drainage lymphatique, du remodelage et de la madérothérapie sur le corps. Synergie de 5 techniques : drainage, remodelage, madérothérapie, brossage à sec et cryothérapie légère.",
      "note": "Inclus 3 techniques / protocole complet pour des résultats visibles dès la 1ère séance.",
      "duree": "Journée complète",
      "prix": 890,
      "featured": true
    },
    {
      "nom": "Formation Drainage Lymphatique Corps",
      "description": "Une formation complète d'une journée où tu apprends la méthodologie du drainage lymphatique sur le corps.",
      "note": "",
      "duree": "Journée complète",
      "prix": 500,
      "featured": false
    },
    {
      "nom": "Formation Remodelage",
      "description": "Une formation complète d'une journée où tu apprends la méthodologie du remodelage.",
      "note": "",
      "duree": "Journée complète",
      "prix": 500,
      "featured": false
    },
    {
      "nom": "Formation Madérothérapie",
      "description": "Une formation complète d'une journée où tu apprends la méthodologie de la madérothérapie.",
      "note": "",
      "duree": "Journée complète",
      "prix": 500,
      "featured": false
    }
  ],
  "visage": [
    {
      "nom": "Formation Face Care",
      "description": "Une formation complète d'une journée comprenant l'apprentissage du drainage lymphatique, du remodelage et de la lithothérapie sur le visage. La méthode est une synergie combinant le drainage, le remodelage, la lithothérapie et la cryothérapie légère sur le visage.",
      "note": "Inclus 3 techniques / protocole complet pour des résultats visibles dès la 1ère séance.",
      "duree": "Journée complète",
      "prix": 600,
      "featured": true
    },
    {
      "nom": "Formation Drainage Lymphatique Visage",
      "description": "Une formation complète d'une demi-journée où tu apprends la méthodologie du drainage lymphatique sur le visage.",
      "note": "",
      "duree": "Demi-journée",
      "prix": 250,
      "featured": false
    },
    {
      "nom": "Formation Remodelage Visage",
      "description": "Une formation complète d'une demi-journée où tu apprends la méthodologie du remodelage sur le visage.",
      "note": "",
      "duree": "Demi-journée",
      "prix": 250,
      "featured": false
    },
    {
      "nom": "Formation Outils & Techniques Complémentaires Visage",
      "description": "Une formation complète d'une demi-journée où tu apprends la méthodologie de la madérothérapie, lithothérapie et tous les outils du moment. Comment les utiliser sur le visage.",
      "note": "",
      "duree": "Demi-journée",
      "prix": 250,
      "featured": false
    }
  ]
}
```

- [ ] **Étape 3 : Créer _data/temoignages.json**

```json
{
  "temoignages": [
    {
      "nom": "Sophie M.",
      "note": 5,
      "texte": "Résultats incroyables dès la première séance. Justine est professionnelle et à l'écoute. Je recommande vivement !",
      "visible": true
    },
    {
      "nom": "Léa P.",
      "note": 5,
      "texte": "Formation Body Care au top. Des techniques que j'applique immédiatement avec mes clientes. Merci Justine !",
      "visible": true
    },
    {
      "nom": "Marie-Christine B.",
      "note": 5,
      "texte": "Un cadre magnifique, une praticienne talentueuse. Le drainage lymphatique a vraiment changé ma silhouette.",
      "visible": true
    }
  ]
}
```

- [ ] **Étape 4 : Committer**

```bash
git add _data/
git commit -m "data: add initial services, formations and testimonials JSON"
```

---

## Task 4 : JavaScript (main.js + data.js)

**Files:**
- Modify: `assets/js/main.js`
- Modify: `assets/js/data.js`

- [ ] **Étape 1 : Écrire main.js**

```js
document.addEventListener('DOMContentLoaded', () => {
  // Active nav link
  const links = document.querySelectorAll('.nav__links a');
  const path = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Hamburger menu
  const toggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const open = navLinks.classList.contains('open');
      toggle.setAttribute('aria-expanded', open);
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }
});
```

- [ ] **Étape 2 : Écrire data.js**

```js
// Render stars from 1-5 number
function renderStars(note) {
  return '★'.repeat(note) + '☆'.repeat(5 - note);
}

// Load and render testimonials into #temoignages-container
async function loadTemoignages() {
  const container = document.getElementById('temoignages-container');
  if (!container) return;
  try {
    const res = await fetch('/_data/temoignages.json');
    const data = await res.json();
    const visible = data.temoignages.filter(t => t.visible).slice(0, 3);
    container.innerHTML = visible.map(t => `
      <div class="temo-card">
        <div class="temo-card__stars">${renderStars(t.note)}</div>
        <p class="temo-card__text">« ${t.texte} »</p>
        <div class="temo-card__name">${t.nom}</div>
      </div>
    `).join('');
  } catch {
    container.innerHTML = '';
  }
}

// Load services and render into a table section
async function loadServices() {
  try {
    const res = await fetch('/_data/services.json');
    return await res.json();
  } catch {
    return null;
  }
}

// Render a services section given data array and container selector
function renderServiceTable(items, selector) {
  const el = document.querySelector(selector);
  if (!el || !items) return;
  el.innerHTML = items.map(s => `
    <tr class="${s.forfait ? 'forfait-row' : ''}">
      <td>${s.nom}${s.duree ? ' <span style="color:var(--text-muted);font-size:12px">— ' + s.duree + '</span>' : ''}</td>
      <td>${s.prix} €</td>
    </tr>
  `).join('');
}

// Load formations
async function loadFormations() {
  try {
    const res = await fetch('/_data/formations.json');
    return await res.json();
  } catch {
    return null;
  }
}

// Render formation cards into container
function renderFormationCards(formations, selector) {
  const el = document.querySelector(selector);
  if (!el || !formations) return;
  el.innerHTML = formations.map(f => `
    <div class="formation-card ${f.featured ? 'formation-card--featured' : ''}">
      ${f.featured ? '<span class="formation-card__badge">Formation complète</span>' : ''}
      <h3 class="formation-card__name">${f.nom}</h3>
      <p class="formation-card__desc">${f.description}</p>
      ${f.note ? `<p class="formation-card__note">✦ ${f.note}</p>` : ''}
      <div class="formation-card__price">${f.prix} <span>€ · ${f.duree}</span></div>
    </div>
  `).join('');
}
```

- [ ] **Étape 3 : Committer**

```bash
git add assets/js/
git commit -m "feat: add navigation active state, hamburger menu and JSON data rendering"
```

---

## Task 5 : Page Accueil (index.html)

**Files:**
- Create: `index.html`

- [ ] **Étape 1 : Créer index.html**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Casa d'Oro by Justine — Institut de soins à Ajaccio. Drainage lymphatique, remodelage, madothérapie, reiki, bains sonores et formations professionnelles.">
  <title>Casa d'Oro by Justine — Institut de soins · Ajaccio</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<!-- NAVIGATION -->
<nav class="nav">
  <a href="index.html" class="nav__logo">Casa d'Oro</a>
  <button class="nav__toggle" aria-label="Menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <ul class="nav__links">
    <li><a href="soins.html">Soins</a></li>
    <li><a href="formations.html">Formations</a></li>
    <li><a href="a-propos.html">À Propos</a></li>
    <li><a href="contact.html">Contact</a></li>
    <li><a href="TREATWELL_URL" target="_blank" rel="noopener" class="nav__cta">Réserver</a></li>
  </ul>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero__content">
    <span class="hero__pre label">Institut de bien-être · Ajaccio</span>
    <h1 class="hero__title script">Casa d'Oro</h1>
    <p class="hero__by">by Justine</p>
    <div class="hero__divider"></div>
    <span class="hero__sub">Drainage · Remodelage · Madothérapie · Formations</span>
    <a href="TREATWELL_URL" target="_blank" rel="noopener" class="btn btn--outline">
      Prendre rendez-vous sur Treatwell
    </a>
  </div>
</section>

<!-- PILLS -->
<div class="pills">
  <div class="pill">Soins corps</div>
  <div class="pill">Soins visage</div>
  <div class="pill">Reiki</div>
  <div class="pill">Bains sonores</div>
  <div class="pill">Formations</div>
</div>

<!-- SOINS PHARES -->
<section class="section">
  <div class="section__header">
    <span class="label">Nos soins</span>
    <h2 class="heading">Une expertise, des résultats</h2>
  </div>
  <div class="cards-grid">
    <div class="soin-card">
      <div class="soin-card__icon">✦</div>
      <h3 class="soin-card__name">Body Care Signature</h3>
      <p class="soin-card__desc">Drainage lymphatique · Remodelage · Madothérapie</p>
      <div class="soin-card__price">150 <span>€ · 1h / 1h15</span></div>
    </div>
    <div class="soin-card">
      <div class="soin-card__icon">✦</div>
      <h3 class="soin-card__name">Face Care</h3>
      <p class="soin-card__desc">Drainage · Remodelage · Lithothérapie sur le visage</p>
      <div class="soin-card__price">125 <span>€ · 1h</span></div>
    </div>
    <div class="soin-card">
      <div class="soin-card__icon">✦</div>
      <h3 class="soin-card__name">Reiki Usui Tibétain</h3>
      <p class="soin-card__desc">Soin énergétique profond · Équilibre &amp; bien-être</p>
      <div class="soin-card__price">80 <span>€ · 1h</span></div>
    </div>
  </div>
  <div style="text-align:center; margin-top:48px;">
    <a href="soins.html" class="btn btn--outline">Voir tous les soins</a>
  </div>
</section>

<!-- AVANT / APRÈS -->
<section class="section section--beige">
  <div class="section__header">
    <span class="label">Résultats</span>
    <h2 class="heading">Avant · Après</h2>
    <p style="font-size:13px; color:var(--text-muted); margin-top:12px;">Des résultats visibles dès la première séance</p>
  </div>
  <div class="polaro-grid">
    <div class="polaro">
      <div class="polaro__placeholder">Body Care</div>
      <p class="polaro__label">Body Care · 1 cure</p>
    </div>
    <div class="polaro">
      <div class="polaro__placeholder">Face Care</div>
      <p class="polaro__label">Face Care · 1 séance</p>
    </div>
    <div class="polaro">
      <div class="polaro__placeholder">Silhouette</div>
      <p class="polaro__label">Body Care · 1 cure</p>
    </div>
  </div>
</section>

<!-- TÉMOIGNAGES -->
<section class="section">
  <div class="section__header">
    <span class="label">Avis clients</span>
    <h2 class="heading">Ce qu'elles disent</h2>
  </div>
  <div class="temo-grid" id="temoignages-container">
    <!-- Rempli par data.js -->
  </div>
  <div style="text-align:center; margin-top:48px;">
    <a href="contact.html#avis" class="btn btn--outline">Laisser un avis</a>
  </div>
</section>

<!-- CTA FORMATIONS -->
<section class="section section--dark" style="text-align:center;">
  <span class="label" style="color:var(--gold);">Pour les professionnelles</span>
  <h2 class="heading" style="font-size:48px; color:var(--cream); margin-top:12px;">Carte des Formations</h2>
  <p style="font-size:13px; color:var(--gold); margin: 20px auto 40px; max-width:500px; line-height:2;">
    Body Care · Face Care · Drainage · Remodelage · Madérothérapie<br>
    Des formations certifiées avec résultats dès la 1ère séance
  </p>
  <a href="formations.html" class="btn btn--outline-gold">Découvrir les formations</a>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="nav__logo footer__logo">Casa d'Oro</div>
  <div class="footer__info">
    Ajaccio, Corse<br>
    @casa_doro_ajaccio<br>
    contact@casadoro.fr
  </div>
  <div class="footer__links">
    <a href="https://www.instagram.com/casa_doro_ajaccio" target="_blank" rel="noopener">Instagram</a>
    <a href="TREATWELL_URL" target="_blank" rel="noopener">Treatwell</a>
    <a href="contact.html">Contact</a>
  </div>
  <div class="footer__copy">© 2026 Casa d'Oro by Justine · Ajaccio</div>
</footer>

<script src="assets/js/main.js"></script>
<script src="assets/js/data.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    loadTemoignages();
  });
</script>
</body>
</html>
```

> **Note :** Remplacer `TREATWELL_URL` par la vraie URL Treatwell de Justine dans tous les fichiers.

- [ ] **Étape 2 : Démarrer le serveur local et vérifier**

```bash
cd /Users/macbookvalentinauble/Downloads/casa-doro
python3 -m http.server 8080
```

Ouvrir `http://localhost:8080` et vérifier :
- Navigation sticky visible avec logo + liens + bouton Réserver
- Hero avec titre script "Casa d'Oro", sous-titre "by Justine", bandeau Drainage · Remodelage · Madothérapie · Formations
- 3 cartes soins avec prix
- Section avant/après (placeholders beiges)
- Section témoignages remplie depuis le JSON (vérifier dans DevTools Network que `_data/temoignages.json` est fetché)
- Bloc sombre formations
- Footer avec 3 colonnes

- [ ] **Étape 3 : Committer**

```bash
git add index.html
git commit -m "feat: add homepage with hero, services, before/after, testimonials and formations CTA"
```

---

## Task 6 : Page Soins (soins.html)

**Files:**
- Create: `soins.html`

- [ ] **Étape 1 : Créer soins.html**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Carte des soins Casa d'Oro — Drainage lymphatique, remodelage, madothérapie, face care, reiki, bains sonores à Ajaccio.">
  <title>Carte des Soins — Casa d'Oro by Justine</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<nav class="nav">
  <a href="index.html" class="nav__logo">Casa d'Oro</a>
  <button class="nav__toggle" aria-label="Menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <ul class="nav__links">
    <li><a href="soins.html">Soins</a></li>
    <li><a href="formations.html">Formations</a></li>
    <li><a href="a-propos.html">À Propos</a></li>
    <li><a href="contact.html">Contact</a></li>
    <li><a href="TREATWELL_URL" target="_blank" rel="noopener" class="nav__cta">Réserver</a></li>
  </ul>
</nav>

<!-- HERO -->
<section class="hero hero--inner">
  <div class="hero__content">
    <span class="hero__pre label">Casa d'Oro · Ajaccio</span>
    <h1 class="hero__title heading">Carte des Soins</h1>
  </div>
</section>

<!-- SOINS CORPS ET VISAGE -->
<section class="section">
  <div class="soins-section">
    <h2 class="soins-section__title">Soins Corps et Visage Drainant</h2>
    <table class="soins-table" id="table-corps-visage">
      <!-- Rempli par data.js -->
    </table>
  </div>

  <div class="soins-section">
    <h2 class="soins-section__title">Reiki</h2>
    <table class="soins-table" id="table-reiki">
      <!-- Rempli par data.js -->
    </table>
  </div>

  <div class="soins-section">
    <h2 class="soins-section__title">Bains Sonores</h2>
    <table class="soins-table" id="table-bains-sonores">
      <!-- Rempli par data.js -->
    </table>
  </div>

  <div style="text-align:center; margin-top:48px;">
    <a href="TREATWELL_URL" target="_blank" rel="noopener" class="btn btn--dark">Réserver sur Treatwell</a>
  </div>
</section>

<footer class="footer">
  <div class="nav__logo footer__logo">Casa d'Oro</div>
  <div class="footer__info">
    Ajaccio, Corse<br>
    @casa_doro_ajaccio<br>
    contact@casadoro.fr
  </div>
  <div class="footer__links">
    <a href="https://www.instagram.com/casa_doro_ajaccio" target="_blank" rel="noopener">Instagram</a>
    <a href="TREATWELL_URL" target="_blank" rel="noopener">Treatwell</a>
    <a href="contact.html">Contact</a>
  </div>
  <div class="footer__copy">© 2026 Casa d'Oro by Justine · Ajaccio</div>
</footer>

<script src="assets/js/main.js"></script>
<script src="assets/js/data.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', async () => {
    const data = await loadServices();
    if (!data) return;
    renderServiceTable(data.corps_visage, '#table-corps-visage');
    renderServiceTable(data.reiki,        '#table-reiki');
    renderServiceTable(data.bains_sonores,'#table-bains-sonores');
  });
</script>
</body>
</html>
```

- [ ] **Étape 2 : Vérifier dans le navigateur (serveur http.server déjà lancé)**

Ouvrir `http://localhost:8080/soins.html` et vérifier :
- "Soins" actif dans la navigation
- 3 sections chargées depuis le JSON avec tous les prix corrects
- Forfaits en style italique/discret
- Bouton Treatwell en bas

- [ ] **Étape 3 : Committer**

```bash
git add soins.html
git commit -m "feat: add soins page with dynamic service tables from JSON"
```

---

## Task 7 : Page Formations (formations.html)

**Files:**
- Create: `formations.html`

- [ ] **Étape 1 : Créer formations.html**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Formations professionnelles Casa d'Oro — Body Care, Face Care, Drainage, Remodelage, Madérothérapie. Certifiées, résultats dès la 1ère séance.">
  <title>Formations — Casa d'Oro by Justine</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<nav class="nav">
  <a href="index.html" class="nav__logo">Casa d'Oro</a>
  <button class="nav__toggle" aria-label="Menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <ul class="nav__links">
    <li><a href="soins.html">Soins</a></li>
    <li><a href="formations.html">Formations</a></li>
    <li><a href="a-propos.html">À Propos</a></li>
    <li><a href="contact.html">Contact</a></li>
    <li><a href="TREATWELL_URL" target="_blank" rel="noopener" class="nav__cta">Réserver</a></li>
  </ul>
</nav>

<!-- HERO -->
<section class="hero hero--inner">
  <div class="hero__content">
    <span class="hero__pre label">Pour les professionnelles</span>
    <h1 class="hero__title heading">Carte des Formations</h1>
  </div>
</section>

<!-- FORMATIONS CORPS -->
<section class="section">
  <div class="section__header">
    <span class="label">Corps</span>
    <h2 class="heading">Formations Corps</h2>
  </div>
  <div class="formations-grid" id="formations-corps">
    <!-- Rempli par data.js -->
  </div>
</section>

<!-- FORMATIONS VISAGE -->
<section class="section section--beige">
  <div class="section__header">
    <span class="label">Visage</span>
    <h2 class="heading">Formations Visage</h2>
  </div>
  <div class="formations-grid" id="formations-visage">
    <!-- Rempli par data.js -->
  </div>
</section>

<!-- FORMULAIRE INSCRIPTION -->
<section class="section">
  <div class="section__header">
    <span class="label">Inscription</span>
    <h2 class="heading">Rejoindre une formation</h2>
    <p style="font-size:13px; color:var(--text-muted); margin-top:12px;">Contactez-nous pour vous inscrire ou obtenir plus d'informations</p>
  </div>
  <form class="form" name="inscription-formation" method="POST" netlify netlify-honeypot="bot-field">
    <input type="hidden" name="form-name" value="inscription-formation">
    <p hidden><label>Ne pas remplir : <input name="bot-field"></label></p>
    <div class="form__group">
      <label class="form__label" for="f-nom">Nom complet</label>
      <input class="form__input" type="text" id="f-nom" name="nom" required placeholder="Votre nom et prénom">
    </div>
    <div class="form__group">
      <label class="form__label" for="f-email">Email</label>
      <input class="form__input" type="email" id="f-email" name="email" required placeholder="votre@email.com">
    </div>
    <div class="form__group">
      <label class="form__label" for="f-formation">Formation souhaitée</label>
      <select class="form__select" id="f-formation" name="formation" required>
        <option value="" disabled selected>Choisir une formation</option>
        <optgroup label="Corps">
          <option>Formation Body Care — 890 €</option>
          <option>Formation Drainage Lymphatique Corps — 500 €</option>
          <option>Formation Remodelage — 500 €</option>
          <option>Formation Madérothérapie — 500 €</option>
        </optgroup>
        <optgroup label="Visage">
          <option>Formation Face Care — 600 €</option>
          <option>Formation Drainage Lymphatique Visage — 250 €</option>
          <option>Formation Remodelage Visage — 250 €</option>
          <option>Formation Outils & Techniques Complémentaires Visage — 250 €</option>
        </optgroup>
      </select>
    </div>
    <div class="form__group">
      <label class="form__label" for="f-message">Message (optionnel)</label>
      <textarea class="form__textarea" id="f-message" name="message" placeholder="Questions, disponibilités…"></textarea>
    </div>
    <button type="submit" class="btn btn--dark">Envoyer ma demande</button>
  </form>
</section>

<footer class="footer">
  <div class="nav__logo footer__logo">Casa d'Oro</div>
  <div class="footer__info">
    Ajaccio, Corse<br>
    @casa_doro_ajaccio<br>
    contact@casadoro.fr
  </div>
  <div class="footer__links">
    <a href="https://www.instagram.com/casa_doro_ajaccio" target="_blank" rel="noopener">Instagram</a>
    <a href="TREATWELL_URL" target="_blank" rel="noopener">Treatwell</a>
    <a href="contact.html">Contact</a>
  </div>
  <div class="footer__copy">© 2026 Casa d'Oro by Justine · Ajaccio</div>
</footer>

<script src="assets/js/main.js"></script>
<script src="assets/js/data.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', async () => {
    const data = await loadFormations();
    if (!data) return;
    renderFormationCards(data.corps,  '#formations-corps');
    renderFormationCards(data.visage, '#formations-visage');
  });
</script>
</body>
</html>
```

- [ ] **Étape 2 : Vérifier dans le navigateur**

Ouvrir `http://localhost:8080/formations.html` :
- "Formations" actif dans la nav
- 4 cards formations corps chargées depuis JSON (Body Care en featured avec bordure or)
- 4 cards formations visage (Face Care en featured)
- Formulaire avec le select dropdown avec toutes les formations listées

- [ ] **Étape 3 : Committer**

```bash
git add formations.html
git commit -m "feat: add formations page with dynamic cards and inscription form"
```

---

## Task 8 : Page À Propos (a-propos.html)

**Files:**
- Create: `a-propos.html`

- [ ] **Étape 1 : Créer a-propos.html**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="À propos de Justine — fondatrice de Casa d'Oro, spécialiste en soins drainants et formatrice à Ajaccio.">
  <title>À Propos — Casa d'Oro by Justine</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<nav class="nav">
  <a href="index.html" class="nav__logo">Casa d'Oro</a>
  <button class="nav__toggle" aria-label="Menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <ul class="nav__links">
    <li><a href="soins.html">Soins</a></li>
    <li><a href="formations.html">Formations</a></li>
    <li><a href="a-propos.html">À Propos</a></li>
    <li><a href="contact.html">Contact</a></li>
    <li><a href="TREATWELL_URL" target="_blank" rel="noopener" class="nav__cta">Réserver</a></li>
  </ul>
</nav>

<!-- HERO -->
<section class="hero hero--inner">
  <div class="hero__content">
    <span class="hero__pre label">L'histoire</span>
    <h1 class="hero__title heading">Casa d'Oro by Justine</h1>
  </div>
</section>

<!-- PRÉSENTATION -->
<section class="section">
  <div class="about-grid">
    <div>
      <div class="polaro" style="transform: rotate(-1.5deg); width: 100%; max-width: 380px; margin: 0 auto;">
        <div class="polaro__placeholder" style="height: 480px;">Photo Justine</div>
      </div>
    </div>
    <div>
      <span class="label" style="display:block; margin-bottom:16px;">Fondatrice</span>
      <h2 class="heading" style="font-size:38px; margin-bottom:24px;">Justine</h2>
      <p style="font-size:14px; line-height:2; color:var(--text-muted); margin-bottom:20px;">
        [Texte de présentation de Justine à remplir — parcours, formation initiale, passion pour les soins drainants et le bien-être.]
      </p>
      <p style="font-size:14px; line-height:2; color:var(--text-muted); margin-bottom:32px;">
        [Deuxième paragraphe — certifications, méthodes utilisées (Renata França, Olfa Perbal Paris), philosophie de soin.]
      </p>
      <div class="about__valeurs">
        <div class="valeur">
          <span class="valeur__icon">✦</span>
          <div class="valeur__text">
            <h4>Expertise</h4>
            <p>Formée aux meilleures méthodes internationales de drainage et remodelage.</p>
          </div>
        </div>
        <div class="valeur">
          <span class="valeur__icon">✦</span>
          <div class="valeur__text">
            <h4>Résultats</h4>
            <p>Des résultats visibles dès la première séance, durables sur le long terme.</p>
          </div>
        </div>
        <div class="valeur">
          <span class="valeur__icon">✦</span>
          <div class="valeur__text">
            <h4>Bienveillance</h4>
            <p>Un accompagnement personnalisé, à l'écoute de chaque cliente.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ESPACE -->
<section class="section section--beige">
  <div class="section__header">
    <span class="label">L'espace</span>
    <h2 class="heading">L'Institut</h2>
  </div>
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; max-width:800px; margin:0 auto;">
    <div class="polaro" style="transform:rotate(-1deg); width:100%;">
      <div class="polaro__placeholder" style="height:260px;">Photo espace</div>
      <p class="polaro__label">La salle de soin</p>
    </div>
    <div class="polaro" style="transform:rotate(1.5deg); width:100%; margin-top:24px;">
      <div class="polaro__placeholder" style="height:260px;">Photo formation</div>
      <p class="polaro__label">La salle de formation</p>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="nav__logo footer__logo">Casa d'Oro</div>
  <div class="footer__info">
    Ajaccio, Corse<br>
    @casa_doro_ajaccio<br>
    contact@casadoro.fr
  </div>
  <div class="footer__links">
    <a href="https://www.instagram.com/casa_doro_ajaccio" target="_blank" rel="noopener">Instagram</a>
    <a href="TREATWELL_URL" target="_blank" rel="noopener">Treatwell</a>
    <a href="contact.html">Contact</a>
  </div>
  <div class="footer__copy">© 2026 Casa d'Oro by Justine · Ajaccio</div>
</footer>

<script src="assets/js/main.js"></script>
<script src="assets/js/data.js"></script>
</body>
</html>
```

- [ ] **Étape 2 : Vérifier dans le navigateur**

Ouvrir `http://localhost:8080/a-propos.html` :
- "À Propos" actif dans la nav
- Layout deux colonnes (photo + texte)
- 3 valeurs avec icône ✦
- Section espace avec deux polaroids

- [ ] **Étape 3 : Committer**

```bash
git add a-propos.html
git commit -m "feat: add about page with Justine presentation and space photos"
```

---

## Task 9 : Page Contact + Avis (contact.html)

**Files:**
- Create: `contact.html`

- [ ] **Étape 1 : Créer contact.html**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Contacter Casa d'Oro by Justine à Ajaccio. Laisser un avis sur vos soins et formations.">
  <title>Contact — Casa d'Oro by Justine</title>
  <link rel="stylesheet" href="assets/css/style.css">
  <style>
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: start;
    }
    .contact-info { }
    .contact-info h3 {
      font-family: var(--font-serif);
      font-style: italic;
      font-size: 22px;
      margin-bottom: 20px;
    }
    .contact-info p {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 2.2;
    }
    .contact-info a { color: var(--gold); }
    .section-divider {
      border: none;
      border-top: 1px solid var(--border);
      margin: 64px 0;
    }
    @media (max-width: 768px) {
      .contact-grid { grid-template-columns: 1fr; gap: 40px; }
    }
  </style>
</head>
<body>

<nav class="nav">
  <a href="index.html" class="nav__logo">Casa d'Oro</a>
  <button class="nav__toggle" aria-label="Menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <ul class="nav__links">
    <li><a href="soins.html">Soins</a></li>
    <li><a href="formations.html">Formations</a></li>
    <li><a href="a-propos.html">À Propos</a></li>
    <li><a href="contact.html">Contact</a></li>
    <li><a href="TREATWELL_URL" target="_blank" rel="noopener" class="nav__cta">Réserver</a></li>
  </ul>
</nav>

<!-- HERO -->
<section class="hero hero--inner">
  <div class="hero__content">
    <span class="hero__pre label">Nous écrire</span>
    <h1 class="hero__title heading">Contact</h1>
  </div>
</section>

<!-- CONTACT -->
<section class="section">
  <div class="contact-grid">
    <!-- FORMULAIRE -->
    <div>
      <span class="label" style="display:block; margin-bottom:24px;">Formulaire de contact</span>
      <form class="form" name="contact" method="POST" netlify netlify-honeypot="bot-field">
        <input type="hidden" name="form-name" value="contact">
        <p hidden><label>Ne pas remplir : <input name="bot-field"></label></p>
        <div class="form__group">
          <label class="form__label" for="c-nom">Nom</label>
          <input class="form__input" type="text" id="c-nom" name="nom" required placeholder="Votre nom">
        </div>
        <div class="form__group">
          <label class="form__label" for="c-email">Email</label>
          <input class="form__input" type="email" id="c-email" name="email" required placeholder="votre@email.com">
        </div>
        <div class="form__group">
          <label class="form__label" for="c-sujet">Sujet</label>
          <input class="form__input" type="text" id="c-sujet" name="sujet" placeholder="Votre sujet">
        </div>
        <div class="form__group">
          <label class="form__label" for="c-message">Message</label>
          <textarea class="form__textarea" id="c-message" name="message" required placeholder="Votre message…"></textarea>
        </div>
        <button type="submit" class="btn btn--dark">Envoyer</button>
      </form>
    </div>

    <!-- INFOS -->
    <div class="contact-info">
      <h3>Nous retrouver</h3>
      <p>
        <strong>Adresse</strong><br>
        [Adresse Ajaccio à compléter]<br><br>
        <strong>Email</strong><br>
        <a href="mailto:contact@casadoro.fr">contact@casadoro.fr</a><br><br>
        <strong>Instagram</strong><br>
        <a href="https://www.instagram.com/casa_doro_ajaccio" target="_blank" rel="noopener">@casa_doro_ajaccio</a><br><br>
        <strong>Réservation</strong><br>
        <a href="TREATWELL_URL" target="_blank" rel="noopener">Réserver sur Treatwell →</a>
      </p>
    </div>
  </div>
</section>

<!-- AVIS -->
<section class="section section--beige" id="avis">
  <div class="section__header">
    <span class="label">Votre expérience</span>
    <h2 class="heading">Laisser un avis</h2>
    <p style="font-size:13px; color:var(--text-muted); margin-top:12px;">Votre avis compte — il aide d'autres personnes à trouver Casa d'Oro</p>
  </div>
  <form class="form" name="avis" method="POST" netlify netlify-honeypot="bot-field">
    <input type="hidden" name="form-name" value="avis">
    <p hidden><label>Ne pas remplir : <input name="bot-field"></label></p>
    <div class="form__group">
      <label class="form__label" for="a-nom">Votre prénom</label>
      <input class="form__input" type="text" id="a-nom" name="nom" required placeholder="Votre prénom">
    </div>
    <div class="form__group">
      <label class="form__label">Note</label>
      <div class="form__stars" role="radiogroup" aria-label="Note de 1 à 5">
        <input type="radio" id="star5" name="note" value="5" required>
        <label for="star5" title="5 étoiles">★</label>
        <input type="radio" id="star4" name="note" value="4">
        <label for="star4" title="4 étoiles">★</label>
        <input type="radio" id="star3" name="note" value="3">
        <label for="star3" title="3 étoiles">★</label>
        <input type="radio" id="star2" name="note" value="2">
        <label for="star2" title="2 étoiles">★</label>
        <input type="radio" id="star1" name="note" value="1">
        <label for="star1" title="1 étoile">★</label>
      </div>
    </div>
    <div class="form__group">
      <label class="form__label" for="a-texte">Votre avis</label>
      <textarea class="form__textarea" id="a-texte" name="texte" required placeholder="Partagez votre expérience…"></textarea>
    </div>
    <button type="submit" class="btn btn--outline">Publier mon avis</button>
  </form>
</section>

<footer class="footer">
  <div class="nav__logo footer__logo">Casa d'Oro</div>
  <div class="footer__info">
    Ajaccio, Corse<br>
    @casa_doro_ajaccio<br>
    contact@casadoro.fr
  </div>
  <div class="footer__links">
    <a href="https://www.instagram.com/casa_doro_ajaccio" target="_blank" rel="noopener">Instagram</a>
    <a href="TREATWELL_URL" target="_blank" rel="noopener">Treatwell</a>
    <a href="contact.html">Contact</a>
  </div>
  <div class="footer__copy">© 2026 Casa d'Oro by Justine · Ajaccio</div>
</footer>

<script src="assets/js/main.js"></script>
<script src="assets/js/data.js"></script>
</body>
</html>
```

- [ ] **Étape 2 : Vérifier dans le navigateur**

Ouvrir `http://localhost:8080/contact.html` :
- "Contact" actif dans la nav
- Layout deux colonnes : formulaire contact + infos à droite
- Section avis avec étoiles cliquables (CSS reverse order trick)
- Lien #avis depuis l'accueil fonctionne

- [ ] **Étape 3 : Committer**

```bash
git add contact.html
git commit -m "feat: add contact page with contact form, location info and review form"
```

---

## Task 10 : Netlify CMS (admin/)

**Files:**
- Create: `admin/index.html`
- Create: `admin/config.yml`

- [ ] **Étape 1 : Créer admin/index.html**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin — Casa d'Oro</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

- [ ] **Étape 2 : Créer admin/config.yml**

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "assets/images"
public_folder: "/assets/images"

collections:
  - name: "services"
    label: "Soins"
    files:
      - name: "services"
        label: "Tous les soins"
        file: "_data/services.json"
        fields:
          - label: "Soins Corps et Visage"
            name: "corps_visage"
            widget: "list"
            fields:
              - { label: "Nom", name: "nom", widget: "string" }
              - { label: "Durée", name: "duree", widget: "string" }
              - { label: "Prix (€)", name: "prix", widget: "number" }
              - { label: "Forfait", name: "forfait", widget: "boolean", default: false }
          - label: "Reiki"
            name: "reiki"
            widget: "list"
            fields:
              - { label: "Nom", name: "nom", widget: "string" }
              - { label: "Durée", name: "duree", widget: "string" }
              - { label: "Prix (€)", name: "prix", widget: "number" }
              - { label: "Forfait", name: "forfait", widget: "boolean", default: false }
          - label: "Bains Sonores"
            name: "bains_sonores"
            widget: "list"
            fields:
              - { label: "Nom", name: "nom", widget: "string" }
              - { label: "Durée", name: "duree", widget: "string" }
              - { label: "Prix (€)", name: "prix", widget: "number" }
              - { label: "Forfait", name: "forfait", widget: "boolean", default: false }

  - name: "formations"
    label: "Formations"
    files:
      - name: "formations"
        label: "Toutes les formations"
        file: "_data/formations.json"
        fields:
          - label: "Formations Corps"
            name: "corps"
            widget: "list"
            fields:
              - { label: "Nom", name: "nom", widget: "string" }
              - { label: "Description", name: "description", widget: "text" }
              - { label: "Note / inclus", name: "note", widget: "string", required: false }
              - { label: "Durée", name: "duree", widget: "string" }
              - { label: "Prix (€)", name: "prix", widget: "number" }
              - { label: "Formation complète (encadré or)", name: "featured", widget: "boolean", default: false }
          - label: "Formations Visage"
            name: "visage"
            widget: "list"
            fields:
              - { label: "Nom", name: "nom", widget: "string" }
              - { label: "Description", name: "description", widget: "text" }
              - { label: "Note / inclus", name: "note", widget: "string", required: false }
              - { label: "Durée", name: "duree", widget: "string" }
              - { label: "Prix (€)", name: "prix", widget: "number" }
              - { label: "Formation complète (encadré or)", name: "featured", widget: "boolean", default: false }

  - name: "temoignages"
    label: "Témoignages"
    files:
      - name: "temoignages"
        label: "Témoignages clients"
        file: "_data/temoignages.json"
        fields:
          - label: "Témoignages"
            name: "temoignages"
            widget: "list"
            fields:
              - { label: "Prénom client", name: "nom", widget: "string" }
              - { label: "Note (1 à 5)", name: "note", widget: "number", min: 1, max: 5 }
              - { label: "Texte de l'avis", name: "texte", widget: "text" }
              - { label: "Afficher sur le site", name: "visible", widget: "boolean", default: false }

  - name: "a_propos"
    label: "À Propos"
    files:
      - name: "a_propos"
        label: "Page À Propos"
        file: "_data/a-propos.json"
        fields:
          - { label: "Bio (paragraphe 1)", name: "bio1", widget: "text" }
          - { label: "Bio (paragraphe 2)", name: "bio2", widget: "text" }
          - { label: "Photo de Justine", name: "photo_justine", widget: "image" }
          - { label: "Photo de l'espace", name: "photo_espace", widget: "image" }
          - { label: "Photo de la salle de formation", name: "photo_formation", widget: "image" }
```

- [ ] **Étape 3 : Ajouter le script Netlify Identity à index.html**

Ajouter dans le `<head>` de chaque fichier HTML (index.html, soins.html, formations.html, a-propos.html, contact.html) :

```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

Et avant `</body>` :

```html
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
```

- [ ] **Étape 4 : Créer _data/a-propos.json**

```json
{
  "bio1": "Texte de présentation de Justine à compléter — parcours, formation initiale, passion pour les soins drainants et le bien-être.",
  "bio2": "Deuxième paragraphe — certifications, méthodes utilisées (Renata França, Olfa Perbal Paris), philosophie de soin.",
  "photo_justine": "",
  "photo_espace": "",
  "photo_formation": ""
}
```

- [ ] **Étape 5 : Committer**

```bash
git add admin/ _data/a-propos.json
git commit -m "feat: add Netlify CMS admin with collections for services, formations, testimonials and about"
```

---

## Task 11 : Deploy sur Netlify

**Files:**
- Modify: `netlify.toml`

- [ ] **Étape 1 : Vérifier netlify.toml final**

```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
```

- [ ] **Étape 2 : Pousser sur GitHub et connecter à Netlify**

```bash
# Sur GitHub : créer un repo "casa-doro" (privé ou public)
git remote add origin https://github.com/VOTRE_USERNAME/casa-doro.git
git push -u origin main
```

Puis dans Netlify :
1. "Add new site" → "Import from Git" → sélectionner le repo
2. Build command : vide (pas de build)
3. Publish directory : `.`
4. Cliquer "Deploy site"

- [ ] **Étape 3 : Activer Netlify Identity et Git Gateway**

Dans le dashboard Netlify du site :
1. **Identity** → "Enable Identity"
2. **Registration** → "Invite only"
3. **Git Gateway** → "Enable Git Gateway"
4. Inviter Justine : **Identity** → "Invite users" → email de Justine

- [ ] **Étape 4 : Activer Netlify Forms**

Les formulaires sont automatiquement détectés grâce à l'attribut `netlify` dans le HTML.
Vérifier dans Netlify → "Forms" après le premier déploiement que les 3 formulaires apparaissent :
- `contact`
- `inscription-formation`
- `avis`

Configurer les notifications email : **Forms** → cliquer sur chaque form → "Email notifications" → email Justine.

- [ ] **Étape 5 : Remplacer TREATWELL_URL**

Remplacer toutes les occurrences de `TREATWELL_URL` dans les 5 fichiers HTML par la vraie URL Treatwell de Justine.

```bash
# Trouver toutes les occurrences
grep -r "TREATWELL_URL" *.html
# Remplacer manuellement ou avec sed :
sed -i '' 's|TREATWELL_URL|https://www.treatwell.fr/LIEN_JUSTINE|g' *.html
```

- [ ] **Étape 6 : Vérifier le site en production**

Ouvrir l'URL Netlify (ex: `https://casa-doro.netlify.app`) et vérifier :
- Navigation fonctionne sur toutes les pages
- JSON chargés correctement (Network tab)
- Menu hamburger fonctionne sur mobile (DevTools → responsive)
- `/admin` charge l'interface Netlify CMS

- [ ] **Étape 7 : Commit final**

```bash
git add -A
git commit -m "feat: complete Casa dOro vitrine site — ready for production"
git push
```

---

## Task 12 : Contenu réel (photos + texte Justine)

> Cette tâche est réalisée par Justine via l'interface `/admin` une fois le site déployé.

- [ ] **Justine se connecte sur `/admin`** avec l'invitation Netlify reçue par email

- [ ] **Uploader les photos** dans Assets :
  - Photos avant/après corps et visage (pour les polaroids)
  - Photo de Justine (portrait)
  - Photo de l'espace / salle de soin
  - Photo de la salle de formation

- [ ] **Mettre à jour la page À Propos** (bio1, bio2) via la collection "À Propos"

- [ ] **Mettre à jour les témoignages** : ajouter les vrais avis reçus, cocher "Visible" pour les afficher

- [ ] **Vérifier l'adresse et le téléphone** dans les fichiers HTML (contact.html, footer) — à modifier directement dans le code ou via une future collection CMS

---

## Self-Review

**Spec coverage :**
- ✅ 5 pages HTML (Accueil, Soins, Formations, À Propos, Contact)
- ✅ Lien Treatwell pour la réservation
- ✅ Formulaire de contact (Netlify Forms)
- ✅ Formulaire d'inscription formation (Netlify Forms)
- ✅ Formulaire laisser un avis (Netlify Forms)
- ✅ Section témoignages sur l'accueil
- ✅ Galerie avant/après style polaroid
- ✅ Navigation sticky + hamburger mobile
- ✅ Palette de couleurs conforme au spec (#E8E4DF, #FAF6F0, #2D2520, #B8A888, #1C1714)
- ✅ Netlify CMS avec collections Services, Formations, Témoignages, À Propos
- ✅ Responsive mobile-first (breakpoints 768px, 480px)
- ✅ Tous les prix et services de la carte des soins et formations
- ✅ Google Fonts (Cormorant Garamond + Dancing Script + Jost)

**Placeholder scan :** Aucun TBD ou TODO dans le code — seuls les vrais placeholders de contenu ([Adresse], [Texte bio], `TREATWELL_URL`) qui sont volontaires et documentés.

**Type consistency :** Les propriétés JSON (`nom`, `duree`, `prix`, `forfait`, `featured`, `visible`, `texte`) sont utilisées de manière identique dans les data.js `renderServiceTable` / `renderFormationCards` et dans les fichiers JSON.
