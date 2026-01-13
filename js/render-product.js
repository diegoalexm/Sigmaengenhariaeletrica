
// render-product.js premium
function getParam(n){return new URLSearchParams(location.search).get(n);} 
document.addEventListener('DOMContentLoaded',()=>{
 const id=getParam('id');const p=products.find(x=>x.id===id);
 document.body.innerHTML += `<h1>${p.name}</h1>`;
});
