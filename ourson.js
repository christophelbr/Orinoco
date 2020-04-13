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
        console.log(this.produit);

        this.afficherOurson();
    }

    afficherOurson() {
        this.div = document.createElement('div');
        this.nameElt = document.createElement("h2");
        this.nameElt.textContent = this.name;

        this.generateColorsSelect();
        this.generateDescription();
        this.generateThumbnail();
        this.generatePrice();
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

    generateUrl() {
        this.urlElt = document.createElement("a");
        this.urlElt.href = 'http://localhost:8888/PROJET5/ORINOCO/produit/?produit=' + this.url;
        this.urlElt.textContent = 'En savoir plus';
    }

    addElementHtml() {
        // const listeOursons = document.getElementById('listeOursons');
        section.appendChild(this.div);
        this.div.appendChild(this.nameElt);
        this.div.appendChild(this.imgElt);
        this.div.appendChild(this.priceElt);
        this.div.appendChild(this.urlElt);
        if (this.produit){
        this.div.appendChild(this.descriptionElt);
        this.div.appendChild(this.selectElt);
        }

    }




}