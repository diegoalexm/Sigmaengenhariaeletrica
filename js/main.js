fetch('products.json')
  .then(res => res.json())
  .then(data => {
    const categoriesEl = document.getElementById('categories');
    const featuresEl = document.getElementById('features-container');

    // Categorias
    data.categories.forEach(cat => {
      const div = document.createElement('div');
      div.className = 'category-card';
      div.innerHTML = `
        <img src="${cat.image}" alt="${cat.name}">
        <h3>${cat.name}</h3>
      `;
      div.addEventListener('click', () => {
        window.location.href = `products.html?category=${cat.id}`;
      });
      categoriesEl.appendChild(div);
    });

    // Descobertas Deslumbrantes
    data.products.filter(p => p.features).forEach(prod => {
      const div = document.createElement('div');
      div.className = 'feature-card';
      div.innerHTML = `
        <img src="${prod.images[0]}" alt="${prod.title}">
        <h3>${prod.title}</h3>
        <p>${prod.description}</p>
        <a href="${prod.link}" class="btn">Quero conhecer</a>
      `;
      featuresEl.appendChild(div);
    });
  });

// Leads
document.getElementById('lead-submit').addEventListener('click', () => {
  const email = document.getElementById('lead-email').value;
  const whatsapp = document.getElementById('lead-whatsapp').value;

  if(email || whatsapp){
    document.getElementById('lead-msg').style.display = 'block';
    document.getElementById('lead-email').value = '';
    document.getElementById('lead-whatsapp').value = '';
  }
});