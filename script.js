let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  alert(`${name.replace(/-/g, " ")} has been added to your cart!`);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.innerText = "Your cart is empty.";
    cartItemsContainer.appendChild(emptyMessage);
  } else {
    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");
      itemDiv.innerText = `${item.name.replace(/-/g, " ")} - ${item.price}kr`;

      const removeButton = document.createElement("button");
      removeButton.innerText = "Remove";
      removeButton.classList.add("remove-item");
      removeButton.onclick = () => removeFromCart(index);

      itemDiv.appendChild(removeButton);
      cartItemsContainer.appendChild(itemDiv);

      total += item.price;
    });
  }

  totalPriceElement.innerText = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  updateCartDisplay();
}

if (document.getElementById("cart-container")) {
  updateCartDisplay();
}
window.onload = function () {
  const music = document.getElementById("background-music");
  music.play().catch((error) => {
    console.log("Error playing music:", error);
  });
};
if (document.body.id === "indexPage") {
  const greetingElement = document.getElementById("greeting");
  const hours = new Date().getHours();
  let greeting;
  if (hours < 12) {
    greeting =
      "Rise and embrace the dawn, where sanity dances on the edge of madness.";
  } else if (hours < 18) {
    greeting =
      "“Welcome, esteemed patron. As the sun hangs high, may the shadows of ancient secrets guide your journey.”";
  } else {
    greeting =
      "Greetings, intrepid seeker. In this dimming light, may the stars reveal truths both wondrous and dreadful";
  }
  greetingElement.innerHTML = greeting;
}
