# Casa d'Oro — Site Vitrine · Design Spec

**Date:** 2026-06-16  
**Client:** Casa d'Oro by Justine · Ajaccio, Corse  
**Instagram:** @casa_doro_ajaccio

---

## Objectif

Site vitrine multi-pages pour l'institut Casa d'Oro by Justine. Présente les soins et les formations, redirige vers Treatwell pour la prise de rendez-vous, et permet aux clients de laisser un avis. Le contenu doit être modifiable par Justine sans compétences techniques via une interface d'administration.

---

## Architecture technique

| Élément | Choix |
|---|---|
| Stack | HTML/CSS/JS statique (pas de framework) |
| CMS | Netlify CMS (Decap CMS) — interface admin sur `/admin` |
| Formulaires | Netlify Forms (contact + avis) |
| Hébergement | Netlify (gratuit) |
| Booking | Lien externe Treatwell |

### Pourquoi ce choix
- Gratuit sur Netlify, s'intègre dans le setup existant de l'utilisateur
- Justine accède à `/admin` avec son email pour modifier prix, textes, photos sans toucher au code
- Netlify Forms gère les soumissions de formulaires sans backend

---

## Pages

### 1. Accueil (`index.html`)
- **Navigation** : Logo "Casa d'Oro" à gauche · Liens Soins / Formations / À Propos / Contact · Bouton "Réserver" → Treatwell
- **Hero** : Fond #E8E4DF, titre script "Casa d'Oro by Justine" centré, sous-titre "Drainage · Remodelage · Madothérapie · Formations", bouton "Prendre rendez-vous sur Treatwell"
- **Bandeau catégories** : Soins corps · Soins visage · Reiki · Bains sonores · Formations
- **Soins phares** : 3 cartes (Body Care Signature 150€, Face Care 125€, Reiki 80€)
- **Avant / Après** : Galerie style polaroid avec les photos clients (corps & visage)
- **Témoignages** : 3 avis mis en avant (sélectionnés par Justine via le CMS)
- **CTA Formations** : Bloc fond sombre avec lien vers la page Formations
- **Footer** : Adresse Ajaccio · Instagram · Treatwell · email

### 2. Soins (`soins.html`)
Trois sections distinctes, chacune avec nom du soin, durée et prix.

**Soins Corps et Visage Drainant**
- Drainage lymphatique Renata França 1h/1h15 — 150 €
- Remodelage Renata França 1h/1h15 — 150 €
- Madothérapie Olfa Perbal Paris 1h/1h15 — 150 €
- Body care (drainage+remo+mado) 1h/1h15 — 150 €
- Body care (drainage+remo+mado) 1h30/1h45 — 200 €
- Face Care soin du visage (drainage, remodelage, lithothérapie) 1h — 125 €
- Forfait 5 séances corps — 650 €
- Forfait 10 séances corps — 1 100 €
- Forfait 5 séances visage — 550 €
- Forfait 10 séances visage — 1 000 €

**Reiki**
- Reiki usui tibétain 1h — 80 €
- Forfait 4 séances — 280 €

**Bains Sonores**
- Soin individuel 1h — 80 €
- Soin collectif sur demande 1h — 20 €

Bouton "Réserver sur Treatwell" en fin de page.

### 3. Formations (`formations.html`)
Deux blocs principaux : Corps et Visage.

**Formations Corps**
- Formation Body Care (journée complète) — 890 € · Drainage + Remodelage + Madérothérapie + protocole complet
- Formation Drainage Lymphatique corps (journée) — 500 €
- Formation Remodelage (journée) — 500 €
- Formation Madérothérapie (journée) — 500 €

**Formations Visage**
- Formation Face Care (journée complète) — 600 € · Drainage + Remodelage + Lithothérapie + protocole complet
- Formation Drainage Lymphatique Visage (demi-journée) — 250 €
- Formation Remodelage Visage (demi-journée) — 250 €
- Formation Outils & Techniques Complémentaires Visage (demi-journée) — 250 €

Chaque formation : nom, description, durée, prix, mention "Résultats dès la 1ère séance".  
Formulaire de contact/inscription en bas de page (Netlify Forms).

### 4. À Propos (`a-propos.html`)
- Photo de Justine
- Texte de présentation (parcours, philosophie, certifications)
- Photo de l'espace / salle de formation
- Valeurs : expertise · résultats · bienveillance

### 5. Contact (`contact.html`)
- **Formulaire de contact** : Nom · Email · Message · Envoyer (Netlify Forms → email Justine)
- **Section Avis** : Formulaire "Laisser un avis" (Nom · Note ★ · Texte) — soumissions reçues par email, Justine sélectionne ceux à afficher via le CMS
- Adresse Ajaccio, téléphone, email, lien Instagram

---

## Identité visuelle

### Palette de couleurs
| Nom | Hex | Usage |
|---|---|---|
| Fond principal | `#E8E4DF` | Hero, sections alternées |
| Fond secondaire | `#FAF6F0` | Cartes, nav, footer |
| Texte principal | `#2D2520` | Titres, corps de texte |
| Or / Accent | `#B8A888` | Séparateurs, étoiles, labels |
| Fond sombre | `#1C1714` | Blocs CTA formations, nav bouton |

### Typographie
- **Titres** : Georgia (serif), italique — `Casa d'Oro by Justine`
- **Corps / labels** : Arial / sans-serif, letter-spacing large, uppercase pour les labels

### Composants clés
- **Cartes soins** : fond #FAF6F0, bordure fine, icône ✦, prix bien visible
- **Polaroids avant/après** : fond blanc, légère rotation, ombre douce — exactement comme l'Instagram
- **Pills de navigation** : bandeau horizontal avec séparateurs verticaux fins
- **Boutons CTA** : bordure fine `2D2520` ou fond sombre selon contexte

---

## Netlify CMS — Collections éditables par Justine

| Collection | Champs |
|---|---|
| `services` | nom · description · durée · prix · catégorie |
| `formations` | nom · description · durée · prix · type (corps/visage) |
| `temoignages` | nom client · note (1-5) · texte · visible (oui/non) |
| `a_propos` | texte bio · photo Justine · photo espace |

Justine se connecte sur `/admin` avec son adresse email via Netlify Identity.

---

## Formulaires Netlify

| Formulaire | Destination | Champs |
|---|---|---|
| Contact | Email Justine | Nom · Email · Sujet · Message |
| Inscription formation | Email Justine | Nom · Email · Formation souhaitée · Message |
| Laisser un avis | Email Justine | Nom · Note · Texte de l'avis |

Les avis ne s'affichent pas automatiquement — Justine les approuve manuellement dans le CMS.

---

## Structure de fichiers cible

```
casa-doro/
├── index.html
├── soins.html
├── formations.html
├── a-propos.html
├── contact.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   │   └── (photos avant/après, Justine, espace)
│   └── js/
│       └── main.js
├── admin/
│   ├── index.html      (Netlify CMS entry point)
│   └── config.yml      (définition des collections)
├── _data/
│   ├── services.json
│   ├── formations.json
│   └── temoignages.json
└── netlify.toml
```

---

## Responsive

Le site est mobile-first. Tous les layouts s'adaptent à partir de 375px (iPhone SE). Points de rupture principaux : 768px (tablette) et 1024px (desktop). Le menu de navigation se transforme en menu hamburger sur mobile.

---

## Hors scope

- Système de paiement en ligne
- Calendrier de réservation intégré (→ Treatwell)
- Multilingue
- Blog
