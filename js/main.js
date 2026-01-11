// Carrega produtos do JSON
fetch('products.json')
  .then(res => res.json())
  .then(data => {
    const featured = document.getElementById('featured-products');

    data.products.forEach(product => {
      if (product.highlight) {
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
          <img src="${product.images[0]}" alt="${product.name}">
          <h4>${product.name}</h4>
          <a href="products.html?id=${product.id}">Ver detalhes</a>
        `;
        featured.appendChild(card);
      }
    });
  });

// Mensagem fake de sucesso (lead)
function showSuccess() {
  document.getElementById('successMsg').style.display = 'block';
}