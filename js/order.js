let order = JSON.parse(localStorage.getItem('order'));
let bill = JSON.parse(localStorage.getItem('totalPrice'));
console.log(order);
document.getElementById('thanks').textContent = `${order.contact.firstName} toute l'équipe d'Orinococo vous remercie pour votre commande!`;
document.getElementById('cmd').textContent = order.orderId;
document.getElementById('adress').textContent = order.contact.adress;
document.getElementById('city').textContent = order.contact.city;
document.getElementById('name').textContent = order.contact.firstName + ' ' + order.contact.lastName;
document.getElementById('mail').textContent = order.contact.email;
document.getElementById('nb-articles').textContent = order.products.length + ' ';
document.getElementById('totalPrice').textContent = bill + ' €';
for (let product of order.products) {
    let liproduct = document.createElement('li');
    let productList = document.getElementById('product-list');
    productList.appendChild(liproduct);
    liproduct.textContent = product.name + " " + product.price + " €";
}
localStorage.clear();