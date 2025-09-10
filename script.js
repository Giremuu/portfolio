// === Liste de projets ===
const projects = [
  {
    title: "Re Leveling",
    desc: "WebApp perso inspirée de Solo Leveling."
  },
  {
    title: "Webfolio Giremu",
    desc: "Landing page portfolio sombre."
  }
];

const projectList = document.getElementById("projectList");
if (projectList) {
  projects.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p>`;
    projectList.appendChild(card);
  });
}

// === Thème sombre/clair avec persistance ===
(function () {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const saved = localStorage.getItem("theme"); // 'dark' | 'light' | null

  const applyTheme = (mode) => {
    document.body.classList.toggle("light", mode === "light");
    localStorage.setItem("theme", mode);
  };

  applyTheme(saved ?? (prefersDark ? "dark" : "light"));

  btn.addEventListener("click", () => {
    const next = document.body.classList.contains("light") ? "dark" : "light";
    applyTheme(next);
  });
})();

// === Ombre sticky au scroll ===
(function () {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const setShadow = () => {
    header.classList.toggle("drop-shadow", window.scrollY > 6);
  };
  setShadow();
  window.addEventListener("scroll", setShadow, { passive: true });
})();

// === Menu burger (mobile) ===
(function () {
  const btn = document.getElementById("hamburger");
  const links = document.getElementById("navLinks");
  if (!btn || !links) return;

  btn.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Fermer le menu après clic sur un lien
  links.querySelectorAll("a.nav-link").forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );
})();

// === Lien actif selon la section visible ===
(function () {
  const links = [...document.querySelectorAll(".nav-link")];
  if (!links.length) return;

  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const onScroll = () => {
    const y = window.scrollY + 80; // marge sous le header
    let active = null;
    sections.forEach((s) => {
      const top = s.offsetTop,
        bottom = top + s.offsetHeight;
      if (y >= top && y < bottom) active = `#${s.id}`;
    });
    links.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === active)
    );
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
