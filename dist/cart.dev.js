"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//-----PANIER----------//
var ShoppingCart =
/*#__PURE__*/
function () {
  function ShoppingCart() {
    _classCallCheck(this, ShoppingCart);

    if (localStorage.getItem("shoppingCart") != null) {
      this.loadCart();
    } else {
      this.cart = [];
    }
  }

  _createClass(ShoppingCart, [{
    key: "loadCart",
    value: function loadCart() {
      this.cart = JSON.parse(localStorage.getItem('shoppingCart'));
    }
  }, {
    key: "saveCart",
    value: function saveCart() {
      localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    }
  }, {
    key: "addToCart",
    value: function addToCart(ourson) {
      var itemCart = new ItemCart(ourson.name, ourson.price, 1);
      console.log(itemCart); // créer un objet itemCart et le pousser ds le tableau this.cart, vérifier ci l'objet existe, si oui on l'ajoute au niveau de la qtté, méthode qui vérifie ts les noms ?
    }
  }]);

  return ShoppingCart;
}();

var ItemCart = function ItemCart(name, price, quantity) {
  _classCallCheck(this, ItemCart);

  this.name = name;
  this.price = price;
  this.quantity = quantity;
} // une méthode ajouter ou supp des qqté
; //let item = new ItemCart([0,1,2]);

/* this.cart.push(item);
saveCart(); */

/*
let shoppingCart = (function () {
    // =============================
    // Méthodes et proproétés
    // =============================
    cart = [];

    // Constructor
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
        console.log(this.name);


    }
    // Save cart
    function saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(localStorage.getItem('shoppingCart'));
    }

}


    // =============================
    // Méthodes et proproétés
    // =============================
    let obj = {};

// Add to cart
obj.addItemToCart = function (name, price, count) {
    for (let item in cart) {
        if (cart[item].name === name) {
            cart[item].count++;
            saveCart();
            return;
        }
    }
    let item = new Item(name, price, count);
    cart.push(item);
    saveCart();
}
// Set count from item
obj.setCountForItem = function (name, count) {
    for (let i in cart) {
        if (cart[i].name === name) {
            cart[i].count = count;
            break;
        }
    }
};
// Retirer objet du panier
obj.removeItemFromCart = function (name) {
    for (let item in cart) {
        if (cart[item].name === name) {
            cart[item].count--;
            if (cart[item].count === 0) {
                cart.splice(item, 1);
            }
            break;
        }
    }
    saveCart();
}

// Enlever les articles du panier
obj.removeItemFromCartAll = function (name) {
    for (let item in cart) {
        if (cart[item].name === name) {
            cart.splice(item, 1);
            break;
        }
    }
    saveCart();
}

// vider le panier
obj.clearCart = function () {
    cart = [];
    saveCart();
}

// Contage panier
obj.totalCount = function () {
    let totalCount = 0;
    for (let item in cart) {
        totalCount += cart[item].count;
    }
    return totalCount;
}

// Total panier
obj.totalCart = function () {
    let totalCart = 0;
    for (let item in cart) {
        totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
}

// List panier
obj.listCart = function () {
    let cartCopy = [];
    for (i in cart) {
        item = cart[i];
        itemCopy = {};
        for (p in item) {
            itemCopy[p] = item[p];

        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
    }
    return cartCopy;
}

// cart : Array
// Item : Object/Class
// addItemToCart : Function
// removeItemFromCart : Function
// removeItemFromCartAll : Function
// clearCart : Function
// countCart : Function
// totalCart : Function
// listCart : Function
// saveCart : Function
// loadCart : Function
return obj;
}) ();


// *****************************************
// Evenements
// *****************************************
// Add item
$('.add-to-cart').click(function (event) {
    event.preventDefault();
    let name = $(this).data('name');
    let price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
});

// Clear items
$('.clear-cart').click(function () {
    shoppingCart.clearCart();
    displayCart();
});


function displayCart() {
    let cartArray = shoppingCart.listCart();
    let output = "";
    for (let i in cartArray) {
        output += "<tr>"
            + "<td>" + cartArray[i].name + "</td>"
            + "<td>(" + cartArray[i].price + ")</td>"
            + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
            + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
            + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
            + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
            + " = "
            + "<td>" + cartArray[i].total + "</td>"
            + "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function (event) {
    let name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function (event) {
    let name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function (event) {
    let name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function (event) {
    let name = $(this).data('name');
    let count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

displayCart();

 */