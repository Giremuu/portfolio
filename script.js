/* ================================
   THÈME
================================== */
const KEY = 'theme.v1';
const root = document.documentElement;

function setTheme(theme) {
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
  localStorage.setItem(KEY, theme);
  document.querySelectorAll('.swatch').forEach(b =>
    b.classList.toggle('active', b.dataset.theme === theme)
  );
}

root.classList.add('no-anim');
const initial = localStorage.getItem(KEY)
  || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(initial);
requestAnimationFrame(() => root.classList.remove('no-anim'));

/* clics (garde l'animation douce) */
document.querySelectorAll('.toggle-item').forEach(el => {
  el.addEventListener('click', () => setTheme(el.dataset.theme));
});

/* ================================
   CONTENUS DES CATÉGORIES
================================== */
const bioContents = {
  aboutMe: `
    <p> Diplômé en <strong>cybersécurité et infrastructures</strong> puis passionné par les systèmes, les réseaux et l’automatisation, je <strong>construis pas à pas un parcours technique solide, entre études, alternance et projets personnels.</strong><br><br>Mon objectif : M’installer durablement pour mettre <strong>mes compétences au service de ceux qui me feront confiance.</strong></p>
  `,
  // Section "parcours" injectée par buildTimelineVertical()
  parcours: `<div id="parcours-root"></div>`,
  certifications: `<p> Soon je le jure </p>`,
  projets: `<p> Soon je le jure aussi </p>`,
  contact: `
    <div class="contact-actions" style="display:flex;gap:.6rem;flex-wrap:wrap">
      <a id="email-link" class="cat-btn" href="#" rel="nofollow noopener">Me contacter par email</a>
      <button id="reveal-email" class="cat-btn" data-b64="Z2lyZW11LmpwQGdtYWlsLmNvbQ==">Afficher l’email</button>
      <button id="copy-email" class="cat-btn" hidden>Copier l’email</button>
      <button class="cat-btn"> <p style="margin-top:.6rem">Me retrouver sur GitHub : <a href="https://github.com/Giremuu" target="_blank" rel="noopener">Giremuu</a></p></button>
    </div>
  `
};

/* ================================
   PROTECTION EMAIL
================================== */
function setupProtectedEmail(scopeEl = document) {
  const revealBtn = scopeEl.querySelector('#reveal-email');
  const copyBtn   = scopeEl.querySelector('#copy-email');
  const link      = scopeEl.querySelector('#email-link');
  if (!revealBtn || !copyBtn || !link) return;

  const decodeB64 = (b64) => {
    try { return atob(b64); } catch { return ""; }
  };

  revealBtn.addEventListener('click', () => {
    const email = decodeB64(revealBtn.dataset.b64 || "");
    if (!email) return;

    link.href = `mailto:${email}`;
    link.textContent = email;

    revealBtn.hidden = true;
    copyBtn.hidden = false;

    // on éviter de laisser trainer la donnée
    revealBtn.removeAttribute('data-b64');
  });

  copyBtn.addEventListener('click', async () => {
    const email = (link.textContent || "").trim();
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      const prev = copyBtn.textContent;
      copyBtn.textContent = "Copié !";
      setTimeout(() => (copyBtn.textContent = prev), 1200);
    } catch {
      // fallback manuel
      const r = document.createRange();
      r.selectNodeContents(link);
      const s = window.getSelection();
      s.removeAllRanges(); s.addRange(r);
    }
  });
}

/* ================================
   DONNÉES DU PARCOURS
================================== */
const timelineData = {
  2022: {
    titre: "Baccalauréat",
    tags: ["Saint-Nazaire - Lycée Aristide Briand"],
    html: `
      <ul>
        <li>Baccalauréat Général option Mathématique et Numérique Science de l'Ingénieur obtenu</li>
      </ul>
    `
  },
  2023: {
    titre: "Développement - Université",
    tags: ["Nantes - Université de Science option Informatique parcours Développement"],
    html: `
      <ul>
        <li>Année en développement informatique</li>
      </ul>
    `
  },
  2024: {
    titre: "1ere année BTS",
    tags: ["Saint-Nazaire - IIA","Montoir-de-Bretagne - Groupe IDEA"],
    html: `
      <ul>
        <li>1ere Année en BTS SIO SISR</li>
        <li>+ Stage en service Informatique Support chez GROUPE IDEA</li>
      </ul>
    `
  },
  2025: {
    titre: "2eme année BTS",
    tags: ["Saint-Nazaire - IIA", "Montoir-de-Bretagne - Groupe IDEA"],
    html: `
      <ul>
        <li>Obtention de mon BTS SIO SISR</li>
        <li>Alternance en service Informatique Support chez GROUPE IDEA</li>
      </ul>
    `
  },
  2026: {
    titre: "Licence Informatique",
    tags: ["Saint-Nazaire - IIA", "Montoir-de-Bretagne - Groupe IDEA"],
    html: `
      <ul>
        <li>Obtention de ma Licence STS Option Informatique parcours Cybersécurité</li>
        <li>Alternance en service Infrastructure et Réseau</li>
      </ul>
    `
  }
};

/* ================================
   SLIDER VERTICAL "PARCOURS"
================================== */
function buildTimelineVertical(mountEl) {
  mountEl.innerHTML = `
    <div class="timeline" role="group" aria-label="Parcours">
      <div class="years-vert" role="tablist" aria-label="Années" tabindex="0"></div>
      <article class="year-content" aria-live="polite"></article>
    </div>
  `;

  const yearsOrder = Object.keys(timelineData).map(Number).sort((a, b) => a - b);
  const yearsEl = mountEl.querySelector('.years-vert');
  const contentEl = mountEl.querySelector('.year-content');

  // créer les boutons d'années (colonne)
  yearsOrder.forEach((y, idx) => {
    const btn = document.createElement('button');
    btn.className = 'year-btn';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', String(idx === yearsOrder.length - 1)); // dernière active
    btn.dataset.year = y;
    btn.textContent = y;
    yearsEl.appendChild(btn);
  });

  const getBtn = (year) => yearsEl.querySelector(`.year-btn[data-year="${year}"]`);

  const renderYear = (year) => {
    const data = timelineData[year];
    if (!data) return;
    const tags = (data.tags || []).map(t => `<span class="tag">#${t}</span>`).join("");
    contentEl.innerHTML = `
      <h3>${data.titre}</h3>
      ${tags ? `<div>${tags}</div>` : ""}
      <div class="content">${data.html}</div>
    `;
  };

  const setActive = (year) => {
    yearsEl.querySelectorAll('.year-btn').forEach(b => b.setAttribute('aria-selected', 'false'));
    const active = getBtn(year);
    if (active) active.setAttribute('aria-selected', 'true');
    renderYear(year);
  };

  // clic
  yearsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.year-btn');
    if (!btn) return;
    setActive(Number(btn.dataset.year));
  });

  // clavier (↑/↓)
  yearsEl.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
    e.preventDefault();
    const currentIdx = yearsOrder.findIndex(y => getBtn(y).getAttribute('aria-selected') === 'true');
    const delta = e.key === 'ArrowUp' ? -1 : 1;
    const idx = Math.min(Math.max(0, currentIdx + delta), yearsOrder.length - 1);
    const targetYear = yearsOrder[idx];
    setActive(targetYear);
    getBtn(targetYear).focus();
  });

  // sélection par défaut : année la plus récente
  setActive(yearsOrder[yearsOrder.length - 1]);
}

/* ================================
   CATÉGORIES
================================== */
(function initCategories() {
  const bioArticle = document.querySelector('.bio-only .bio');
  const btns = document.querySelectorAll('.categories .cat-btn');
  if (!bioArticle || btns.length === 0) return;

  // charge "About Me" au démarrage
  bioArticle.innerHTML = bioContents.aboutMe;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-cat');
      const html = bioContents[cat] || '';
      bioArticle.innerHTML = html;

      // Activer bouton
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Pages dynamiques
      if (cat === 'parcours') {
        const mount = document.getElementById('parcours-root');
        if (mount) buildTimelineVertical(mount);
      } else if (cat === 'contact') {
        // ⇨ branche email protégée
        setupProtectedEmail(bioArticle);
      }
    });
  });
})();
