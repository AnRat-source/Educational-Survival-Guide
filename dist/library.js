(() => {
  let tabs = [...document.querySelectorAll('[data-tab]')];
  const panels = [...document.querySelectorAll('.tab-panel')];
  let rerollQuote = () => {};
  const selectTab = (id) => {
    rerollQuote();
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
    document.querySelectorAll('[data-main-content]').forEach((item) => {
      item.hidden = id !== 'main';
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
      ['“You da WOMAN”', '— Sir T'],
      ['“I want Problems!”', '— Sir Oliver'],
      ['“Does Problems want us back? 💔”', '— Parscian #67'],
      ['“Walang Genius sa Parsci”', '— Sir Oliver'],
    ];
    rerollQuote = () => {
      const [line, source] = quotes[Math.floor(Math.random() * quotes.length)];
      const attribution = document.createElement('em');
      attribution.className = 'quote-source';
      attribution.textContent = source;
      title.replaceChildren(document.createTextNode(line), document.createElement('br'), attribution);
    };
    rerollQuote();

    document.querySelector('.hero .eyebrow').textContent = 'PARSCI // MENDEL FIELD NOTES // SY 2026–2027';
    document.querySelector('.lead').textContent = 'Mendelche, lock in. Reviewers, notes, and presentation slots for when ikaw na bahala, ginoo is no longer a valid study plan.';
    const status = document.querySelectorAll('.hero-aside div');
    if (status.length === 3) {
      status[0].firstElementChild.textContent = 'REVIEWERS READY';
      status[0].lastElementChild.textContent = '04 mock exams';
      status[1].firstElementChild.textContent = 'QUESTION BANK';
      status[1].lastElementChild.textContent = '370 questions';
      status[2].firstElementChild.textContent = 'RANDOM SET SIZE';
      status[2].lastElementChild.textContent = '10 questions';
    }
    document.querySelectorAll('.section-heading p').forEach((copy) => {
      if (copy.textContent.includes('newest material')) copy.textContent = 'Reviewer folders, newest material first. Mendelche responsibly.';
      if (copy.textContent.includes('Work in progress')) copy.textContent = 'Every available lesson has its own page with original scans, diagrams, source material, and two PDF print layouts.';
      if (copy.textContent.includes('Slides and project')) copy.textContent = 'For when the GenSci presentation needs to be mendelicous.';
    });
    const reviewerCopy = document.querySelectorAll('#reviewers .entry:not(.is-empty)');
    reviewerCopy.forEach((entry) => {
      const link = entry.querySelector('.entry-link');
      const copy = entry.querySelector('p');
      if (!link || !copy) return;
      if (link.getAttribute('href') === 'pklp-reviewer.html') copy.textContent = 'PKLP practice for when 2nd thoughts are 80% wrong. Mendelche, lock in.';
      if (link.getAttribute('href') === 'chemistry-specific-reviewer.html') copy.textContent = 'Mendelicous chemistry practice: ions, names, formulas, and no obvious distractors.';
      if (link.getAttribute('href') === 'gensci-nervous-endocrine-reviewer.html') copy.textContent = 'Neurons, reflexes, brain regions, endocrine control, and homeostasis. Lock in before the next GenSci quiz.';
      if (link.getAttribute('href') === 'chem-quiz4-reviewer.html') copy.textContent = 'Bonding, Lewis structures, polarity, VSEPR, and geometry. Mendelche, no random guessing.';
    });
    const presentationCopy = document.querySelector('#presentations .entry:not(.is-empty) p');
    if (presentationCopy) presentationCopy.textContent = 'Reserved for the next GenSci presentation. Mendelche, we are ready-ish.';
    document.querySelectorAll('.entry.is-empty p').forEach((copy) => {
      copy.textContent = 'No reviewer yet. Ikaw na bahala, ginoo.';
    });
  };

  const buildTodayDashboard = () => {
    const schedules = {
      Monday: [
        ['7:00–8:00', 'Homeroom Guidance Program', ''], ['8:00–9:00', 'General Science', 'GenSci'], ['9:00–9:20', 'Recess', 'break'], ['9:20–10:20', 'General Mathematics', 'GenMath'], ['10:20–11:20', 'Pag-aaral ng Kasaysayan at Lipunang Pilipino', 'PKLP'], ['11:20–12:00', 'Lunch', 'break'], ['12:00–1:00', 'Life and Career Skills', 'LCS'], ['1:00–2:30', 'Chemistry 1 (E)', 'Chemistry'], ['2:30–3:30', 'Pag-aaral ng Kasaysayan at Lipunang Pilipino', 'PKLP'],
      ],
      Tuesday: [
        ['7:00–8:00', 'General Science', 'GenSci'], ['8:00–9:00', 'General Mathematics', 'GenMath'], ['9:00–9:20', 'Recess', 'break'], ['9:20–10:20', 'Mabisang Komunikasyon', 'MabKom'], ['10:20–11:20', 'Enrichment (Mathematics)', 'GenMath'], ['11:20–12:00', 'Lunch', 'break'], ['12:00–1:00', 'Life and Career Skills', 'LCS'], ['1:00–2:30', 'Chemistry 1 (E)', 'Chemistry'], ['2:30–3:30', 'Life and Career Skills', 'LCS'],
      ],
      Wednesday: [
        ['7:00–8:00', 'General Science', 'GenSci'], ['8:00–9:00', 'General Mathematics', 'GenMath'], ['9:00–9:20', 'Recess', 'break'], ['9:20–10:20', 'Mabisang Komunikasyon', 'MabKom'], ['10:20–11:20', 'Pag-aaral ng Kasaysayan at Lipunang Pilipino', 'PKLP'], ['11:20–12:00', 'Lunch', 'break'], ['12:00–1:00', 'Life and Career Skills', 'LCS'], ['1:00–2:30', 'Chemistry 1 (E)', 'Chemistry'], ['2:30–3:30', 'Enrichment (English)', 'EffCom'],
      ],
      Thursday: [
        ['7:00–8:00', 'General Science', 'GenSci'], ['8:00–9:00', 'General Mathematics', 'GenMath'], ['9:00–9:20', 'Recess', 'break'], ['9:20–10:20', 'Effective Communication', 'EffCom'], ['10:20–11:20', 'Pag-aaral ng Kasaysayan at Lipunang Pilipino', 'PKLP'], ['11:20–12:00', 'Lunch', 'break'], ['12:00–1:00', 'Life and Career Skills', 'LCS'], ['1:00–2:30', 'Chemistry 1 (E)', 'Chemistry'],
      ],
      Friday: [
        ['7:00–8:00', 'General Science', 'GenSci'], ['8:00–9:00', 'General Mathematics', 'GenMath'], ['9:00–9:20', 'Recess', 'break'], ['9:20–10:20', 'Effective Communication', 'EffCom'], ['10:20–11:20', 'Pag-aaral ng Kasaysayan at Lipunang Pilipino', 'PKLP'], ['11:20–12:00', 'Lunch', 'break'], ['12:00–1:00', 'Life and Career Skills', 'LCS'], ['1:00–2:30', 'Chemistry 1 (E)', 'Chemistry'],
      ],
    };
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-PH', { timeZone: 'Asia/Manila', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).formatToParts(now);
    const day = parts.find((part) => part.type === 'weekday').value;
    const date = parts.filter((part) => part.type !== 'weekday').map((part) => part.value).join('').replace(/^,\s*/, '');
    const today = schedules[day] || [];
    const toMinutes = (value) => {
      const [hourText, minuteText] = value.trim().split(':');
      let hour = Number(hourText);
      if (hour > 0 && hour < 7) hour += 12;
      return hour * 60 + Number(minuteText);
    };
    const currentTime = new Intl.DateTimeFormat('en-PH', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(now);
    const nowMinutes = Number(currentTime.find((part) => part.type === 'hour').value) * 60 + Number(currentTime.find((part) => part.type === 'minute').value);
    const periods = today.filter(([, , key]) => key !== 'break');
    const current = periods.find(([time]) => {
      const [start, end] = time.split('–');
      return nowMinutes >= toMinutes(start) && nowMinutes < toMinutes(end);
    });
    const next = periods.find(([time]) => nowMinutes < toMinutes(time.split('–')[0]));
    const currentLabel = current ? current[1] : today.length ? (nowMinutes < toMinutes(today[0][0].split('–')[0]) ? 'Before first period' : 'Classes finished') : 'No classes today';
    const nextLabel = next ? `${next[0]} · ${next[1]}` : 'No more classes today';
    // Add future events here: { date: 'Nov 6', title: 'Chemistry quiz', course: 'Chemistry' }
    const upcomingEvents = [];
    const title = document.querySelector('.hero .eyebrow');
    if (title) title.textContent = `TODAY // ${day.toUpperCase()} // ${date.toUpperCase()}`;
    const status = document.querySelectorAll('.hero-aside div');
    if (status.length === 3) {
      status[0].firstElementChild.textContent = 'CURRENT CLASS';
      status[0].lastElementChild.textContent = currentLabel;
      status[1].firstElementChild.textContent = 'NEXT CLASS';
      status[1].lastElementChild.textContent = nextLabel;
      status[2].firstElementChild.textContent = 'UPCOMING EVENTS';
      status[2].lastElementChild.textContent = upcomingEvents.length ? `${upcomingEvents.length} scheduled` : 'Nothing scheduled';
    }
    const hero = document.querySelector('.hero');
    hero.dataset.mainContent = '';
    const dashboard = document.createElement('section');
    dashboard.className = 'today-dashboard';
    dashboard.dataset.mainContent = '';
    const rows = today.length ? today.map(([time, subject, key]) => `<li class="schedule-row ${key === 'break' ? 'is-break' : ''}"><time>${time}</time><span>${subject}</span></li>`).join('') : '<li class="schedule-empty">No classes on the timetable today. A little rest is also productive.</li>';
    const eventCards = upcomingEvents.map((event) => `<article class="today-page"><span>${event.date} // ${event.course}</span><strong>${event.title}</strong></article>`).join('');
    dashboard.innerHTML = `<div class="today-heading"><div><p class="eyebrow">DAILY COMMAND CENTER</p><h2>${day} schedule</h2></div><p>${date} · See where you are now, then what comes next.</p></div><div class="today-grid"><section class="schedule-panel"><h3>Today’s periods</h3><ol>${rows}</ol></section><aside class="today-resources"><h3>Upcoming events</h3><div class="today-page-list">${eventCards || '<p class="no-page">Nothing scheduled yet. Add quizzes, deadlines, and school events here when they happen.</p>'}</div></aside></div>`;
    hero.after(dashboard);
  };

  const addMainTab = () => {
    const nav = document.querySelector('.editor-tabs');
    const button = document.createElement('button');
    button.className = 'editor-tab';
    button.type = 'button';
    button.dataset.tab = 'main';
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', 'false');
    button.textContent = 'main';
    nav.prepend(button);
    tabs = [...document.querySelectorAll('[data-tab]')];
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
      .today-dashboard { padding:48px 0; border-bottom:1px solid var(--line); }
      .today-heading { display:flex; align-items:end; justify-content:space-between; gap:25px; margin-bottom:25px; }
      .today-heading h2 { margin:7px 0 0; font:500 clamp(1.5rem,3vw,2.1rem)/1 'Ubuntu Mono',monospace; letter-spacing:-.07em; }
      .today-heading > p { max-width:380px; margin:0; color:var(--muted); font-size:.84rem; line-height:1.65; }
      .today-grid { display:grid; grid-template-columns:minmax(0,1.28fr) minmax(245px,.72fr); border:1px solid var(--line); background:rgba(23,24,32,.57); }
      .schedule-panel,.today-resources { padding:21px; }.today-resources { border-left:1px solid var(--line); }
      .today-grid h3 { margin:0 0 15px; color:var(--accent-bright); font:700 .7rem 'Ubuntu Mono',monospace; letter-spacing:.09em; text-transform:uppercase; }
      .schedule-panel ol { display:grid; gap:0; margin:0; padding:0; list-style:none; }
      .schedule-row { display:grid; grid-template-columns:105px 1fr; gap:13px; padding:10px 0; border-top:1px solid rgba(80,81,98,.57); font-size:.86rem; }
      .schedule-row time { color:var(--accent); font:700 .72rem 'Ubuntu Mono',monospace; }.schedule-row.is-break { color:var(--quiet); font-style:italic; }
      .schedule-empty,.no-page { margin:0; color:var(--muted); font-size:.84rem; line-height:1.6; }
      .today-page-list { display:grid; gap:9px; }.today-page { display:grid; grid-template-columns:1fr auto; gap:5px 10px; padding:13px; border:1px solid #3b3d4b; background:#1b1d26; }.today-page:hover { border-color:var(--accent); background:#232430; }
      .today-page span { color:var(--accent); font:700 .61rem 'Ubuntu Mono',monospace; letter-spacing:.08em; }.today-page strong { color:#ede9f6; font:600 .82rem/1.35 Manrope,Arial,sans-serif; }.today-page b { grid-column:2; grid-row:1 / span 2; align-self:center; color:var(--accent-bright); font:700 .68rem 'Ubuntu Mono',monospace; }.notes-link { border-style:dashed; background:rgba(23,24,32,.3); }
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
        .today-dashboard { padding:34px 0; }.today-heading { align-items:flex-start; flex-direction:column; gap:10px; margin-bottom:18px; }.today-grid { grid-template-columns:1fr; }.today-resources { border-top:1px solid var(--line); border-left:0; }.schedule-panel,.today-resources { padding:16px; }.schedule-row { grid-template-columns:87px 1fr; gap:9px; font-size:.81rem; }
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

  const populateNotes = () => {
    const fetchJson = (url, fallback) => fetch(url).then((response) => response.ok ? response.json() : fallback).catch(() => fallback);
    Promise.all([fetchJson('data/lessons.json', []), fetchJson('data/lesson-overrides.json', {})]).then(([sourceLessons, overrides]) => {
      const lessons = sourceLessons.map((lesson) => ({ ...lesson, ...(overrides[lesson.id] || {}) }));
      document.querySelectorAll('#notes .class-group').forEach((group) => {
        const folder = group.querySelector('.class-folder');
        const title = folder?.querySelector('.class-title')?.textContent.replace('//', '').trim();
        const entries = lessons.filter((lesson) => lesson.subject === title);
        if (!folder || !entries.length) return;
        folder.querySelector('.empty-note')?.remove();
        const grid = document.createElement('div');
        grid.className = 'entry-grid';
        entries.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true })).forEach((lesson, index) => {
          const card = document.createElement('article');
          card.className = 'entry';
          const header = document.createElement('div');
          header.className = 'entry-header';
          const type = document.createElement('span');
          type.className = 'class-label';
          type.textContent = 'CLEAN STUDY GUIDE';
          const date = document.createElement('time');
          date.className = 'date';
          date.removeAttribute('datetime');
          date.textContent = `LESSON ${index + 1}`;
          const heading = document.createElement('h3');
          heading.textContent = lesson.title;
          const copy = document.createElement('p');
          copy.textContent = lesson.summary;
          const link = document.createElement('a');
          link.className = 'entry-link';
          link.href = `lessons/${lesson.id}.html`;
          link.textContent = 'Open lesson';
          header.append(type, date);
          card.append(header, heading, copy, link);
          grid.append(card);
        });
        folder.append(grid);
      });
      makeCardsSelectableAndClickable();
    }).catch(() => {});
  };

  const makeCardsSelectableAndClickable = () => {
    document.querySelectorAll('.entry').forEach((card) => {
      if (card.dataset.cardReady) return;
      const link = card.querySelector('.entry-link');
      if (!link) return;
      card.dataset.cardReady = 'true';
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
  buildTodayDashboard();
  addMainTab();
  makeClassFolders();
  makeCardsSelectableAndClickable();
  populateNotes();
  tabs.forEach((tab) => tab.addEventListener('click', () => selectTab(tab.dataset.tab)));
  const requested = location.hash.slice(1) || 'main';
  if (tabs.some((tab) => tab.dataset.tab === requested)) selectTab(requested);
})();
