let order = JSON.parse(localStorage.getItem('order'));
let bill = JSON.parse(localStorage.getItem('totalPrice'));
document.getElementById('thanks').textContent = `${order.contact.lastName} toute l'équipe d'Orinococo vous remercie pour votre commande!`;
document.getElementById('cmd').textContent = order.orderId;
document.getElementById('adress').textContent = order.contact.adress;
document.getElementById('city').textContent = order.contact.city;
document.getElementById('name').textContent = order.contact.firstName + ' ' + order.contact.lastName;
document.getElementById('mail').textContent = order.contact.email;
document.getElementById('nb-articles').textContent = order.products.length + ' ';
document.getElementById('totalPrice').textContent = bill + ' €';
for (let product of order.products) {
    let productNamePrice = document.createElement('tr');
    let productName = document.createElement('td');
    let productPrice = document.createElement('td');
    let listePanier = document.getElementById('listePanier');
    listePanier.appendChild(productNamePrice);
    productNamePrice.appendChild(productName);
    productNamePrice.appendChild(productPrice);
    productName.textContent = product.name;
    productPrice.textContent = product.price + " €";
}
localStorage.clear();