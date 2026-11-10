/* Traduções PT ⇄ EN. O português está escrito no próprio HTML;
   aqui ficam as versões em inglês, ligadas por data-i="chave". */
(() => {
  const EN = {
    n1:'Services', n2:'Quote', n3:'About', n4:'Safety', n5:'Projects', n6:'FAQ', cta:'Request a quote',
    h1a:'We build with precision.', h1b:'We protect those who build.',
    hp:'Engineering, architecture and workplace safety in one team, from the first sketch to the finished build.',
    hv:'View projects', tip:'Tap the logo to light the window',
    v_a:'Rematos introduction video', v_t:'Meet Rematos in 45 seconds', v_p:'Engineering, architecture and safety in one team, and the automatic quote at work.',
    s_t:'Three disciplines, one team',
    s_p:'When engineering, architecture and safety work together from the start, there are fewer mistakes, fewer delays and safer sites.',
    e_t:'Engineering', e_p:'Design, calculation and technical supervision of construction works.',
    e1:'Civil construction and works execution', e2:'Supervision and technical advisory', e3:'Works planning and management',
    e4:'Swimming pool construction', e5:'Water borehole construction',
    a_t:'Architecture', a_p:'Functional, beautiful spaces built to last.',
    a1:'Architecture and engineering projects', a2:'Paving and exterior works', a3:'Gardening and landscaping',
    a4:'Solutions for churches, gyms and commercial spaces',
    f_p:'Occupational health and safety, on site and in the workplace.',
    f1:'Safety and workplace safety', f2:'Safety plans', f3:'Audits and inspections', f4:'Team training',
    go:'Quote for this service',
    q_t:'A quote in 1 minute',
    q_p:'Choose the service, enter the size and instantly see the estimated price, the schedule and what is included. Then send it all to Rematos with one tap.',
    k_t:'Is your site safe? Test it now',
    k_p:'Tick what you already have on your site or in your company. You will see your readiness level and where Rematos can help.',
    k1:'Written safety plan', k2:'Protective equipment for everyone', k3:'Team trained in safety',
    k4:'Risks identified and marked', k5:'Regular inspections with records',
    m_t:'How we work', m_p:'A clear process, with one person following every stage.',
    m1t:'First conversation', m1:'We listen to your needs, budget and deadline.',
    m2t:'Project', m2:'We design, calculate and define the safety plan.',
    m3t:'Construction', m3:'We supervise the work and the safety on the ground.',
    m4t:'Handover', m4:'We check, hand over and support you afterwards.',
    p_t:'Projects',
    p_p:'A selection of the work and areas Rematos covers.',
    fa:'All', r1:'Residential projects', r5:'Water boreholes',
    w_t:'Why choose Rematos',
    w1:'services in engineering, architecture, construction and safety', w2:'provinces where we work', w3:'integrated disciplines',
    w4:'support from the first drawing to handover, with safety included',
    b_t:'About us',
    b_p:'REMATOS is a Mozambican company focused on creating smart, modern and functional solutions in Engineering, Architecture, Civil Construction and Safety. We have worked on projects in Sofala, Zambézia and Nampula, from residential projects to works of greater technical and social impact.',
    b1t:'What we do', b1:'Smart, modern and functional solutions in engineering, architecture, civil construction and safety.',
    b2t:'Where we work', b2:'Sofala, Zambézia, Nampula and Maputo, Mozambique.',
    b3t:'What we believe', b3:'“Every project must unite vision, strategy, aesthetics, safety and quality.”',
    b4:'More than building works, we work to build:',
    t1:'Comfort', t2:'Safety', t3:'Added value', t4:'Functionality', t5:'Lasting results',
    x_t:'Frequently asked questions',
    x1q:'Can I hire just one discipline?', x1:'Yes. You can hire engineering, architecture or safety separately, or all three together.',
    x2q:'Is the automatic quote final?', x2:'It is an estimate to help you plan the investment. Rematos confirms the final price after reviewing the site and the project details.',
    x3q:'Do you supervise during construction?', x3:'Yes. We follow the technical work and the safety through to handover.',
    x4q:'Is safety included in the project?', x4:'It is defined from the start, together with the design and budget, so it is never a last-minute extra.',
    c_t:'Let’s talk about your project',
    c_p:'Tell us what you want to build, renovate or protect. We reply with the next steps.',
    c1:'Phone', c2:'Location', c2v:'Beira, Sofala. We work in Sofala, Zambézia, Nampula and Maputo.',
    grp:'Join the community', fn:'Name', fc:'Contact', fm:'Message', fs:'Send message',
    fok:'Message ready. Just hit send in the app that opened.',
    fa2:'Subject', o1:'Quote request', o2:'Partnerships', o3:'Questions and information', o4:'Jobs and internships', o5:'Other', fo:'Specify the subject', fop:'What is the subject?', top:'Back to top',
    dg_t:'How do you want to send it?', dg_p:'Choose where to send your message. The email button opens your email app, whichever one you use.', dg_m:'Email (your app)', dg_g:'Gmail (in the browser)', dg_c:'Cancel',
    fnp:'Your name', fcp:'Email or phone', fmp:'Describe your project',
    ft:'Beira, Sofala, Mozambique'
  };

  /* Textos usados por scripts (orçamento, teste de safety) */
  const UI = {
    pt: {
      safety: ['Marque os itens que já cumpre.','Há muito a melhorar. Podemos montar o seu plano de segurança.','Bom começo. Faltam peças importantes.','Está no bom caminho. Vale a pena uma auditoria.','Quase lá. Uma inspecção fecha as lacunas.','Excelente. Podemos ajudar a manter este nível.'],
      q: { other:'Descreva o serviço que precisa', otherP:'Explique o serviço, o local e o que pretende…', onReq:'Valor sob consulta', tbd:'A definir', needOther:'Descreva o serviço que precisa.', service:'Que serviço precisa?', size:'Qual é a dimensão?', finish:'Nível de acabamento', prov:'Onde será feito?', urg:'Prazo', extras:'Quer incluir mais alguma coisa?', note:'Notas (opcional)', noteP:'Terreno, ideias, referências…',
        est:'Estimativa', range:'Entre', time:'Prazo estimado', ref:'Referência', name:'O seu nome', phone:'Telefone ou email', wa:'Enviar pelo WhatsApp', mail:'Enviar por email', pdf:'Guardar em PDF',
        disc:'Valor indicativo, sem IVA. A Rematos confirma o preço final depois de ver o local e os detalhes.', need:'Preencha o nome e o contacto para enviar.', days:'dias', week:'semana', weeks:'semanas',
        hello:'Olá Rematos! Gostaria de confirmar este orçamento.', svc:'Serviço', dim:'Dimensão', fin:'Acabamento', loc:'Local', term:'Prazo', ex:'Extras', est2:'Estimativa', nm:'Nome', ct:'Contacto', nt:'Notas', none:'nenhum', sub:'Assunto', title:'Orçamento Rematos',
        rows:{ base:'Serviço', finish:'Acabamento', prov:'Localização', urg:'Urgência', extras:'Extras incluídos' } }
    },
    en: {
      safety: ['Tick the items you already have.','A lot to improve. We can build your safety plan.','Good start. Important pieces are missing.','On the right track. An audit is worth it.','Almost there. An inspection closes the gaps.','Excellent. We can help you keep this level.'],
      q: { other:'Describe the service you need', otherP:'Explain the service, the location and what you want…', onReq:'Price on request', tbd:'To be defined', needOther:'Describe the service you need.', service:'Which service do you need?', size:'How big is it?', finish:'Finish level', prov:'Where will it be done?', urg:'Schedule', extras:'Anything else to include?', note:'Notes (optional)', noteP:'Plot, ideas, references…',
        est:'Estimate', range:'Between', time:'Estimated schedule', ref:'Reference', name:'Your name', phone:'Phone or email', wa:'Send via WhatsApp', mail:'Send by email', pdf:'Save as PDF',
        disc:'Indicative price, excluding VAT. Rematos confirms the final price after seeing the site and the details.', need:'Fill in your name and contact to send.', days:'days', week:'week', weeks:'weeks',
        hello:'Hello Rematos! I would like to confirm this quote.', svc:'Service', dim:'Size', fin:'Finish', loc:'Location', term:'Schedule', ex:'Extras', est2:'Estimate', nm:'Name', ct:'Contact', nt:'Notes', none:'none', sub:'Subject', title:'Rematos quote',
        rows:{ base:'Service', finish:'Finish', prov:'Location', urg:'Urgency', extras:'Extras included' } }
    }
  };

  window.RLANG = 'pt';
  window.UI = () => UI[window.RLANG];
  window.L = o => o[window.RLANG] || o.pt;

  const $$ = s => [...document.querySelectorAll(s)];
  let saved; try { saved = localStorage.getItem('rl'); } catch (e) {}
  const start = saved || (/^en/i.test(navigator.language) ? 'en' : 'pt');

  function apply(l) {
    window.RLANG = l;
    $$('[data-i]').forEach(e => { if (!e.dataset.pt) e.dataset.pt = e.textContent; e.textContent = l === 'en' ? (EN[e.dataset.i] ?? e.dataset.pt) : e.dataset.pt; });
    $$('[data-ip]').forEach(e => { if (!e.dataset.pp) e.dataset.pp = e.placeholder; e.placeholder = l === 'en' ? EN[e.dataset.ip] : e.dataset.pp; });
    $$('[data-it]').forEach(e => { if (!e.dataset.tp) e.dataset.tp = e.title; e.title = l === 'en' ? EN[e.dataset.it] : e.dataset.tp; e.setAttribute('aria-label', e.title); });
    document.documentElement.lang = l;
    const b = document.getElementById('lang'); if (b) { const t = l === 'en' ? 'Mudar para português' : 'Switch to English'; b.setAttribute('aria-label', t); b.title = t; }
    document.title = l === 'en' ? 'Rematos – Engineering, Architecture and Safety' : 'Rematos – Engenharia, Arquitectura e Safety';
    try { localStorage.setItem('rl', l); } catch (e) {}
    document.dispatchEvent(new Event('langchange'));
  }
  window.setLang = apply;
  window.initLang = () => {
    document.getElementById('lang').onclick = () => apply(window.RLANG === 'en' ? 'pt' : 'en');
    apply(start);
  };
})();
