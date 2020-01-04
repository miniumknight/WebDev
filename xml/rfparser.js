async: true;
var xmlhttp, xmlDoc;

xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "products.xml", false);
xmlhttp.send();
xmlDoc = xmlhttp.responseXML;
document.getElementById("product").innerHTML=
xmlDoc.getElementsByTagName("product")[0];
