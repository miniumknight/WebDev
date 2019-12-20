const numberSlides = document.getElementsByClassName("slides");
const thumbs = document.getElementsByClassName("thumb");
var currSlide = 1;
timedSlide();

function addtoSlide(n) {
    displaySlide(currSlide += n);
}

function switchSlide(n) {
    displaySlide(currSlide = n);
}

function displaySlide(n) {
    let i;
    if (n > numberSlides.length) 
        currSlide = 1

    if (n < 1) 
        currSlide = numberSlides.length

    for (i = 0; i < numberSlides.length; i++) 
        numberSlides[i].style.display = "none";
    
    for (i = 0; i < thumbs.length; i++) 
        thumbs[i].className = thumbs[i].className.replace(" active", "");
    
    numberSlides[currSlide-1].style.display = "block";
    thumbs[currSlide-1].className += " active";
}

function timedSlide() {
    let i; 
    for (i = 0; i < numberSlides.length; i++) 
        numberSlides[i].style.display = "none";
    
    currSlide++;
    if (currSlide > numberSlides.length)
        currSlide = 1

    numberSlides[currSlide-1].style.display = "block";
    setTimeout(timedSlide, 7000);
}

function toggleMobile() {
    let x = document.getElementById("responsive");
    if(x.className === "navbar") 
        x.className += " resNav";
    else 
        x.className = "navbar";
}