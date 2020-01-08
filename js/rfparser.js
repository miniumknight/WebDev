async: true;
var currentPage = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

var xmlFile;
var xmlReq = new XMLHttpRequest();
xmlReq.onload = function () {
    console.log("XML Successfully loaded");
}
xmlReq.onerror = function () {
    console.log("Error while loading XML");
}
xmlReq.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
        if (currentPage == "Products.html") {
            wgxpath.install(); //Simple google compatability Library to allow XPath.evaluate() to work on IE (My code already works on all other browsers).
            xmlFile = xmlReq.responseXML;
            loadXML()
        }
    }
}
xmlReq.open("GET", "products.xml");
xmlReq.send();

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
        var descNode = xmlFile.evaluate(descPath, xmlFile, null, XPathResult.ANY_TYPE, null);
        var priceNode = xmlFile.evaluate(pricePath, xmlFile, null, XPathResult.ANY_TYPE, null);
        var relNode = xmlFile.evaluate(relPath, xmlFile, null, XPathResult.ANY_TYPE, null);
        var docNode = document.evaluate(docPath, document, null, XPathResult.ANY_TYPE, null);

        var descResult = descNode.iterateNext();
        var priceResult = priceNode.iterateNext();
        var relResult = relNode.iterateNext();
        var docResult = docNode.iterateNext();

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
        var docNode = document.evaluate(docPath, document, null, XPathResult.ANY_TYPE, null);
        var docResult = docNode.iterateNext();

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

function checkXML() {
    var products = xmlReq.responseXML.getElementsByTagName("product");
    for (i = 0; i < products.length; i++) {
        if(document.getElementsByName("product")[0].value == xmlReq.responseXML.getElementsByTagName("name")[i].childNodes[0].nodeValue){
            document.getElementsByName("product")[0].setCustomValidity("");
            break;
        }
        else {
            document.getElementsByName("product")[0].setCustomValidity("That product does not exist within our database!");
        }
    }
}