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
            '<div class ="prodContainer">' +
                '<div class="prodText" id="'+i+'">' +
                    '<h1 class="prodName">'+xmlFile.getElementsByTagName("name")[i].childNodes[0].nodeValue+'</h1>' +
                    '<img class="prodImage" src="'+xmlFile.getElementsByTagName("image")[i].childNodes[0].nodeValue+'">' +
                        '<btn class="prodInfo" onclick="swapXML(this)" id="'+i+'">More Information</btn>' +
                    '</img>' +
                '</div>';
        }
        else {
            content +=
                '<div class="prodText" id="'+i+'">' +
                    '<h1 class="prodName">'+xmlFile.getElementsByTagName("name")[i].childNodes[0].nodeValue+'</h1>' +
                    '<img class="prodImage" src="'+xmlFile.getElementsByTagName("image")[i].childNodes[0].nodeValue+'">' +
                        '<btn class="prodInfo" onclick="swapXML(this)" id="'+i+'">More Information</btn>' +
                    '</img>' +
                '</div>' +
            '</div>'
        }
    }

    content += '<br><br><div class="footer"><h3>Website by Ross Fitch. Copyright &copy; 2019, All rights reserved.</h3></div>';
    
    document.getElementById("productList").innerHTML = content;
}

function swapXML(button) {
    var content = "";
    var buttonNum = button.id; var selectorNum = (+buttonNum + 1);
    var infoCheck = document.getElementsByClassName("prodText");
    var products = xmlFile.getElementsByTagName("product");

    var descPath = '/productshop/product['+selectorNum+']/description';
    var pricePath = '/productshop/product['+selectorNum+']/price';
    var relPath = '/productshop/product['+selectorNum+']/release';
    var docPath = '//div[contains(@id, "'+buttonNum+'")]';

    if(infoCheck[buttonNum].className === "prodText") {
        if (xmlFile.evaluate) {
            var descNode = xmlFile.evaluate(descPath, xmlFile, null, XPathResult.ANY_TYPE, null);
            var priceNode = xmlFile.evaluate(pricePath, xmlFile, null, XPathResult.ANY_TYPE, null);
            var relNode = xmlFile.evaluate(relPath, xmlFile, null, XPathResult.ANY_TYPE, null);
            var docNode = xmlFile.evaluate(docPath, document, null, XPathResult.ANY_TYPE, null);

            var descResult = descNode.iterateNext();
            var priceResult = priceNode.iterateNext();
            var relResult = relNode.iterateNext();
            var docResult = docNode.iterateNext();
        }
        else if (window.ActiveXObject || xmlGet.responseType == "msxml-document") {
            xmlFile.setProperty("SelectionLanguage", "XPath");
            descResult = xmlFile.selectNodes(descPath);
            priceResult = xmlFile.selectNodes(pricePath);
            relResult = xmlFile.selectNodes(relPath)
            docResult = document.selectNodes(docPath);
        }
        else if('ActiveXObject' in window) {
            xmlIE = new ActiveXObject('Microsoft.XMLDOM');
            xmlIE.loadXML('products.xml');
            descResult = xmlIE.selectSingleNode(descPath);
        }

        for (var i = 0; i < products.length; i++) {
            if (i == buttonNum) {
                content +=
                '<h1 class="prodName">'+xmlFile.getElementsByTagName("name")[i].childNodes[0].nodeValue+'</h1>' +
                    '<div class="prodTxtContainer fade-in-transition">' +
                        '<p><br>'+descResult.childNodes[0].nodeValue+'</p>' +
                        '<p class="prodPrice">Price: £'+priceResult.childNodes[0].nodeValue+'</p>' +
                        '<p class="prodDate">Year: '+relResult.childNodes[0].nodeValue+'</p>' +
                    '</div>' +
                '<btn class="prodInfo" onclick="swapXML(this)" id="'+i+'">Back</btn>';
            }
        }
        infoCheck[buttonNum].className += " open"
    }

    else {
        if (xmlFile.evaluate) {
            var docNode = xmlFile.evaluate(docPath, document, null, XPathResult.ANY_TYPE, null);
            var docResult = docNode.iterateNext();
        }
        else if (window.ActiveXObject || xmlGet.responseType == "msxml-document") {
            xmlFile.setProperty("SelectionLanguage", "XPath");
            docResult = document.selectNodes(docPath);
        }
        for (var i = 0; i < products.length; i++) {
            if (i == buttonNum) {
                content +=
                '<h1 class="prodName">'+xmlFile.getElementsByTagName("name")[i].childNodes[0].nodeValue+'</h1>' +
                '<img class="prodImage fade-in-transition" src="'+xmlFile.getElementsByTagName("image")[i].childNodes[0].nodeValue+'">' +
                    '<btn class="prodInfo" onclick="swapXML(this)" id="'+i+'">More Information</btn>' +
                '</img>';
            }
        }
        infoCheck[buttonNum].className = "prodText";
    } 
    docResult.innerHTML = content;
}
