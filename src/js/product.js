import { getParam } from "./utils.mjs";
import Product from "./productDetails.mjs";
import ProductData from "./ProductData.mjs";



const dataSource = new ProductData("tents");

const productId = getParam("product"); 
console.log("Product ID from URL:", productId)

const product = new Product(productId, dataSource);

product.init();




// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
  
//   addProductToCart(product);
// }

// add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
