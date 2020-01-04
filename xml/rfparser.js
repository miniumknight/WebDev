async: true;
var xmlGet = new XMLHttpRequest();
var xmlFile;
xmlGet.onload = function () {
    alert(xmlGet.responseXML.documentElement.nodeName);
}
xmlGet.onerror = function () {
    alert("Error while loading XML");
}
xmlGet.open("GET", "products.xml");
xmlGet.responseType = "document";
xmlGet.send();

xmlFile = xmlGet.responseXML;
document.getElementById("product").innerHTML = 
xmlFile.getElementsByTagName("product")[0].childNodes[1].nodeValue;