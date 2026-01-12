// product.html e category.html usam este JS
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function loadProduct() {
  const id = getQueryParam("id");
  const data = await fetch("../products.json").then(res => res.json());
  const product = data.find(p => p.id === id);
  if (!product) return;
  
  document.getElementById("product-title").textContent = product.title;
  document.getElementById("product-desc").textContent = product.description;

  const imgContainer = document.getElementById("product-images");
  product.images.forEach(img => {
    const image = document.createElement("img");
    image.src = `../img/products/${product.category}/${img}`;
    imgContainer.appendChild(image);
  });

  document.getElementById("buy-link").href = product.link;
}

async function loadCategory() {
  const category = getQueryParam("category");
  const data = await fetch("../products.json").then(res => res.json());
  const catProducts = data.filter(p => p.category === category);

  const container = document.getElementById("category-products");
  catProducts.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <img src="../img/products/${prod.category}/${prod.images[0]}" alt="${prod.title}">
      <h3>${prod.title}</h3>
      <a href="product.html?id=${prod.id}" class="btn">Quero conhecer</a>
    `;
    container.appendChild(div);
  });
}