// Carrega produtos e categorias
document.addEventListener("DOMContentLoaded", function() {
  fetch("products.json")
    .then(response => response.json())
    .then(data => {
      renderFeatures(data);
      renderCategories(data);
    });
});

function renderFeatures(products) {
  const container = document.getElementById("features-container");
  container.innerHTML = "";
  products.filter(p => p.features).forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <img src="img/products/${prod.category}/${prod.images[0]}" alt="${prod.title}">
      <h3>${prod.title}</h3>
      <a href="page/product.html?id=${prod.id}" class="btn">Quero conhecer</a>
    `;
    container.appendChild(div);
  });
}

function renderCategories(products) {
  const container = document.getElementById("categories-container");
  container.innerHTML = "";
  const categories = [...new Set(products.map(p => p.category))];
  categories.forEach(cat => {
    const div = document.createElement("div");
    div.classList.add("category-card");
    div.innerHTML = `
      <img src="img/products/${cat}/${cat}.jpg" alt="${cat}">
      <h3>${cat.replace(/-/g," ")}</h3>
      <a href="page/category.html?category=${cat}" class="btn">Ver produtos</a>
    `;
    container.appendChild(div);
  });
}
