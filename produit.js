function getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
let id = getUrlVars().produit;
const section = document.querySelector('section');

// let monOurson = document.getElementById('MonOurson');
ajaxGet("http://localhost:3000/api/teddies/" + id, function (reponse) {
    let oursons = JSON.parse(reponse);

    const ourson = new Ourson(oursons, section, true);
    
    });
    // ourson.
    
    // let oursons = JSON.parse(reponse);
    // let div = document.createElement('div');
    // let nameElt = document.createElement("h2");
    //     nameElt.textContent = oursons.name;
    // let selectElt = document.createElement('select');
    // let listeCouleurs = oursons.colors;
    // for(let couleur of listeCouleurs){
    //     let option = document.createElement('option');
    //     option.text = couleur;
    //     option.value = couleur;
    //     selectElt.add(option);
    // }
    // let imgElt = document.createElement("img");
    //     imgElt.src = oursons.imageUrl;
    // let descriptionElt = document.createElement('p');
    //     descriptionElt.textContent = 'Description : ' + oursons.description;
    // let priceElt = document.createElement('p');
    //     priceElt.textContent = 'Prix : ' + oursons.price;

    // MonOurson.appendChild(div);
    // div.appendChild(nameElt);
    // div.appendChild(selectElt);
    // div.appendChild(imgElt);
    // div.appendChild(descriptionElt);
    // div.appendChild(priceElt);
   // console.log(oursons);
        // })

