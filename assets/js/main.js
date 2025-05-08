// header

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.reload();
}

document.addEventListener("DOMContentLoaded", function () {
  const userAction = document.getElementById("user-action");
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    userAction.textContent = `Welcome, ${loggedInUser}`;
    userAction.href = "accounts.html";
  }
});

// main
////rebind
function bindProductEvents() {
  const productLinks = document.querySelectorAll(".product-link");
  productLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const productName = link.dataset.productName;
      const selectedProduct = products.find(
        (product) => product.title === productName
      );
      if (selectedProduct) {
        localStorage.setItem(
          "selectedProduct",
          JSON.stringify(selectedProduct)
        );
        window.location.href = "details.html";
      }
    });
  });

  const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productName = button.dataset.productName;
      const productPrice = button.dataset.productPrice;
      addToCart(productName, productPrice);
    });
  });
}
///////////////////

const productContainer = document.querySelector(".products__container");

const products = [
  {
    title: "Colorful Pattern Shirts",
    price: 238,
    category: "shirts",
    colors: [
      {
        mainImage: "assets/img/product-1-1.jpg",
        hoverImage: "assets/img/product-1-2.jpg",
      },
    ],
  },

  {
    title: "Colorful Pattern T-Shirts",
    price: 199,
    category: "shirts",
    colors: [
      {
        mainImage: "assets/img/product-2-1.jpg",
        hoverImage: "assets/img/product-2-2.jpg",
      },
    ],
  },
  {
    title: "Colorful Pattern Shoes",
    price: 199,
    category: "shoes",
    colors: [
      {
        mainImage: "assets/img/product-3-1.jpg",
        hoverImage: "assets/img/product-3-2.jpg",
      },
    ],
  },
  {
    title: "Colorful Pattern Pantaloon",
    price: 199,
    category: "pantaloon",
    colors: [
      {
        mainImage: "assets/img/product-4-1.jpg",
        hoverImage: "assets/img/product-4-2.jpg",
      },
    ],
  },
  {
    title: "Colorful Pattern Hats",
    price: 199,
    category: "hats",
    colors: [
      {
        mainImage: "assets/img/product-5-1.jpg",
        hoverImage: "assets/img/product-5-2.jpg",
      },
    ],
  },
  {
    title: "Colorful Pattern Grey-Shirts",
    price: 199,
    category: "shirts",
    colors: [
      {
        mainImage: "assets/img/product-6-1.jpg",
        hoverImage: "assets/img/product-6-2.jpg",
      },
    ],
  },
  {
    title: "Colorful Pattern Blouse",
    price: 199,
    category: "shirts",
    colors: [
      {
        mainImage: "assets/img/product-7-1.jpg",
        hoverImage: "assets/img/product-7-2.jpg",
      },
    ],
  },
  {
    title: "Colorful Pattern Orange-Shirts",
    price: 199,
    category: "shirts",
    colors: [
      {
        mainImage: "assets/img/product-8-1.jpg",
        hoverImage: "assets/img/product-8-2.jpg",
      },
    ],
  },
];

function displayProducts(productsToDisplay = products) {
  productContainer.innerHTML = "";

  productsToDisplay.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product__item");

    productCard.innerHTML = `
      <div class="product__banner">
        <a href="details.html" class="product__images product-link" data-product-name="${product.title}">
          <img
            src="${product.colors[0].mainImage}"
            alt=""
            class="product__img default"
          />
          <img
            src="${product.colors[0].hoverImage}"
            alt=""
            class="product__img hover"
          />
        </a>
        <div class="product__actions">
          <a href="details.html" class="action__btn" aria-label="Quick view"><i class="fa-regular fa-eye"></i></a>
          <a href="#" class="action__btn" aria-label="Add To Wishlist"><i class="fa-regular fa-heart"></i></a>
          <a href="#" class="action__btn" aria-label="Compare"><i class="fa-solid fa-shuffle"></i></a>
        </div>
        <div class="product__badge light-pink">Hot</div>
      </div>
      <div class="product__content">
        <span class="product__category">Clothing </span>
        <a href="#" class="product-link" data-product-name="${product.title}">
          <h3 class="product__title">${product.title}</h3>
        </a>
        <div class="product__rating">
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
        </div>
        <div class="product__price flex">
          <span class="new__price"> $${product.price} </span>
          <span class="old__price"> $245 </span>
        </div>
        <button
          class="action__btn cart__btn add-to-cart-button"
          aria-label="Add To Cart"
          data-product-name="${product.title}"
          data-product-price="${product.price}"
        >
          <i class="fa-solid fa-bag-shopping"></i>
        </button>
      </div>
    `;
    productContainer.appendChild(productCard);
  });

  bindProductEvents();
}

function addToCart(productName, productPrice) {
  let cart = localStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];

  const existingItem = cart.find((item) => item.name === productName);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: productName,
      price: parseFloat(productPrice),
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartItemCount();
}

function updateCartItemCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemCountSpan = document.querySelector(".header__user-actions .count");
  if (itemCountSpan) {
    const totalQuantity = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    itemCountSpan.textContent = totalQuantity;
  }
}

updateCartItemCount();
/*=============== PRODUCTS TABS ===============*/
const tabButtons = document.querySelectorAll(".tab__btn");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active-tab"));
    btn.classList.add("active-tab");

    const target = btn.dataset.target;

    if (target === "#featured") {
      displayProducts(products);
    } else if (target === "#popular") {
      displayProducts(
        products.filter((product) => product.category === "shoes")
      );
    } else if (target === "#new-added") {
      displayProducts(
        products.filter((product) => product.category === "shirts")
      );
    }
  });
});

displayProducts(products);
// ---------------------FOOTER
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  const btn = document.getElementById("scrollTopBtn");
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
displayProducts(products);
