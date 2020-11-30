
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
        this.nameElt.textContent = this.name;/* 
        this.monPanier = document.createElement('a');
        this.monPanier.textContent = 'Ajouter au panier';
        this.monPanier.href = 'panier.html'; */
        this.generateHeader();
        this.generateColorsSelect();
        this.generateDescription();
        this.generateThumbnail();
        this.generatePrice();
        this.generateMonPanier();
        this.generateUrl();
        this.addElementHtml();
    }


    generateHeader() {
        const header = document.querySelector('header');
        const section = document.querySelector('section');
        let divHeader = document.createElement('div');
        let logo = document.createElement('img');
        let myH1 = document.createElement('h1'); 
        let myNav  = document.createElement('nav');
        let panier = document.createElement('a');
        let imgPanier = document.createElement('i');
        let compteur = document.createElement('span');
        compteur.setAttribute('id', 'indexPanier');
        logo.src = 'http://localhost:8888/PROJET5/ORINOCO/img/logo.png';
        myH1.textContent = 'Orinoco'; 
        panier.textContent = 'Panier';
        header.appendChild(divHeader);
        divHeader.appendChild(logo);
        divHeader.appendChild(myH1); 
        header.appendChild(myNav);
        myNav.appendChild(imgPanier);
        imgPanier.classList.add('fas', 'fa-shopping-cart', 'fa-2x');
        myNav.appendChild(panier);
        myNav.appendChild(compteur);
        panier.href = 'panier.html';
        let myPara = document.createElement('p');
        myPara.textContent = ' vente d\'oursons en peluche ' ;
        header.appendChild(myPara);
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
        this.panierElt.href = 'panier.html';  
        this.panierElt.setAttribute('id',  'ajoutPanier');
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
/* 
//-----PANIER----------//

//Panier de l'utilisateur
let panier = JSON.parse(localStorage.getItem("panier"));

//Affichage du nombre d'article dans le panier
function nombreIndexPanier() {
  let indexPanier = document.getElementById("indexPanier");
  indexPanier.textContent = panier.length;
}

function nombreProduitPanier() {
  let produitPanier = document.getElementById("produitPanier");
  produitPanier.textContent = panier.length;
}

//Vérification et initialisation du panier

if (localStorage.getItem("panier")) {
  console.log(panier);
} else {
  console.log("Le panier va être initalisé");
  let panierInit = [];
  localStorage.setItem("panier", JSON.stringify(panierInit));
}

//Ajout de l'article au panier de l'utilisateur

ajoutPanier = () => {
  let acheter = document.getElementById("ajout_panier");
  acheter.addEventListener("click", async function () {
    const ajout = await getAllTeddies();
    panier.push(ajout);
    localStorage.setItem("panier", JSON.stringify(panier));
    console.log("Le produit a été ajouté au panier");
    alert("Cet article a été ajouté dans votre panier");
    location.reload();
  });
}; */