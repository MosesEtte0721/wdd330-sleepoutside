import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();


const productID = getParam("product");
const category = getParam("category") || "tents";
const dataSource = new ExternalServices(category);

if (productID) {
  const product = new ProductDetails(productID, dataSource);
  product.init();
} else {
  document.getElementById("product-detail").innerHTML = `
    <p>Please select a product from the product list.</p>
  `;
}
