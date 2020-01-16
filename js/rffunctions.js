const numberSlides = document.getElementsByClassName("slides"); //Contains data of all slides.
const numberText = document.getElementsByClassName("slideText"); //Contains data of all slide text.
const thumbs = document.getElementsByClassName("thumb"); //Contains data of all thumbnails.
var accounts = new Array(); //Holds user accounts for "False" account registration.
var exists = false; //Bool for checking if an account exists.
var currSlide = 0; //Variable to hold the current slide.
var allowSubmit = false; //Bool for allowing the submission of form data.
timedSlide(); //Function call so that the slideshow automatically starts cycling through images on a timer.

function addtoSlide(n) { //For this funtion n is a parameter based on which directional arrow is clicked (Back arrow: n = -1. Forward arrow: n = 1).
    displaySlide(currSlide += n); //Add or subract (If value is -1) from the currentSlide variable and run the displaySlide funtion.
}

function switchSlide(n) { //For this function n is a parameter based on the thumbnail clicked (1-5).
    displaySlide(currSlide = n); //Set the currentSlide variable to a specific number and run the displaySlide function.
}

function displaySlide(n) {
    let i;
    if (n > numberSlides.length) 
        currSlide = 1 //If the slide number is larger than the number of slides, go back to the first slide.

    if (n < 1) 
        currSlide = numberSlides.length //If the slide number is lower than 1, go to the last slide.

    for (i = 0; i < numberSlides.length; i++) 
        numberSlides[i].style.display = "none"; //Set every slide to display: none;
    
    for (i = 0; i< numberText.length; i++)
        numberText[i].style.display = "none"; //Set all slide text to display: none;

    for (i = 0; i < thumbs.length; i++) 
        thumbs[i].className = thumbs[i].className.replace(" active", ""); //Set all thumbnails so that they are not active (For styling purposes).
    
    numberSlides[currSlide-1].style.display = "block"; //Display the chosen slide.
    numberText[currSlide-1].style.display = "block"; //Display the slide text related to the chosen slide.
    thumbs[currSlide-1].className += " active"; //Set the corresponding thumb to active (Changes style aspects).
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
    setTimeout(timedSlide, 10000); //Identical to the displaySlide function but will iterate through slides automatically every 10 seconds.
}

function toggleMobile() { //Function for toggling the mobile navbar.
    let x = document.getElementById("responsive"); //Contains data for the navigation bar.
    if(x.className === "navbar") //Checks if the navigation bar has its original class name.
        x.className += " resNav"; //Adds "resNav" to the class name for styling purposes.
    else //If the navigation bar does not have its original class name.
        x.className = "navbar"; //Resets to the original class name.
}

function captchaSuccess() {
    allowSubmit = true; //If the captcha has been solved, set allowSubmit to true.
}

function captchaExpiry() {
    allowSubmit = false; //If the captcha has expired, set allowSubmit to false.
}

function SubmitAcc() { //Function for submitting a user account and storing it for later use.
    accounts = loadAcc(accounts); //Calls the loadAcc function.
    if (allowSubmit) { //If allowSubmit is true.
        accounts.push([document.getElementById('preEmail').value, document.getElementById('password').value]); //Populate the accounts array with user submitted account data.
        localStorage.setItem('txtValues', JSON.stringify(accounts)); //Convert the accounts array to a string and store the string locally in the browser storage.
        return true;
    }
    event.preventDefault(); //Prevent form submission if allowSubmit is false.
    alert('Please solve the captcha!'); //Alert the user that they still need to solve the captcha.
}

function loadAcc(accounts) { //Function for loading accounts from the local browser storage.
    if(localStorage.getItem('txtValues') == null){
        accounts = []; //If no accounts exist in the browsers local storage data, set the array so that it is empty.
    }else{
        accounts =  JSON.parse(localStorage.getItem('txtValues')); //If accounts do exist within the local storage data, parse the data and insert it into the accounts array.
    }
    return(accounts); //Return the newly updated account array to be used in other functions.
}

function checkAcc() { 
    exists = false; //Boolean for checking if an account exists.
    accounts = loadAcc(accounts); //Load accounts.
    for(var i = 0; i < accounts.length; i++) { //Iterate through loop based on the number of elements in the account array.
        if(accounts[i].includes(document.getElementById('email').value) && accounts[i].includes(document.getElementById('existingPass').value)) //Check if the username and password which have been input match any username and password combos which exist in the account array.
            exists = true; //Set exists to true.
    }
    if(exists)
        document.getElementById('email').setCustomValidity(""); //If the account exists, the corresponding input tag is set to valid.
    else 
        document.getElementById('email').setCustomValidity("Invalid email or password"); //If the account does not exist, the corresponding input tag is set to invalid and the user is told why this is the case.
    
    checkXML(); //Run the checkXML funtion from rfparser.js (Seperate file, function for additional validation of other form elements related to XML).
}

function checkMatch() { //Function for checking if passwords match (Password and Repeat password).
    if (document.getElementById('password').value == document.getElementById('confirmPassword').value)//Check if the value of the password input tag matches the value of the confirmPassword input tag.
        document.getElementById('confirmPassword').setCustomValidity(""); //Set the confirmPassword input tag to valid.
    else //If the passwords do not match.
        document.getElementById('confirmPassword').setCustomValidity("Passwords do not match!"); //Set the confirmPassword input tag to invalid and display a message explaning why this is the case.
}
