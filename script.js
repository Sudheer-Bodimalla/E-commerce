// Profile Modal
const profileModal = document.getElementById("profileModal");
document.getElementById("profileBtn").onclick = () => profileModal.style.display = "block";
document.querySelector(".close").onclick = () => profileModal.style.display = "none";
window.onclick = e => { if (e.target === profileModal) profileModal.style.display = "none"; };
function saveProfile() {
  const name = document.getElementById("username").value;
  const mobile = document.getElementById("mobile").value;
  const address = document.getElementById("address").value;
  alert(`Saved:\nName: ${name}\nMobile: ${mobile}\nAddress: ${address}`);
  profileModal.style.display = "none";
}

// Cart
let cart = [];
const cartCount = document.getElementById("cartCount");
document.getElementById("cartBtn").onclick = () => {
  renderCart();
  document.getElementById("cartModal").style.display = "block";
};
function addToCart(product) {
  cart.push(product);
  cartCount.textContent = cart.length;
  alert(product + " added to cart!");
}
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";
  cart.forEach((item, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${item}
      <button onclick="buyNow('${item}')">Buy</button>
      <button onclick="removeItem(${i})">Remove</button>`;
    cartItems.appendChild(li);
  });
}
function removeItem(index) {
  cart.splice(index, 1);
  cartCount.textContent = cart.length;
  renderCart();
}
function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

// Buy Modal
function buyNow(product) {
  document.getElementById("buyModal").style.display = "block";
  document.getElementById("buyProductTitle").textContent = `Product: ${product}`;
  document.getElementById("paymentMethod").value = "Credit/Debit Card";
  renderPaymentInputs("Credit/Debit Card");
}
function closeBuy() {
  document.getElementById("buyModal").style.display = "none";
}
function completePurchase() {
  const method = document.getElementById("paymentMethod").value;
  alert(`Purchase completed via ${method}`);
  closeBuy();
}

// Payment Input Rendering
document.getElementById("paymentMethod").addEventListener("change", function () {
  renderPaymentInputs(this.value);
});
function renderPaymentInputs(method) {
  const container = document.getElementById("paymentInputs");
  container.innerHTML = "";
  if (method === "Credit/Debit Card") {
    container.innerHTML = `<input type="text" placeholder="Card Number" />
                           <input type="text" placeholder="Cardholder Name" />`;
  } else if (method === "UPI") {
    container.innerHTML = `<input type="text" placeholder="yourname@upi" />`;
  } else {
    container.innerHTML = `<p>Pay when delivered.</p>`;
  }
}

// Search
document.getElementById("search").addEventListener("input", function () {
  const term = this.value.toLowerCase();
  document.querySelectorAll(".product-card").forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = title.includes(term) ? "block" : "none";
  });
});
