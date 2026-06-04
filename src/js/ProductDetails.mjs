import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

export default  class Product {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }

    async init() {
        // fetch product data based on productId and store it in this.product
        // use the findProductById method from ProductData to get the product details
        this.product = await this.dataSource.findProductById(this.productId);

        console.log("hello",this.product);
        
        this.renderProductDetails();

        document.getElementById('addToCart')
        .addEventListener('click', this.addToCart.bind(this));
    }

    addToCart() {
        // get cart items from local storage, or initialize to empty array if it doesn't exist
        let cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        let checkDuplicates = cartItems.find(item => item.Id === this.product.Id);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
        // Implementation for rendering product details
        productDetailsTemplate(this.product);
    }

}

function productDetailsTemplate(products) {
  const container = document.getElementById("product-detail");

  container.innerHTML = products.map(product => `
  
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
    
