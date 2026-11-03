(() => {
  const tabs = [...document.querySelectorAll('[data-tab]')];
  const panels = [...document.querySelectorAll('.tab-panel')];
  const selectTab = (id) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.tab === id;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    panels.forEach((panel) => {
      const active = panel.id === id;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
    if (history.replaceState) history.replaceState(null, '', `#${id}`);
  };

  tabs.forEach((tab) => tab.addEventListener('click', () => selectTab(tab.dataset.tab)));
  const requested = location.hash.slice(1);
  if (tabs.some((tab) => tab.dataset.tab === requested)) selectTab(requested);

  document.querySelectorAll('.entry').forEach((card) => {
    const link = card.querySelector('.entry-link');
    if (!link) return;
    card.classList.add('entry--link');
    card.style.cursor = 'pointer';
    card.tabIndex = 0;
    card.setAttribute('role', 'link');
    card.addEventListener('click', (event) => {
      if (event.target.closest('a, button, input, label')) return;
      location.href = link.href;
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        location.href = link.href;
      }
    });
  });
})();
