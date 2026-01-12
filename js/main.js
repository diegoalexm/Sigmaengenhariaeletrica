// Arquivo: js/main.js

document.addEventListener("DOMContentLoaded", () => {
  // WhatsApp flutuante
  const whatsapp = document.querySelector(".whatsapp-float");
  whatsapp.style.position = "fixed";
  whatsapp.style.bottom = "20px";
  whatsapp.style.right = "20px";
  whatsapp.style.zIndex = "1000";

  // Carregar categorias na header
  const headerNav = document.querySelector(".header-categories");
  if(headerNav){
    categories.forEach(cat => {
      const a = document.createElement("a");
      a.href = "products.html?category=" + cat.name;
      a.textContent = cat.title;
      headerNav.appendChild(a);
    });
  }

  // Vitrine descobertas Deslumbrantes
  const featuresContainer = document.getElementById("features");
  if(featuresContainer){
    products.filter(p => p.features).forEach(p => {
      const div = document.createElement("div");
      div.className = "feature-item";
      div.innerHTML = `
        <img src="${p.images[0]}" alt="${p.title}">
        <h3>${p.title}</h3>
        <a href="product.html?id=${p.id}" class="btn">Quero conhecer</a>
      `;
      featuresContainer.appendChild(div);
    });
  }

  // Leads
  const leadForm = document.getElementById("leadForm");
  if(leadForm){
    leadForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("Cadastrado com sucesso ?");
      leadForm.reset();
      // Automa??o externa para Google Sheets ou Forms
    });
  }
});