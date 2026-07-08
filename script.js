// Relative paths in JS-set hrefs and fetches resolve against the page's own
// directory, so pages in subfolders (blog/) need a prefix back to the root.
const SITE_ROOT = location.pathname.includes('/blog/') ? '../' : '';

// Theme: follows system unless overridden via the "t" keybind or by setting custom colours
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light' || savedTheme === 'dark') {
  document.documentElement.dataset.theme = savedTheme;
}
// hex parsing only accepts #rrggbb
function normalizeHex(c) {
  c = c.trim();
  return /^#[0-9a-fA-F]{3}$/.test(c)
    ? '#' + [...c.slice(1)].map(x => x + x).join('')
    : c;
}
function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2, d = max - min;
  let h = 0, s = 0;
  if (d) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}
function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(c * 255).toString(16).padStart(2, '0');
  };
  return '#' + f(0) + f(8) + f(4);
}
// Custom colours: picked via the "colours" button, stored in localStorage, applied as inline styles on <html> so they beat both theme palettes.
// Alt shades are derived from the two picked colours with the same ratios
// as the stock palettes (#666/#aaa and #eee/#111).
function applyColors(colors) {
  const s = document.documentElement.style;
  if (!colors) {
    s.removeProperty('--text-color');
    s.removeProperty('--text-color-alt');
    s.removeProperty('--background-color');
    s.removeProperty('--background-color-alt');
    return;
  }
  s.setProperty('--text-color', colors.foreground);
  s.setProperty('--background-color', colors.background);
  s.setProperty('--text-color-alt', `color-mix(in srgb, ${colors.foreground} 65%, ${colors.background})`);
  s.setProperty('--background-color-alt', `color-mix(in srgb, ${colors.background} 93%, ${colors.foreground})`);
}
let savedColors = JSON.parse(localStorage.getItem('customColors') || 'null');
// migrate palettes saved under older key names
if (savedColors && (savedColors.primary || savedColors.text)) {
  savedColors = {
    foreground: savedColors.primary || savedColors.text,
    background: savedColors.secondary || savedColors.background,
  };
  localStorage.setItem('customColors', JSON.stringify(savedColors));
}
if (savedColors) applyColors(savedColors);

function clearColors() {
  applyColors(null);
  localStorage.removeItem('customColors');
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

// Shared page header
const SITE_HEADER = `<table class="header">
  <tr>
    <td colspan="5" rowspan="1" class="width-auto">
      <h1 class="title"><a class="no-underline" href="${SITE_ROOT}index.html">bajortski.net</a></h1>
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

// Header injection + colour picker UI.
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
      '<div id="colour-swatches">' +
        '<button type="button" class="colour-swatch" data-colour="foreground">foreground <span class="swatch"></span></button>' +
        '<button type="button" class="colour-swatch" data-colour="background">background <span class="swatch"></span></button>' +
      '</div>' +
      '<div class="colour-slider"><label for="colour-h">h</label><input type="range" id="colour-h" min="0" max="360"></div>' +
      '<div class="colour-slider"><label for="colour-s">s</label><input type="range" id="colour-s" min="0" max="100"></div>' +
      '<div class="colour-slider"><label for="colour-l">l</label><input type="range" id="colour-l" min="0" max="100"></div>' +
      '<div class="colour-hex"><label for="colour-hex">#</label><input type="text" id="colour-hex" maxlength="7" spellcheck="false"></div>' +
      '<a href="#" id="colour-reset" class="inline-links">reset</a>' +
    '</div>';
  document.body.appendChild(wrap);

  const panel = document.getElementById('colour-picker-panel');
  const swatches = [...panel.querySelectorAll('.colour-swatch')];
  const hEl = document.getElementById('colour-h');
  const sEl = document.getElementById('colour-s');
  const lEl = document.getElementById('colour-l');
  const hexEl = document.getElementById('colour-hex');

  const colours = {};
  let selected = 'foreground';

  // slider tracks preview each channel around the current colour
  function paintTracks() {
    const h = +hEl.value, s = +sEl.value, l = +lEl.value;
    const hues = [0, 60, 120, 180, 240, 300, 360]
      .map(x => `hsl(${x} ${s}% ${l}%)`).join(', ');
    hEl.style.setProperty('--track', `linear-gradient(to right, ${hues})`);
    sEl.style.setProperty('--track',
      `linear-gradient(to right, hsl(${h} 0% ${l}%), hsl(${h} 100% ${l}%))`);
    lEl.style.setProperty('--track',
      `linear-gradient(to right, hsl(${h} ${s}% 0%), hsl(${h} ${s}% 50%), hsl(${h} ${s}% 100%))`);
  }
  function paintSwatches() {
    swatches.forEach(b => {
      b.querySelector('.swatch').style.background = colours[b.dataset.colour];
      b.setAttribute('aria-pressed', b.dataset.colour === selected);
    });
  }
  // load colours[selected] into the sliders and hex field
  function loadSelected() {
    const { h, s, l } = hexToHsl(colours[selected]);
    hEl.value = h; sEl.value = s; lEl.value = l;
    hexEl.value = colours[selected].slice(1);
    paintTracks();
    paintSwatches();
  }
  // pull the live palette off the page (stock theme or saved custom colours)
  function syncFromPage() {
    const style = getComputedStyle(document.documentElement);
    colours.foreground = normalizeHex(style.getPropertyValue('--text-color'));
    colours.background = normalizeHex(style.getPropertyValue('--background-color'));
    loadSelected();
  }
  function save() {
    applyColors({ ...colours });
    localStorage.setItem('customColors', JSON.stringify(colours));
  }

  document.getElementById('colour-picker-toggle').addEventListener('click', e => {
    e.preventDefault();
    panel.hidden = !panel.hidden;
    if (!panel.hidden) syncFromPage();
  });
  swatches.forEach(b => b.addEventListener('click', () => {
    selected = b.dataset.colour;
    loadSelected();
  }));
  [hEl, sEl, lEl].forEach(el => el.addEventListener('input', () => {
    colours[selected] = hslToHex(+hEl.value, +sEl.value, +lEl.value);
    hexEl.value = colours[selected].slice(1);
    paintTracks();
    paintSwatches();
    save();
  }));
  hexEl.addEventListener('input', () => {
    const v = normalizeHex('#' + hexEl.value.replace(/^#/, ''));
    if (!/^#[0-9a-fA-F]{6}$/.test(v)) return;
    colours[selected] = v;
    const { h, s, l } = hexToHsl(v);
    hEl.value = h; sEl.value = s; lEl.value = l;
    paintTracks();
    paintSwatches();
    save();
  });
  document.getElementById('colour-reset').addEventListener('click', e => {
    e.preventDefault();
    clearColors();
    syncFromPage();
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
// The header muppet lives in images/muppet-header.svg so it can be re-exported
// from Illustrator without touching the HTML. It's fetched and inlined (an
// <img>-loaded SVG is a separate document that page CSS variables can't
// reach), then themed: strokes take the text colour, fills the background
// colour, and every selector is scoped to the svg since inline SVG styles are
// document-global. Handles both Illustrator export modes (internal CSS and
// presentation attributes), so a fresh export works unmodified.
function themeMuppet(svgText) {
  const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
  if (doc.querySelector('parsererror')) return null;
  const svg = doc.documentElement;
  svg.id = 'muppet-header';
  svg.setAttribute('height', '250');
  svg.removeAttribute('width');
  svg.setAttribute('style', 'display: block; width: 100%;');

  const style = svg.querySelector('style');
  if (style) {
    style.textContent = style.textContent
      .replace(/stroke:(?!\s*none)[^;}]+/g, 'stroke: var(--text-color)')
      .replace(/fill:(?!\s*none)[^;}]+/g, 'fill: var(--background-color)')
      .replace(/(^|\})([^{}]+)\{/g, (_, close, sel) =>
        close + sel.split(',').map(s => '#muppet-header ' + s.trim()).join(', ') + ' {') +
      // unclassed shapes default to a black fill; they occlude lines behind them
      '\n#muppet-header path, #muppet-header polygon { fill: var(--background-color); }';
  }
  for (const el of svg.querySelectorAll('[stroke]')) {
    if (el.getAttribute('stroke') !== 'none') el.setAttribute('stroke', 'var(--text-color)');
  }
  for (const el of svg.querySelectorAll('[fill]')) {
    if (el.getAttribute('fill') !== 'none') el.setAttribute('fill', 'var(--background-color)');
  }
  // Draw-in animation (keyframes live in stylesheet.css). pathLength="100"
  // normalizes every shape so a single dash length works; delays stagger the
  // lines in document order, which matches Illustrator's draw order.
  const shapes = svg.querySelectorAll('path, polygon, polyline, line, rect, circle, ellipse');
  shapes.forEach((el, i) => {
    el.setAttribute('pathLength', '100');
    el.classList.add('muppet-draw');
    el.style.animationDelay = `${(i / shapes.length) * 0.6}s`;
  });
  return svg;
}
// Re-trigger a marquee's CSS animation once its width is final, so the translate(-50%) keyframe is resolved against real content rather than an empty/unfonted box (iOS Safari otherwise leaves it frozen until a repaint).
function restartMarquee(el) {
  if (!el) return;
  el.style.animation = 'none';
  void el.offsetWidth; // force reflow
  el.style.animation = '';
}
document.addEventListener('DOMContentLoaded', () => {
  const muppetSlot = document.getElementById('muppet-slot');
  if (muppetSlot) {
    fetch(SITE_ROOT + 'images/muppet-header.svg')
      .then(response => response.text())
      .then(svgText => {
        const svg = themeMuppet(svgText);
        if (svg) muppetSlot.replaceChildren(svg);
      });
  }
  fetch(SITE_ROOT + 'statuses.md')
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
  fetch(SITE_ROOT + 'version.md')
    .then(response => response.text())
    .then(version => {
      const versionCell = document.getElementById('version-cell');
      if (versionCell) {
        versionCell.textContent = version.trim();
      }
    });
});
