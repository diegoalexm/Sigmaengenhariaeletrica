
/* --------------------------------------------------
   render-product.js — galeria + CTAs dinâmicos
--------------------------------------------------- */

function thumbTemplate(src, idx){
  return `
    <button class="thumb" data-idx="${idx}" aria-label="Imagem ${idx + 1}">
      <img src="${src}" alt="Imagem do produto ${idx + 1}" loading="lazy">
    </button>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const id = getParam("id");
  const p = (products || []).find(x => x.id === id);

  const titleEl = document.querySelector(".product-title");
  const descEl = document.querySelector(".product-description");
  const mainImgEl = document.querySelector(".product-main img");
  const thumbsEl = document.querySelector(".product-thumbs");
  const ctasEl = document.querySelector(".product-ctas");

  if(!p){
    if(titleEl) titleEl.textContent = "Produto não encontrado";
    return;
  }

  // Título/descrição
  if(titleEl) titleEl.textContent = p.name;
  if(descEl) descEl.textContent = p.description || "";

  // Imagem principal
  const firstImg = (p.images && p.images[0]) || "img/placeholder-vert.jpg";
  if(mainImgEl){ mainImgEl.src = firstImg; mainImgEl.alt = p.name; }

  // Miniaturas
  if(thumbsEl){
    thumbsEl.innerHTML = (p.images || []).map((src, idx) => thumbTemplate(src, idx)).join("");
    thumbsEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".thumb");
      if(!btn || !mainImgEl) return;
      const idx = Number(btn.dataset.idx);
      mainImgEl.src = p.images[idx];
    });
  }

  // CTAs (links múltiplos OU checkout único)
  if(ctasEl){
    if(Array.isArray(p.links) && p.links.length){
      ctasEl.innerHTML = p.links
        .map(lk => `<a class="btn btn-rose btn-large" target="_blank" rel="noopener" href="${lk.url}">${lk.label}</a>`)
        .join("");
    } else if(p.checkout){
      ctasEl.innerHTML = `<a class="btn btn-rose btn-large" target="_blank" rel="noopener" href="${p.checkout}">Quero conhecer</a>`;
    } else {
      ctasEl.innerHTML = `<p class="muted">Em breve</p>`;
    }
  }

  // Título da aba dinâmico
  document.title = `${p.name} — Bella e Dellicada`;
});
