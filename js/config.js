/* ============================================================
   REMATOS – configuração central
   Altere aqui contactos, redes sociais e preços do orçamento.
   Os valores do orçamento são INDICATIVOS (MT = Metical).
   ============================================================ */
window.REMATOS = {
  whatsapp: '258849660138',
  mail: ['rmimosomatos', 'gmail.com'], // o endereço não aparece no site; só é montado ao enviar
  social: {
    instagram: 'https://www.instagram.com/rematos.engenharia',
    facebook: 'https://www.facebook.com/profile.php?id=61572992467247',
    linkedin: 'https://www.linkedin.com/company/rematos-engenharia-arquitectura-e-safety/',
    whatsapp: 'https://wa.me/258849660138',
    comunidade: 'https://chat.whatsapp.com/F3BzE6p6sVf5eAaVdpIpBs'
  },

  /* rate = preço por unidade; base = valor fixo; w0/w1 = semanas base e por unidade */
  services: {
    civil:  { pt:'Construção civil', en:'Civil construction', unit:'m²', min:20, max:2000, def:120, rate:28000, base:0, finish:true, w0:6, w1:.05 },
    proj:   { pt:'Projecto de arquitectura e engenharia', en:'Architecture & engineering design', unit:'m²', min:20, max:3000, def:150, rate:900, base:15000, finish:false, w0:3, w1:.015 },
    pool:   { pt:'Piscina', en:'Swimming pool', unit:'m² de espelho', min:8, max:200, def:32, rate:55000, base:0, finish:true, w0:4, w1:.1 },
    well:   { pt:'Furo de água', en:'Water borehole', unit:'m de profundidade', min:20, max:200, def:60, rate:6500, base:20000, finish:false, w0:1, w1:.03 },
    paving: { pt:'Pavê e arranjos exteriores', en:'Paving & exteriors', unit:'m²', min:10, max:1500, def:80, rate:1800, base:0, finish:true, w0:1, w1:.02 },
    garden: { pt:'Jardinagem e paisagismo', en:'Gardening & landscaping', unit:'m²', min:20, max:3000, def:150, rate:650, base:0, finish:true, w0:1, w1:.01 },
    safety: { pt:'Safety e segurança no trabalho', en:'Workplace safety', unit:'trabalhadores', min:1, max:500, def:20, rate:1800, base:25000, finish:false, w0:1, w1:.02 },
    fisc:   { pt:'Fiscalização e assessoria técnica', en:'Supervision & technical advisory', unit:'m² de obra', min:30, max:5000, def:200, rate:1500, base:10000, finish:false, w0:2, w1:.01 },
    other:  { pt:'Outro serviço', en:'Other service', custom:true }
  },
  finish: {
    eco: { pt:'Económico', en:'Economy', m:.85 },
    std: { pt:'Standard', en:'Standard', m:1 },
    pre: { pt:'Premium', en:'Premium', m:1.35 }
  },
  province: {
    sofala:   { pt:'Sofala (Beira)', en:'Sofala (Beira)', m:1 },
    zambezia: { pt:'Zambézia', en:'Zambézia', m:1.08 },
    nampula:  { pt:'Nampula', en:'Nampula', m:1.1 },
    maputo:   { pt:'Maputo', en:'Maputo', m:1.12 },
    outra:    { pt:'Outra província', en:'Other province', m:1.15 }
  },
  urgency: {
    n: { pt:'Prazo normal', en:'Normal schedule', m:1, t:1 },
    u: { pt:'Urgente', en:'Urgent', m:1.15, t:.8 }
  },
  /* pct = percentagem somada ao subtotal; for = serviços onde aparece */
  extras: {
    proj: { pt:'Incluir projecto de arquitectura e engenharia', en:'Include architecture & engineering design', pct:.04, for:['civil','pool','paving','garden'] },
    safe: { pt:'Incluir plano de segurança da obra', en:'Include site safety plan', pct:.025, for:['civil','pool','paving','garden','well'] },
    lic:  { pt:'Licenciamento e documentação', en:'Permits and paperwork', pct:.015, for:['civil','pool'] },
    fisc: { pt:'Fiscalização técnica durante a obra', en:'Technical supervision during works', pct:.03, for:['civil','pool','paving'] }
  },
  range: { low:.9, high:1.15 }
};

window.REMATOS.email = () => window.REMATOS.mail.join('@');
