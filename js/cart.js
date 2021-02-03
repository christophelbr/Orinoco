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
        this.saveCart();
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
        if (document.URL.indexOf("panier.html") >= 0) {
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
            this.saveCart();
            this.countCart();
            tdQuantity.textContent = item.quantity;
            tdPrice.textContent = item.price * item.quantity;
        })
    }

    //Validation formulaire
    formValid() {
        let firstName = document.getElementById('firstname');
        let lastName = document.getElementById('lastname');
        let adress = document.getElementById('adress');
        let city = document.getElementById('city');
        let mail = document.getElementById('mail');

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
    }

    // Envoi formulaire
    submitCart() {
        if (document.URL.indexOf("panier.html") >= 0) {

            document.querySelector('form button').addEventListener('click', (event) => {
                event.preventDefault();
                console.log('envoi form');
                this.formValid();
                /*             const products = this.cart.map(ourson => ourson.productId);
                 */
                const products = [];
                for (let ourson of this.cart) {
                    for (let i = 0; i < ourson.quantity; i++) {
                        products.push(ourson.productId)
                    }
                }

                console.log(products);

                const form = {
                    "contact": {
                        "firstName": document.getElementById('firstname').value,
                        "lastName": document.getElementById('lastname').value,
                        "adress": document.getElementById('adress').value,
                        "city": document.getElementById('city').value,
                        "email": document.getElementById('mail').value,
                    },
                    products
                };

                console.log(form);
                (async () => {
                    const envoiForm = fetch("http://localhost:3000/api/teddies/order", {
                        method: "POST",
                        headers: {
                            'Accept': 'application/JSON',
                            'Content-Type': 'application/JSON'
                        },
                        body: JSON.stringify(form),
                    }).then((response) => {
                        return response.json();
                    }).then((data) => {
                        // faire la redirection vers la page order  
                        // stocker les information utilisateur créer un objet client dans local storage
                        console.log(data);
                        this.clearCart();
                        localStorage.setItem('order', JSON.stringify(data));
                        document.location.href="order.html"

                        
                    });
                })();
            })
        }
    }
}