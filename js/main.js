import { PRODUCTS } from "./data.js";

const grid = document.getElementById("homeGrid");

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function createCard(product) {
  const a = document.createElement("a");
  a.className = "card";
  a.href = `product.html?id=${encodeURIComponent(product.id)}`;
  a.innerHTML = `
    <div class="card-media">
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
    </div>
    <div class="card-body">
      <div class="card-top">
        <span class="badge">Destaque</span>
        <span class="price">${formatBRL(product.price)}</span>
      </div>
      <h3 class="card-title">${product.name}</h3>
      <p class="card-desc">${product.description}</p>
      <span class="card-cta">Ver detalhes</span>
    </div>
  `;
  return a;
}

const featured = PRODUCTS.slice(0, 8);

const frag = document.createDocumentFragment();
featured.forEach((p) => frag.appendChild(createCard(p)));
grid.appendChild(frag);
