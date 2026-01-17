import { CATEGORIES, PRODUCTS } from "./data.js";

const grid = document.getElementById("productsGrid");
const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const sortSelect = document.getElementById("sortSelect");

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getCategoryLabel(id) {
  const found = CATEGORIES.find((c) => c.id === id);
  return found ? found.label : "Categoria";
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
        <span class="badge">${getCategoryLabel(product.category)}</span>
        <span class="price">${formatBRL(product.price)}</span>
      </div>
      <h3 class="card-title">${product.name}</h3>
      <p class="card-desc">${product.description}</p>
      <span class="card-cta">Ver detalhes</span>
    </div>
  `;
  return a;
}

function applyFilters() {
  const q = (searchInput.value || "").trim().toLowerCase();
  const cat = categorySelect.value;
  const sort = sortSelect.value;

  let list = PRODUCTS.slice();

  if (cat !== "all") list = list.filter((p) => p.category === cat);

  if (q) {
    list = list.filter((p) => {
      const hay = `${p.name} ${p.description} ${p.category} ${Object.values(
        p.specs || {}
      ).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }

  if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
  if (sort === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));

  render(list);
}

function render(list) {
  grid.innerHTML = "";
  if (!list.length) {
    emptyState.classList.remove("hidden");
    return;
  }
  emptyState.classList.add("hidden");

  const frag = document.createDocumentFragment();
  list.forEach((p) => frag.appendChild(createCard(p)));
  grid.appendChild(frag);
}

function initCategories() {
  const frag = document.createDocumentFragment();
  CATEGORIES.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.label;
    frag.appendChild(opt);
  });
  categorySelect.appendChild(frag);
}

initCategories();
applyFilters();

searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);
