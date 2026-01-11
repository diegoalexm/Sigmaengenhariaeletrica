// Carregar produtos e categorias
fetch('products.json')
  .then(res => res.json())
  .then(data => {
    renderFeatures(data.products.filter(p => p.highlight));
    setupCategories();
    setupProductPage(data.products);
  });

// Renderizar Destaques (Descobertas Deslumbrantes)
function renderFeatures(products) {
  const container = document.getElementById('features-container');
  if (!container) return;

  products.forEach(prod => {
    const div = document.createElement('div');
    div.classList.add('feature-card');
    div.innerHTML = `<img src="${prod.images[0]}" alt="${prod.name}">`;
    div.addEventListener('click', () => {
      window.location.href = `products.html?id=${prod.id}`;
    });
    container.appendChild(div);
  });
}

// Categorias clic?veis
function setupCategories() {
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.category;
      window.location.href = `products.html?category=${cat}`;
    });
  });
}

// P?gina de produto
function setupProductPage(products) {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const categoryId = urlParams.get('category');

  if (productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    document.getElementById('product-name').innerText = prod.name;
    document.getElementById('product-description').innerText = prod.fullDescription;
    const imagesDiv = document.getElementById('product-images');
    prod.images.forEach(img => {
      const image = document.createElement('img');
      image.src = img;
      imagesDiv.appendChild(image);
    });
    document.getElementById('product-link').href = prod.affiliateLink || '#';
  }

  if (categoryId) {
    const filteredProducts = products.filter(p => p.category === categoryId);
    const container = document.getElementById('features-container');
    if (!container) return;
    container.innerHTML = '';
    filteredProducts.forEach(prod => {
      const div = document.createElement('div');
      div.classList.add('feature-card');
      div.innerHTML = `<img src="${prod.images[0]}" alt="${prod.name}">`;
      div.addEventListener('click', () => {
        window.location.href = `products.html?id=${prod.id}`;
      });
      container.appendChild(div);
    });
  }
}

// Newsletter (apenas simula sucesso)
const submitBtn = document.getElementById('submit-lead');
if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const email = document.getElementById('lead-email').value;
    const whatsapp = document.getElementById('lead-whatsapp').value;
    if (!email && !whatsapp) {
      alert('Preencha pelo menos um campo.');
      return;
    }
    alert('Cadastro realizado com sucesso ?');
    document.getElementById('lead-email').value = '';
    document.getElementById('lead-whatsapp').value = '';
    // Aqui entra integra??o com Google Forms ou API por tr?s
  });
}