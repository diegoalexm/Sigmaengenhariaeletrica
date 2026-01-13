
// render-home.js
// Renderiza vitrine de destaques
function card(p){return `<div class='card-product'><img src='${p.images[0]}'><h3>${p.name}</h3><a class='btn' href='product.html?id=${p.id}'>Ver detalhes</a></div>`;}
document.addEventListener('DOMContentLoaded',()=>{
 const box=document.getElementById('showcase-grid');box.innerHTML=products.filter(p=>p.featured).map(card).join('');
});
