
import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();





function checkoutTemplate(cartItems) {
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  
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

      <div class="checkout-total">
        <p>Total: <strong>$${total.toFixed(2)}</strong></p>
      </div>

      <form class="checkout-form">
        <h2>Shipping Information</h2>

        <label for="name">Full Name</label>
        <input type="text" id="name" placeholder="John Doe" required />

        <label for="email">Email</label>
        <input type="email" id="email" placeholder="john@email.com" required />

        <label for="address">Address</label>
        <input type="text" id="address" placeholder="123 Main St" required />

        <label for="city">City</label>
        <input type="text" id="city" placeholder="City" required />

        <label for="zip">Zip Code</label>
        <input type="text" id="zip" placeholder="12345" required />

        <h2>Payment Information</h2>

        <label for="card">Card Number</label>
        <input type="text" id="card" placeholder="1234 5678 9012 3456" required />

        <label for="expiry">Expiry Date</label>
        <input type="text" id="expiry" placeholder="MM/YY" required />

        <label for="cvv">CVV</label>
        <input type="text" id="cvv" placeholder="123" required />

        <button type="submit" id="placeOrder">Place Order</button>
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


  document.getElementById("placeOrder")
    .addEventListener("click", (e) => {
      e.preventDefault();// prevent form submission
      localStorage.removeItem("so-cart"); // clear cart after order
      alert("Order placed successfully!");
      window.location.href = "/index.html"; // redirect to homepage after checkout
    });
}

renderCheckout();


