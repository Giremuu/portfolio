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

/* Empêche l'anim au premier paint */
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
   SYSTÈME DE CATÉGORIES - GIREMU
================================== */

const bioContents = {
  parcours: `
    <p>Né en 2004 en France, actuellement alternant en <strong>architecture infrastructure & réseau</strong>.</p>
    <p>Parcours IT orienté <strong>Cybersécurité</strong> : BTS SIO SISR → Licence / Master en cybersécurité en alternance.</p>
    <p>Objectif : <strong>s’installer durablement au Japon</strong> et mettre mes compétences et ma loyauté au service des entreprises qui me feront confiance.</p>
  `,
  certifications: `
    <p><strong>Certifications & jalons</strong></p>
    <ul>
      <li>MOOC RGPD (validé)</li>
      <li>Préparation TOEIC / Cambridge</li>
      <li>Objectif JLPT N3/N2</li>
      <li>À venir : certifications techniques en cybersécurité et infrastructure</li>
    </ul>
  `,
  projets: `
    <p><strong>Projets principaux</strong></p>
    <ul>
      <li><em>Webfolio Giremu</em> — Portfolio React/Tailwind multilingue (FR/EN/JP).</li>
      <li><em>Automatisation</em> — Scripts Linux & playbooks Ansible pour déploiements.</li>
      <li><em>Cyber Lab</em> — Environnement d’apprentissage : Nmap, Wireshark, VulnHub.</li>
    </ul>
  `,
  contact: `
    <p><strong>Me contacter</strong></p>
    <p>📧 Mail : </p>
    <p>💻 GitHub : </p>
    <p>🔗 LinkedIn :</p>
  `
};

(function initCategories() {
  const bioArticle = document.querySelector('.bio-only .bio');
  const btns = document.querySelectorAll('.categories .cat-btn');

  if (!bioArticle || btns.length === 0) return;

  // état initial : "Parcours"
  bioArticle.innerHTML = bioContents.parcours;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-cat');
      const html = bioContents[cat] || '';
      bioArticle.innerHTML = html;

      // état visuel actif
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
})();
