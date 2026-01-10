// Carrega o arquivo products.json
fetch('products.json')
  .then(response => response.json())
  .then(data => {

    // Loop em todos os produtos
    data.products.forEach(product => {

      // Cria o card do produto
      const card = document.createElement('div');
      card.className = 'product-card';

      // Imagem principal
      card.innerHTML = `
        <img src="${product.images[0]}" alt="${product.name}">
        <h3>${product.name}</h3>
        <a href="page/product.html?id=${product.id}">Ver detalhes</a>
      `;

      // Exibe nos destaques se highlight = true
      if (product.highlight) {
        document.getElementById('featured-products').appendChild(card);
      }

      // Exibe na categoria correta
      const categoryContainer = document.getElementById(product.category);
      if (categoryContainer) {
        categoryContainer.appendChild(card.cloneNode(true));
      }

    });

  })
  .catch(error => console.error('Erro ao carregar produtos:', error));