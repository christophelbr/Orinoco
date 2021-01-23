function getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
let id = getUrlVars().produit;
const section = document.querySelector('section');


 fetch("http://localhost:3000/api/teddies/" + id)
    .then(response => response.json())
    .then(response => {

            const ourson = new Ourson(response, section, true)
        })    
    .catch(error => alert("Erreur : " + error));