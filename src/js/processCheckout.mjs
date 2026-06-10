
import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();



export default class CheckoutProcess {
    
    constructor(key, outputSelector) {
    this.key = key;
    this.formElemen = outputSelector;
    this.list = [];
    this.totalItems = 0;
    this.shipping = 0;
    this.tax = 0;
    this.grandTotal = 0;
  }

    init() {
        console.log(`Total Items: ${this.total_qty}`)
        this.sub_total();
        this.tax_shipping_total() 

    }

    calculateItemSummary() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    const summary = document.querySelector( this.formElemen + " .sub_total");
    const itemTotal = document.querySelector(this.formElemen + " .totalItems" );
    itemTotal.innerText = `<p><strong>Total Items</strong>:${this.list.length} </p>`
    // calculate the total of all the items in the cart
    const cost = this.list.map((item) => item.FinalPrice);
    this.totalItems = cost.reduce((sum, item) => sum + item);
    summary.innerText = `<p><strong>Sub Total:$ </strong> $${this.totalItems.toFixed(2)}</strong></p> `;
  }

  calculateOrderTotal() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.tax = (this.totalItems * .06);
    this.shipping = this.list.length > 0 ? 10 + (total_qty-1) * 2 : 0;
    this.orderTotal = (
      parseFloat(this.totalItems) +
      parseFloat(this.tax) +
      parseFloat(this.shipping)
    )
    // display the totals.
    this.displayOrderTotals();
  }

 displayOrderTotals() {
    //  display calculated items in the order summary page
    const tax = document.querySelector(`${this.formElemen} .tax`);
    const shipping = document.querySelector(`${this.formElemen} .shipping`);
    const orderTotal = document.querySelector(`${this.formElemen} .grandTotal`);

    tax.innerText = `<p> <strong> Tax</strong>:$${this.tax.toFixed(2) } </p>`;
    shipping.innerText = `<p><strong>Shipping</strong>:$${this.shipping.toFixed(2) }</p>`;
    orderTotal.innerText = `<p><strong>Total</strong>:$${this.grandTotal.toFixed(2)}</p>`;
  }

    sub_total() { // retreive items in from the cart and display the total cost of all items in there
        const cartitems = getLocalStorage("so-cart") || [];
        const sub_total = cartitems.reduce((acc, sum ) => acc + sum.FinalPrice,0)
        console.log(sub_total);
        return sub_total;
   
    }

    tax_shipping_total() { //calculate tax, shipping cost, and the grand total
        const tax = this.sub_total * 0.075
        const shipping = this.list.length > 0 ? 10 + (this.list.length-1) * 2 : 0;
        const total = this.sub_total + tax + shipping;
        // console.log(`\nTax: $${tax.toFixed(2)}\n Shipping: $${shipping.toFixed(2)}\n Total:$${total.toFixed(2)}`)


    }

    cartItems() {
        const cart = getLocalStorage("so-cart") || [];
        return cart.map(item => ({
            ...item,
            quantity: item.quantity
        }))
    }


    async checkout() {
    const formElement = document.forms["checkout"];
    const order = formDataToJson(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.grandTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);
    

    try {
      const response = await services.checkout(order);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }


}


function formDataToJson(formElement) {
    const form_data = new FormData(formElement);
    let convertedToData = {};
    form_data.map((key, value) => {
        convertedToData[key] = value;
    })

    return convertedToData;
}

function packageItems(items){
    const simpleData = items.map((item) => {
        console.log(item);
        return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
        };
    });
    return simpleData;
}








