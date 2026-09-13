(() => {
  const wrap = document.querySelector('.m221-v4-spine-wrap');
  if (!wrap) return;

  const nav = wrap.querySelector('[data-home-spine]');
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll('[data-section-link]'));
  if (!links.length) return;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'm221-v4-spine-mobile-toggle';
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-label', 'Open section navigation');
  button.innerHTML = '<span class="m221-v4-spine-mobile-index">01</span><span class="m221-v4-spine-mobile-label"></span><span class="m221-v4-spine-mobile-chevron" aria-hidden="true">⌄</span>';

  const indexNode = button.querySelector('.m221-v4-spine-mobile-index');
  const labelNode = button.querySelector('.m221-v4-spine-mobile-label');

  const setActive = (link) => {
    if (!link) return;
    const parts = link.querySelectorAll('span');
    const index = parts[0]?.textContent?.trim() || '01';
    const label = parts[1]?.textContent?.trim() || 'What we build';
    indexNode.textContent = index;
    labelNode.textContent = label;
    links.forEach((item) => item.setAttribute('aria-current', item === link ? 'true' : 'false'));
  };

  const closeMenu = () => {
    wrap.classList.remove('is-mobile-open');
    button.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    wrap.classList.add('is-mobile-open');
    button.setAttribute('aria-expanded', 'true');
  };

  setActive(links.find((link) => link.getAttribute('aria-current') === 'true') || links[0]);
  wrap.insertBefore(button, nav);
  wrap.classList.add('has-mobile-toggle');

  button.addEventListener('click', () => {
    wrap.classList.contains('is-mobile-open') ? closeMenu() : openMenu();
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      setActive(link);
      closeMenu();
    });
  });

  document.addEventListener('click', (event) => {
    if (!wrap.contains(event.target)) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      button.focus();
    }
  });

  const sections = Array.from(document.querySelectorAll('[data-home-section]'));
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const link = links.find((item) => item.dataset.sectionLink === visible.target.id);
      if (link) setActive(link);
    }, { rootMargin: '-22% 0px -58% 0px', threshold: [0, 0.1, 0.25, 0.5] });
    sections.forEach((section) => observer.observe(section));
  }

  const media = window.matchMedia('(max-width: 980px)');
  const handleViewport = () => {
    if (!media.matches) closeMenu();
  };
  media.addEventListener?.('change', handleViewport);
  handleViewport();
})();
