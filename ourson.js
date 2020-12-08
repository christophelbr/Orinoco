
class Ourson {
    constructor(ourson, conteneur, produit=false) {
        this.colors = ourson.colors;
        this._id = ourson._id;
        this.name = ourson.name;
        this.imageUrl = ourson.imageUrl;
        this.description = ourson.description;
        this.price = ourson.price;
        this.url = ourson._id;
        this.conteneur = conteneur;
        this.produit = produit;
/*      console.log(this.produit);
 */     this.afficherOurson();
    }


    afficherOurson() {
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

    generateColorsSelect() {
        this.selectElt = document.createElement('select');
        for (let couleur of this.colors) {
            let option = document.createElement('option');
            option.text = couleur;
            option.value = couleur;
            this.selectElt.add(option);
        }
    }

    generateThumbnail() {
        this.imgElt = document.createElement("img");
        this.imgElt.src = this.imageUrl;
    }

    generateDescription() {
        this.descriptionElt = document.createElement('p');
        this.descriptionElt.textContent = 'Description : ' + this.description;
    }

    generatePrice() {
        this.priceElt = document.createElement('p');
        this.priceElt.textContent = 'Prix : ' + this.price;
    }

    generateMonPanier() {
        this.panierElt = document.createElement('a');
        this.panierElt.textContent = 'Ajouter au panier';
        this.panierElt.href = '#';  
        this.panierElt.setAttribute('data-name', this.name);
        this.panierElt.setAttribute('data-price', this.price);
        this.panierElt.classList.add('add-to-cart', 'btn', 'primary');
          }

    generateUrl() {
        this.urlElt = document.createElement("a");
        this.urlElt.classList.add('ESP');
        this.urlElt.href = 'http://localhost:8888/PROJET5/ORINOCO/produit/?produit=' + this.url;
        this.urlElt.textContent = 'En savoir plus';
    }

    addElementHtml() {
        // const listeOursons = document.getElementById('listeOursons');
        
        const header = document.querySelector('header');
        const section = document.querySelector('section');
        section.appendChild(this.div);
        this.div.classList.add('conteneur');
        this.div2.classList.add('infosProduit');
/*         this.panierElt.id('ajoutPanier');
 */        this.div.appendChild(this.nameElt);
        this.div.appendChild(this.imgElt);
        this.div.appendChild(this.div2);
        this.div2.appendChild(this.priceElt);
        if (this.produit){
            header.appendChild(this.nameElt);
            this.div.classList.add('MonOurson');
            this.div2.appendChild(this.descriptionElt);
            this.div2.appendChild(this.selectElt);
            this.div2.appendChild(this.panierElt);            }
        this.div2.appendChild(this.urlElt);

    }
}

//-----PANIER----------//

// ************************************************
// Shopping Cart API
// ************************************************

let shoppingCart = (function() {
    // =============================
    // Private methods and propeties
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
    if (localStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    
  
    // =============================
    // Public methods and propeties
    // =============================
    let obj = {};
    
    // Add to cart
    obj.addItemToCart = function(name, price, count) {
      for(let item in cart) {
        if(cart[item].name === name) {
          cart[item].count ++;
          saveCart();
          return;
        }
      }
      let item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }
    // Set count from item
    obj.setCountForItem = function(name, count) {
      for(let i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for(let item in cart) {
          if(cart[item].name === name) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
      for(let item in cart) {
        if(cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      let totalCount = 0;
      for(let item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      let totalCart = 0;
      for(let item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // List cart
    obj.listCart = function() {
      let cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
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
  })();
  
  
  // *****************************************
  // Triggers / Events
  // ***************************************** 
  // Add item
  $('.add-to-cart').click(function(event) {
    event.preventDefault();
    let name = $(this).data('name');
    let price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });
  
  // Clear items
  $('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
  });
  
  
  function displayCart() {
    let cartArray = shoppingCart.listCart();
    let output = "";
    for(let i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>" 
        + "<td>(" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
        + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + " = " 
        + "<td>" + cartArray[i].total + "</td>" 
        +  "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }
  
  // Delete item button
  
  $('.show-cart').on("click", ".delete-item", function(event) {
    let name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })
  
  
  // -1
  $('.show-cart').on("click", ".minus-item", function(event) {
    let name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  // +1
  $('.show-cart').on("click", ".plus-item", function(event) {
    let name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
  })
  
  // Item count input
  $('.show-cart').on("change", ".item-count", function(event) {
     let name = $(this).data('name');
     let count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  
  displayCart();


