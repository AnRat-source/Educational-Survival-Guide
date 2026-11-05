let bank = [];
let selected = [];
let submitted = false;

const $ = (selector) => document.querySelector(selector);

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[other]] = [copy[other], copy[index]];
  }
  return copy;
}

function render() {
  submitted = false;
  $('#submit').disabled = false;
  $('#score').textContent = '';
  selected = shuffle(bank).slice(0, 10).map((question) => ({
    ...question,
    options: shuffle([
      { text: question.correct, isCorrect: true },
      ...question.wrong.map((text) => ({ text, isCorrect: false }))
    ])
  }));

  const exam = $('#exam');
  exam.innerHTML = '';
  selected.forEach((question, questionIndex) => {
    const node = $('#question').content.cloneNode(true);
    node.querySelector('.number').textContent = String(questionIndex + 1).padStart(2, '0');
    node.querySelector('h2').textContent = question.prompt;
    question.options.forEach((option, optionIndex) => {
      const label = document.createElement('label');
      label.className = 'option';
      label.innerHTML = `<input type="radio" name="q${questionIndex}" value="${optionIndex}"><span>${option.text}</span>`;
      node.querySelector('.options').append(label);
    });
    exam.append(node);
  });
  $('#progress').textContent = `10 questions selected · ${bank.length} question bank`;
}

function grade() {
  if (submitted) return;
  submitted = true;
  let score = 0;

  selected.forEach((question, questionIndex) => {
    const card = $('#exam').children[questionIndex];
    const picked = card.querySelector(`input[name="q${questionIndex}"]:checked`);
    question.options.forEach((option, optionIndex) => {
      const input = card.querySelector(`input[value="${optionIndex}"]`);
      const label = input.closest('label');
      label.classList.add(option.isCorrect ? 'correct' : picked?.value === String(optionIndex) ? 'wrong' : 'dim');
      input.disabled = true;
    });
    if (picked && question.options[Number(picked.value)].isCorrect) score += 1;
    const feedback = card.querySelector('.feedback');
    feedback.hidden = false;
    feedback.querySelector('strong').textContent = picked && question.options[Number(picked.value)].isCorrect ? 'Correct' : 'Review this one';
    feedback.querySelector('p').textContent = question.explanation;
  });

  $('#score').textContent = `Score: ${score}/10`;
  $('#submit').disabled = true;
}

fetch('chem-quiz4-questions.json')
  .then((response) => {
    if (!response.ok) throw new Error('Question bank could not be loaded.');
    return response.json();
  })
  .then((data) => {
    bank = data.questions;
    if (!Array.isArray(bank) || bank.length < 10) throw new Error('Question bank needs at least 10 questions.');
    render();
  })
  .catch(() => {
    $('#progress').textContent = 'Could not load this reviewer. Please refresh and try again.';
    $('#submit').disabled = true;
  });

$('#reset').addEventListener('click', render);
$('#submit').addEventListener('click', grade);
