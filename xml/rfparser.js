async: true;
var xmlGet = new XMLHttpRequest();
xmlGet.onload = function () {
    console.log(xmlGet.responseXML.documentElement.nodeName);
}
xmlGet.onerror = function () {
    console.log("Error while loading XML");
}
xmlGet.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
        loadXML(this)
    }
}
xmlGet.open("GET", "products.xml");
xmlGet.send();

function loadXML(xml) {
    xmlFile = xml.responseXML;
    var textboxHead = document.getElementsByClassName("prodName")
    for (var i = 0; i < textboxHead.length; i++) {
        textboxHead.item(i).innerHTML = xmlFile.getElementsByTagName("name")[i].childNodes[i].nodeValue;
    }
}
