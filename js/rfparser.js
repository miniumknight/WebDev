async: true;
var xmlFile;
var xmlGet = new XMLHttpRequest();
xmlGet.onload = function () {
    console.log(xmlGet.responseXML.documentElement.nodeName);
}
xmlGet.onerror = function () {
    console.log("Error while loading XML");
}
xmlGet.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
        xmlFile = xmlGet.responseXML;
        loadXML()
    }
}
xmlGet.open("GET", "products.xml");
xmlGet.send();

function loadXML() {
    var content = "";
    var products = xmlFile.getElementsByTagName("product");
    
    content += '<div class="header"><h1>All Products</h1></div>';

    for(var i = 0; i < products.length; i++) {
        if (i%2 == 0 || i == 0) {
            content +=
            '<div class ="prodContainer"><div class="prodText"><h1 class="prodName">' +  
            xmlFile.getElementsByTagName("name")[i].childNodes[0].nodeValue + 
            '</h1><img class="prodImage" src="' + 
            xmlFile.getElementsByTagName("image")[i].childNodes[0].nodeValue + 
            '"><btn class="prodInfo" onclick="swapXML(this)" id="' + i + '">More Information</btn></img></div>';
        }
        else {
            content +=
            '<div class="prodText"><h1 class="prodName">' +  
            xmlFile.getElementsByTagName("name")[i].childNodes[0].nodeValue + 
            '</h1><img class="prodImage" src="' + 
            xmlFile.getElementsByTagName("image")[i].childNodes[0].nodeValue + 
            '"><btn class="prodInfo" onclick="swapXML(this)" id="' + i + '">More Information</btn></img></div></div>';
        }
    }

    content += '<div class="footer"><h3>Website by Ross Fitch. Copyright &copy; 2019, All rights reserved.</h3></div>';
    
    document.getElementById("productList").innerHTML = content;
}

function swapXML(button) {
    var content = "";
    var buttonNum = button.id;
    var products = xmlFile.getElementsByTagName("product");

    var descPath = '/productshop/product[' + buttonNum + 1 + ']/description';
    var pricePath = '/productshop/product[' + buttonNum + 1 + ']/price';
    var relPath = '/productshop/product[' + buttonNum + 1 + ']/release';
    var docPath = '//*[@class="prodText"][' + buttonNum + 1 + ']';

    var descNode = xmlFile.evaluate(descPath, xmlFile, null, XPathResult.ANY_TYPE, null);
    var priceNode = xmlFile.evaluate(pricePath, xmlFile, null, XPathResult.ANY_TYPE, null);
    var relNode = xmlFile.evaluate(relPath, xmlFile, null, XPathResult.ANY_TYPE, null);
    var docNode = xmlFile.evaluate(docPath, document, null, XPathResult.ANY_TYPE, null);

    var descResult = descNode.iterateNext();
    var priceResult = priceNode.iterateNext();
    var relResult = relNode.iterateNext();
    var docResult = docNode.iterateNext();
    
    for (var i = 0; i < products.length; i++) {
        if (i == buttonNum) {
            content +=
            '<h1 class="prodName">' +  
            xmlFile.getElementsByTagName("name")[i].childNodes[0].nodeValue + 
            '</h1><p>' +
            descResult.childNodes[0].nodeValue +
            '</p><p class = "prodPrice">Price: £' +
            priceResult.childNodes[0].nodeValue +
            '</p><p class = "prodDate">Year: ' +
            relResult.childNodes[0].nodeValue +
            '</p>';
        }
    }
    docResult.childNodes[0].innerHTML = content;
}

    
     /*for (var i = 0; i < products.length; i++) {
        if (i%2 == 0 || i == 0) {
            content +=
            '<div class ="prodContainer"><div class="prodText"><h1 class="prodName">' +  
            xmlFile.getElementsByTagName("name")[i].childNodes[0].nodeValue + 
            '</h1><p>' +
            xmlFile.getElementsByTagName("description")[i].childNodes[0].nodeValue +
            '</p><p class = "prodPrice">Price: £' +
            xmlFile.getElementsByTagName("price")[i].childNodes[0].nodeValue +
            '</p><p class = "prodDate">Year: ' +
            xmlFile.getElementsByTagName("release")[i].childNodes[0].nodeValue +
            '</p></div>';
        }
        else {
            content +=
            '<div class="prodText"><h1 class="prodName">' +  
            xmlFile.getElementsByTagName("name")[i].childNodes[0].nodeValue + 
            '</h1><p>' +
            xmlFile.getElementsByTagName("description")[i].childNodes[0].nodeValue +
            '</p><p class = "prodPrice">Price: £' +
            xmlFile.getElementsByTagName("price")[i].childNodes[0].nodeValue +
            '</p><p class = "prodDate">Year: ' +
            xmlFile.getElementsByTagName("release")[i].childNodes[0].nodeValue +
            '</p></div></div>';
        }
    }*/

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
