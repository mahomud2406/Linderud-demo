# Linderudbo – ny nettside

Forslag til ny nettside for Linderud Borettslag II, som erstatning for dagens
[linderudbo.no](http://linderudbo.no).

- Fungerer på mobil, nettbrett og PC
- Sikker tilkobling (https) via GitHub Pages
- Søk i alt innhold
- Design inspirert av Vibbo: runde hurtigknapper, temaknapper og bunnmeny på mobil
- «Send melding»-skjema som åpner en ferdig utfylt e-post til styret, vaktmester m.fl.
- Innholdet ligger som enkle tekstfiler som styret kan endre selv

Siden publiseres automatisk hver gang noe endres, via GitHub Actions
(`.github/workflows/pages.yml`).

## Slik oppdaterer du innholdet (for styret)

Alt innhold ligger i mappen `src/`. Du kan endre det direkte på GitHub i nettleseren:

1. Åpne filen du vil endre, f.eks. `src/temaer/vaskeri.md`.
2. Trykk på blyanten («Edit this file»).
3. Skriv teksten. Du trenger bare noen få tegn for formatering:
   - `## Overskrift` gir en overskrift
   - `**fet tekst**` gir **fet tekst**
   - `- punkt` gir en punktliste
   - `[lenketekst](https://adresse.no)` gir en lenke
4. Trykk «Commit changes». Siden er oppdatert etter et par minutter.

| Hva | Fil |
| --- | --- |
| Temasider (parkering, vaskeri, TV, regelverk …) | `src/temaer/*.md` |
| Kontaktinfo (styret, vaktmester, TV, forretningsfører) | `src/_data/kontakter.json` |
| Dokumenter (PDF-er) | `src/_data/dokumenter.json` |
| Blå temaknapper på forsiden | `src/_data/temaer.json` |
| Runde hurtigknapper på forsiden | `src/_data/hurtigknapper.json` |
| Temaer i «Send melding»-skjemaet | `src/_data/meldingstemaer.json` |
| Oppslag | `src/nyheter/*.md` |

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

Det nyeste oppslaget vises i den gule boksen på forsiden.

### Ny temaside

Lag en ny `.md`-fil i `src/temaer/`. Den dukker automatisk opp under «Temaer»:

```markdown
---
title: Avfall
ingress: Hvor du kaster hva.
ikon: i-info
kort: Kildesortering og grovavfall
rekkefolge: 9
---
```

### Dokumenter og bilder

- PDF-er kan legges i `src/dokumenter/` og føres opp i `src/_data/dokumenter.json` som `/dokumenter/filnavn.pdf`.
- Bilder legges i `src/assets/img/` og settes inn med `![Beskrivelse av bildet](/assets/img/filnavn.jpg)`.

## For utviklere

```sh
npm install
npm start       # lokal forhåndsvisning på http://localhost:8080
npm run build   # bygger til _site/ og lager søkeindeks
```

Bygget med [Eleventy](https://www.11ty.dev/), [Pagefind](https://pagefind.app/) (søk) og skrifttypen Nunito (lagret lokalt).
Ingen informasjonskapsler, analyseverktøy eller innhold fra tredjeparter.
