// ================================
// PROTECTION EMAIL
// ================================
export function setupProtectedEmail(scopeEl = document) {
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
      const r = document.createRange();
      r.selectNodeContents(link);
      const s = window.getSelection();
      s.removeAllRanges(); s.addRange(r);
    }
  });
}
