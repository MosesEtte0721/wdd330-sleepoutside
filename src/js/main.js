import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs";
import {loadHeaderFooter, getParam} from "./utils.mjs";

loadHeaderFooter();


const product_data = new ProductData();
const category = getParam("category")


const elem = document.getElementById("product-list");


const product_list = new ProductList("sleeping-bags", product_data, elem);
console.log(product_list)
product_list.init();

// import ProductData from "./ProductData.mjs";
// import ProductList from "./productList.mjs";
// import { loadHeaderFooter, getParam } from "./utils.mjs";

// loadHeaderFooter();

// const category = getParam("category") || "tents"; // 
// const product_data = new ProductData(category);
// const elem = document.getElementById("product-list");

// const product_list = new ProductList(category, product_data, elem);
// product_list.init();
