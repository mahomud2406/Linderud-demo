import { HtmlBasePlugin } from "@11ty/eleventy";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  // Legger til riktig prefiks på alle lenker når siden ligger i en undermappe
  // (f.eks. brukernavn.github.io/Linderud-demo/). Styres av --pathprefix ved bygging.
  eleventyConfig.addPlugin(HtmlBasePlugin);

  // Filer som kopieres rett over uten behandling (bilder, PDF-er, CSS, JS).
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/dokumenter");
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });

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
