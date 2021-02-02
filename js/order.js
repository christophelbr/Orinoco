let order = JSON.parse(localStorage.getItem('order'));
console.log(order);
document.getElementById('adress').textContent =  order.contact.adress;
document.getElementById('city').textContent =  order.contact.city;
document.getElementById('name').textContent =  order.contact.firstName + ' ' + order.contact.lastName;
document.getElementById('mail').textContent =  order.contact.email;
document.getElementById('nb-articles').textContent =  order.products.length + ' ';
for (let product of order.products) {
    let liproduct = document.createElement('li');
    let productList = document.getElementById('product-list');
    productList.appendChild(liproduct);
    liproduct.textContent = product;
}


