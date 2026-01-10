fetch('products.json')
  .then(res => res.json())
  .then(data => {
    const products = data.products;

    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <a href="${product.link}" target="_blank">Comprar</a>
      `;

      // Categoria
      const section = document.querySelector(
        `#${product.category} .products`
      );
      if (section) section.appendChild(card);

      // Destaques
      if (product.featured === true) {
        document
          .getElementById('featured-products')
          .appendChild(card.cloneNode(true));
      }
    });
  });