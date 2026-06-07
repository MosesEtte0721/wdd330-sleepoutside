import{renderListWithTemplate } from "./utils.mjs";

// function productDetailTemplate(product) {
//   return `
//     <section class="product-detail">

//       <img src="${product.Image}" alt="${product.NameWithoutBrand}" />

//       <div class="product-info">
//         <hgroup>
//           <h1>${product.NameWithoutBrand}</h1>
//           <h3>${product.Brand?.Name || "No Brand"}</h3>
//         </hgroup>

//         <p class="price">
//           Price: ${product.FinalPrice}
//         </p>

//         <p class="description">
//           ${product.DescriptionHtmlSimple || "No description available"}
//         </p>

//         <button id="addToCart">Add to Cart</button>

//       </div>

//     </section>
//   `;
// }


export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const product = await this.dataSource.getData();

        this.renderList(product);
        
    }

    renderList(list) {
        this.listElement.insertAdjacentHTML("beforeend", productCardTemplate(list));
    }

}


function productCardTemplate(products) {
  const product_list = document.getElementById("product-list");
  if (!product_list) return; 
  
  product_list.innerHTML = products.map(product => `
    <section class="product-card"> 
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.NameWithoutBrand}" />
        <h3>${product.Brand?.Name || "No Brand"}</h3>
        <h2>${product.NameWithoutBrand}</h2>
        <p class="product-card__price">
          Price: ${product.FinalPrice}
        </p>
      </a>
    </section>
  `).join("");
}

