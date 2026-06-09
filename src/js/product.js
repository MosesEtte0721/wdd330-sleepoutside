import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ExternalServices.mjs";
import ProductDetails from "./productDetails.mjs";

loadHeaderFooter();


const productID = getParam("product");
const category = getParam("category") || "tents";
const dataSource = new ProductData(category);

const product = new ProductDetails(productID, dataSource);
product.init();