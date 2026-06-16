function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderStars(note) {
  return '★'.repeat(note) + '☆'.repeat(5 - note);
}

async function loadTemoignages() {
  const container = document.getElementById('temoignages-container');
  if (!container) return;
  try {
    const res = await fetch('/_data/temoignages.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const visible = data.temoignages.filter(t => t.visible).slice(0, 3);
    container.innerHTML = visible.map(t => `
      <div class="temo-card">
        <div class="temo-card__stars">${renderStars(t.note)}</div>
        <p class="temo-card__text">« ${esc(t.texte)} »</p>
        <div class="temo-card__name">${esc(t.nom)}</div>
      </div>
    `).join('');
  } catch {
    container.innerHTML = '<p style="color:var(--text-muted);text-align:center;font-style:italic;">Les avis seront bientôt disponibles.</p>';
  }
}

async function loadServices() {
  try {
    const res = await fetch('/_data/services.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return null;
  }
}

function renderServiceTable(items, selector) {
  const el = document.querySelector(selector);
  if (!el || !items) return;
  el.innerHTML = items.map(s => `
    <tr class="${s.forfait ? 'forfait-row' : ''}">
      <td>${esc(s.nom)}${s.duree ? ' <span style="color:var(--text-muted);font-size:12px">— ' + esc(s.duree) + '</span>' : ''}</td>
      <td>${s.prix} €</td>
    </tr>
  `).join('');
}

async function loadFormations() {
  try {
    const res = await fetch('/_data/formations.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return null;
  }
}

function renderFormationCards(formations, selector) {
  const el = document.querySelector(selector);
  if (!el || !formations) return;
  el.innerHTML = formations.map(f => `
    <div class="formation-card ${f.featured ? 'formation-card--featured' : ''}">
      ${f.featured ? '<span class="formation-card__badge">Formation complète</span>' : ''}
      <h3 class="formation-card__name">${esc(f.nom)}</h3>
      <p class="formation-card__desc">${esc(f.description)}</p>
      ${f.note ? `<p class="formation-card__note">✦ ${esc(f.note)}</p>` : ''}
      <div class="formation-card__price">${f.prix} <span>€ · ${esc(f.duree)}</span></div>
    </div>
  `).join('');
}

async function loadAPropos() {
  try {
    const res = await fetch('/_data/a-propos.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const bio1El = document.getElementById('bio1');
    const bio2El = document.getElementById('bio2');
    if (bio1El && data.bio1) bio1El.textContent = data.bio1;
    if (bio2El && data.bio2) bio2El.textContent = data.bio2;
    const photoJustine = document.getElementById('photo-justine');
    if (photoJustine && data.photo_justine) {
      photoJustine.outerHTML = `<img src="${esc(data.photo_justine)}" alt="Justine" style="width:100%;aspect-ratio:3/4;object-fit:cover;">`;
    }
  } catch {
    // Silently keep static placeholder content
  }
}
