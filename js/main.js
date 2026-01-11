// Carrega o JSON principal
fetch('products.json')
  .then(res => res.json())
  .then(data => {

    /* ===============================
       CATEGORIAS (HOME)
    =============================== */
    const categoriesDiv = document.getElementById('categories');
    if (categoriesDiv) {
      data.categories.forEach(cat => {
        categoriesDiv.innerHTML += `
          <a href="products.html?category=${cat.id}" class="card">
            <img src="img/products/${cat.id}/${cat.id}.jpg">
            <h3>${cat.name}</h3>
          </a>
        `;
      });
    }

    /* ===============================
       DESTAQUES
    =============================== */
    const featuredDiv = document.getElementById('featured-products');
    if (featuredDiv) {
      data.products.filter(p => p.highlight).forEach(p => {
        featuredDiv.innerHTML += `
          <div class="card">
            <img src="${p.images[0]}">
            <h3>${p.name}</h3>
            <a href="products.html?category=${p.category}">Ver detalhes</a>
          </div>
        `;
      });
    }

    /* ===============================
       LISTAGEM POR CATEGORIA
    =============================== */
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');

    if (category) {
      document.getElementById('categoryTitle').innerText =
        data.categories.find(c => c.id === category)?.name || '';

      const list = document.getElementById('productList');
      data.products
        .filter(p => p.category === category)
        .forEach(p => {
          list.innerHTML += `
            <div class="card">
              <img src="${p.images[0]}">
              <h3>${p.name}</h3>
              ${(p.treatments || []).map(t =>
                `<a href="${t.link}" target="_blank">${t.label}</a>`
              ).join('')}
            </div>
          `;
        });
    }
  });

/* ===============================
   FORMUL?RIO (Google Forms)
=============================== */
document.getElementById('leadForm')?.addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('leadMessage').innerText = "Cadastrado com sucesso ?";
});