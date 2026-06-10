import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

function checkoutTemplate(cartItems) {
  return `
    <section class="checkout">
      <h2>Order Summary</h2>

      <ul class="checkout-list">
        ${cartItems.map(item => `
          <li class="checkout-item divider">
            <img src="${item.Images?.PrimarySmall || item.Image}" alt="${item.Name}" />
            <div class="checkout-item__info">
              <h3>${item.Name}</h3>
              <p class="checkout-item__color">${item.Colors?.[0]?.ColorName || ""}</p>
              <p class="checkout-item__price">$${item.FinalPrice}</p>
            </div>
          </li>
        `).join("")}
      </ul>

      <div class="totalItems"></div>
      <div class="sub_total"></div>
      <div class="tax"></div>
      <div class="shipping"></div>
      <div class="grand-total"></div>

      <form id="checkout-form" class="checkout" method="POST">
        <fieldset>
          <legend>Shipping and Payment Information</legend>
          <h2>Shipping Address:</h2>

          <label for="fname">First Name
            <input type="text" id="fname" placeholder="Ekong" required />
          </label>

          <label for="lname">Last Name
            <input type="text" id="lname" placeholder="Ntem" required />
          </label>

          <label for="address">Address
            <input type="text" id="address" placeholder="123 Main St" required />
          </label>

          <label for="city">City
            <input type="text" id="city" placeholder="City" required />
          </label>

          <label for="zip">Zip Code
            <input type="number" id="zip" placeholder="12345" required />
          </label>

          <h2>Payment:</h2>

          <label for="card">Card Number
            <input type="number" id="card" placeholder="1234 5678 9012 3456" required />
          </label>

          <label for="expiry">Expiry Date
            <input type="text" id="expiry" placeholder="MM/YY" required />
          </label>

          <label for="cvv">CVV
            <input type="number" id="cvv" placeholder="123" required />
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

// Zip code blur event
const zipInput = document.querySelector("#zip");
if (zipInput) {
  zipInput.addEventListener("blur", order.calculateOrderTotal.bind(order));
}

// Submit button handler
const submitBtn = document.querySelector("#checkoutSubmit");
if (submitBtn) {
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    order.checkout();
  });
}
