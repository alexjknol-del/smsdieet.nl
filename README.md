# SMSDieet.nl

Broncode voor smsdieet.nl: een informatieplatform over gezond afvallen, gebouwd met [Astro](https://astro.build) en bedoeld voor hosting via GitHub + Cloudflare Pages.

## Inhoud van de site

- **Home** — introductie van het platform + promotie van Slinc
- **Over** — uitleg platform + persona van de schrijfster (Fleur Wagenaar)
- **Partners** — Voedingscentrum en Gezondheid.nl, uitbreidbaar
- **Nieuws** — bloglisting + individuele artikelen (content collectie, makkelijk uit te breiden)
- **Recepten** — receptinspiratie
- **Tools** — BMI-, calorieën-, streefgewicht- en waterinname-calculator
- **Veelgestelde vragen** — FAQ-pagina
- **Contact** — mailto naar info@smsdieet.nl, bewust geen formulier
- **Privacybeleid / Cookiebeleid** — gelinkt in de footer

## Lokaal draaien

Vereisten: Node.js 18 of hoger.

```bash
npm install
npm run dev
```

De site is dan lokaal te bekijken op `http://localhost:4321`.

Een productie-build testen:

```bash
npm run build
npm run preview
```

## Nieuw nieuwsartikel toevoegen

Elk artikel is een los Markdown-bestand in `src/content/nieuws/`. Nieuw bestand toevoegen, bijvoorbeeld `src/content/nieuws/mijn-nieuwe-titel.md`:

```markdown
---
titel: "Titel van het artikel"
samenvatting: "Korte samenvatting van maximaal twee zinnen."
datum: 2026-08-10
categorie: "Voeding"
---

Inhoud van het artikel in Markdown.
```

De bestandsnaam bepaalt de URL (`/nieuws/mijn-nieuwe-titel`). Het artikel verschijnt automatisch in het overzicht op `/nieuws` en, indien recent, mogelijk tussen de uitgelichte artikelen op de homepage.

## Persona, kleuren en partners aanpassen

- **Persona (schrijfster):** `src/data/persona.ts` — naam, functie en bio-teksten. De illustratie staat als SVG in `public/afbeeldingen/schrijfster-fleur.svg` en kan met elke SVG-/vectoreditor (bijvoorbeeld Figma) aangepast worden.
- **Kleuren en lettertypes:** `src/styles/global.css`, bovenaan onder `:root`.
- **Partners:** `src/pages/partners.astro`, de array `partners` bovenin het bestand.
- **Navigatiemenu:** `src/components/Header.astro`, de array `navItems`.

## Deployen: GitHub + Cloudflare Pages

### 1. Project naar GitHub pushen

Deze projectmap bevat al een lokale git-repository met een eerste commit
(branch `main`). Er hoeft dus niet opnieuw `git init` te worden gedraaid.

Eerst op [github.com](https://github.com/new) een nieuwe, lege repository
aanmaken (zonder README/licentie/`.gitignore`, die zijn er al). Daarna vanuit
de projectmap:

```bash
git remote add origin https://github.com/<gebruikersnaam>/<repository-naam>.git
git push -u origin main
```

Bij nieuwe wijzigingen aan de site volstaat vanaf dat moment:

```bash
git add .
git commit -m "Omschrijving van de wijziging"
git push
```

### 2. Cloudflare Pages koppelen

1. Inloggen op [dash.cloudflare.com](https://dash.cloudflare.com).
2. Naar **Workers & Pages → Create → Pages → Connect to Git**.
3. De zojuist aangemaakte GitHub-repository selecteren.
4. Build-instellingen:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Op **Save and Deploy** klikken. Cloudflare bouwt en publiceert de site op een `*.pages.dev`-adres.

### 3. Domein smsdieet.nl koppelen

1. In het Cloudflare Pages-project naar **Custom domains** gaan.
2. `smsdieet.nl` (en eventueel `www.smsdieet.nl`) toevoegen.
3. Als het domein al bij Cloudflare in beheer is, wordt de DNS meestal automatisch klaargezet. Staat het domein bij een andere provider, dan toont Cloudflare de CNAME/A-records die daar toegevoegd moeten worden.
4. Na DNS-propagatie (kan tot enkele uren duren) is de site bereikbaar op smsdieet.nl.

Na deze koppeling bouwt Cloudflare Pages de site automatisch opnieuw bij elke `git push` naar de `main`-branch.

## Juridisch

De teksten in `src/pages/privacybeleid.astro` en `src/pages/cookiebeleid.astro` zijn een praktische basis, geschreven op basis van hoe de site nu functioneert (geen contactformulier, geen tracking, wel een aanbevelingslink naar Slinc). Een juridische check door een deskundige wordt aangeraden voordat de site live gaat, zeker zodra er analytics, advertenties of een nieuwsbrief bijkomen.
