//stores the characters that could be selected based on the parameters set by the user
var possibleCharacters = "";

//character storage variables
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const specialCharacters = "#$%&'()*+,-.:;<=>?@[]^_`{|}~";

//Number of char in the password based on use selection, between the min and max variables
var numberOfCharacters = 0;

//min and max password length
const minPasswordLength = 8;
const maxPasswordLength = 128;

//stores the password in an input field so that it can be coppied to the clipboard
const secretPasswordHolder = document.querySelector("#secretElement");

//add the onClick event to copy new password to clipboard to the generatedPassword element
document.querySelector("#generatedPassword").addEventListener("click", function(event){
    //can't copy from elements set to display:none, to briefly display then hide it to copy
    secretPasswordHolder.style.display = "block";
    secretPasswordHolder.select();
    document.execCommand("copy");
    secretPasswordHolder.style.display = "none";
});

//called from button
function buttonMethod() {
    if(checkIfParametersAreSet()){
        //the new password
        var thePassword = "";

        for(var i = 0; i < numberOfCharacters; i++){
            var randomIndex = Math.floor(Math.random() * possibleCharacters.length);
            var nextChar = possibleCharacters.charAt(randomIndex);
            thePassword += nextChar;
        }

        //save password to secret text area to copy from
        secretPasswordHolder.value = thePassword;

        var newPasswordAlert = document.getElementById("generatedPassword");
        newPasswordAlert.innerHTML = "Your new password is: " + thePassword + " (click to copy to clipboard. *Not supported on IOS devices)";
        newPasswordAlert.style.display = "block";
    }
}

//check that the user input was valid
function checkIfParametersAreSet() {
    //store the alert boxes in variables
    var newPasswordAlert = document.getElementById("generatedPassword");
    var checkBoxAlert = document.getElementById("alertCheckBoxes");
    var lengthAlert = document.getElementById("alertLength");

    //hide the alerts to reset them
    newPasswordAlert.style.display = "none";
    checkBoxAlert.style.display = "none";
    lengthAlert.style.display = "none";

    //set true if conditions are met
    var charTypeCorrect = false;
    var lengthCorrect = false;

    //make sure at least one box is checked
    if(document.getElementById("uppercaseCheckbox").checked ||
        document.getElementById("lowercaseCheckbox").checked ||
        document.getElementById("numberCheckbox").checked ||
        document.getElementById("specialCharCheckbox").checked) {
            charTypeCorrect = true;
    }

    //make sure length of password is valid
    if(document.getElementById("lengthInput").value >= minPasswordLength &&
        document.getElementById("lengthInput").value <= maxPasswordLength) {
            lengthCorrect = true;
    }

    //display check box alert
    if(!charTypeCorrect){
        checkBoxAlert.style.display = "block";
    }

    //display length alert
    if(!lengthCorrect){
        lengthAlert.style.display = "block";
    }

    if(lengthCorrect && charTypeCorrect){
        //set number of characters so it knows how many to generate
        numberOfCharacters = document.getElementById("lengthInput").value;
        //set possibleCharacters variable for loop
        createListOfPossibleCharacters();
        return true;
    }
    else {
        return false;
    }
}

//add the selected character types to select from
function createListOfPossibleCharacters(){
    //reset the variable, in case called more than once without reloading the page
    possibleCharacters = "";

    //concat the strings based on the checkboxes
    if(document.getElementById("uppercaseCheckbox").checked){
        possibleCharacters += uppercaseLetters;
    }
    if(document.getElementById("lowercaseCheckbox").checked){
        possibleCharacters += lowercaseLetters;
    }
    if(document.getElementById("numberCheckbox").checked){
        possibleCharacters += numberCharacters;
    }
    if(document.getElementById("specialCharCheckbox").checked){
        possibleCharacters += specialCharacters;
    }
}