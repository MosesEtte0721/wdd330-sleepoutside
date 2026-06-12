import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

function checkoutTemplate(cartItems) {
  return `
    <section class="checkout">
      <h2>Order Summary</h2>
    

      <div class="totalItems"></div>
      <div class="sub_total"></div>
      <div class="tax"></div>
      <div class="shipping"></div>
      <div class="grand-total">
      </div>
      <form id="checkout-form" class="checkout" method="POST">
        <fieldset>
          <legend>Shipping and Payment Information</legend>
          
          <h2>Shipping Address:</h2>
          <label for="fname">First Name
            <input type="text" id="fname" name="fname" placeholder="Ekong" required />
          </label>
          <label for="lname">Last Name
            <input type="text" id="lname" name="lname" placeholder="Ntem" required />
          </label>
          <label for="address">Address
            <input type="text" id="address" name="address" placeholder="123 Main St" required />
          </label>
          <label for="city">City
            <input type="text" id="city" name="city" placeholder="City" required />
          </label>
          <label for="zip">Zip Code
            <input type="number" id="zip" name="zip" placeholder="12345" required />
          </label>

          <h2>Payment:</h2>
          <label for="card">Card Number
            <input type="number" id="card" name="card" placeholder="1234 5678 9012 3456" required />
          </label>
          <label for="expiry">Expiry Date
            <input type="text" id="expiry" name="expiry" placeholder="MM/YY" required />
          </label>
          <label for="cvv">CVV
            <input type="number" id="cvv" name="cvv" placeholder="123" required />
          </label>
          
          <button type="submit" id="checkoutSubmit">Place Order</button>
        </fieldset>
      </form>
    </section>
  `;
}

function renderCheckout() {
  const cartItems = getLocalStorage("so-cart");
  if (!cartItems || cartItems.length === 0) {
    document.getElementById("checkout").innerHTML = 
      "<p>Your cart is empty. <a href='/index.html'>Go shopping</a></p>";
    return;
  }

  document.getElementById("checkout").innerHTML = checkoutTemplate(cartItems);
}

renderCheckout();

// Initialize CheckoutProcess
const order = new CheckoutProcess("so-cart", ".checkout");
order.init();

// Zip blur for totals
document.querySelector("#zip")?.addEventListener("blur", order.calculateOrderTotal.bind(order));

// Form submit
const form = document.getElementById("checkout-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    order.checkout();
  });
}
