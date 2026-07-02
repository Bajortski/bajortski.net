// Theme: follows system unless overridden via the "t" keybind.
// The override lives in localStorage and is applied before first paint.
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light' || savedTheme === 'dark') {
  document.documentElement.dataset.theme = savedTheme;
}
function effectiveTheme() {
  return document.documentElement.dataset.theme ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}
function applyFavicon() {
  const icon = document.querySelector('link[rel="icon"]');
  if (!icon) return;
  icon.href = effectiveTheme() === 'light'
    ? 'MuppeToast-BandW-Inverted.svg'
    : 'MuppeToast-BandW.svg';
}
applyFavicon();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyFavicon);
document.addEventListener('keydown', e => {
  if (e.key !== 't' || e.metaKey || e.ctrlKey || e.altKey) return;
  const t = e.target;
  if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
  const root = document.documentElement;
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const current = root.dataset.theme || (systemDark ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  if ((next === 'dark') === systemDark) {
    // toggled back to what the system wants: drop the override
    delete root.dataset.theme;
    localStorage.removeItem('theme');
  } else {
    root.dataset.theme = next;
    localStorage.setItem('theme', next);
  }
  applyFavicon();
});

function parseStatuses(markdown) {
  return markdown
  .split('\n')
  .map(line => line.trim())
  .filter(line => line.length > 0);
  }
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// Re-trigger a marquee's CSS animation once its width is final, so the
// translate(-50%) keyframe is resolved against real content rather than an
// empty/unfonted box (iOS Safari otherwise leaves it frozen until a repaint).
function restartMarquee(el) {
  if (!el) return;
  el.style.animation = 'none';
  void el.offsetWidth; // force reflow
  el.style.animation = '';
}
fetch('https://raw.githubusercontent.com/Bajortski/bajortski.github.io/refs/heads/main/statuses.md')
  .then(response => response.text())
  .then(markdown => {
    const statuses = parseStatuses(markdown);
    shuffle(statuses);
    const joined = statuses.join('  \u25C7  ') + '  \u25C7  ';
    const el = document.getElementById('markdown-content');
    if (!el) return;
    el.innerHTML = joined + joined;
    restartMarquee(el);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => restartMarquee(el));
    }
  });
fetch('https://raw.githubusercontent.com/Bajortski/bajortski.github.io/refs/heads/main/version.md')
  .then(response => response.text())
  .then(version => {
    const versionCell = document.getElementById('version-cell');
    if (versionCell) {
      versionCell.textContent = version.trim();
    }
  });
