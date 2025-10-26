// ================================
// THÈME
// ================================
const KEY = 'theme.v1';
const root = document.documentElement;

export function setTheme(theme) {
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');

  localStorage.setItem(KEY, theme);

  document.querySelectorAll('.swatch').forEach(b =>
    b.classList.toggle('active', b.dataset.theme === theme)
  );
}

export function initTheme() {
  root.classList.add('no-anim');
  const initial =
    localStorage.getItem(KEY) ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  setTheme(initial);
  requestAnimationFrame(() => root.classList.remove('no-anim'));

  document.querySelectorAll('.toggle-item').forEach(el => {
    el.addEventListener('click', () => setTheme(el.dataset.theme));
  });
}
