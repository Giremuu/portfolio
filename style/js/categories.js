import { bioContents } from './content.js';
import { timelineData } from './timeline-data.js';
import { buildTimelineVertical } from './timeline.js';
import { setupProtectedEmail } from './email.js';

// ================================
// CATÉGORIES
// ================================
export function initCategories() {
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

      if (cat === 'parcours') {
        const mount = document.getElementById('parcours-root');
        if (mount) buildTimelineVertical(mount, timelineData);
      } else if (cat === 'contact') {
        setupProtectedEmail(bioArticle);
      }
    });
  });
}
