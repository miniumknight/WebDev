var xmlhttp, xmlDoc;

xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "../products.xml", false);
xmlhttp.send();
xmlDoc = xmlhttp.responseXML;
document.getElementsById("maintext").innerHTML=
xmlDoc.getElementsByTagName("product")[0].childNodes[0].nodeValue;
