// ================= CARREGAR PRODUTOS =================
fetch('products.json')
  .then(res => res.json())
  .then(data => {

    // Criar t?tulos das categorias
    data.categories.forEach(cat => {
      const section = document.getElementById(cat.id);

      const title = document.createElement('h2');
      title.textContent = cat.name;
      section.appendChild(title);
    });

    // Inserir produtos
    data.products.forEach(prod => {
      const section = document.getElementById(prod.category);

      const card = document.createElement('div');
      card.className = 'product-card';

      card.innerHTML = `
        <img src="${prod.image}">
        <h3>${prod.name}</h3>
        <a href="${prod.link}" target="_blank">Comprar</a>
      `;

      section.appendChild(card);
    });
  });

// ================= FORM DE LEADS =================
document.getElementById('leadForm').addEventListener('submit', function(e){
  e.preventDefault();

  const email = document.getElementById('email').value;
  const whatsapp = document.getElementById('whatsapp').value;

  // Aqui voc? conecta com Google Forms ou Apps Script
  console.log('Email:', email);
  console.log('WhatsApp:', whatsapp);

  alert('Dados enviados com sucesso!');
});