import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";


// let data = new ProductData("tents");
// // const productId = getParam("product");

// export default  class Product {
//     constructor(productId, dataSource) {
//         this.productId = productId;
//         this.dataSource = dataSource
//         this.product = this.product
//     }

    

//     async init() {
//         // fetch product data based on productId and store it in this.product
//         this.productId = getParam("product");
        
//         console.log(`This is current Id of this product: ${this.productId}`)
//         this.dataSource = await data.getData();

//         // use the findProductById method from ProductData to get the product details
//         this.product = await data.findProductById(this.productId);
//         console.log(this.product)        

//         this.renderProductDetails();

//         document.getElementById('addToCart')
//         .addEventListener('click', this.addToCart.bind(this));
        

//     }

//     addToCart() {
//       if (!this.product) {
//         console.error("No product data available to add to cart.");
//         return;
//       }
//         // get cart items from local storage, or initialize to empty array if it doesn't exist
//         let cartItems = getLocalStorage("so-cart") || [];
//         cartItems.push(this.product);
//         // let checkDuplicates = cartItems.find(item => item.Id === this.product.Id);
//         setLocalStorage("so-cart", cartItems);
//     }

//     renderProductDetails() {
//         // Implementation for rendering product details
       
//         productListTemplate(this.dataSource);
        
//         const container = document.getElementById("product-detail");
//         container.innerHTML = productDetailsTemplate(this.product);
//     }

// }

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // get the product id from the query string and store it in this.productId
    this.productId = getParam("product");
    console.log(`This is current Id of this product: ${this.productId}`);
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    console.log(this.product);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on "this" to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
  const container = document.getElementById("product-detail");
  container.innerHTML = productDetailsTemplate(this.product); // ← inject it
}
}


function productListTemplate(products) {
  const product_list = document.getElementById("product-list");
  if (!product_list) return; 
  
  product_list.innerHTML = products.map(product => `
    <section class="product-card"> 
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Image || product.Images?.PrimaryMedium}" alt="${product.NameWithoutBrand}" />
        <h3>${product.Brand?.Name || "No Brand"}</h3>
        <h2>${product.NameWithoutBrand}</h2>
        <p class="product-card__price">
          Price: ${product.FinalPrice}
        </p>
      </a>
    <button id="addToCart">Add to Cart</button>
    </section>
  `).join("");
}



  function productDetailsTemplate(product) {
  return `
    <section class="product-detail">

      <img src="${product.Image || product.Images?.PrimaryMedium}" alt="${product.NameWithoutBrand}" />

      <div class="product-info">
        <hgroup>
          <h1>${product.NameWithoutBrand}</h1>
          <h3>${product.Brand?.Name || "No Brand"}</h3>
        </hgroup>

        <p class="price">
          Price: ${product.FinalPrice}
        </p>

        <p class="description">
          ${product.DescriptionHtmlSimple || "No description available"}
        </p>

        <button id="addToCart">Add to Cart</button>

      </div>

    </section>
  `;
}
