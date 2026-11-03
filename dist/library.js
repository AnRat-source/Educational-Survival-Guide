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

  const makeItMendelicous = () => {
    const title = document.querySelector('#page-title');
    if (!title) return;
    const quotes = [
      ['“2nd thoughts are 80% wrong.”', '— Sir T'],
      ['“Kill them first before they kill you.”', '— Sir T'],
      ['“You da MAN”', '— Sir T'],
      ['“How sure you are?”', '— Ginoong Orosco'],
      ['“Masyado ba akong matalino”', '— Ginoong Orosco'],
      ['“Oh Em Gee”', '— Dr Singsong'],
      ['“My Family”', '— Dr Sombrero'],
      ['“Call Cenn(t)er”', '— Dr Sombrero'],
      ['“Asawa ko”', '— Sir Oliver'],
      ['“Make us holy”', '— Sir T'],
      ['“Walang Genius sa ParSci”', '— Sir Oliver'],
      ['“You da WOMAN”', '— Sir T'],
      ['“I want Problems!”', '— Sir Oliver'],
      ['“Does Problems want us back? 💔”', '— Parscian #67'],
      ['“Where are we now”', '— Sir Oliver'],
      ['“Ang galing ni Gemini”', '— Sir Oliver'],
    ];
    const [line, source] = quotes[Math.floor(Math.random() * quotes.length)];
    const attribution = document.createElement('em');
    attribution.className = 'quote-source';
    attribution.textContent = source;
    title.replaceChildren(document.createTextNode(line), document.createElement('br'), attribution);

    document.querySelector('.hero .eyebrow').textContent = 'PARSCI // MENDEL FIELD NOTES // SY 2026–2027';
    document.querySelector('.lead').textContent = 'Mendelche, lock in. Reviewers, notes, and presentations ikaw na bahala, ginoo.';
    const status = document.querySelectorAll('.hero-aside div');
    if (status.length === 3) {
      status[0].firstElementChild.textContent = 'MENDELICIOUS ENERGY';
      status[0].lastElementChild.textContent = '02 reviewers, 0 excuses';
      status[1].firstElementChild.textContent = 'SIR OLIVER ARCHIVE';
      status[1].lastElementChild.textContent = 'still cooking';
      status[2].firstElementChild.textContent = 'LAST MENDEL CHECK';
      status[2].lastElementChild.textContent = '03 Nov 2026';
    }
    document.querySelectorAll('.section-heading p').forEach((copy) => {
      if (copy.textContent.includes('newest material')) copy.textContent = 'Reviewer folders, newest material first. Mendelche responsibly.';
      if (copy.textContent.includes('Work in progress')) copy.textContent = 'Work in progress—Sir Oliver’s archive is still in the lab.';
      if (copy.textContent.includes('Slides and project')) copy.textContent = 'For when the GenSci presentation needs to be mendelicous.';
    });
    const resourceCopy = document.querySelectorAll('.entry:not(.is-empty) p');
    if (resourceCopy[0]) resourceCopy[0].textContent = 'PKLP practice for when 2nd thoughts are 80% wrong. Mendelche, lock in.';
    if (resourceCopy[1]) resourceCopy[1].textContent = 'Mendelicous chemistry practice: ions, names, formulas, and no obvious distractors.';
    if (resourceCopy[2]) resourceCopy[2].textContent = 'Reserved for the next GenSci presentation. Sir Oliver, we are ready-ish.';
    document.querySelectorAll('.entry.is-empty p').forEach((copy) => {
      copy.textContent = 'No reviewer yet. Ikaw na bahala, ginoo.';
    });
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
      .hero h1 .quote-source { display:inline-block; margin-top:.18em; font-size:.52em; letter-spacing:-.05em; }
      @media (max-width:760px) {
        .site-header { position:sticky; top:0; z-index:30; padding:0; background:rgba(16,17,25,.96); }
        .brand { width:100%; height:34px; padding:10px 17px 0; border-bottom:1px solid var(--line); }
        .editor-tabs { gap:7px; width:100%; min-height:59px; padding:7px 10px; border:0; scroll-snap-type:x mandatory; overscroll-behavior-x:contain; }
        .editor-tab { min-width:116px; height:45px; padding:0 13px; border:1px solid #45475b; border-radius:4px; background:#1c1d28; color:#dcd8e8; scroll-snap-align:start; font-size:.69rem; font-weight:700; }
        .editor-tab::before, .editor-tab::after { display:none; }
        .editor-tab.is-active { border-color:var(--accent); background:var(--accent); color:#1a1623; box-shadow:0 0 18px rgba(201,167,255,.36); }
        .editor-tab:focus-visible { outline:2px solid #fff; outline-offset:2px; }
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
  makeItMendelicous();
  makeClassFolders();
  makeCardsSelectableAndClickable();
  tabs.forEach((tab) => tab.addEventListener('click', () => selectTab(tab.dataset.tab)));
  const requested = location.hash.slice(1);
  if (tabs.some((tab) => tab.dataset.tab === requested)) selectTab(requested);
})();
