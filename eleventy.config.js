import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  // Legger til riktig prefiks på alle lenker når siden ligger i en undermappe
  // (f.eks. brukernavn.github.io/Linderud-demo/). Styres av --pathprefix ved bygging.
  eleventyConfig.addPlugin(HtmlBasePlugin);

  // Filer som kopieres rett over uten behandling (bilder, PDF-er, CSS, JS).
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/dokumenter");
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });
  for (const vekt of [400, 500, 600]) {
    eleventyConfig.addPassthroughCopy({
      [`node_modules/@fontsource/poppins/files/poppins-latin-${vekt}-normal.woff2`]:
        `assets/fonts/poppins-${vekt}.woff2`,
    });
  }

  // Datoer vises på norsk, f.eks. «8. april 2025».
  eleventyConfig.addFilter("norskDato", (value) => {
    const date = value instanceof Date ? value : new Date(value);
    return new Intl.DateTimeFormat("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Europe/Oslo",
    }).format(date);
  });

  eleventyConfig.addFilter("isoDato", (value) => {
    const date = value instanceof Date ? value : new Date(value);
    return date.toISOString().slice(0, 10);
  });

  // Telefonnummer til tel:-lenke, f.eks. «22 64 61 20» → «+4722646120».
  eleventyConfig.addFilter("telLenke", (value) => {
    const digits = String(value).replace(/[^\d+]/g, "");
    return digits.startsWith("+") ? digits : `+47${digits}`;
  });

  eleventyConfig.addFilter("head", (array, n) => (Array.isArray(array) ? array.slice(0, n) : array));

  eleventyConfig.addCollection("nyheter", (collectionApi) =>
    collectionApi.getFilteredByTag("nyhet").sort((a, b) => b.date - a.date),
  );

  // Temasider (parkering, vaskeri, TV …) sortert etter «rekkefolge» i toppen av filen.
  eleventyConfig.addCollection("temasider", (collectionApi) =>
    collectionApi
      .getFilteredByTag("tema")
      .sort((a, b) => (a.data.rekkefolge ?? 99) - (b.data.rekkefolge ?? 99)),
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
