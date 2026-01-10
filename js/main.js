/* ============================
   main.js - Bella e Dellicada
   Script principal para carregar produtos do JSON e montar carrossel/cards
============================ */

/* Função para carregar produtos do arquivo JSON */
async function loadProducts() {
  try {
    // Buscar arquivo JSON
    const response = await fetch('data/products.json');
    const data = await response.json();

    // Filtrar produtos destacados para o carrossel
    const featuredProducts = data.products.filter(product => product.featured);

    // Selecionar container do carrossel
    const carousel = document.getElementById('product-carousel');
    carousel.innerHTML = ''; // Limpar conteúdo anterior

    // Criar cards para cada produto
    featuredProducts.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');

      /* ============================
         Imagens do produto
      ============================ */
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('product-images');

      product.images.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = product.title;
        img.classList.add('carousel-image');
        imageContainer.appendChild(img);
      });

      card.appendChild(imageContainer);

      /* ============================
         Título do produto
      ============================ */
      const title = document.createElement('h3');
      title.textContent = product.title;
      card.appendChild(title);

      /* ============================
         Descrição resumida
      ============================ */
      const desc = document.createElement('p');
      desc.textContent = product.description.split('\n')[0]; // primeira linha da descrição
      card.appendChild(desc);

      /* ============================
         Botões de compra
         - Suporta 1 ou múltiplos links
      ============================ */
      if (product.affiliate_links && product.affiliate_links.length > 0) {
        const linksContainer = document.createElement('div');
        linksContainer.classList.add('links-container');

        product.affiliate_links.forEach(linkData => {
          const link = document.createElement('a');
          link.href = linkData.url;
          link.target = '_blank';
          link.textContent = linkData.label;
          link.classList.add('btn-buy'); // classe CSS para estilizar botão
          linksContainer.appendChild(link);
        });

        card.appendChild(linksContainer);
      }

      // Adicionar card ao carrossel
      carousel.appendChild(card);
    });

  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
  }
}

/* ============================
   Inicializar site quando DOM estiver pronto
============================ */
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});