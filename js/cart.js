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
            document.getElementById('totalPrice').innerHTML = totalPrice/100 + " €";
        }
        localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
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
        } else {
            this.cart.push(itemCart);
        };
        this.saveCart();
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
            tdPrice.textContent = item.price/100 * item.quantity + " €";
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
                }
            }
            this.saveCart();
            this.countCart();
            tdQuantity.textContent = item.quantity;
            tdPrice.textContent = item.price/100 * item.quantity + ' €';
        })
    }

    //Validation formulaire + commande
    formValid() {
        let isValid = true;
        let firstName = document.getElementById('firstname');
        let errorFirstName = document.getElementById('error-firstname');
        let lastName = document.getElementById('lastname');
        let errorLastName = document.getElementById('error-lastname');
        let address = document.getElementById('address');
        let errorAddress = document.getElementById('error-address');
        let city = document.getElementById('city');
        let errorCity = document.getElementById('error-city');
        let mail = document.getElementById('mail');
        let errorMail = document.getElementById('error-mail');
        const cartPrice = localStorage.getItem('totalPrice');

        if (cartPrice == 0) {
            alert("Votre panier est vide !");
            isValid = false;
        }
        if (firstName.value == "") {
            firstName.classList.add('invalid');
            errorFirstName.textContent = 'Veuillez renseigner votre nom'
            isValid = false;
        } else { 
            firstName.classList.remove('invalid');
            errorFirstName.textContent = '';
        }

        if (lastName.value == "") {
            lastName.classList.add('invalid');
            errorLastName.textContent = 'Veuillez renseigner votre prénom'
            isValid = false;
        }
        else { 
            lastName.classList.remove('invalid');
            errorLastName.textContent = '';
        }

        if (address.value == "") {
            address.classList.add('invalid');
            errorAddress.textContent = 'Veuillez renseigner votre adresse'
            isValid = false;
        }
        else { 
            address.classList.remove('invalid');
            errorAddress.textContent = '';
        }
        
        if (city.value == "") {
            city.classList.add('invalid');
            errorCity.textContent = 'Veuillez renseigner votre ville'
            isValid = false;
        }
        else { 
            city.classList.remove('invalid');
            errorCity.textContent = '';
        }

        if (mail.value.indexOf("@", 0) < 0) {
            mail.classList.add('invalid');
            errorMail.textContent = 'Veuillez renseigner une adresse mail correcte'
            isValid = false;
        }
        else { 
            mail.classList.remove('invalid');
            errorMail.textContent = '';
        }

        if (mail.value.indexOf(".", 0) < 0) {
            mail.classList.add('invalid');
            errorMail.textContent = 'Veuillez renseigner une adresse mail correcte'
            isValid = false;
        } 
        else { 
            mail.classList.remove('invalid');
            errorMail.textContent = '';
        }

        return isValid;

    }


    // Envoi formulaire
    submitCart() {
        if (document.URL.indexOf("panier.html") >= 0) {
            document.querySelector('form button').addEventListener('click', (event) => {
                event.preventDefault();
                const isValid = this.formValid(); 
                const products = [];
                for (let ourson of this.cart) {
                    for (let i = 0; i < ourson.quantity; i++) {
                        products.push(ourson.productId)
                    }
                }
                const form = {
                    "contact": {
                        "firstName": document.getElementById('firstname').value,
                        "lastName": document.getElementById('lastname').value,
                        "address": document.getElementById('address').value,
                        "city": document.getElementById('city').value,
                        "email": document.getElementById('mail').value,
                    },
                    products
                };

                if (isValid) {
                (async () => { 
                    const envoiForm = fetch("https://orinoco-oc.herokuapp.com/api/teddies/order", {
                        method: "POST",
                        headers: {
                            'Accept': 'application/JSON',
                            'Content-Type': 'application/JSON'
                        },
                        body: JSON.stringify(form),
                    }).then((response) => {
                        return response.json();
                    }).then((data) => {
                        //this.clearCart();
                        localStorage.setItem('order', JSON.stringify(data));
                        document.location.href = "order.html"
                    });
                })();}
            })
        }
    }


}