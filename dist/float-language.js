const languageButton = document.querySelector('#lang');
const pageHeader = document.querySelector('header');

function updateLanguageButtonPosition() {
  languageButton.classList.toggle('is-floating', pageHeader.getBoundingClientRect().bottom < 0);
}

window.addEventListener('scroll', updateLanguageButtonPosition, { passive: true });
updateLanguageButtonPosition();
