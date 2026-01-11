// Carregar categorias
fetch('products.json')
  .then(res => res.json())
  .then(data => {
    const categoriesContainer = document.querySelector('.categories');
    data.categories.forEach(cat => {
      const catDiv = document.createElement('div');
      catDiv.classList.add('category');
      catDiv.innerHTML = `
        <a href="products.html?category=${cat.id}">
          <img src="${cat.image}" alt="${cat.name}">
          <h3>${cat.name}</h3>
        </a>
      `;
      categoriesContainer.appendChild(catDiv);
    });

    // Descobertas Deslumbrantes
    const featuredContainer = document.querySelector('.featured-products');
    data.categories.forEach(cat => {
      cat.products.forEach(prod => {
        if(prod.features){
          const prodDiv = document.createElement('div');
          prodDiv.classList.add('featured-item');
          prodDiv.innerHTML = `
            <img src="${prod.images[0]}" alt="${prod.title}">
            <h4>${prod.title}</h4>
            <a href="products.html?product=${prod.id}" class="btn">Quero conhecer</a>
          `;
          featuredContainer.appendChild(prodDiv);
        }
      });
    });
  });

// Carregar produtos na products.html
function loadProducts() {
  const params = new URLSearchParams(window.location.search);
  const categoryId = params.get('category');
  const productId = params.get('product');

  fetch('products.json')
    .then(res => res.json())
    .then(data => {
      const container = document.querySelector('.products-container');
      container.innerHTML = '';
      if(categoryId){
        const cat = data.categories.find(c => c.id === categoryId);
        cat.products.forEach(prod => renderProduct(prod, container));
      } else if(productId){
        data.categories.forEach(cat => {
          const prod = cat.products.find(p => p.id === productId);
          if(prod) renderProduct(prod, container);
        });
      }
    });
}

function renderProduct(prod, container){
  const prodDiv = document.createElement('div');
  prodDiv.classList.add('product-item');
  let imagesHtml = prod.images.map(img => `<img src="${img}" alt="${prod.title}">`).join('');
  prodDiv.innerHTML = `
    <div class="product-images">${imagesHtml}</div>
    <div class="product-info">
      <h2>${prod.title}</h2>
      <p>${prod.description}</p>
      <a href="${prod.link}" target="_blank" class="btn">Comprar</a>
    </div>
  `;
  container.appendChild(prodDiv);
}

if(document.querySelector('.products-container')){
  loadProducts();
}