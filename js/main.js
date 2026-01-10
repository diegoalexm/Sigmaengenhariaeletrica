// main.js - Script principal do site
// Responsável por carregar produtos do JSON, carrossel, cookies e newsletter

// Variáveis globais
let productsData = []; // Array para armazenar produtos
let categoriesData = []; // Array para categorias

// Carregar JSON de produtos
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    productsData = data.products;
    categoriesData = data.categories;
    renderCategories(); // Renderiza as seções de cada categoria
    renderHighlights(); // Renderiza Descobertas Deslumbrantes
  })
  .catch(error => console.error('Erro ao carregar JSON:', error));

// Renderizar categorias
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

// Renderiza produtos em destaque
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