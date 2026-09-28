// Mobilmeny: åpne/lukke hovedmenyen på små skjermer.
(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("hovedmeny");
  if (toggle && nav) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Brede tabeller får horisontal rulling i stedet for å sprenge siden på mobil.
  document.querySelectorAll(".prose table").forEach((table) => {
    if (table.parentElement.classList.contains("table-wrap")) return;
    const wrap = document.createElement("div");
    wrap.className = "table-wrap";
    wrap.tabIndex = 0;
    table.replaceWith(wrap);
    wrap.appendChild(table);
  });
})();
