// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.addEventListener("load", function () {
            if (req.status >= 200 && req.status < 400) {
                // Appelle la fonction callback en lui passant la réponse de la requête
                resolve(req.responseText);
            } else {
                reject(req.status + " " + req.statusText + " " + url);
            }
        });
        req.addEventListener("error", function () {
            reject("Erreur réseau avec l'URL " + url);
        });
        req.send(null);
    });
}