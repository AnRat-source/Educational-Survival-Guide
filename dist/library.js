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

  const addFolderStyling = () => {
    const style = document.createElement('style');
    style.textContent = `
      .class-folder { border:1px solid var(--line); background:rgba(23,24,32,.56); }
      .class-folder > summary { display:flex; align-items:center; min-height:60px; margin:0; padding:0 20px; cursor:pointer; list-style:none; user-select:none; }
      .class-folder > summary::-webkit-details-marker { display:none; }
      .class-folder > summary::after { content:'+'; margin-left:auto; color:var(--accent); font:500 1.4rem/1 'Ubuntu Mono',monospace; }
      .class-folder[open] > summary { border-bottom:1px solid var(--line); background:rgba(41,37,55,.55); }
      .class-folder[open] > summary::after { content:'−'; }
      .class-folder > :not(summary) { margin-right:20px; margin-left:20px; }
      .class-folder > .entry-grid { padding:17px 0 20px; }
      .class-folder > .empty-note { padding:0 0 20px; }
      .entry--link { cursor:pointer; }
      .entry--link::selection, .entry--link *::selection { color:#17111f; background:var(--accent-bright); }
      @media (max-width:760px) {
        .site-header { position:relative; }
        .editor-tabs { scroll-snap-type:x mandatory; overscroll-behavior-x:contain; }
        .editor-tab { min-width:108px; scroll-snap-align:start; padding:0 10px; font-size:.63rem; }
        .hero { padding-top:44px; }
        .hero-aside { width:100%; }
        .tab-panel { padding-top:34px; }
        .class-list { gap:18px; }
        .class-group::before { display:none; }
        .class-folder > summary { min-height:55px; padding:0 14px; font-size:1rem; }
        .class-folder > :not(summary) { margin-right:12px; margin-left:12px; }
        .entry-grid { gap:10px; }
      }
    `;
    document.head.append(style);
  };

  const makeClassFolders = () => {
    document.querySelectorAll('.class-group').forEach((group) => {
      const heading = group.querySelector(':scope > .class-title');
      if (!heading) return;
      const folder = document.createElement('details');
      folder.className = 'class-folder';
      const summary = document.createElement('summary');
      summary.className = heading.className;
      summary.innerHTML = heading.innerHTML;
      folder.append(summary);
      [...group.children].forEach((child) => {
        if (child !== heading) folder.append(child);
      });
      heading.remove();
      group.append(folder);
    });
  };

  const makeCardsSelectableAndClickable = () => {
    document.querySelectorAll('.entry').forEach((card) => {
      const link = card.querySelector('.entry-link');
      if (!link) return;
      card.classList.add('entry--link');
      card.tabIndex = 0;
      card.setAttribute('role', 'link');
      card.addEventListener('click', (event) => {
        if (event.target.closest('a, button, input, label')) return;
        if (window.getSelection().toString()) return;
        location.href = link.href;
      });
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          location.href = link.href;
        }
      });
    });
  };

  addFolderStyling();
  makeClassFolders();
  makeCardsSelectableAndClickable();
  tabs.forEach((tab) => tab.addEventListener('click', () => selectTab(tab.dataset.tab)));
  const requested = location.hash.slice(1);
  if (tabs.some((tab) => tab.dataset.tab === requested)) selectTab(requested);
})();
