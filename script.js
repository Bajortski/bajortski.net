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
fetch('https://raw.githubusercontent.com/Bajortski/bajortski.github.io/refs/heads/main/statuses.md')
  .then(response => response.text())
  .then(markdown => {
    const statuses = parseStatuses(markdown);
    shuffle(statuses);
    const space = '&nbsp;'.repeat(4);
    const joined = space + statuses.join('  \u25C7  ');
    document.getElementById('markdown-content').innerHTML = joined;
  });
fetch('https://raw.githubusercontent.com/Bajortski/bajortski.github.io/refs/heads/main/version.md')
  .then(response => response.text())
  .then(version => {
    const versionCell = document.getElementById('version-cell');
    if (versionCell) {
      versionCell.textContent = version.trim();
    }
  });
