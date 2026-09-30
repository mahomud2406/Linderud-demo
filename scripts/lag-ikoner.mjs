// Lager src/_includes/partials/icons.njk fra Phosphor Icons (MIT-lisens, phosphoricons.com).
// Kjør med: npm run ikoner
// Legg til eller bytt ikon ved å endre listen under (id på siden → navn i Phosphor).
import { readFileSync, writeFileSync } from "node:fs";

const vekt = "regular";
const ikoner = {
  "i-hjem": "house",
  "i-oppslag": "newspaper",
  "i-dokument": "file-text",
  "i-stjerne": "squares-four",
  "i-kontakt": "address-book",
  "i-epost": "envelope-simple",
  "i-telefon": "phone",
  "i-verktoy": "wrench",
  "i-vask": "washing-machine",
  "i-bil": "car",
  "i-garasje": "garage",
  "i-lyn": "lightning",
  "i-sok": "magnifying-glass",
  "i-bjelle": "bell",
  "i-bad": "bathtub",
  "i-bygning": "buildings",
  "i-personer": "users",
  "i-regler": "book-open-text",
  "i-tv": "television-simple",
  "i-wifi": "wifi-high",
  "i-last-ned": "download-simple",
  "i-send": "paper-plane-tilt",
  "i-tilbake": "caret-left",
  "i-chevron": "caret-right",
};

const symboler = Object.entries(ikoner).map(([id, navn]) => {
  const svg = readFileSync(
    new URL(`../node_modules/@phosphor-icons/core/assets/${vekt}/${navn}.svg`, import.meta.url),
    "utf8",
  );
  const innhold = svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  return `  <symbol id="${id}" viewBox="0 0 256 256">${innhold}</symbol>`;
});

writeFileSync(
  new URL("../src/_includes/partials/icons.njk", import.meta.url),
  `{#- Ikoner fra Phosphor Icons (MIT), laget av scripts/lag-ikoner.mjs. Ikke rediger for hånd. -#}
<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
${symboler.join("\n")}
</svg>
`,
);
console.log(`Skrev ${symboler.length} ikoner til src/_includes/partials/icons.njk`);
