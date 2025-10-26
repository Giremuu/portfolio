// ================================
// SLIDER VERTICAL PARCOURS
// ================================
export function buildTimelineVertical(mountEl, data) {
  mountEl.innerHTML = `
    <div class="timeline" role="group" aria-label="Parcours">
      <div class="years-vert" role="tablist" aria-label="Années" tabindex="0"></div>
      <article class="year-content" aria-live="polite"></article>
    </div>
  `;

  const yearsOrder = Object.keys(data).map(Number).sort((a, b) => a - b);
  const yearsEl = mountEl.querySelector('.years-vert');
  const contentEl = mountEl.querySelector('.year-content');

  yearsOrder.forEach((y, idx) => {
    const btn = document.createElement('button');
    btn.className = 'year-btn';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', String(idx === yearsOrder.length - 1));
    btn.dataset.year = y;
    btn.textContent = y;
    yearsEl.appendChild(btn);
  });

  const getBtn = (year) => yearsEl.querySelector(`.year-btn[data-year="${year}"]`);

  const renderYear = (year) => {
    const yData = data[year];
    if (!yData) return;
    const tags = (yData.tags || []).map(t => `<span class="tag">#${t}</span>`).join("");
    contentEl.innerHTML = `
      <h3>${yData.titre}</h3>
      ${tags ? `<div>${tags}</div>` : ""}
      <div class="content">${yData.html}</div>
    `;
  };

  const setActive = (year) => {
    yearsEl.querySelectorAll('.year-btn').forEach(b => b.setAttribute('aria-selected', 'false'));
    const active = getBtn(year);
    if (active) active.setAttribute('aria-selected', 'true');
    renderYear(year);
  };

  yearsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.year-btn');
    if (!btn) return;
    setActive(Number(btn.dataset.year));
  });

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

  setActive(yearsOrder[yearsOrder.length - 1]);
}
