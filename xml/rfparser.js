async: true;
var getxml = new XMLHttpRequest();
getxml.onload = function () {
    alert(getxml.responseXML.documentElement.nodeName);
}
getxml.onerror = function () {
    alert("Error while loading XML");
}
getxml.open("GET", "products.xml");
getxml.responseType = "document";
getxml.send();
