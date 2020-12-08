class Header {
    constructor(header) {
        this.logo = 'img/logo.png';
        this.h1 = 'Orinoco';
        this.p = ' vente d\'oursons en peluche '
        this.afficherHeader();
    }

    afficherHeader() {
        this.div = document.createElement('div');
        this.generateLogo();
        this.generateH1();
        this.generateP();
        this.addElementHtml();
    }
    generateLogo() {
        this.imgLogo = document.createElement("img");
        this.imgLogo.src = this.logo;
    }
    generateH1() {
        this.generateH1 = document.createElement('h1');
        this.generateH1.textContent = this.h1;
    }
    generateP() {
        this.generateP = document.createElement('h1');
        this.generateP.textContent = this.p;
    }
    addElementHtml() {
        const header = document.querySelector('header');
        header.appendChild(this.div);
        this.div.appendChild(this.img);
        this.div.appendChild(this.h1);
        header.appendChild(this.p);
    }
}