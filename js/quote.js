/* Orçamento automático: calcula, explica, gera referência e envia. */
(() => {
  const C = window.REMATOS;
  const $ = s => document.querySelector(s);
  const st = { svc: 'civil', qty: C.services.civil.def, finish: 'std', prov: 'sofala', urg: 'n', ex: new Set(['safe']), note: '', custom: '', open: false, name: '', phone: '' };
  try { const s = JSON.parse(localStorage.getItem('rq') || '{}'); st.name = s.name || ''; st.phone = s.phone || ''; } catch (e) {}

  const d = new Date();
  const REF = 'REM-' + String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0') + '-' + String(Math.floor(100 + Math.random() * 900));
  const nf = new Intl.NumberFormat('pt-MZ', { maximumFractionDigits: 0 });
  const mt = n => nf.format(n) + ' MT';
  const r3 = n => Math.round(n / 1000) * 1000;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function calc() {
    const s = C.services[st.svc], rows = [];
    if (s.custom) {
      const p0 = C.province[st.prov], u0 = C.urgency[st.urg];
      rows.push({ k: 'prov', v: window.L(p0) });
      if (u0.m !== 1) rows.push({ k: 'urg', v: window.L(u0) });
      return { custom: true, rows, ex: [], wk: 0, s };
    }
    let sub = s.base + st.qty * s.rate;
    rows.push({ k: 'base', v: mt(r3(sub)) });
    if (s.finish) { const f = C.finish[st.finish]; sub *= f.m; rows.push({ k: 'finish', v: window.L(f) + sign(f.m) }); }
    const p = C.province[st.prov]; sub *= p.m; rows.push({ k: 'prov', v: window.L(p) + sign(p.m) });
    const u = C.urgency[st.urg]; sub *= u.m; if (u.m !== 1) rows.push({ k: 'urg', v: window.L(u) + sign(u.m) });
    const ex = [...st.ex].filter(id => C.extras[id].for.includes(st.svc));
    const pct = ex.reduce((a, id) => a + C.extras[id].pct, 0);
    if (ex.length) rows.push({ k: 'extras', v: ex.map(id => window.L(C.extras[id])).join(', ') + ' (+' + Math.round(pct * 1000) / 10 + '%)' });
    const total = sub * (1 + pct);
    const wk = Math.max(.2, (s.w0 + st.qty * s.w1) * u.t);
    return { lo: r3(total * C.range.low), hi: r3(total * C.range.high), rows, ex, wk, s };
  }
  const sign = m => m === 1 ? '' : ' (' + (m > 1 ? '+' : '−') + Math.round(Math.abs(m - 1) * 100) + '%)';
  function time(wk) {
    const U = window.UI().q;
    if (!wk) return U.tbd;
    if (wk < 1.5) return '≈ ' + Math.max(2, Math.round(wk * 5)) + ' ' + U.days;
    const a = Math.floor(wk), b = Math.ceil(wk * 1.25);
    return '≈ ' + a + '–' + b + ' ' + U.weeks;
  }

  function form() {
    const U = window.UI().q, s = C.services[st.svc], L = window.L;
    const chips = Object.entries(C.services).map(([id, v]) => `<label class="chip"><input type="radio" name="svc" value="${id}"${id === st.svc ? ' checked' : ''}><span>${esc(L(v))}</span></label>`).join('');
    const seg = (name, obj, cur) => Object.entries(obj).map(([id, v]) => `<label class="chip"><input type="radio" name="${name}" value="${id}"${id === cur ? ' checked' : ''}><span>${esc(L(v))}</span></label>`).join('');
    const exs = Object.entries(C.extras).filter(([, v]) => v.for.includes(st.svc)).map(([id, v]) => `<label class="ck"><input type="checkbox" name="ex" value="${id}"${st.ex.has(id) ? ' checked' : ''}><span>${esc(L(v))} <em>+${Math.round(v.pct * 1000) / 10}%</em></span></label>`).join('');
    $('#qform').innerHTML = `
      <h3>${U.service}</h3><div class="chips">${chips}</div>
      ${s.custom ? `<button type="button" class="fold" id="qfold" aria-expanded="${st.open}"><span>${U.other}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"/></svg></button><div class="foldb"${st.open ? '' : ' hidden'}><textarea id="qcustom" rows="3" placeholder="${U.otherP}">${esc(st.custom)}</textarea></div>` : `      <h3>${U.size}</h3>
      <div class="qty"><input type="range" id="qr" min="${s.min}" max="${s.max}" value="${st.qty}" aria-label="${U.size}"><label class="num"><input type="number" id="qn" min="${s.min}" max="${s.max}" value="${st.qty}"><span>${esc(s.unit)}</span></label></div>`}
      ${s.finish ? `<h3>${U.finish}</h3><div class="seg">${seg('finish', C.finish, st.finish)}</div>` : ''}
      <h3>${U.prov}</h3><div class="seg">${seg('prov', C.province, st.prov)}</div>
      <h3>${U.urg}</h3><div class="seg">${seg('urg', C.urgency, st.urg)}</div>
      ${exs ? `<h3>${U.extras}</h3><div class="exs">${exs}</div>` : ''}
      <h3>${U.note}</h3><textarea id="qnote" rows="2" placeholder="${U.noteP}">${esc(st.note)}</textarea>`;
    bind();
  }

  function bind() {
    const f = $('#qform'), U = window.UI().q;
    f.querySelectorAll('input[name=svc]').forEach(i => i.onchange = () => { st.svc = i.value; const s = C.services[st.svc]; st.qty = s.def || 0; st.open = !!s.custom; form(); update(); });
    ['finish', 'prov', 'urg'].forEach(n => f.querySelectorAll(`input[name=${n}]`).forEach(i => i.onchange = () => { st[n] = i.value; update(); }));
    f.querySelectorAll('input[name=ex]').forEach(i => i.onchange = () => { i.checked ? st.ex.add(i.value) : st.ex.delete(i.value); update(); });
    const r = $('#qr'), n = $('#qn'), s = C.services[st.svc];
    const set = v => { v = Math.min(s.max, Math.max(s.min, Math.round(+v) || s.min)); st.qty = v; update(); return v; };
    if (r) {
      r.oninput = () => { n.value = set(r.value); };
      n.oninput = () => { if (n.value !== '') { r.value = set(n.value); } };
      n.onblur = () => { n.value = r.value = set(n.value); };
    }
    const qc = $('#qcustom'); if (qc) qc.oninput = e => { st.custom = e.target.value; };
    const fb = $('#qfold'); if (fb) fb.onclick = () => { st.open = !st.open; fb.setAttribute('aria-expanded', st.open); fb.nextElementSibling.hidden = !st.open; if (st.open) qc.focus(); };
    $('#qnote').oninput = e => { st.note = e.target.value; };
  }

  function update() {
    const U = window.UI().q, c = calc(), L = window.L;
    $('#qres').innerHTML = `
      <p class="rl">${U.est} · ${esc(L(c.s))}</p>
      ${c.custom ? `<div class="price"><b>${U.onReq}</b></div>` : `<div class="price"><span>${U.range}</span><b id="plo">${mt(c.lo)}</b><span>–</span><b id="phi">${mt(c.hi)}</b></div>`}
      <dl class="rows">${c.rows.map(r => `<div><dt>${U.rows[r.k]}</dt><dd>${esc(r.v)}</dd></div>`).join('')}<div><dt>${U.time}</dt><dd>${time(c.wk)}</dd></div><div><dt>${U.ref}</dt><dd>${REF}</dd></div></dl>
      <input class="i" id="qname" autocomplete="name" placeholder="${U.name}" value="${esc(st.name)}">
      <input class="i" id="qphone" autocomplete="tel" placeholder="${U.phone}" value="${esc(st.phone)}">
      <p class="err" id="qerr" role="alert"></p>
      <button class="btn" id="qwa" type="button"><svg><use href="#i-wa"/></svg>${U.wa}</button>
      <div class="two"><button class="btn ol" id="qml" type="button"><svg><use href="#i-mail"/></svg>${U.mail}</button><button class="btn ol" id="qpdf" type="button"><svg><use href="#i-pdf"/></svg>${U.pdf}</button></div>
      <p class="dc">${U.disc}</p>`;
    $('#qname').oninput = e => { st.name = e.target.value; };
    $('#qphone').oninput = e => { st.phone = e.target.value; };
    $('#qwa').onclick = () => send('wa');
    $('#qml').onclick = () => send('mail');
    $('#qpdf').onclick = () => send('pdf');
  }

  function text(c) {
    const U = window.UI().q, L = window.L, s = c.s, f = s.finish ? C.finish[st.finish] : null;
    return [U.hello, U.ref + ': ' + REF, '',
      U.svc + ': ' + L(s) + (s.custom ? ' – ' + st.custom : ''), s.custom ? null : U.dim + ': ' + st.qty + ' ' + s.unit,
      f ? U.fin + ': ' + L(f) : null,
      U.loc + ': ' + L(C.province[st.prov]), U.term + ': ' + L(C.urgency[st.urg]) + ' (' + time(c.wk) + ')',
      c.custom ? null : U.ex + ': ' + (c.ex.length ? c.ex.map(id => L(C.extras[id])).join(', ') : U.none), '',
      U.est2 + ': ' + (c.custom ? U.onReq : mt(c.lo) + ' – ' + mt(c.hi)), '',
      U.nm + ': ' + st.name, U.ct + ': ' + st.phone, st.note ? U.nt + ': ' + st.note : null].filter(x => x !== null).join('\n');
  }

  function send(how) {
    const U = window.UI().q, c = calc();
    if (c.custom && !st.custom.trim()) { $('#qerr').textContent = U.needOther; st.open = true; const fbn = $('#qfold'); if (fbn) { fbn.setAttribute('aria-expanded', 'true'); fbn.nextElementSibling.hidden = false; } const q0 = $('#qcustom'); if (q0) q0.focus(); return; }
    if (!st.name.trim() || !st.phone.trim()) { $('#qerr').textContent = U.need; (st.name.trim() ? $('#qphone') : $('#qname')).focus(); return; }
    $('#qerr').textContent = '';
    try { localStorage.setItem('rq', JSON.stringify({ name: st.name, phone: st.phone })); } catch (e) {}
    const t = text(c);
    if (how === 'wa') window.open('https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent(t), '_blank');
    else if (how === 'mail') location.href = 'mailto:' + C.email() + '?subject=' + encodeURIComponent(U.title + ' ' + REF) + '&body=' + encodeURIComponent(t);
    else {
      $('#psheet').innerHTML = `<h1>Rematos</h1><h2>${U.title} · ${REF}</h2><p>${new Date().toLocaleDateString(window.RLANG === 'en' ? 'en-GB' : 'pt-PT')}</p><pre>${esc(t)}</pre><p>${U.disc}</p><p>+258 84 966 0138 · +258 86 311 7055</p>`;
      window.print();
    }
  }

  window.setQuoteService = id => { if (!C.services[id]) return; st.svc = id; st.qty = C.services[id].def || 0; st.open = !!C.services[id].custom; form(); update(); };
  document.addEventListener('langchange', () => { form(); update(); });
})();
