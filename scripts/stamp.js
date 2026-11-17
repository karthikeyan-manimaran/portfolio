// Cache-busting: append ?v=<content hash> to the CSS/JS URLs in the HTML pages,
// so browsers (especially phones) never mix new HTML with an old cached stylesheet.
const fs = require('fs'), crypto = require('crypto');
const files = ['assets/css/tw.css', 'assets/js/main.js', 'assets/js/projects.js'];
const hash = (f) => crypto.createHash('md5').update(fs.readFileSync(f)).digest('hex').slice(0, 8);
for (const page of ['index.html', 'projects.html']) {
  let html = fs.readFileSync(page, 'utf8');
  for (const f of files) {
    const re = new RegExp(f.replace(/[./]/g, '\\$&') + '(\\?v=[0-9a-f]+)?"', 'g');
    html = html.replace(re, `${f}?v=${hash(f)}"`);
  }
  fs.writeFileSync(page, html);
}
console.log('stamped', files.map((f) => f.split('/').pop() + ':' + hash(f)).join('  '));
