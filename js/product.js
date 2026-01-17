import { CATEGORIES, PRODUCTS } from "./data.js";

const wrap = document.getElementById("productWrap");

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getCategoryLabel(id) {
  const found = CATEGORIES.find((c) => c.id === id);
  return found ? found.label : "Categoria";
}

function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function buildWhatsAppLink(productName) {
  // Troca o número depois (com DDD), por enquanto é texto pronto
  const text = `Olá! Quero orçamento do produto: ${productName}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

function render(product) {
  const specsEntries = Object.entries(product.specs || {});
  const pills = specsEntries
    .map(([k, v]) => `<span class="pill">${k}: ${v}</span>`)
    .join("");

  wrap.innerHTML = `
    <div class="product">
      <div class="product-media">
        <img src="${product.image}" alt="${product.name}" />
      </div>

      <div class="product-box">
        <div class="pill-row">
          <span class="badge">${getCategoryLabel(product.category)}</span>
        </div>

        <h1 style="margin:0;">${product.name}</h1>
        <p class="muted">${product.description}</p>

        <div class="kv">
          <div>
            <small>Preço</small>
            <strong>${formatBRL(product.price)}</strong>
          </div>
          <div>
            <small>Status</small>
            <strong>Disponível para orçamento</strong>
          </div>
        </div>

        <div class="pill-row">
          ${pills || `<span class="pill">Sem especificações</span>`}
        </div>

        <div style="display:grid; gap:10px; margin-top:6px;">
          <a class="btn-primary" href="${buildWhatsAppLink(product.name)}" target="_blank" rel="noreferrer">
            Pedir orçamento no WhatsApp
          </a>
          <a class="btn-secondary" href="products.html">Voltar ao catálogo</a>
        </div>
      </div>
    </div>
  `;
}

const id = getParam("id");
const product = PRODUCTS.find((p) => p.id === id);

if (!product) {
  window.location.href = "404.html";
} else {
  render(product);
}
