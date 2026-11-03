# PKLP Mock Exam Reviewer

This is a static reviewer site. Open it through any static web server (rather than opening `index.html` directly) so the question-bank JSON can load.

For example, from this folder:

```powershell
npx serve dist
```

The site reads `dist/questions.json`, generates the 200-record pool, and selects a fresh set of 10 distinct topics whenever the page loads or **New random set** is pressed.
