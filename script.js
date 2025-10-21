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
    CATÉGORIES
================================== */

const bioContents = {
  aboutMe: `
    <p> Test - AboutMe </p>
  `,
  parcours: `
    <p> Test - parcours </p>
  `,
  certifications: `
    <p> Test - certifications & diplome </p>
  `,
  projets: `
    <p> Test - projets </p>
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
  bioArticle.innerHTML = bioContents.aboutMe;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-cat');
      const html = bioContents[cat] || '';
      bioArticle.innerHTML = html;

      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
})();
