// Carrega JSON
fetch('products.json')
.then(res => res.json())
.then(data => initSite(data));

function initSite(data){
  loadFeatured(data);
  loadCategories(data);
  loadCategoryPage(data);
  loadProductPage(data);
}

/* ? Destaques */
function loadFeatured(data){
  const el = document.getElementById('featured');
  if(!el) return;

  data.products.filter(p => p.featured).forEach(p=>{
    el.innerHTML += `
      <div class="card">
        <img src="${p.images[0]}">
        <h3>${p.name}</h3>
        <a href="product.html?id=${p.id}">Ver detalhes</a>
      </div>
    `;
  });
}

/* ? Categorias */
function loadCategories(data){
  const el = document.getElementById('categories');
  if(!el) return;

  data.categories.forEach(c=>{
    el.innerHTML += `
      <a href="products.html?cat=${c.id}" class="category-card">
        <img src="img/products/${c.id}/${c.id}.jpg">
        <span>${c.name}</span>
      </a>
    `;
  });
}

/* ? P?gina categoria */
function loadCategoryPage(data){
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  if(!cat) return;

  const title = document.getElementById('categoryTitle');
  const list = document.getElementById('productList');

  title.innerText = data.categories.find(c=>c.id===cat).name;

  data.products.filter(p=>p.category===cat).forEach(p=>{
    list.innerHTML += `
      <div class="card">
        <img src="${p.images[0]}">
        <h3>${p.name}</h3>
        <a href="product.html?id=${p.id}">Ver detalhes</a>
      </div>
    `;
  });
}

/* ? P?gina produto */
function loadProductPage(data){
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if(!id) return;

  const p = data.products.find(x=>x.id===id);
  const el = document.getElementById('productDetail');

  let imgs = p.images.map(i=>`<img src="${i}">`).join('');

  let links = '';
  if(p.links){
    p.links.forEach(l=>{
      links += `<a href="${l.url}" target="_blank" class="buy">${l.label}</a>`;
    });
  } else {
    links = `<a href="${p.link}" target="_blank" class="buy">Comprar agora</a>`;
  }

  el.innerHTML = `
    <h1>${p.name}</h1>
    <div class="carousel">${imgs}</div>
    <p>${p.description}</p>
    ${links}
  `;
}

/* ? Leads */
function saveLead(){
  document.getElementById('leadMsg').innerText =
    'Cadastrado com sucesso ?';
}