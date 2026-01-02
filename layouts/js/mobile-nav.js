document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.p-menu');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('active');
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('active');
      }
    });
  }
});
