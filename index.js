var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    }
};
request.open("GET", "http://localhost:3000/api/teddies");
request.send();
// console.log(getUrlVars());
const header = document.querySelector('header');
const section = document.querySelector('section');

// La dernière partie de cette section concerne la réponse du serveur et son traitement.
request.onload = function() { 
    var hoursons = request.response; // nous stockons la réponse à notre requête (disponible au travers de la propriété response) dans la variable Oursons
// Nous passons ensuite cet objet en paramètre à deux fonctions 
    /* myHeader(hoursons);  */ // remplira le <header> avec les données correspondantes
//    showOursons(Oursons); // créera une carte d'identité pour chaque Ourson et l'ajoutera dans la <section>
   }
  
/* function myHeader() { 
    let divHeader = document.createElement('div');
    let logo = document.createElement('img');
    let myH1 = document.createElement('h1'); 
    let myNav  = document.createElement('nav');
    let panier = document.createElement('a');
    let imgPanier = document.createElement('i');
    let compteur = document.createElement('span');
    logo.src = 'img/logo.png';
    myH1.textContent = 'Orinoco'; 
    panier.textContent = 'Panier';
    header.appendChild(divHeader);
    divHeader.appendChild(logo);
    divHeader.appendChild(myH1); 
    header.appendChild(myNav);
    myNav.appendChild(imgPanier);
    imgPanier.classList.add('fas');
    imgPanier.classList.add('fa-shopping-cart');
    imgPanier.classList.add('fa-2x');
    myNav.appendChild(panier);
    myNav.appendChild(compteur);
    panier.href = 'panier.html';
    let myPara = document.createElement('p');
    myPara.textContent = ' vente d\'oursons en peluche ' ;
    header.appendChild(myPara);
    } */

    // let listeOursons = document.getElementById("listeOursons");
    ajaxGet("http://localhost:3000/api/teddies").then(function (reponse) {
        let oursons = JSON.parse(reponse);
        oursons.forEach(function(oursons) {
            const ourson = new Ourson(oursons, section)
        })
    });