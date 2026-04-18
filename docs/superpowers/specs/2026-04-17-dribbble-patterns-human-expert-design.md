# Design Spec: Dribbble Patterns "Human Expert" — SIA Associates

## Context
Site vitrine B2B pour Amine, consultant SAP senior (SIA Associates). Positionnement : approchable et expert. Cibles : DSI, responsables projet SAP, DG de PME/grands groupes.

## 7 Changements

### 1. Hero — Photo portrait + layout split
- Remplacer le ParticleField par la photo d'Amine en cercle avec bordure gradient gold
- Layout split : texte à gauche, portrait à droite (desktop), empilé sur mobile
- Fond réchauffé : gradient subtil `#0F1318` au lieu du noir plat `#0A0E12`, halo gold organique
- Stats en cards avec fond semi-transparent gold `rgba(200,162,75,0.05)`
- Nom + titre sous la photo : "Amine — Fondateur & Consultant"
- Conserver les animations ScrollReveal et AnimatedCounter

### 2. Pillars → Bento Grid
- Architecture SAP : card "hero" dark mode, span 2 rows (col gauche)
- Pilotage + Exploitation : cards moyennes (col droite)
- Cloud SAP : card pleine largeur en bas avec tags inline
- Coins arrondis 12px (rounded-xl) au lieu de 8px
- Backgrounds variés : dark, white, gradient gold
- Conserver le Sankey diagram au-dessus

### 3. Nouvelle section "À propos"
- Positionnée après Pillars (avant Keywords)
- Photo d'Amine plus grande (pas circulaire, rectangle arrondi)
- Bio personnelle + parcours
- Fond bone, layout split image/texte

### 4. Palette réchauffée
- Ink : `#0A0E12` → `#0F1318` (noir légèrement bleuté)
- Coins arrondis globaux : rounded-lg → rounded-xl (12px)
- Pas de changement sur les autres couleurs

### 5. Micro-interactions
- Hover 3D subtil sur les cartes Bento (perspective + rotateX/Y via CSS transform)
- Stagger animations avec timing spring (cubic-bezier(0.34, 1.56, 0.64, 1))
- Transition hover sur cards : border-color + shadow + léger scale(1.02)

### 6. ContactCTA — Photo + citation
- Remplacer le ParticleField par la photo d'Amine (plus petite, circulaire)
- Ajouter une citation directe en italique
- Garder le fond dark mais avec le gradient réchauffé

### 7. Differentiators — Avatar dans le header
- Ajouter un petit avatar circulaire d'Amine (32px) dans chaque card
- Renforce le "je" personnel déjà présent dans les descriptions

## Fichiers à modifier
- `components/sections/Hero.tsx` — refonte majeure
- `components/sections/Pillars.tsx` — passage en bento grid
- `components/sections/Differentiators.tsx` — ajout avatar
- `components/sections/ContactCTA.tsx` — photo + citation
- `app/page.tsx` — ajout section About
- `app/globals.css` — nouvelles animations, hover 3D
- `tailwind.config.ts` — palette, border-radius, animations spring

## Nouveau fichier
- `components/sections/About.tsx` — section À propos

## Fichiers non modifiés
- ParticleField.tsx (conservé pour usage futur potentiel)
- SankeyWorkflow.tsx, AnimatedCounter.tsx, ScrollReveal.tsx
- Header.tsx, Footer.tsx
- Pages secondaires (expertise, approche, clients, blog, contact)
