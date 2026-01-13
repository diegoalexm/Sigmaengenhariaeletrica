
// render-category.js premium
function getParam(n){return new URLSearchParams(location.search).get(n);} 
document.addEventListener('DOMContentLoaded',()=>{
 const id=getParam('c');const cat=categories.find(x=>x.id===id);
 document.body.innerHTML += `<h1>${cat.name}</h1>`;
});
