const section = document.querySelector('section');
fetch("https://orinoco-oc.herokuapp.com/api/teddies")
    .then(response => response.json())
    .then(response => {
        response.forEach(function (oursons) {
            const ourson = new Ourson(oursons, section)
        })
    })
    .catch(error => alert("Erreur : " + error));


