import Product from "./productDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

const template = new Product();


template.init();


    











// const productList = new Product();
// productList.init();




// const product = new Product(productId, dataSource);

// product.init();




// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
  
//   addProductToCart(product);
// }

// add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
