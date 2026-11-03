(() => {
  const lessonId = document.body.dataset.lessonId;
  const root = document.querySelector('#lesson');
  const escape = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[char]));
  const printLesson = () => { document.body.classList.remove('notebook-print'); window.print(); };
  const printNotebook = (lesson) => {
    const focus = lesson.focus || [];
    const pages = [
      `<article class="notebook-page"><p class="notebook-kicker">${escape(lesson.subjectLabel)}</p><h2>${escape(lesson.title)}</h2><h3>Lesson overview</h3><p>${escape(lesson.summary)}</p><h3>Recall prompts</h3><ol>${focus.map((point) => `<li>${escape(point)}</li>`).join('')}</ol></article>`,
      `<article class="notebook-page"><p class="notebook-kicker">SELF-CHECK</p><h2>${escape(lesson.title)}</h2><p>Cover the notes, then explain each idea aloud or write a short answer from memory.</p><div class="notebook-lines"></div></article>`,
    ];
    const sheets = [];
    for (let index = 0; index < pages.length; index += 2) sheets.push(`<section class="notebook-sheet">${pages[index]}${pages[index + 1] || '<article class="notebook-page"></article>'}</section>`);
    document.querySelector('.notebook-export').innerHTML = sheets.join('');
    document.body.classList.add('notebook-print');
    window.print();
  };
  const fetchJson = (url, fallback) => fetch(url).then((response) => response.ok ? response.json() : fallback).catch(() => fallback);
  Promise.all([fetchJson('../data/lessons.json', []), fetchJson('../data/lesson-overrides.json', {})]).then(([lessons, overrides]) => {
    const sourceLesson = lessons.find((item) => item.id === lessonId);
    const lesson = sourceLesson && { ...sourceLesson, ...(overrides[sourceLesson.id] || {}) };
    if (!lesson) throw new Error('Lesson not found');
    document.title = `${lesson.title} | Educational Survival Guide`;
    const focus = (lesson.focus || []).map((point) => `<li>${escape(point)}</li>`).join('');
    const notes = (lesson.sections || []).map((section) => `<section class="lesson-section full-notes"><h2>${escape(section.heading)}</h2>${(section.paragraphs || []).map((paragraph) => `<p>${escape(paragraph)}</p>`).join('')}${section.bullets?.length ? `<ul>${section.bullets.map((bullet) => `<li>${escape(bullet)}</li>`).join('')}</ul>` : ''}</section>`).join('');
    root.innerHTML = `<header class="topbar"><a class="back" href="../index.html#notes">← Notes archive</a><span class="subject">${escape(lesson.subjectLabel)}</span></header><section class="lesson-head"><p class="subject">STUDY GUIDE // ${escape(lesson.subject)}</p><h1>${escape(lesson.title)}</h1><p>${escape(lesson.summary)}</p><div class="actions"><button class="action primary" id="pdf">Save as PDF</button><button class="action" id="notebook">Notebook PDF (2-up)</button></div></section><section class="lesson-section lesson-overview"><h2>What this lesson covers</h2><p>${escape(lesson.summary)}</p></section>${notes}${focus ? `<section class="lesson-section lesson-focus"><h2>Key ideas to master</h2><ul>${focus}</ul></section>` : ''}<section class="lesson-section self-check"><h2>Self-check</h2><p>Before moving on, cover the key ideas and explain each one without looking. If you can use an example from class for every point, you are ready for the next lesson.</p></section><div class="notebook-export"></div>`;
    document.querySelector('#pdf').addEventListener('click', printLesson);
    document.querySelector('#notebook').addEventListener('click', () => printNotebook(lesson));
  }).catch(() => { root.innerHTML = '<p class="empty">This lesson could not be loaded. Return to the notes archive and try again.</p>'; });
})();
