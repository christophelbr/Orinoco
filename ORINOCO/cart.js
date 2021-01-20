//-----PANIER----------//
class ShoppingCart {

    constructor() {
        if (localStorage.getItem("shoppingCart") != null) {
            this.loadCart();
        } else {
            this.cart = []
        }
        this.countCart();
        this.clearCart();
    }

    loadCart() {
        this.cart = JSON.parse(localStorage.getItem('shoppingCart'));
    }

    saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    }

    // comptage panier
    countCart() {
        let count = 0;
        let totalPrice = 0;
        for (const item of this.cart) {
            count += item.quantity;
            totalPrice += item.price * item.quantity;
        }
        document.getElementById('total-count').innerHTML = count;
        if (document.URL.indexOf("panier.html") >= 0) {
            document.getElementById('totalPrice').innerHTML = totalPrice;
        }
    }

    // Bouton vider panier
    clearCart() {
        let btn = document.getElementById('clear');
        btn.addEventListener('click', () => {
            this.cart = [];
            localStorage.clear();
            this.countCart();
        })
    }

    // Ajouter au panier
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
        //alert("Cet article a été ajouté dans votre panier!");
        this.countCart();
    }

    // Afficher page panier
    displayCart() {
        let cartArray = this.cart;
        for (let item of cartArray) {
            this.createTrInCartTable(item);
        }
        this.submitCart();
    }

    // Création tableau sur page panier
    createTrInCartTable(item) {
        const listePanier = document.querySelector('#listePanier tbody');
        const tr = document.createElement('tr');
        const tdPrice = document.createElement('td');
        const less = document.createElement('button');
        less.textContent = '-';
        const more = document.createElement('button');
        more.textContent = '+'
        listePanier.appendChild(tr);
        const tdName = this.createTdInCartTable(item.name);
        tr.appendChild(tdName);
        tr.appendChild(tdPrice);
        tdPrice.textContent = item.price * item.quantity;
        // Creation quantité
        const tdQuantity = this.createTdInCartTable(item.quantity);
        tr.appendChild(tdQuantity);
        tdQuantity.setAttribute('id', 'qantity' + item.name);
        tr.appendChild(less);
        less.setAttribute('id', '-' + item.name);
        tr.appendChild(more);
        more.classList.add('more');
        this.lessPlusButton(more, item, tdQuantity, tdPrice);
        this.lessPlusButton(less, item, tdQuantity, tdPrice);
    }

    // Création td dans panier
    createTdInCartTable(content) {
        const tdElt = document.createElement('td');
        tdElt.textContent = content;
        return tdElt;
    }

    // Boutons + - dans panier
    lessPlusButton(btnElt, item, tdQuantity, tdPrice) {
        btnElt.addEventListener('click', () => {
            if (btnElt.classList.contains('more')) {
                item.quantity++;
            } else {
                item.quantity--;
                if (item.quantity <= 0) {
                    item.quantity = 0;
                    this.cart.splice(item, 1);
                }
            }
            localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
            this.countCart();
            tdQuantity.textContent = item.quantity;
            tdPrice.textContent = item.price * item.quantity;
        })
    }

    // Envoi formulaire
    submitCart() {
        document.querySelector('form button').addEventListener('click', (event) => {
            event.preventDefault();
            console.log('envoi form');
            console.log(FormData);

        })
    }
}