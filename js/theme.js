/* Tema claro/escuro: o tema claro é o padrão; a escolha do visitante fica guardada. */
(function () {
  var root = document.documentElement, saved;
  try { saved = localStorage.getItem('rt'); } catch (e) {}
  function current() { return saved === 'dark' ? 'dark' : 'light'; }
  function paint() {
    var t = current(), en = /^en/i.test(root.lang || '');
    root.setAttribute('data-theme', t);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', t === 'dark' ? '#07072b' : '#2417ff');
    var b = document.getElementById('theme');
    if (b) {
      var lbl = t === 'dark' ? (en ? 'Switch to light theme' : 'Mudar para tema claro') : (en ? 'Switch to dark theme' : 'Mudar para tema escuro');
      b.setAttribute('aria-label', lbl); b.title = lbl;
      b.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
      var u = b.querySelector('use'); if (u) u.setAttribute('href', t === 'dark' ? '#i-sun' : '#i-moon');
    }
  }
  paint();
  document.addEventListener('DOMContentLoaded', function () {
    var b = document.getElementById('theme');
    if (b) b.onclick = function () {
      saved = current() === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('rt', saved); } catch (e) {}
      paint();
    };
    paint();
  });
  document.addEventListener('langchange', paint);
})();
