// main.js

// Fun??o para popular a vitrine Descobertas Deslumbrantes
fetch('products.json')
.then(res => res.json())
.then(products => {
    const vitrine = document.getElementById('vitrine-items');
    const categoriesContainer = document.getElementById('categories-items');

    products.forEach(p => {
        // Vitrine features
        if(p.features){
            const div = document.createElement('div');
            div.className = 'vitrine-item';
            div.innerHTML = `
                <img src="${p.images[0]}" alt="${p.title}">
                <h3>${p.title}</h3>
                <a href="products.html#${p.id}" class="btn">Quero conhecer</a>
            `;
            vitrine.appendChild(div);
        }

        // Categorias
        if(categoriesContainer){
            const catDiv = document.createElement('div');
            catDiv.className = 'category-item';
            catDiv.innerHTML = `
                <a href="products.html#${p.category}">
                    <img src="img/products/${p.category}/${p.category}.jpg" alt="${p.category}">
                    <h4>${p.category.replace('-', ' ')}</h4>
                </a>
            `;
            if(!document.getElementById(p.category)) categoriesContainer.appendChild(catDiv);
        }
    });
});