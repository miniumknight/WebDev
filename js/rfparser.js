async: true;
var currentPage = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

var xmlFile;
var xmlReq = new XMLHttpRequest(); //Using XMLHttp for its built-in parser.
xmlReq.onload = function () { 
    console.log("XML Successfully loaded"); //On load; Tells the user that XML has been successfully loaded in the console.
}
xmlReq.onerror = function () {
    console.log("Error while loading XML"); //On error; Tells the user that there was an error loading the XML in the console. 
}
xmlReq.onreadystatechange = function(){ 
    if (this.readyState == 4 && this.status == 200){ //Check if XML is fully loaded and ready to be used.
        if (currentPage == "Products.html") { //Only load content from XML if on the products page (So that XML can be used by other pages without the script trying to load the content).
            wgxpath.install(); //Simple google compatability Library to allow XPath.evaluate() to work on IE (My code already works on all other browsers).
            xmlFile = xmlReq.responseXML;
            loadXML();
        }
    }
}
xmlReq.open("GET", "products.xml");
xmlReq.send();

function loadXML() {
    var content = ""; //Empty string which will hold the HTML content of the page.
    var products = xmlFile.getElementsByTagName("product");
    
    content += '<div class="header"><h1>All Products</h1></div>'; //Generate header.

    for(var i = 0; i < products.length; i++) { //For each product which exists within the XML file.
        if (i%2 == 0 || i == 0) { //If even (Checks using modulus/Division remainder).
            content +=
            '<div class ="prodContainer">' +
                '<div class="prodText" id="'+i+'">' + //Each div containing the XML data is given an ID number equal to the current product number when it is generated. This helps with changing the content later and with XPath queries.
                    '<h1 class="prodName">'+xmlFile.getElementsByTagName("name")[i].childNodes[0].nodeValue+'</h1>' +
                    '<img class="prodImage" src="'+xmlFile.getElementsByTagName("image")[i].childNodes[0].nodeValue+'">' +
                    '<btn class="prodInfo" onclick="swapXML(this)" id="'+i+'">More Information</btn>' + //Each button is also given an ID number equal to the current product number when generated. This is so the program can find which button the user has clicked and perform the relevant function.
                '</div>';
        } //Generate content using HTML and XML for the left side (Due to half and half layout; Opens the set width container div for 50/50 elements).
        else { //If not even.
            content +=
                '<div class="prodText" id="'+i+'">' +
                    '<h1 class="prodName">'+xmlFile.getElementsByTagName("name")[i].childNodes[0].nodeValue+'</h1>' +
                    '<img class="prodImage" src="'+xmlFile.getElementsByTagName("image")[i].childNodes[0].nodeValue+'">' +
                    '<btn class="prodInfo" onclick="swapXML(this)" id="'+i+'">More Information</btn>' +
                '</div>' +
            '</div>'
        } //Generate content using HTML and XML for the right side (Slightly different HTML; Closes the 50/50 container div).
    }

    content += '<br><br><div class="footer"><h3>Website by Ross Fitch. Copyright &copy; 2019, All rights reserved.</h3></div>';
    
    document.getElementById("productList").innerHTML = content;
}

function swapXML(button) {
    var content = ""; //Empty string which will hold the HTML content of the invidual product container.
    var buttonNum = button.id; var selectorNum = (+buttonNum + 1); //These variables are seperate to each other due to some aspects of the code requiring positive index notation (Cannot start at 0), whereas others use the actual index notation of the button.    
    var infoCheck = document.getElementsByClassName("prodText"); //Variable which holds data for all of the div containers labelled "prodText".
    var products = xmlFile.getElementsByTagName("product"); //Variable which holds data for all of the XML elements tagged as "product".

    var descPath = '/productshop/product['+selectorNum+']/description';
    var pricePath = '/productshop/product['+selectorNum+']/price';
    var relPath = '/productshop/product['+selectorNum+']/release'; //Paths to be used with XPath, these variables use the index notation of the button which the user has clicked to find the correct path to the corresponding XML data.
    var docPath = '//div[contains(@id, "'+buttonNum+'")]'; //This path uses the "contains" perameter, which means it will find every path which has an ID containing buttonNum. The path works because each element is given an ID when generated.

    if(infoCheck[buttonNum].className === "prodText") { //Check if the text container div has its original class name (So that the user can open and close the information). 
        var descNode = xmlFile.evaluate(descPath, xmlFile, null, XPathResult.ANY_TYPE, null);
        var priceNode = xmlFile.evaluate(pricePath, xmlFile, null, XPathResult.ANY_TYPE, null);
        var relNode = xmlFile.evaluate(relPath, xmlFile, null, XPathResult.ANY_TYPE, null);
        var docNode = document.evaluate(docPath, document, null, XPathResult.ANY_TYPE, null); //Define all XPath queries using the previosuly declared paths. The null values are the resolver (HTML requires no namespace prefixes) and the result (Needs to produce a new result not use an existing one) properties.

        var descResult = descNode.iterateNext();
        var priceResult = priceNode.iterateNext();
        var relResult = relNode.iterateNext();
        var docResult = docNode.iterateNext(); //Define new variables which are equal to the next iteration of the XPath queries (The result). This is done because the program must IterateNext() in order to fint the actual result of the search query, otherwise it will return null.

        for (var i = 0; i < products.length; i++) { //Iterate through all XML products.
            if (i == buttonNum) { //Check if the index notation of the product is equal to the ID of the button clicked.
                content +=
                '<h1 class="prodName">'+xmlFile.getElementsByTagName("name")[i].childNodes[0].nodeValue+'</h1>' +
                    '<div class="prodTxtContainer fade-in-transition">' +
                        '<p><br>'+descResult.childNodes[0].nodeValue+'</p>' +
                        '<p class="prodPrice">Price: £'+priceResult.childNodes[0].nodeValue+'</p>' +
                        '<p class="prodDate">Year: '+relResult.childNodes[0].nodeValue+'</p>' +
                    '</div>' +
                '<btn class="prodInfo" onclick="swapXML(this)" id="'+i+'">Back</btn>'; //Update the HTML in the content variable using XML containing product information (Rather than HTML & XML to display an image).
            }
        }
        infoCheck[buttonNum].className += " open" //Update the class name of the container with the same ID as the button clicked so that it contains "open".
    }

    else { //If the text container div does not have its original class name (Contains "open").
        var docNode = document.evaluate(docPath, document, null, XPathResult.ANY_TYPE, null);
        var docResult = docNode.iterateNext();

        for (var i = 0; i < products.length; i++) {
            if (i == buttonNum) {
                content +=
                '<h1 class="prodName">'+xmlFile.getElementsByTagName("name")[i].childNodes[0].nodeValue+'</h1>' +
                '<img class="prodImage fade-in-transition" src="'+xmlFile.getElementsByTagName("image")[i].childNodes[0].nodeValue+'">' +
                    '<btn class="prodInfo" onclick="swapXML(this)" id="'+i+'">More Information</btn>' +
                '</img>'; //Reset the content of the container so that it is the same as when it was originally generated.
            }
        }
        infoCheck[buttonNum].className = "prodText"; //Reset the class of the container to what it was originally (Again, so that the user can open or close the information).
    } 
    docResult.innerHTML = content; //Once all the above code has finished running, set the HTML content of the text container div so that is equal to the previously generated content.
}

function checkXML() { //Function which compares the value a user has input to the XML data and updates the validity of the corresponding input tag accordingly.
    var products = xmlReq.responseXML.getElementsByTagName("product");
    for (i = 0; i < products.length; i++) { //Iterate through the products in the XML once again.
        if(document.getElementsByName("product")[0].value == xmlReq.responseXML.getElementsByTagName("name")[i].childNodes[0].nodeValue){ //If the value input by the user exists in the XML.
            document.getElementsByName("product")[0].setCustomValidity(""); //The input is valid (The product exists in the XML file).
            break; //End the loop.
        }
        else { //The input is invalid (The product does not exist in the XML file).
            document.getElementsByName("product")[0].setCustomValidity("That product does not exist within our database! (Case and spacing sensitive)"); //Tell the user that their input is invalid and why.
        } 
    }
}