
/* --------------------------------------------------
   main.js — utilidades globais + menu + rodapé
--------------------------------------------------- */

// Lê query string (?id= / ?c=)
function getParam(name){
  const params = new URLSearchParams(location.search);
  return params.get(name);
}

// Monta o menu de categorias (usa window.categories)
function renderCategoriesMenu(selector = ".menu-categorias"){
  const el = document.querySelector(selector);
  if(!el || !window.categories) return;
  el.innerHTML = categories
    .map(c => `<a class="menu-link" href="category.html?c=${encodeURIComponent(c.id)}">${c.name}</a>`)
    .join("");
}

// Atualiza o ano no rodapé
function renderFooterYear(){
  const el = document.getElementById("year");
  if(el) el.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategoriesMenu();
  renderFooterYear();
});
