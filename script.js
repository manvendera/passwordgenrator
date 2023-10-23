const inputSlider = document.querySelector("[data-lengthSlider ]");
const lenghtDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector(" [data-passwordDisplay] ");
const copyBtn = document.querySelector(" [data-copy] ");
const copyMsg = document.querySelector(" [data-copyMsg] ");
const uppercasecheck = document.querySelector(" #Uppercase ");
const lowercasecheck = document.querySelector(" #Lowercase ");
const numbercheck = document.querySelector(" #Number ");
const symbolCheck = document.querySelector(" #Symbol ");
const indicator = document.querySelector(" [data-indicator] ");
const generateBtn = document.querySelector(" .generateButton ");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider()

// set strength circle color to grey

// set password length

function handleSlider() {
    inputSlider.value = passwordLength;
    lenghtDisplay.innerHTML = passwordLength;

}

function setIndicator(color) {
    indicator.computedStyleMap.background = color;
    //shadow
}

// password generator
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRndInteger(0, 9);
}
//ascii value lower a is 97 & z is 123
function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123))
}
// ascii value of captial A is 65 & Z is 90 
function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 90))
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt[randNum]
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if (uppercasecheck.checked) hasUpper = true;
    if (lowercasecheck.checked) hasLower = true;
    if (numbercheck.checked) hasNum = true;
    if (symbolCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    }
    else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
    ) {
        setIndicator('#ff0')
    } else {
        setIndicator('#f00')
    }

}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText = 'copied'
    } catch (e) {
        copyMsg.innerText = 'failed'
    }
    copyMsg.classList.add('active')
    setTimeout(() => {
        copyMsg.classList.remove('active')
    }, 2000);
}

function shufflePassword(array) {
    // fisher yates method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    })
    // special condition
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange)
})

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider()
});

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value)
        copyContent();
});

generateBtn.addEventListener('click', () => {
    // none of the check box are selected 
    if (checkCount == 0) 
    return;

    if (passwordLength  < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
    //  let's start the journy to find the new password
    console.log("Starting the Journey");
    //  remove old password 
    password = '';

    // let's put the stuff mentioned by checkboxes
    // if(uppercasecheck.checked){
    //     password += generateUpperCase();
    // }
    // if (lowercasecheck.checked) {
    //     password += generateLowerCase();
    // }
    // if (numbercheck.checked) {
    //     password += generateRandomNumber();
    // }
    // if (symbolCheck.checked) {
    //     password += generateSymbol();
    // }

    let funArr = [];
    if (uppercasecheck.checked)
        funArr.push(generateUpperCase);
    if (lowercasecheck.checked)
        funArr.push(generateLowerCase);
    if (numbercheck.checked)
        funArr.push(generateRandomNumber);
    if (symbolCheck.checked)
        funArr.push(generateSymbol);
    // complasury addition

    for (let i = 0; i<funArr.lemgth; i++) {
       password += funArr[i]();
        
    }
    console.log("COmpulsory adddition done");
    // reaminig addition
    for (let i =0; i<passwordLength-funArr.length; i++) {
        let randIndex = getRndInteger(0 , funArr.length);
        console.log("randIndex" + randIndex);
        password += funArr[randIndex]();
        
    }  
      console.log("Remaining adddition done");
    // shuffle the password
     password = shufflePassword(Array.from(password));
     console.log("Shuffling done");
    // show in ui

    passwordDisplay.value =password;
    console.log("UI adddition done");

    // calculation strength

});












