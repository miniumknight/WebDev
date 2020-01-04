async: true;
var getxml = new XMLHttpRequest();
getxml.onload = function () {
    dump(getxml.responseXML.documentElement.nodeName);
}
getxml.onerror = function () {
    dump("Error while loading XML");
}
getxml.open("GET", "products.xml");
getxml.responseType = "document";
getxml.send();
