# Linderudbo – ny nettside

Forslag til ny nettside for Linderud Borettslag II, som erstatning for dagens
[linderudbo.no](http://linderudbo.no).

- Fungerer på mobil, nettbrett og PC
- Sikker tilkobling (https) via GitHub Pages
- Søk i alt innhold
- Snarveier og kontaktinfo rett på forsiden
- Innholdet ligger som enkle tekstfiler som styret kan endre selv

Siden publiseres automatisk hver gang noe endres, via GitHub Actions
(`.github/workflows/pages.yml`).

## Slik oppdaterer du innholdet (for styret)

Alt innhold ligger i mappen `src/`. Du kan endre det direkte på GitHub i nettleseren:

1. Åpne filen du vil endre, f.eks. `src/borettslaget/parkering.md`.
2. Trykk på blyanten («Edit this file»).
3. Skriv teksten. Du trenger bare noen få tegn for formatering:
   - `## Overskrift` gir en overskrift
   - `**fet tekst**` gir **fet tekst**
   - `- punkt` gir en punktliste
   - `[lenketekst](https://adresse.no)` gir en lenke
4. Trykk «Commit changes». Siden er oppdatert etter et par minutter.

### Kontaktinformasjon

Telefonnummer og e-post for styret, vaktmester og forretningsfører ligger i
`src/_data/kontakter.json`. De vises både på forsiden, på kontaktsiden og nederst
på alle sider.

### Snarveier på forsiden

Endres i `src/_data/snarveier.json`.

### Legge ut et oppslag

Lag en ny fil i `src/nyheter/`, f.eks. `src/nyheter/2026-10-01-dugnad.md`:

```markdown
---
title: Dugnad lørdag 12. oktober
date: 2026-10-01
ingress: Vi møtes ved lekeplassen kl. 10.
---

Mer tekst her.
```

De fem nyeste oppslagene vises på forsiden.

### Dokumenter og bilder

- PDF-er legges i `src/dokumenter/` og lenkes til som `/dokumenter/filnavn.pdf`.
- Bilder legges i `src/assets/img/` og settes inn med `![Beskrivelse av bildet](/assets/img/filnavn.jpg)`.

### Ny side

Lag en ny `.md`-fil. Toppen av filen bestemmer tittel og plassering i menyen:

```markdown
---
layout: layouts/page.njk
title: Vaskeri
ingress: Åpningstider og regler for fellesvaskeriet.
eleventyNavigation:
  key: Vaskeri
  parent: Borettslaget
  order: 4
---
```

## For utviklere

```sh
npm install
npm start       # lokal forhåndsvisning på http://localhost:8080
npm run build   # bygger til _site/ og lager søkeindeks
```

Bygget med [Eleventy](https://www.11ty.dev/) og [Pagefind](https://pagefind.app/) (søk).
Ingen informasjonskapsler, analyseverktøy eller eksterne skrifttyper.
