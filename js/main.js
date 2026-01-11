// Carrega o JSON de produtos
fetch('products.json')
  .then(res => res.json())
  .then(data => {

    // Renderiza produtos destacados (highlight = true)
    const highlights = document.getElementById('highlights');
    if (highlights) {
      data.products
        .filter(p => p.highlight)
        .forEach(p => {
          highlights.innerHTML += `
            <div class="product-card">
              <img src="${p.images[0]}">
              <h4>${p.name}</h4>
              <a href="products.html?id=${p.id}">Ver detalhes</a>
            </div>
          `;
        });
    }

    // P?gina de detalhes do produto
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (productId) {
      const product = data.products.find(p => p.id === productId);
      const container = document.getElementById('product-detail');

      if (product) {
        container.innerHTML = `
          <h1>${product.name}</h1>
          <div class="gallery">
            ${product.images.map(img => `<img src="${img}">`).join('')}
          </div>
          <p>${product.description}</p>
          <div class="buy-links">
            ${product.links.map(l => `<a href="${l.url}" target="_blank">${l.label}</a>`).join('')}
          </div>
        `;
      }
    }
  });

// Salva lead sem redirecionar
function saveLead() {
  document.getElementById('leadMsg').innerText = 'Cadastrado com sucesso ?';
}