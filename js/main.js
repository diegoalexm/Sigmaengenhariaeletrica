// Main JS - carrega produtos dinamicamente do JSON

// Função para buscar JSON
async function loadProducts() {
  const response = await fetch('products.json');
  const data = await response.json();
  const products = data.products;
  const categories = data.categories;

  categories.forEach(cat => {
    const container = document.getElementById(`carousel-${cat.id}`);
    if (!container) return;

    const catProducts = products.filter(p => p.category === cat.id);
    catProducts.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';

      // Imagem principal
      const img = document.createElement('img');
      img.src = p.images[0];
      img.alt = p.name;
      card.appendChild(img);

      // Nome
      const name = document.createElement('h3');
      name.textContent = p.name;
      card.appendChild(name);

      // Descrição curta
      const shortDesc = document.createElement('p');
      shortDesc.textContent = p.shortDescription || '';
      card.appendChild(shortDesc);

      // Links de afiliado (verifica se é Braip com tratamentos)
      if (p.treatments) {
        p.treatments.forEach(t => {
          const btn = document.createElement('a');
          btn.href = t.affiliateLink;
          btn.target = '_blank';
          btn.textContent = t.label;
          btn.className = 'btn-buy';
          card.appendChild(btn);
        });
      } else if (p.affiliateLink) {
        const btn = document.createElement('a');
        btn.href = p.affiliateLink;
        btn.target = '_blank';
        btn.textContent = 'Comprar';
        btn.className = 'btn-buy';
        card.appendChild(btn);
      }

      container.appendChild(card);
    });
  });
}

// Inicia carregamento
document.addEventListener('DOMContentLoaded', loadProducts);