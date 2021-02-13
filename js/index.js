const section = document.querySelector('section');
fetch("http://localhost:3000/api/teddies")
    .then(response => response.json())
    .then(response => {
        response.forEach(function (oursons) {
            const ourson = new Ourson(oursons, section)
        })
    })
    .catch(error => alert("Erreur : " + error));


