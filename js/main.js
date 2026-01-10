// ================= CARREGAR PRODUTOS =================
fetch('products.json')
  .then(res => res.json())
  .then(data => {

    // Para cada categoria existente
    data.categories.forEach(cat => {

      // Seleciona a section correspondente pelo ID
      const section = document.getElementById(cat.id);

      // Cria o t?tulo da categoria
      const title = document.createElement('h2');
      title.textContent = cat.name;
      section.appendChild(title);

      // Container de produtos
      const container = document.createElement('div');
      container.className = 'products';

      // Filtra produtos daquela categoria
      data.products
        .filter(p => p.category === cat.id)
        .forEach(prod => {

          // Card do produto
          const card = document.createElement('div');
          card.className = 'product-card';

          // Imagem
          const img = document.createElement('img');
          img.src = prod.images[0];
          card.appendChild(img);

          // Nome
          const name = document.createElement('p');
          name.textContent = prod.name;
          card.appendChild(name);

          // Bot?o
          const link = document.createElement('a');
          link.href = prod.links[0].url;
          link.target = '_blank';
          link.textContent = 'Ver oferta';
          card.appendChild(link);

          container.appendChild(card);
        });

      section.appendChild(container);
    });
  });

// ================= FORM LEADS =================
document.getElementById('leadForm').addEventListener('submit', function(e){
  e.preventDefault();
  alert('Lead capturado! Integra??o com Google Forms.');
});