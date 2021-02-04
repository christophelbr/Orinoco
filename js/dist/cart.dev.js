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

    this.countCart();
    this.clearCart();
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
    } // comptage panier

  }, {
    key: "countCart",
    value: function countCart() {
      var count = 0;
      var totalPrice = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.cart[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;
          count += item.quantity;
          totalPrice += item.price * item.quantity;
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

      document.getElementById('total-count').innerHTML = count;

      if (document.URL.indexOf("panier.html") >= 0) {
        document.getElementById('totalPrice').innerHTML = totalPrice + " €";
      }

      localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    } // Bouton vider panier

  }, {
    key: "clearCart",
    value: function clearCart() {
      var _this = this;

      var btn = document.getElementById('clear');
      btn.addEventListener('click', function () {
        _this.cart = [];
        localStorage.clear();

        _this.countCart();
      });
    } // Ajouter au panier

  }, {
    key: "addToCart",
    value: function addToCart(ourson) {
      var itemCart = new ItemCart(ourson.name, ourson.price, ourson._id, 1);
      var itemFound = this.cart.find(function (e) {
        return e.productId === ourson._id;
      });

      if (itemFound) {
        itemFound.quantity++;
        console.log('il y est déjà');
      } else {
        this.cart.push(itemCart);
        console.log('il n \'y est pas');
      }

      ;
      this.saveCart();
      console.log("Le produit a été ajouté au panier"); //alert("Cet article a été ajouté dans votre panier!");

      this.countCart();
    } // Afficher page panier

  }, {
    key: "displayCart",
    value: function displayCart() {
      var cartArray = this.cart;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = cartArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;
          this.createTrInCartTable(item);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this.submitCart();
    } // Création tableau sur page panier

  }, {
    key: "createTrInCartTable",
    value: function createTrInCartTable(item) {
      if (document.URL.indexOf("panier.html") >= 0) {
        var listePanier = document.querySelector('#listePanier tbody');
        var tr = document.createElement('tr');
        var tdPrice = document.createElement('td');
        var less = document.createElement('button');
        less.textContent = '-';
        var more = document.createElement('button');
        more.textContent = '+';
        listePanier.appendChild(tr);
        var tdName = this.createTdInCartTable(item.name);
        tr.appendChild(tdName);
        tr.appendChild(tdPrice);
        tdPrice.textContent = item.price * item.quantity + " €"; // Creation quantité

        var tdQuantity = this.createTdInCartTable(item.quantity);
        tr.appendChild(tdQuantity);
        tdQuantity.setAttribute('id', 'qantity' + item.name);
        tr.appendChild(less);
        less.setAttribute('id', '-' + item.name);
        tr.appendChild(more);
        more.classList.add('more');
        this.lessPlusButton(more, item, tdQuantity, tdPrice);
        this.lessPlusButton(less, item, tdQuantity, tdPrice);
      }
    } // Création td dans panier

  }, {
    key: "createTdInCartTable",
    value: function createTdInCartTable(content) {
      var tdElt = document.createElement('td');
      tdElt.textContent = content;
      return tdElt;
    } // Boutons + - dans panier

  }, {
    key: "lessPlusButton",
    value: function lessPlusButton(btnElt, item, tdQuantity, tdPrice) {
      var _this2 = this;

      btnElt.addEventListener('click', function () {
        if (btnElt.classList.contains('more')) {
          item.quantity++;
        } else {
          item.quantity--;

          if (item.quantity <= 0) {
            item.quantity = 0;

            _this2.cart.splice(item, 1);
          }
        }

        _this2.saveCart();

        _this2.countCart();

        tdQuantity.textContent = item.quantity;
        tdPrice.textContent = item.price * item.quantity;
      });
    } //Validation formulaire

  }, {
    key: "formValid",
    value: function formValid() {
      var firstName = document.getElementById('firstname');
      var lastName = document.getElementById('lastname');
      var adress = document.getElementById('adress');
      var city = document.getElementById('city');
      var mail = document.getElementById('mail');

      if (firstName.value == "") {
        alert("Mettez votre nom.");
        firstName.focus();
        return false;
      }

      if (lastName.value == "") {
        alert("Mettez votre prénom.");
        lastName.focus();
        return false;
      }

      if (adress.value == "") {
        alert("Mettez une adresse email valide.");
        adress.focus();
        return false;
      }

      if (city.value == "") {
        alert("saisissez votre ville.");
        city.focus();
        return false;
      }

      if (mail.value.indexOf("@", 0) < 0) {
        alert("Mettez une adresse email valide.");
        email.focus();
        return false;
      }

      if (mail.value.indexOf(".", 0) < 0) {
        alert("Mettez une adresse email valide.");
        mail.focus();
        return false;
      }

      return true;
    } // Envoi formulaire

  }, {
    key: "submitCart",
    value: function submitCart() {
      var _this3 = this;

      if (document.URL.indexOf("panier.html") >= 0) {
        document.querySelector('form button').addEventListener('click', function (event) {
          event.preventDefault();
          console.log('envoi form');

          _this3.formValid();
          /*             const products = this.cart.map(ourson => ourson.productId);
           */


          var products = [];
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = _this3.cart[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var ourson = _step3.value;

              for (var i = 0; i < ourson.quantity; i++) {
                products.push(ourson.productId);
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          console.log(products);
          var form = {
            "contact": {
              "firstName": document.getElementById('firstname').value,
              "lastName": document.getElementById('lastname').value,
              "adress": document.getElementById('adress').value,
              "city": document.getElementById('city').value,
              "email": document.getElementById('mail').value
            },
            products: products
          };
          console.log(form);

          (function _callee() {
            var envoiForm;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    envoiForm = fetch("http://localhost:3000/api/teddies/order", {
                      method: "POST",
                      headers: {
                        'Accept': 'application/JSON',
                        'Content-Type': 'application/JSON'
                      },
                      body: JSON.stringify(form)
                    }).then(function (response) {
                      return response.json();
                    }).then(function (data) {
                      console.log(data);

                      _this3.clearCart();

                      localStorage.setItem('order', JSON.stringify(data));
                      console.log(_this3.cart);
                      document.location.href = "order.html";
                    });

                  case 1:
                  case "end":
                    return _context.stop();
                }
              }
            });
          })();
        });
      }
    }
  }]);

  return ShoppingCart;
}();