"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ourson =
/*#__PURE__*/
function () {
  function Ourson(ourson, conteneur) {
    var produit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, Ourson);

    this.colors = ourson.colors;
    this._id = ourson._id;
    this.name = ourson.name;
    this.imageUrl = ourson.imageUrl;
    this.description = ourson.description;
    this.price = ourson.price;
    this.url = ourson._id;
    this.conteneur = conteneur;
    this.produit = produit;
    this.afficherOurson();
    this.cart = new ShoppingCart();
  }

  _createClass(Ourson, [{
    key: "afficherOurson",
    value: function afficherOurson() {
      this.div = document.createElement('div');
      this.div2 = document.createElement('div');
      this.nameElt = document.createElement('h2');
      this.nameElt.textContent = this.name;
      this.generateColorsSelect();
      this.generateDescription();
      this.generateThumbnail();
      this.generatePrice();
      this.generateMonPanier();
      this.generateUrl();
      this.addElementHtml();
    }
  }, {
    key: "generateColorsSelect",
    value: function generateColorsSelect() {
      this.selectElt = document.createElement('select');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.colors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var couleur = _step.value;
          var option = document.createElement('option');
          option.text = couleur;
          option.value = couleur;
          this.selectElt.add(option);
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
    }
  }, {
    key: "generateThumbnail",
    value: function generateThumbnail() {
      this.imgElt = document.createElement("img");
      this.imgElt.src = this.imageUrl;
    }
  }, {
    key: "generateDescription",
    value: function generateDescription() {
      this.descriptionElt = document.createElement('p');
      this.descriptionElt.textContent = 'Description : ' + this.description;
    }
  }, {
    key: "generatePrice",
    value: function generatePrice() {
      this.priceElt = document.createElement('p');
      this.priceElt.textContent = 'Prix : ' + this.price;
    }
  }, {
    key: "generateMonPanier",
    value: function generateMonPanier() {
      var _this = this;

      this.panierElt = document.createElement('a');
      this.panierElt.textContent = 'Ajouter au panier';
      this.panierElt.href = '#';
      this.panierElt.classList.add('add-to-cart', 'btn', 'primary');
      this.panierElt.addEventListener('click', function () {
        _this.cart.addToCart(_this);
      });
    }
  }, {
    key: "generateUrl",
    value: function generateUrl() {
      this.urlElt = document.createElement("a");
      this.urlElt.classList.add('ESP');
      this.urlElt.href = 'http://localhost:8888/PROJET5/ORINOCO/produit/?produit=' + this.url;
      this.urlElt.textContent = 'En savoir plus';
    }
  }, {
    key: "addElementHtml",
    value: function addElementHtml() {
      // const listeOursons = document.getElementById('listeOursons');
      var header = document.querySelector('header');
      var section = document.querySelector('section');
      var span = document.querySelector('span');
      section.appendChild(this.div);
      this.div.classList.add('conteneur');
      this.div2.classList.add('infosProduit');
      /*         this.panierElt.id('ajoutPanier');
       */

      this.div.appendChild(this.nameElt);
      this.div.appendChild(this.imgElt);
      this.div.appendChild(this.div2);
      this.div2.appendChild(this.priceElt);

      if (this.produit) {
        header.appendChild(this.nameElt);
        this.div.classList.add('MonOurson');
        this.div2.appendChild(this.descriptionElt);
        this.div2.appendChild(this.selectElt);
        this.div2.appendChild(this.panierElt);
      }

      this.div2.appendChild(this.urlElt);
    }
  }]);

  return Ourson;
}();