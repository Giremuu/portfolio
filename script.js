// ===== Projets =====
const projects = [
  { title: "Re Leveling", desc: "WebApp perso inspirée de Solo Leveling." },
  { title: "Webfolio Giremu", desc: "Landing page portfolio sombre." }
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

// ===== Thème sombre/clair avec persistance =====
(function themeInit() {
  const btnMain  = document.getElementById("themeToggle");      // (peut ne pas exister)
  const btnMenu  = document.getElementById("menuThemeToggle");  // bouton dans le dropdown
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const saved = localStorage.getItem("theme"); // 'dark' | 'light' | null

  const apply = mode => {
    document.body.classList.toggle("light", mode === "light");
    localStorage.setItem("theme", mode);
  };

  apply(saved ?? (prefersDark ? "dark" : "light"));

  const toggle = () => {
    const next = document.body.classList.contains("light") ? "dark" : "light";
    apply(next);
  };

  btnMain  && btnMain.addEventListener("click", toggle);
  btnMenu  && btnMenu.addEventListener("click", toggle);
})();

// ===== Dropdown Menu (bouton Menu à droite) =====
(function dropdownMenu() {
  const btn = document.getElementById("menuButton");
  const dd  = document.getElementById("menuDropdown");
  if (!btn || !dd) return;

const openMenu = () => {
  dd.classList.add('open');
  btn.setAttribute('aria-expanded', 'true');
  btn.blur(); // <-- enlève le focus, donc pas d’outline visible
  (dd.querySelector('.menu-item') || btn).focus();
};

  const closeMenu = () => {
    dd.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  };

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    dd.classList.contains("open") ? closeMenu() : openMenu();
  });

  // Fermer au clic dehors
  document.addEventListener("click", (e) => {
    if (!dd.classList.contains("open")) return;
    if (!dd.contains(e.target) && e.target !== btn) closeMenu();
  });

  // Fermer sur Échap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dd.classList.contains("open")) {
      closeMenu();
      btn.focus();
    }
  });

  // Fermer après clic sur un item
  dd.querySelectorAll(".menu-item[href]").forEach(a =>
    a.addEventListener("click", () => closeMenu())
  );
})();


// ===== Bonus: améliorer l'UX du menu =====
(function menuUX() {
  const dd  = document.getElementById("menuDropdown");
  const btn = document.getElementById("menuButton");
  if (!btn || !dd) return;

  // 1) Conserver l’ancre (#...) quand on change de langue
  const hash = window.location.hash || "";
  dd.querySelectorAll('.menu-item[href]').forEach(a => {
    const href = a.getAttribute('href');
    // si lien langue (./, ./en/, ./jp/) ou ./xx/ + rien derrière
    if (/^\.\/(en\/|jp\/)?$/.test(href) || href === "./") {
      a.setAttribute('href', href + (hash ? `index.html${hash}` : "")); // ./en/index.html#projects
    } else if (/^\.\/(en\/|jp\/)index\.html$/.test(href)) {
      a.setAttribute('href', href + hash);
    }
  });

  // 2) Fermer au scroll ou resize
  const close = () => dd.classList.remove('open');
  window.addEventListener('scroll', close, { passive: true });
  window.addEventListener('resize', close);

  // 3) Trap focus (Tab) quand le menu est ouvert
  dd.addEventListener('keydown', (e) => {
    if (!dd.classList.contains('open')) return;
    if (e.key !== 'Tab') return;

    const focusables = [...dd.querySelectorAll('.menu-item')]
      .filter(el => !el.hasAttribute('disabled'));
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last  = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });
})();


// ===== Ombre du header au scroll (optionnel) =====
(function () {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const setShadow = () =>
    header.classList.toggle("drop-shadow", window.scrollY > 6);
  setShadow();
  window.addEventListener("scroll", setShadow, { passive: true });
})();
