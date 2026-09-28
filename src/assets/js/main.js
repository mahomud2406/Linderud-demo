(() => {
  // Brede tabeller får horisontal rulling i stedet for å sprenge siden på mobil.
  document.querySelectorAll(".prose table").forEach((table) => {
    if (table.parentElement.classList.contains("table-wrap")) return;
    const wrap = document.createElement("div");
    wrap.className = "table-wrap";
    wrap.tabIndex = 0;
    table.replaceWith(wrap);
    wrap.appendChild(table);
  });

  // «Send melding»: lager en ferdig utfylt e-post til valgt mottaker.
  const form = document.querySelector("[data-melding-skjema]");
  if (!form) return;

  const mottaker = form.querySelector("[data-mottaker]");
  const valgtMottaker = () => form.querySelector('input[name="til"]:checked');

  const visMottaker = () => {
    const valgt = valgtMottaker();
    if (valgt && mottaker) mottaker.textContent = `${valgt.dataset.rolle} (${valgt.value})`;
  };
  form.addEventListener("change", visMottaker);
  visMottaker();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const tema = data.get("tema");
    const emne = String(data.get("emne") || "").trim();
    const navn = String(data.get("navn") || "").trim();
    const tekst = String(data.get("melding") || "").trim();

    const subject = tema ? `[${tema}] ${emne}` : emne;
    const body = navn ? `${tekst}\n\nHilsen\n${navn}` : tekst;
    const til = valgtMottaker()?.value || form.action.replace(/^mailto:/, "");

    window.location.href =
      `mailto:${til}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
