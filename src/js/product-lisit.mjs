export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    document.querySelector(".title").textContent = this.category;
    const products = await this.dataSource.getData();
    this.renderList(products);
  }

  renderList(list) {
    const html = list.map(product => productCardTemplate(product)).join("");
    this.listElement.insertAdjacentHTML("afterbegin", html);g
  }
  
}

function productCardTemplate(product) {
  return `
    <section class="product-card"> 
      <a href="/product_listing/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.NameWithoutBrand}" />
        <h3>${product.Brand?.Name || "No Brand"}</h3>
        <h2>${product.NameWithoutBrand}</h2>
        <p class="product-card__price">Price: ${product.FinalPrice}</p>
      </a>
    </section>
  `;
}



function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export  class ProductData {
  constructor() 
  {
    // this.category = category;
    // this.path = `/json/${this.category}.json`;
  }
  // getData() {
  //   return fetch(this.path)
  //     .then(convertToJson)
  //     .then((data) => data.Result || data);
  // }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    
    return data.Result;
  }
  async findProductById(id) {
    const products = await this.getData();
    console.log("All products:", products);
    // return products.find((item) => item.Id === id);
    // line 24 is returning undefined, meaning that it is not
    const product = products.find((item) => String(item.Id).toLowerCase() === String(id).toLowerCase());
    console.log(`Product with ID ${id}:`, product);
    return product;
  }

  
}
