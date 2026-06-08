export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const products = await this.dataSource.getData();
    this.renderList(products);
  }

  renderList(list) {
    const html = list.map(product => productCardTemplate(product)).join("");
    this.listElement.insertAdjacentHTML("afterbegin", html);
  }
}

function productCardTemplate(product) {
  return `
    <section class="product-card"> 
      <a href="/product_listing/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.NameWithoutBrand}" />
        <h3>${product.Brand?.Name || "No Brand"}</h3>
        <h2>${product.NameWithoutBrand}</h2>
        <p class="product-card__price">Price: ${product.FinalPrice}</p>
      </a>
    </section>
  `;
}