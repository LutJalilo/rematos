/* Interface: carregamento, navegação, animações, teste de safety, projectos, contactos. */
(() => {
  const C = window.REMATOS;
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];

  /* Ligações das redes sociais (vêm de js/config.js) */
  $$('[data-s]').forEach(a => { a.href = C.social[a.dataset.s] || '#'; });
  $('#yr').textContent = new Date().getFullYear();

  /* Faixa em movimento */
  const words = ['Engenharia', 'Arquitectura', 'Safety', 'Projecto', 'Obra', 'Segurança'];
  $('#mq').innerHTML = Array(4).fill(words.map(w => w + '<b>■</b>').join('')).join('');

  /* Idioma (depois de existirem os módulos que reagem a ele) */
  window.initLang();

  /* Menu */
  const nav = $('#nav'), mb = $('.menu');
  mb.onclick = () => mb.setAttribute('aria-expanded', nav.classList.toggle('open'));
  $$('nav a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); }));

  /* Aparecer ao fazer scroll */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  $$('.rv').forEach(e => io.observe(e));

  /* Logótipo do hero: inclina com o rato e acende a janela */
  const stage = $('#stage'), mk = $('#mk');
  stage.addEventListener('pointermove', e => { const r = stage.getBoundingClientRect(); mk.style.transform = `rotateY(${((e.clientX - r.left) / r.width - .5) * 28}deg) rotateX(${-((e.clientY - r.top) / r.height - .5) * 28}deg)`; });
  stage.addEventListener('pointerleave', () => mk.style.transform = '');
  const tg = () => stage.classList.toggle('on');
  stage.onclick = tg;
  stage.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tg(); } };

  /* Serviços (acordeão) + atalho para o orçamento já com o serviço escolhido */
  const ar = $$('#acc article');
  ar.forEach(a => { const f = () => { ar.forEach(x => x.classList.remove('on')); a.classList.add('on'); }; a.onclick = f; a.onfocus = f; });
  $$('[data-svc]').forEach(a => a.addEventListener('click', () => window.setQuoteService(a.dataset.svc)));

  /* Teste de safety */
  const cb = $$('#chk input');
  const upd = () => { const n = cb.filter(x => x.checked).length, p = Math.round(n / cb.length * 100); $('#fg').style.strokeDashoffset = 226 - 226 * p / 100; $('#pc').textContent = p + '%'; $('#msg').textContent = window.UI().safety[n]; };
  cb.forEach(c => c.onchange = upd);
  document.addEventListener('langchange', upd);

  /* Filtro de projectos */
  const fl = $$('#fl button'), ps = $$('.p');
  fl.forEach(b => b.onclick = () => { fl.forEach(x => x.classList.remove('on')); b.classList.add('on'); ps.forEach(p => p.classList.toggle('h', b.dataset.f !== '*' && p.dataset.c !== b.dataset.f)); });

  /* Linha do tempo e barra de progresso */
  const bt = $('#top');
  bt.onclick = e => { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }); };
  const sts = $$('.st'), tl = $('#tl');
  const sc = () => {
    const h = document.documentElement, p = h.scrollTop / Math.max(1, h.scrollHeight - innerHeight);
    $('#pg').style.width = p * 100 + '%';
    bt.classList.toggle('show', h.scrollTop > 600);
    const r = tl.getBoundingClientRect(), m = innerHeight * .6;
    $('#ln').style.height = Math.max(0, Math.min(r.height, m - r.top)) + 'px';
    sts.forEach(s => s.classList.toggle('on', s.getBoundingClientRect().top < m));
  };
  addEventListener('scroll', sc, { passive: true }); sc();

  /* Formulário de contacto: assunto, campo "Outro" e escolha do canal de envio */
  const sub = $('#fsub'), fo = $('#fother'), foi = fo.querySelector('input');
  const syncSub = () => { const o = sub.value === 'outro'; fo.hidden = !o; foi.required = o; if (!o) foi.value = ''; };
  sub.onchange = () => { syncSub(); if (sub.value === 'outro') foi.focus(); };
  syncSub();
  const dlg = $('#sd'); let pend = null;
  $('#f').onsubmit = e => {
    e.preventDefault();
    const f = e.target, en = window.RLANG === 'en';
    const subject = sub.value === 'outro' ? foi.value.trim() : sub.options[sub.selectedIndex].textContent;
    const body = (en ? 'Hello Rematos!\nSubject: ' : 'Olá Rematos!\nAssunto: ') + subject + '\n' + (en ? 'Name: ' : 'Nome: ') + f.n.value + '\n' + (en ? 'Contact: ' : 'Contacto: ') + f.c.value + '\n\n' + f.m.value;
    pend = { subject: 'Rematos – ' + subject, body };
    dlg.showModal();
  };
  dlg.querySelectorAll('[data-via]').forEach(b => b.onclick = () => {
    if (!pend) return;
    const enc = encodeURIComponent, to = C.email();
    if (b.dataset.via === 'wa') window.open('https://wa.me/' + C.whatsapp + '?text=' + enc(pend.body), '_blank');
    else if (b.dataset.via === 'mail') location.href = 'mailto:' + to + '?subject=' + enc(pend.subject) + '&body=' + enc(pend.body);
    else window.open('https://mail.google.com/mail/?view=cm&fs=1&to=' + enc(to) + '&su=' + enc(pend.subject) + '&body=' + enc(pend.body), '_blank');
    dlg.close(); $('#f').reset(); syncSub(); $('#ok').style.display = 'block';
  });
  $('#dgx').onclick = () => dlg.close();

  /* Números a contar */
  const co = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; co.unobserve(e.target);
    const m = e.target.textContent.match(/^(\d+)(.*)$/); if (!m) return;
    const to = +m[1], t0 = performance.now();
    (function f(t) { const k = Math.min(1, (t - t0) / 1400); e.target.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + m[2]; if (k < 1) requestAnimationFrame(f); })(t0);
  }), { threshold: .6 });
  $$('.bn b').forEach(b => co.observe(b));

  /* Ecrã de carregamento: o logótipo desenha-se e a janela acende no fim */
  const ld = $('#ld');
  const go = () => { document.body.classList.add('rd'); ld.classList.add('out'); setTimeout(() => ld.remove(), 1000); setTimeout(() => stage.classList.add('on'), 2600); };
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) { go(); stage.classList.add('on'); }
  else {
    const t0 = performance.now();
    (function f(t) { const k = Math.min(1, (t - t0) / 1600), v = Math.round(k * 100); $('#ldb').style.width = v + '%'; $('#ldp').textContent = v + '%'; if (k < 1) requestAnimationFrame(f); else setTimeout(go, 200); })(t0);
  }
})();
