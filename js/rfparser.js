var xmlhttp, xmlDoc;

xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "../products.xml", false);
xmlhttp.send();
xmlDoc = xmlhttp.responseXML;
document.getElementsById("product").innerHTML=
xmlDoc.getElementsByTagName("product")[0].childNodes[0].nodeValue;
