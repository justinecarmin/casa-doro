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
