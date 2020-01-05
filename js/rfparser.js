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
    var productContainer = [nameNode, imageNode,descNode, releaseNode, priceNode];
    var content=""; 

    for (var i = 0; i < productContainer[0].length; i++) {
        content += "<h1>memes</h1>";
    }
            
    document.getElementById("productList").innerHTML = content;
}
