function toggleDropdown() {
  const dropdown = document.getElementById("dropdownMenu");
  dropdown.classList.toggle("active");
}
function addToCart(productName, productPrice, productImage) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productIndex = cart.findIndex(
    (item) => item.name === productName && item.image === productImage
  );

  if (productIndex > -1) {
    // Increase quantity if product already in cart
    cart[productIndex].quantity++;
  } else {
    // Add new product to cart
    cart.push({
      name: productName,
      price: productPrice,
      quantity: 1,
      image: productImage,
    });
  }

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update cart count
  updateCartCount();
  Swal.fire({
    position: "middle",
    icon: "success",
    title: "Product Added To Cart",
    showConfirmButton: false,
    timer: 1500,
  });
}
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cartCount").innerText = totalItems;
}
// Call this function on page load to set initial cart count
window.onload = updateCartCount;
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";
  cart.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="py-2 px-4 border text-center">
          <img src="${item.image}" alt="${item.name}" 
          class="h-16 w-16 object-cover mx-auto" />
      </td>
      <td class="py-2 px-4 border">${item.name}</td>
      <td class="py-2 px-4 border">$${item.price.toFixed(2)}</td>
      <td class="py-2 px-4 border">${item.quantity}</td>
      <td class="py-2 px-4 border">$${(item.price * item.quantity).toFixed(
        cart
      )}</td> 
      `;
    cartItemsContainer.appendChild(row);
  });
}
function checkout() {
  alert("Proceeding to checkout...");
  localStorage.removeItem("cart");
}
window.onload = loadCart;
