"use strict";

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}

var id = getUrlVars().produit;
var section = document.querySelector('section'); // let monOurson = document.getElementById('MonOurson');

ajaxGet("http://localhost:3000/api/teddies/" + id).then(function (reponse) {
  var oursons = JSON.parse(reponse);
  var ourson = new Ourson(oursons, section, true);
}, function (error) {
  console.log(error);
});