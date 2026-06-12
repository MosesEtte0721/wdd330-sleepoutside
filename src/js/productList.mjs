// export default class ProductList {
//   constructor(category, dataSource, listElement) {
//     this.category = category;
//     this.dataSource = dataSource;
//     this.listElement = listElement;
//   }

//   async init() {
//     const products = await this.dataSource.getData();
//     this.renderList(products);
//   }

//   renderList(list) {
//     const html = list.map(product => productCardTemplate(product)).join("");
//     this.listElement.insertAdjacentHTML("afterbegin", html);
//   }
// }

// function productCardTemplate(product) {
//   return `
//     <section class="product-card"> 
//       <a href="/product_pages/index.html?product=${product.Id}">
//         <img src="${product.Image}" alt="${product.NameWithoutBrand}" />
//         <h3>${product.Brand?.Name || "No Brand"}</h3>
//         <h2>${product.NameWithoutBrand}</h2>
//         <p class="product-card__price">Price: ${product.FinalPrice}</p>
//       </a>
//     </section>
//   `;
// }

import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}&category=${product.Category || "sleeping-bags"}">
        <img src="${product.Images?.PrimaryMedium || product.Image}" alt="${product.Name}" />
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector(".title").textContent = this.category;
  }

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    // apply use new utility function instead of the commented code above
    renderListWithTemplate(productCardTemplate, this.listElement, list);

  }

}
