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
    /*var textboxHead = document.getElementsByClassName("prodName")
    for (var i = 0; i < textboxHead.length; i++) {
        textboxHead.item(i).innerHTML = xmlFile.getElementsByTagName("name")[i].childNodes[0].nodeValue;
    }*/
    var txt="";
    if (xmlFile.evaluate) {
        var nameNode = xmlFile.evaluate('/productshop/product/name', xmlFile, null, XPathResult.ANY_TYPE, null);
        var imageNode = xmlFile.evaluate('/productshop/product/image', xmlFile, null, XPathResult.ANY_TYPE, null);
        var nameResult = nameNode.iterateNext();
        imageNode.iterateNext();
        while (nameResult) {
            txt += '<div class="mainText" style="background-image: url("' + imageNode.childNodes[0].nodeValue + '");"><h1>' +  nameResult.childNodes[0].nodeValue + '</h1></div>';
            nameResult = nameNode.iterateNext();
            imageNode.iterateNext();
        }
    }
    document.getElementById("productList").innerHTML = txt;
}
