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
  
    // let listeOursons = document.getElementById("listeOursons");
    ajaxGet("http://localhost:3000/api/teddies").then(function (reponse) {
        let oursons = JSON.parse(reponse);
        oursons.forEach(function(oursons) {
            const ourson = new Ourson(oursons, section)
        })
    });