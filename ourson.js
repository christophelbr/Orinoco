
class Ourson {
  constructor(ourson, conteneur, produit = false) {
    this.colors = ourson.colors;
    this._id = ourson._id;
    this.name = ourson.name;
    this.imageUrl = ourson.imageUrl;
    this.description = ourson.description;
    this.price = ourson.price;
    this.url = ourson._id;
    this.conteneur = conteneur;
    this.produit = produit;
    this.afficherOurson();
    this.cart = new ShoppingCart;
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
    this.panierElt.classList.add('add-to-cart', 'btn', 'primary');
    this.panierElt.addEventListener('click', () => {
      this.cart.addToCart(this);
    })
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
    const span = document.querySelector('span');
    section.appendChild(this.div);
    this.div.classList.add('conteneur');
    this.div2.classList.add('infosProduit');
/*         this.panierElt.id('ajoutPanier');
 */        this.div.appendChild(this.nameElt);
    this.div.appendChild(this.imgElt);
    this.div.appendChild(this.div2);
    this.div2.appendChild(this.priceElt);
    if (this.produit) {
      header.appendChild(this.nameElt);
      this.div.classList.add('MonOurson');
      this.div2.appendChild(this.descriptionElt);
      this.div2.appendChild(this.selectElt);
      this.div2.appendChild(this.panierElt);
    }
    this.div2.appendChild(this.urlElt);
  }
  
}

