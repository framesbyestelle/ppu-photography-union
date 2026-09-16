// Mobile navigation toggle
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Gallery: category filtering + lightbox
(function () {
  const grid = document.querySelector('[data-gallery]');
  if (!grid) return;

  const figures = Array.from(grid.querySelectorAll('.gallery-item'));
  const tabsWrap = document.querySelector('[data-filter-tabs]');
  const tabs = tabsWrap ? Array.from(tabsWrap.querySelectorAll('.filter-tab')) : [];
  const emptyMsg = document.querySelector('[data-filter-empty]');

  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  let visibleImgs = [];
  let currentIndex = 0;

  function visibleFigures() {
    return figures.filter((fig) => !fig.hidden);
  }

  function showImage() {
    const img = visibleImgs[currentIndex];
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || '';
  }

  function openAt(index) {
    visibleImgs = visibleFigures().map((fig) => fig.querySelector('img'));
    currentIndex = index;
    showImage();
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function step(delta) {
    if (!visibleImgs.length) return;
    currentIndex = (currentIndex + delta + visibleImgs.length) % visibleImgs.length;
    showImage();
  }

  grid.addEventListener('click', (e) => {
    const fig = e.target.closest('.gallery-item');
    if (!fig || fig.hidden) return;
    const shown = visibleFigures();
    const index = shown.indexOf(fig);
    if (index > -1) openAt(index);
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });

  // Category filtering
  if (tabs.length) {
    function applyFilter(filter, updateHash) {
      const valid = tabs.some((t) => t.dataset.filter === filter);
      if (!valid) filter = 'all';

      figures.forEach((fig) => {
        fig.hidden = filter !== 'all' && fig.dataset.category !== filter;
      });

      tabs.forEach((t) => t.setAttribute('aria-current', String(t.dataset.filter === filter)));

      if (emptyMsg) emptyMsg.hidden = visibleFigures().length > 0;

      if (updateHash) {
        const url = filter === 'all' ? location.pathname + location.search : '#' + filter;
        history.replaceState(null, '', url);
      }
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => applyFilter(tab.dataset.filter, true));
    });

    const initial = (location.hash || '#all').slice(1);
    applyFilter(initial, false);
  }
})();
