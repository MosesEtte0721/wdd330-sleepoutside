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
        // this.product = await this.dataSource.findProductById(this.productId);
        document.getElementById('addToCart')
        .addEventListener('click', this.addToCart.bind(this));
    }

    addProductToCart() {
        // get cart items from local storage, or initialize to empty array if it doesn't exist
        let cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
        // Implementation for rendering product details
        productDetailsTemplate(this.product);


        

}
}
function productDetailsTemplate(product) {
            document.querySelector('h2').textContent = product.Brand.Name;
            document.querySelector('h3').textContent = product.NameWithoutBrand;

            const productImage = document.getElementById('productImage');
            productImage.src = product.Image;
            productImage.alt = product.NameWithoutBrand;

            document.getElementById('productPrice').textContent = product.FinalPrice;
            document.getElementById('productColor').textContent = product.Colors[0].ColorName;
            document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

            document.getElementById('addToCart').dataset.id = product.Id;
        }
    
