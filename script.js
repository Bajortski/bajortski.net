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
// <input type="color"> and hex parsing only accept #rrggbb
function normalizeHex(c) {
  c = c.trim();
  return /^#[0-9a-fA-F]{3}$/.test(c)
    ? '#' + [...c.slice(1)].map(x => x + x).join('')
    : c;
}
function bgIsDark() {
  const bg = normalizeHex(getComputedStyle(document.documentElement).getPropertyValue('--background-color'));
  const r = parseInt(bg.slice(1, 3), 16);
  const g = parseInt(bg.slice(3, 5), 16);
  const b = parseInt(bg.slice(5, 7), 16);
  if ([r, g, b].some(isNaN)) return effectiveTheme() === 'dark';
  return 0.299 * r + 0.587 * g + 0.114 * b < 128; // perceived brightness
}
// Pick the muppet variant (page art + favicon) with the most contrast
// against the actual background, whether themed or custom.
function updateArtwork() {
  const dark = bgIsDark();
  document.documentElement.dataset.muppet = dark ? 'dark' : 'light';
  const icon = document.querySelector('link[rel="icon"]');
  if (icon) {
    icon.href = dark ? 'MuppeToast-BandW.svg' : 'MuppeToast-BandW-Inverted.svg';
  }
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateArtwork);
// Custom colours: picked via the "colours" button, stored in localStorage,
// applied as inline styles on <html> so they beat both theme palettes.
// Alt shades are derived from the two picked colours with the same ratios
// as the stock palettes (#666/#aaa and #eee/#111).
function applyColors(colors) {
  const s = document.documentElement.style;
  if (!colors) {
    s.removeProperty('--text-color');
    s.removeProperty('--text-color-alt');
    s.removeProperty('--background-color');
    s.removeProperty('--background-color-alt');
    s.removeProperty('--accent-color');
    return;
  }
  s.setProperty('--text-color', colors.text);
  s.setProperty('--background-color', colors.background);
  s.setProperty('--accent-color', colors.accent || colors.text);
  s.setProperty('--text-color-alt', `color-mix(in srgb, ${colors.text} 65%, ${colors.background})`);
  s.setProperty('--background-color-alt', `color-mix(in srgb, ${colors.background} 93%, ${colors.text})`);
}
let savedColors = JSON.parse(localStorage.getItem('customColors') || 'null');
if (savedColors && savedColors.primary) {
  // migrate pre-rename saves ({primary, secondary})
  savedColors = { text: savedColors.primary, background: savedColors.secondary };
  localStorage.setItem('customColors', JSON.stringify(savedColors));
}
if (savedColors) applyColors(savedColors);
updateArtwork();

function clearColors() {
  applyColors(null);
  localStorage.removeItem('customColors');
  updateArtwork();
}

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
  clearColors();
});

// Shared page header: pages carry a <div id="site-header"></div> placeholder
// that gets replaced with this markup, so the header is edited in one place.
// (index.html has its own variant and no placeholder.)
const SITE_HEADER = `<table class="header">
  <tr>
    <td colspan="5" rowspan="1" class="width-auto">
      <h1 class="title"><a class="no-underline" href="index.html">bajortski.net</a></h1>
    </td>
    <th>version</th>
    <td class="width-min" id="version-cell"></td>
  </tr>
  <tr>
    <td colspan="7">
      <div class="marquee-header">
        <p id="markdown-content"></p>
      </div>
    </td>
  </tr>
</table>`;

// Header injection + colour picker UI. Registered before the content fetches
// below so the header's elements exist by the time their callbacks run.
// The picker UI only appears on the homepage; the saved palette still
// applies everywhere.
document.addEventListener('DOMContentLoaded', () => {
  const placeholder = document.getElementById('site-header');
  if (placeholder) {
    placeholder.outerHTML = SITE_HEADER;
  }

  const path = location.pathname;
  if (path !== '/' && !path.endsWith('/index.html')) return;
  const wrap = document.createElement('div');
  wrap.className = 'colour-picker';
  wrap.innerHTML =
    '<a href="#" id="colour-picker-toggle" class="inline-links">colours</a>' +
    '<div id="colour-picker-panel" hidden>' +
      '<label>text <input type="color" id="colour-text"></label>' +
      '<label>background <input type="color" id="colour-background"></label>' +
      '<label>accent <input type="color" id="colour-accent"></label>' +
      '<a href="#" id="colour-reset" class="inline-links">reset</a>' +
    '</div>';
  document.body.appendChild(wrap);

  const panel = document.getElementById('colour-picker-panel');
  const text = document.getElementById('colour-text');
  const background = document.getElementById('colour-background');
  const accent = document.getElementById('colour-accent');

  function syncInputs() {
    const style = getComputedStyle(document.documentElement);
    text.value = normalizeHex(style.getPropertyValue('--text-color'));
    background.value = normalizeHex(style.getPropertyValue('--background-color'));
    // --accent-color may be an unresolved var() reference; fall back to text
    const accentValue = normalizeHex(style.getPropertyValue('--accent-color'));
    accent.value = /^#[0-9a-fA-F]{6}$/.test(accentValue) ? accentValue : text.value;
  }

  document.getElementById('colour-picker-toggle').addEventListener('click', e => {
    e.preventDefault();
    panel.hidden = !panel.hidden;
    if (!panel.hidden) syncInputs();
  });
  function save() {
    const colors = { text: text.value, background: background.value, accent: accent.value };
    applyColors(colors);
    localStorage.setItem('customColors', JSON.stringify(colors));
    updateArtwork();
  }
  text.addEventListener('input', save);
  background.addEventListener('input', save);
  accent.addEventListener('input', save);
  document.getElementById('colour-reset').addEventListener('click', e => {
    e.preventDefault();
    clearColors();
    syncInputs();
  });
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
document.addEventListener('DOMContentLoaded', () => {
  fetch('statuses.md')
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
  fetch('version.md')
    .then(response => response.text())
    .then(version => {
      const versionCell = document.getElementById('version-cell');
      if (versionCell) {
        versionCell.textContent = version.trim();
      }
    });
});
