import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.totalItems = 0;
    this.shipping = 0;
    this.tax = 0;
    this.grandTotal = 0;
  }

  async init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSummary();
    this.calculateOrderTotal();
  }

  calculateItemSummary() {
    const itemTotalEl = document.querySelector(`${this.outputSelector} .totalItems`);
    const subTotalEl = document.querySelector(`${this.outputSelector} .sub_total`);

    if (itemTotalEl) {
      itemTotalEl.innerHTML = `<p><strong>Total Items</strong>: ${this.list.length}</p>`;
    }

    const cost = this.list.map(item => item.FinalPrice || 0);
    this.totalItems = cost.reduce((sum, price) => sum + price, 0);

    if (subTotalEl) {
      subTotalEl.innerHTML = `<p><strong>Sub Total</strong>: $${this.totalItems.toFixed(2)}</p>`;
    }
  }

  calculateOrderTotal() {
    this.tax = this.totalItems * 0.06;
    this.shipping = this.list.length > 0 ? 10 + (this.list.length - 1) * 2 : 0;
    this.grandTotal = this.totalItems + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const taxEl = document.querySelector(`${this.outputSelector} .tax`);
    const shippingEl = document.querySelector(`${this.outputSelector} .shipping`);
    const grandTotalEl = document.querySelector(`${this.outputSelector} .grand-total`);

    if (taxEl) taxEl.innerHTML = `<p><strong>Tax</strong>: $${this.tax.toFixed(2)}</p>`;
    if (shippingEl) shippingEl.innerHTML = `<p><strong>Shipping</strong>: $${this.shipping.toFixed(2)}</p>`;
    if (grandTotalEl) grandTotalEl.innerHTML = `<p><strong>Grand Total</strong>: $${this.grandTotal.toFixed(2)}</p>`;
  }

  async checkout() {
    const formElement = document.getElementById("checkout-form");
    if (!formElement) {
      console.error("Checkout form not found");
      return;
    }

    const order = this.formDataToJson(formElement);
    order.orderDate = new Date().toISOString();
    order.orderTotal = this.grandTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = this.packageItems(this.list);

    try {
      const response = await services.checkout(order);
      console.log("Order submitted:", response);
      localStorage.removeItem(this.key);
      alert("Order placed successfully!");
      window.location.href = "/index.html";
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Checkout failed. Please try again.");
    }
  }

  formDataToJson(formElement) {
    const formData = new FormData(formElement);
    const converted = {};
    formData.forEach((value, key) => {
      converted[key] = value;
    });
    return converted;
  }

  packageItems(items) {
    return items.map(item => ({
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    }));
  }
}
