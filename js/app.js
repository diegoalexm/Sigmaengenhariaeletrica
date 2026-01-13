
/* --------------------------------------------------
   Bella e Dellicada — SPA do zero
   - Lê data/products.json
   - Rotas por hash: #/, #/category/:id, #/product/:id, #/institucional
   - Renderiza Home, Categoria, Produto e Institucional
   - Apenas pageviews (dataLayer push)
   - Para adicionar produto/categoria: editar data/products.json
--------------------------------------------------- */

const state = { data: null };

// Roteador simples baseado em hash
function getRoute(){
  const h = location.hash.replace(/^#/,'');
  const parts = h.split('/').filter(Boolean);
  if(!parts.length) return { name:'home' };
  if(parts[0] === 'category' && parts[1]) return { name:'category', id:decodeURIComponent(parts[1]) };
  if(parts[0] === 'product'  && parts[1]) return { name:'product',  id:decodeURIComponent(parts[1]) };
  if(parts[0] === 'institucional') return { name:'institucional' };
  return { name:'home' };
}

// Utilidades
function byId(id){ return document.getElementById(id); }
function qs(sel){ return document.querySelector(sel); }
function qsa(sel){ return Array.from(document.querySelectorAll(sel)); }

function getCategory(id){ return (state.data?.categories || []).find(c=>c.id===id); }
function getProduct(id){ return (state.data?.products || []).find(p=>p.id===id); }

// Menu de categorias
function renderMenu(){
  const nav = qs('.menu-categorias');
  if(!nav || !state.data) return;
  nav.innerHTML = state.data.categories.map(c => `
    <a class="menu-link" href="#/category/${encodeURIComponent(c.id)}">${c.name}</a>
  `).join('');
}

// Templates reutilizáveis
function productCard(p){
  const img = (p.images && p.images[0]) || 'img/placeholder-quad.jpg';
  return `
    <article class="card-product">
      <a href="#/product/${encodeURIComponent(p.id)}" class="card-img-wrap" aria-label="${p.name}">
        <img src="${img}" alt="${p.name}" loading="lazy">
      </a>
      <div class="card-body">
        <h3 class="card-title">${p.name}</h3>
        <a class="btn btn-rose" href="#/product/${encodeURIComponent(p.id)}">Ver detalhes</a>
      </div>
    </article>
  `;
}

function thumbsTemplate(images){
  return (images||[]).map((src, idx)=>`
    <button class="thumb" data-idx="${idx}" aria-label="Imagem ${idx+1}">
      <img src="${src}" alt="Imagem do produto ${idx+1}" loading="lazy">
    </button>
  `).join('');
}

// Renderizadores de página
function renderHome(){
  const app = byId('app');
  const featured = (state.data?.products||[]).filter(p=>p.featured);
  app.innerHTML = `
    <h1 class="section-title">Descobertas Deslumbrantes</h1>
    <section class="grid grid-products">${featured.map(productCard).join('')}</section>
  `;
}

function renderCategory(id){
  const app = byId('app');
  const cat = getCategory(id);
  if(!cat){ app.innerHTML = '<p class="muted">Categoria não encontrada.</p>'; return; }
  const items = (state.data?.products||[]).filter(p=>p.category===cat.id);
  app.innerHTML = `
    <div class="category-banner"><img src="${cat.image}" alt="${cat.name}"></div>
    <h1 class="category-title">${cat.name}</h1>
    <section class="grid grid-products">${items.map(productCard).join('')}</section>
  `;
}

function renderProduct(id){
  const app = byId('app');
  const p = getProduct(id);
  if(!p){ app.innerHTML = '<p class="muted">Produto não encontrado.</p>'; return; }
  const firstImg = (p.images && p.images[0]) || 'img/placeholder-vert.jpg';
  app.innerHTML = `
    <div class="product-layout">
      <aside class="product-gallery">
        <div class="product-thumbs">${thumbsTemplate(p.images)}</div>
      </aside>
      <section class="product-hero">
        <div class="product-main"><img id="prod-main" src="${firstImg}" alt="${p.name}"></div>
      </section>
      <section class="product-details">
        <h1 class="product-title">${p.name}</h1>
        <p class="product-description">${p.description||''}</p>
        <div class="product-ctas">${renderCTAs(p)}</div>
      </section>
    </div>
  `;
  // Troca de imagem principal pelas thumbs
  const thumbs = qsa('.product-thumbs .thumb');
  const mainImg = qs('#prod-main');
  thumbs.forEach(btn => btn.addEventListener('click', () => {
    const idx = Number(btn.dataset.idx);
    mainImg.src = p.images[idx];
  }));
  // Título da aba
  document.title = `${p.name} — Bella e Dellicada`;
}

function renderInstitucional(){
  const app = byId('app');
  app.innerHTML = `
    <section id="quem-somos" class="institucional-section">
      <h1 class="section-title">Quem Somos</h1>
      <p>A Bella e Dellicada nasceu com o objetivo de oferecer produtos de qualidade, seguros e confiáveis para mulheres que querem cuidar da saúde, beleza e bem-estar com confiança. Todos os nossos produtos são selecionados de plataformas sérias, sem pirataria, e com revendedores confiáveis. Nossa missão é proporcionar experiências encantadoras, combinando elegância, cuidado e praticidade para o seu dia a dia.</p>
    </section>
    <section id="politica-privacidade" class="institucional-section">
      <h2 class="script">Política de Privacidade</h2>
      <p>Respeitamos sua privacidade e protegemos seus dados. E-mails e WhatsApp coletados são usados apenas para envio de novidades e ofertas, sem compartilhamento com terceiros.</p>
    </section>
    <section id="garantia" class="institucional-section">
      <h2 class="script">Garantia</h2>
      <p>A garantia de cada produto depende do fabricante ou revendedor. Nosso compromisso é garantir que você receba produtos originais e confiáveis.</p>
    </section>
    <section id="trocas-devolucoes" class="institucional-section">
      <h2 class="script">Trocas e Devoluções</h2>
      <p>As trocas e devoluções seguem a política de cada fabricante ou revendedor. Todos os produtos apresentados são originais e enviados por parceiros confiáveis.</p>
    </section>
    <section id="central-atendimento" class="institucional-section">
      <h2 class="script">Central de Atendimento</h2>
      <p>E-mail: <a href="mailto:bellaedellicada@gmail.com">bellaedellicada@gmail.com</a> — WhatsApp: <a href="https://wa.me/5554999877518" target="_blank" rel="noopener">Clique aqui</a></p>
    </section>
    <section id="entrega-frete" class="institucional-section">
      <h2 class="script">Entrega e Frete</h2>
      <p>O prazo e a forma de entrega dependem de cada revendedor, de acordo com sua região e disponibilidade. Indicamos apenas lojas confiáveis e com rastreio.</p>
    </section>
    <section id="formas-pagamento" class="institucional-section">
      <h2 class="script">Formas de Pagamento</h2>
      <p>Cartões, boleto e Pix — as formas de pagamento e condições de parcelamento dependem de cada revendedor ou marketplace parceiro.</p>
    </section>
  `;
}

// CTA rendering: multiple links OR single checkout
function renderCTAs(p){
  if(Array.isArray(p.links) && p.links.length){
    return p.links.map(lk => `<a class=\"btn btn-rose btn-large\" target=\"_blank\" rel=\"noopener\" href=\"${lk.url}\">${lk.label}</a>`).join('');
  }
  if(p.checkout){
    return `<a class=\"btn btn-rose btn-large\" target=\"_blank\" rel=\"noopener\" href=\"${p.checkout}\">Quero conhecer</a>`;
  }
  return `<p class=\"muted\">Em breve</p>`;
}

// Router central
function render(){
  const route = getRoute();
  switch(route.name){
    case 'home': renderHome(); pushPageview('home'); break;
    case 'category': renderCategory(route.id); pushPageview(`category:${route.id}`); break;
    case 'product': renderProduct(route.id); pushPageview(`product:${route.id}`); break;
    case 'institucional': renderInstitucional(); pushPageview('institucional'); break;
    default: renderHome(); pushPageview('home');
  }
}

// Apenas pageviews
function pushPageview(name){
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({ event: 'virtual_pageview', page: name });
}

// Boot: carrega JSON e inicia SPA
async function boot(){
  try{
    const res = await fetch('data/products.json', { cache:'no-cache' });
    state.data = await res.json();
  }catch(err){
    console.error('Falha ao carregar data/products.json', err);
    // Fallback: data mínima para não quebrar
    state.data = { categories: [], products: [] };
  }
  renderMenu();
  render();
}

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', () => {
  // Ano do rodapé
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
  boot();
});
