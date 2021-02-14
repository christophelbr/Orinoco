"use strict";

var order = JSON.parse(localStorage.getItem('order'));
var bill = JSON.parse(localStorage.getItem('totalPrice'));
console.log(order);
document.getElementById('thanks').textContent = "".concat(order.contact.lastName, " toute l'\xE9quipe d'Orinococo vous remercie pour votre commande!");
document.getElementById('cmd').textContent = order.orderId;
document.getElementById('adress').textContent = order.contact.adress;
document.getElementById('city').textContent = order.contact.city;
document.getElementById('name').textContent = order.contact.firstName + ' ' + order.contact.lastName;
document.getElementById('mail').textContent = order.contact.email;
document.getElementById('nb-articles').textContent = order.products.length + ' ';
document.getElementById('totalPrice').textContent = bill + ' €';
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = order.products[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var product = _step.value;
    // let liproduct = document.createElement('ul');
    var productNamePrice = document.createElement('tr');
    var productName = document.createElement('td');
    var productPrice = document.createElement('td');
    var listePanier = document.getElementById('listePanier');
    listePanier.appendChild(productNamePrice);
    productNamePrice.appendChild(productName);
    productNamePrice.appendChild(productPrice);
    productName.textContent = product.name;
    productPrice.textContent = product.price + " €"; // liproduct.textContent = product.name + " " + product.price + " €";
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

localStorage.clear();