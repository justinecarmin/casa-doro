// ---- Bons Cadeaux ----
const STRIPE_LINKS = {
  80:   'https://buy.stripe.com/28E3cw7ue4kFf8ubf5dEs00',
  125:  'https://buy.stripe.com/28E7sM3dY5oJ5xU6YPdEs01',
  150:  'https://buy.stripe.com/3cIbJ201MbN70dAfvldEs02',
  200:  'https://buy.stripe.com/cNicN66qa4kFbWicj9dEs03',
  280:  'https://buy.stripe.com/cNifZi6qaeZjaSe5ULdEs04',
  550:  'https://buy.stripe.com/6oUaEYdSC9EZgcygzpdEs05',
  650:  'https://buy.stripe.com/LIEN_650EUR',
  900:  'https://buy.stripe.com/LIEN_900EUR',
  1000: 'https://buy.stripe.com/LIEN_1000EUR',
  1100: 'https://buy.stripe.com/LIEN_1100EUR',
  1600: 'https://buy.stripe.com/LIEN_1600EUR',
  custom: 'https://buy.stripe.com/LIEN_MONTANT_LIBRE',
};

function ouvrirBonCadeau() {
  const modal = document.getElementById('bon-cadeau-modal');
  if (!modal) return;
  modal.classList.add('resa-modal--open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function fermerBonCadeau() {
  const modal = document.getElementById('bon-cadeau-modal');
  if (!modal) return;
  modal.classList.remove('resa-modal--open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  // Web3Forms handler
  document.querySelectorAll('form[data-w3f]').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: new FormData(form)
        });
        const json = await res.json();
        if (json.success) {
          window.location.href = 'merci.html';
        } else {
          alert('Une erreur est survenue. Veuillez réessayer.');
          btn.disabled = false;
        }
      } catch {
        alert('Une erreur est survenue. Veuillez réessayer.');
        btn.disabled = false;
      }
    });
  });

  // Active nav link
  const links = document.querySelectorAll('.nav__links a');
  const path = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Bon Cadeau modal form
  const bcSoin = document.getElementById('bc-soin');
  const bcLibreGroup = document.getElementById('bc-montant-libre-group');
  const bcLibreInput = document.getElementById('bc-montant-libre');
  if (bcSoin && bcLibreGroup) {
    bcSoin.addEventListener('change', function() {
      const [montant] = this.value.split('|');
      if (montant === 'custom') {
        bcLibreGroup.style.display = 'block';
        bcLibreInput.required = true;
      } else {
        bcLibreGroup.style.display = 'none';
        bcLibreInput.required = false;
      }
    });
  }

  const bcForm = document.getElementById('bon-cadeau-form');
  if (bcForm) {
    bcForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const val = document.getElementById('bc-soin').value;
      if (!val) return;
      const [montant, soin] = val.split('|');
      const offreur      = document.getElementById('bc-offreur').value;
      const destinataire = document.getElementById('bc-destinataire').value;
      const email        = document.getElementById('bc-email').value;
      let stripeUrl, montantFinal;
      if (montant === 'custom') {
        const libre = parseInt(document.getElementById('bc-montant-libre').value);
        if (!libre || libre < 1) { alert('Veuillez saisir un montant valide.'); return; }
        montantFinal = libre;
        stripeUrl = STRIPE_LINKS.custom;
      } else {
        montantFinal = parseInt(montant);
        stripeUrl = STRIPE_LINKS[montantFinal];
      }
      if (!stripeUrl || stripeUrl.includes('LIEN_')) {
        alert('Le paiement en ligne sera bientôt disponible. Contactez-nous directement.');
        return;
      }
      window.location.href = stripeUrl
        + '?prefilled_email=' + encodeURIComponent(email)
        + '&client_reference_id=' + encodeURIComponent('BON|' + soin + '|' + montantFinal + 'EUR|Pour:' + destinataire + '|De:' + offreur);
    });
  }

  document.addEventListener('keydown', e => { if (e.key === 'Escape') fermerBonCadeau(); });

  // Hamburger menu
  const toggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const open = navLinks.classList.contains('open');
      toggle.setAttribute('aria-expanded', open);
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }
});
