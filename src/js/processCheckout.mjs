import {getLocalStorage } from "./utils.mjs";



export default class CheckoutProcess {
    
    constructor(cart){
        this.cart = cart
        this.total_qty = this.cart.length;
    }

    init() {
        console.log(`Total Items: ${this.total_qty}`)
        this.sub_total();
        this.tax_shipping_total() 

    }

    sub_total() { // retreive items in from the cart and display the total cost of all items in there
        const cartitems = getLocalStorage("so-cart") || [];
        const sub_total = cartitems.reduce((acc, sum ) => acc + sum.FinalPrice,0)
        console.log(sub_total);
        return sub_total;
   
    }

    tax_shipping_total() { //calculate tax, shipping cost, and the grand total
        const tax = this.sub_total * 0.075
        const shipping = this.total_qty > 0 ? 10 + (total_qty-1) * 2 : 0;
        const total = this.sub_total + tax + shipping;
        console.log(`\nTax: $${tax.toFixed(2)}\n Shipping: $${shipping.toFixed(2)}\n Total:$${total.toFixed(2)}`)


    }

}