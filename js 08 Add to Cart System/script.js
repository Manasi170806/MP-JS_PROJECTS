const products = 
[
    { id: 1, name: "LD01 LOUNGE CHAIR", price: 200, img: "img/01.png" },
    { id: 2, name: "LD02 LOUNGE CHAIR", price: 250, img: "img/02.png" },
    { id: 3, name: "LD03 LOUNGE CHAIR", price: 290, img: "img/03.png" },
    { id: 4, name: "LD04 LOUNGE CHAIR", price: 200, img: "img/04.png" },
    { id: 5, name: "LD05 LOUNGE CHAIR", price: 300, img: "img/05.png" },
    { id: 6, name: "LD06 LOUNGE CHAIR", price: 200, img: "img/06.png" },
    { id: 7, name: "LD07 LOUNGE CHAIR", price: 200, img: "img/07.png" },
    { id: 8, name: "LD08 LOUNGE CHAIR", price: 200, img: "img/08.png" }
];
  
const cart = {};
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartEl = document.getElementById("cart");
const container = document.querySelector(".container");
  
function renderProducts() 
{
  const productList = document.getElementById("productList");
  productList.innerHTML = products.map(p => `
    <div class="product">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart(${p.id})">Add To Cart</button>
    </div>
  `).join('');
}
  
function addToCart(id) 
{
  if (cart[id]) 
  {
    cart[id].qty++;
  } 
  else 
  {
    const product = products.find(p => p.id === id);
    cart[id] = { ...product, qty: 1 };
  }
  updateCart();
}
  
function removeFromCart(id) 
{
  if (cart[id]) 
  {
    cart[id].qty--;
    if (cart[id].qty <= 0) delete cart[id];
  }
  updateCart();
}
  
function updateCart() 
{
  cartItems.innerHTML = Object.values(cart).map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}">
      <div class="info">
        <div>${item.name}</div>
        <div>$${item.price}</div>
      </div>
      <div class="qty">
        <button onclick="removeFromCart(${item.id})">-</button>
        ${item.qty}
        <button onclick="addToCart(${item.id})">+</button>
      </div>
    </div>
  `).join('');
  cartCount.innerText = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
}
  
document.getElementById("cartIcon").onclick = () => 
{
  cartEl.classList.add("open");
  container.classList.add("shift");
};
  
function closeCart() 
{
  cartEl.classList.remove("open");
  container.classList.remove("shift");
}
  
renderProducts();
  