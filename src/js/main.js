import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs";
import {loadHeaderFooter} from "./utils.mjs";


loadHeaderFooter();

const product_data = new ProductData("tents");

const list = product_data.getData().then(list => {
  console.log(list);
});

const elem = document.getElementById("product-list");


const product_list = new ProductList("Tents", product_data, elem);
console.log(product_list)
product_list.init();


