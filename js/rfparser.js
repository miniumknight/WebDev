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
    var nameNode = xmlFile.evaluate('/productshop/product/name', xmlFile, null, XPathResult.ANY_TYPE, null);
    var imageNode = xmlFile.evaluate('/productshop/product/image', xmlFile, null, XPathResult.ANY_TYPE, null);
    var descNode = xmlFile.evaluate('/productshop/product/description', xmlFile, null, XPathResult.ANY_TYPE, null);
    var releaseNode = xmlFile.evaluate('/productshop/product/release', xmlFile, null, XPathResult.ANY_TYPE, null);
    var priceNode = xmlFile.evaluate('/productshop/product/price', xmlFile, null, XPathResult.ANY_TYPE, null);
    var products = [nameNode, imageNode, descNode, releaseNode, priceNode, products];
    /*var textboxHead = document.getElementsByClassName("prodName")
    for (var i = 0; i < textboxHead.length; i++) {
        textboxHead.item(i).innerHTML = xmlFile.getElementsByTagName("name")[i].childNodes[0].nodeValue;
    }*/
    
    for (i = 0; i < products.length; i++) {
        products[i].iterateNext();
    }

    var txt="";
    if (xmlFile.evaluate) {
        while (nameNode) {
            txt += '<div class="mainText"><h1>' +  nameResult.childNodes[0].nodeValue + '</h1><p>' + products[i].childNodes[0].nodeValue + '</p></div>';
            for (i = 0; i < products.length; i++) {
                products[i].iterateNext();
            }
        }
    }
    document.getElementById("productList").innerHTML = txt;
}
