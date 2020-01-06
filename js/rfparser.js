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
    var content = "";
    var products = xmlFile.getElementsByTagName("product");
    
    for (var i = 0; i < products.length; i++) {
        content +=
        '<div class="mainText"><h1>' +  
        xmlFile.getElementsByTagName("name")[i].childNodes[0].nodeValue + 
        '</h1><p>' +
        xmlFile.getElementsByTagName("description")[i].childNodes[0].nodeValue +
        '</p></div>';
    }
    
    /*var txt="";
    if (xmlFile.evaluate) {
        var firstElectronic = xmlFile.evaluate('/productshop/product[1][@category="electronics"]', xmlFile, null, XPathResult.ANY_TYPE, null);
        var nameNode = xmlFile.evaluate('/productshop/product/name', xmlFile, null, XPathResult.ANY_TYPE, null);
        var imageNode = xmlFile.evaluate('/productshop/product/image', xmlFile, null, XPathResult.ANY_TYPE, null);
        
        var nameResult = nameNode.iterateNext();
        while (nameResult) {
            txt += '<div class="mainText"><h1>' +  nameResult.childNodes[0].nodeValue + '</h1></div>';
            nameResult = nameNode.iterateNext();
        }
    }*/
    
    document.getElementById("productList").innerHTML = content;
}
