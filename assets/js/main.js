// ---- Bons Cadeaux ----
const STRIPE_LINKS = {
  50:  'https://buy.stripe.com/LIEN_50EUR',
  80:  'https://buy.stripe.com/LIEN_80EUR',
  100: 'https://buy.stripe.com/LIEN_100EUR',
  125: 'https://buy.stripe.com/LIEN_125EUR',
  150: 'https://buy.stripe.com/LIEN_150EUR',
  200: 'https://buy.stripe.com/LIEN_200EUR',
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
      const stripeUrl    = STRIPE_LINKS[parseInt(montant)];
      if (!stripeUrl || stripeUrl.includes('LIEN_')) {
        alert('Le paiement en ligne sera bientôt disponible. Contactez-nous directement.');
        return;
      }
      window.location.href = stripeUrl
        + '?prefilled_email=' + encodeURIComponent(email)
        + '&client_reference_id=' + encodeURIComponent('BON|' + soin + '|Pour:' + destinataire + '|De:' + offreur);
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
