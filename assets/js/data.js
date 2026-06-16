function renderStars(note) {
  return '★'.repeat(note) + '☆'.repeat(5 - note);
}

async function loadTemoignages() {
  const container = document.getElementById('temoignages-container');
  if (!container) return;
  try {
    const res = await fetch('/_data/temoignages.json');
    const data = await res.json();
    const visible = data.temoignages.filter(t => t.visible).slice(0, 3);
    container.innerHTML = visible.map(t => `
      <div class="temo-card">
        <div class="temo-card__stars">${renderStars(t.note)}</div>
        <p class="temo-card__text">« ${t.texte} »</p>
        <div class="temo-card__name">${t.nom}</div>
      </div>
    `).join('');
  } catch {
    container.innerHTML = '';
  }
}

async function loadServices() {
  try {
    const res = await fetch('/_data/services.json');
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
      <td>${s.nom}${s.duree ? ' <span style="color:var(--text-muted);font-size:12px">— ' + s.duree + '</span>' : ''}</td>
      <td>${s.prix} €</td>
    </tr>
  `).join('');
}

async function loadFormations() {
  try {
    const res = await fetch('/_data/formations.json');
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
      <h3 class="formation-card__name">${f.nom}</h3>
      <p class="formation-card__desc">${f.description}</p>
      ${f.note ? `<p class="formation-card__note">✦ ${f.note}</p>` : ''}
      <div class="formation-card__price">${f.prix} <span>€ · ${f.duree}</span></div>
    </div>
  `).join('');
}
