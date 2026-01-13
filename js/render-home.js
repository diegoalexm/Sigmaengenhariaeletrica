
/* --------------------------------------------------
   render-home.js — vitrine de destaques
--------------------------------------------------- */

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

document.addEventListener("DOMContentLoaded", () => {
  const showcaseGrid = document.querySelector("#showcase-grid");
  if(!showcaseGrid || !window.products) return;

  const featured = products.filter(p => p.featured);
  showcaseGrid.innerHTML = featured.map(productCard).join("");
});
