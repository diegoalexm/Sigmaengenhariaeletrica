
// main.js completo com comentários
// Renderiza menu e utilitários
function renderCategoriesMenu(){const c=document.querySelector('.menu-categorias');if(!c)return;c.innerHTML=categories.map(cat=>`<a href='category.html?c=${cat.id}'>${cat.name}</a>`).join('');}
document.addEventListener('DOMContentLoaded',renderCategoriesMenu);
