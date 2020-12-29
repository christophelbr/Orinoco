//-----PANIER----------//
class ShoppingCart {

    constructor() {
        if (localStorage.getItem("shoppingCart") != null) {
            this.loadCart();
        } else { this.cart = [] }
        this.countCart();
        this.clearCart();

    }

    loadCart() {
        this.cart = JSON.parse(localStorage.getItem('shoppingCart'));
    }

    saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    }
    countCart() {
        let count = 0;
        for (const item of this.cart) {
            count += item.quantity;
        }
        document.getElementById('total-count').innerHTML = count;
    }

    clearCart() {
        let btn = document.getElementById('clear');
        btn.addEventListener('click', () => {
            this.cart = [];
            localStorage.clear();
            this.countCart();
            console.log(this.cart);

        })
    }
    addToCart(ourson) {
        let itemCart = new ItemCart(ourson.name, ourson.price, ourson._id, 1);
        const itemFound = this.cart.find(e => e.productId === ourson._id);
        if (itemFound) {
            itemFound.quantity++;
            console.log('il y est déjà');
        } else {
            this.cart.push(itemCart);
            console.log('il n \'y est pas');
        };
        localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
        console.log("Le produit a été ajouté au panier");
        //alert("Cet article a été ajouté dans votre panier");
        console.log(this.cart);
        this.countCart();
    }
    displayCart() {
        let cartArray = this.cart;
        let listePanier = document.getElementById('listePanier');
        for (let item of cartArray) {
            this.tr = document.createElement('tr');
            this.tdName = document.createElement('td');
            this.tdId = document.createElement('td');
            this.tdPrice = document.createElement('td');
            this.tdQuantity = document.createElement('td');
            listePanier.appendChild(this.tr);
            this.tr.appendChild(this.tdName);
            this.tdName.textContent = item.name;
            this.tr.appendChild(this.tdId);
            this.tdId.textContent = item.productId;
            this.tr.appendChild(this.tdPrice);
            this.tdPrice.textContent = item.price;
            this.tr.appendChild(this.tdQuantity);
            this.tdQuantity.textContent = item.quantity;
            console.log(item.name, item.productId, item.price, item.quantity);
        }
    }

}

//let item = new ItemCart([0,1,2]);
/* this.cart.push(item);
saveCart(); */

/*


}


    // =============================
    // Méthodes et proproétés
    // =============================
    let obj = {};

// Add to cart

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
            + "<td>" + item.name + "</td>"
            + "<td>(" + item.price + ")</td>"
            + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + item.name + ">-</button>"
            + "<input type='number' class='item-count form-control' data-name='" + item.name + "' value='" + item.count + "'>"
            + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + item.name + ">+</button></div></td>"
            + "<td><button class='delete-item btn btn-danger' data-name=" + item.name + ">X</button></td>"
            + " = "
            + "<td>" + item.total + "</td>"
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
