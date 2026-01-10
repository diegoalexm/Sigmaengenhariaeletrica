// main.js - Script principal do site
// Carrega produtos do JSON, carrossel, cookies e newsletter

let productsData = [];
let categoriesData = [];

// Carregar JSON de produtos
fetch('products.json')
  .then(res => res.json())
  .then(data => {
    productsData = data.products;
    categoriesData = data.categories;
    renderCategories();
    renderHighlights();
  })
  .catch(err => console.error('Erro ao carregar JSON:', err));

// Renderiza categorias
function renderCategories() {
  categoriesData.forEach(cat => {
    const section = document.getElementById(cat.id);
    if(section) {
      const catProducts = productsData.filter(p => p.category === cat.id);
      let html = `<h2>${cat.name}</h2><p>${cat.description}</p><div class="product-carousel">`;
      catProducts.forEach(prod => {
        html += `
          <div class="product-card">
            <img src="${prod.images[0]}" alt="${prod.name}">
            <h3>${prod.name}</h3>
            <p>${prod.shortDescription}</p>
            <a href="${prod.affiliateLink || '#'}" target="_blank">Comprar</a>
          </div>
        `;
      });
      html += '</div>';
      section.innerHTML = html;
    }
  });
}

// Renderiza Descobertas Deslumbrantes
function renderHighlights() {
  const section = document.getElementById('descobertas');
  if(section) {
    const highlights = productsData.filter(p => p.highlight);
    let html = `<h2>Descobertas Deslumbrantes</h2><div class="product-carousel">`;
    highlights.forEach(prod => {
      html += `
        <div class="product-card">
          <img src="${prod.images[0]}" alt="${prod.name}">
          <h3>${prod.name}</h3>
          <p>${prod.shortDescription}</p>
          <a href="${prod.affiliateLink || '#'}" target="_blank">Comprar</a>
        </div>
      `;
    });
    html += '</div>';
    section.innerHTML = html;
  }
}

// Cookies
const cookiesBanner = document.querySelector('.cookies-banner');
document.getElementById('accept-cookies').addEventListener('click', () => {
  cookiesBanner.style.display = 'none';
  localStorage.setItem('cookiesAccepted', 'true');
});
if(localStorage.getItem('cookiesAccepted') === 'true') {
  cookiesBanner.style.display = 'none';
}