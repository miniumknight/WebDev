const numberSlides = document.getElementsByClassName("slides");
const numberText = document.getElementsByClassName("slideText");
const thumbs = document.getElementsByClassName("thumb");
var currSlide = 0;
var allowSubmit = false;
timedSlide();

if(localStorage.getItem('txtValues') == null){
    var accounts = [];
}
else {
    accounts = JSON.parse(localStorage.getItem('txtValues'));
}

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
    
    for (i = 0; i< numberText.length; i++)
        numberText[i].style.display = "none";

    for (i = 0; i < thumbs.length; i++) 
        thumbs[i].className = thumbs[i].className.replace(" active", "");
    
    numberSlides[currSlide-1].style.display = "block";
    numberText[currSlide-1].style.display = "block";
    thumbs[currSlide-1].className += " active";
}

function timedSlide() {
    let i; 
    for (i = 0; i < numberSlides.length; i++) 
        numberSlides[i].style.display = "none";

    for (i = 0; i< numberText.length; i++)
        numberText[i].style.display = "none";

    for (i = 0; i < thumbs.length; i++) 
        thumbs[i].className = thumbs[i].className.replace(" active", "");

    currSlide++;
    
    if (currSlide > numberSlides.length)
        currSlide = 1

    numberSlides[currSlide-1].style.display = "block";
    numberText[currSlide-1].style.display = "block";
    thumbs[currSlide-1].className += " active";
    setTimeout(timedSlide, 10000);
}

function toggleMobile() {
    let x = document.getElementById("responsive");
    if(x.className === "navbar") 
        x.className += " resNav";
    else 
        x.className = "navbar";
}

function captchaSuccess() {
    allowSubmit = true;
}

function captchaExpiry() {
    allowSubmit = false;
}

function SubmitAcc() {
    if (allowSubmit) {
        accounts.push([document.getElementById('preEmail').value, document.getElementById('password').value])
        localStorage.setItem('txtValues', JSON.stringify(accounts));
        alert(accounts);
        return true;
    }
    event.preventDefault();
    alert('Please solve the captcha!');
}

function checkAcc() {
    alert(accounts);
    if(accounts.includes(document.getElementById("email").value) && accounts.includes(document.getElementById("existingPass").value))
        document.getElementById("email").setCustomValidity("");
    else 
        document.getElementById("email").setCustomValidity("Invalid email or password");
}

function checkValidation(){
    if (document.getElementById('password').value == document.getElementById('confirmPassword').value)
        document.getElementById('confirmPassword').setCustomValidity("");
    else 
        document.getElementById('confirmPassword').setCustomValidity("Passwords do not match!");
}