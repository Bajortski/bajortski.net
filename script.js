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
