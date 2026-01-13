
/* --------------------------------------------------
   render-category.js — banner + grid por categoria
--------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const catId = getParam("c");
  const cat = (categories || []).find(c => c.id === catId);

  const titleEl = document.querySelector(".category-title");
  const bannerEl = document.querySelector(".category-banner");
  const gridEl = document.querySelector("#category-grid");

  if(!cat){
    if(titleEl) titleEl.textContent = "Categoria não encontrada";
    return;
  }

  if(titleEl) titleEl.textContent = cat.name;
  if(bannerEl) bannerEl.innerHTML = `<img src="${cat.image}" alt="${cat.name}">`;

  const items = (products || []).filter(p => p.category === cat.id);

  function productCard(p){
    const thumb = (p.images && p.images[0]) || "img/placeholder-quad.jpg";
    return `
      <article class="card-product">
        <a href="product.html?id=${encodeURIComponent(p.id)}" class="card-img-wrap" aria-label="${p.name}">
          <img src="${thumb}" alt="${p.name}" loading="lazy">
        </a>
        <div class="card-body">
          <h3 class="card-title">${p.name}</h3>
          <a class="btn btn-rose" href="product.html?id=${encodeURIComponent(p.id)}">Ver detalhes</a>
        </div>
      </article>
    `;
  }

  if(gridEl) gridEl.innerHTML = items.map(productCard).join("");
});
