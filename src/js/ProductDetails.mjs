import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";


let data = new ProductData("tents");
// const productId = getParam("product");

export default  class Product {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource
        this.product = this.product
    }

    

    async init() {
        // fetch product data based on productId and store it in this.product
        this.productId = getParam("product");
        
        console.log(`This is current Id of this product: ${this.productId}`)
        this.dataSource = await data.getData();

        // use the findProductById method from ProductData to get the product details
        this.product = await data.findProductById(this.productId);
        console.log(this.product)        

        this.renderProductDetails();

        document.getElementById('addToCart')
        .addEventListener('click', this.addToCart.bind(this));
        

    }

    addToCart() {
        // get cart items from local storage, or initialize to empty array if it doesn't exist
        let cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        // let checkDuplicates = cartItems.find(item => item.Id === this.product.Id);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
        // Implementation for rendering product details
       
        productListTemplate(this.dataSource);
        
        const container = document.getElementById("product-detail");
        container.innerHTML = productDetailsTemplate(this.product);
    }

}



function productListTemplate(products) {
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



  function productDetailsTemplate(product) {
  return `
    <section class="product-detail">

      <img src="${product.Image}" alt="${product.NameWithoutBrand}" />

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
