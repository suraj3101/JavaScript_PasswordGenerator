const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

/*
    In default case:

    length of password = 10
    password = empty
    includes uppercase letter is already checked
    strength indicator color is grey
*/

//initially
let password = "";
let passwordLength = 10;
//let checkCount = 1; //uppercase letter is already checked
// strength indicator color is grey
let checkCount = 0;
handleSlider();
setIndicator("#ccc")

/*
    OPERATIONS:

    Copy Content()
    handleslider() -> slider and password length change
    generatePwd()
    setIndicator() -> color change (grey, red, green) with shadow
    getRandomInteger(min value, max value) -> random password is generated only integers
    getRandomUppercase() -> uppercase letters password
    getRandomLowerCase() -> lowercase letters password
    getRandomNumbers() -> numbers password
    getRandomSymbols() -> symbols password
    calculateStrength() -> on this basis, color is shown
*/

/*
    FLOW:

    slider move -> length change
    include ____ -> when click on generate password
        after generate password:
        put password in content and can copy now
*/

// Function for handle slider:
// set passwordlength


//set passwordLength
function handleSlider() {
    // set the value:
    inputSlider.value = passwordLength;

    // show the value:
    lengthDisplay.innerText = passwordLength;

    const min = inputSlider.min;
    const max = inputSlider.max;

    inputSlider.style.backgroundSize = ((passwordLength - min) * 100 / (max - min)) + "% 100%"
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
    //Math.random(); give value between 0 and 1: [0,1) and can give floating number so, apply Math.floor -> given interger
    // Math.floor(Math.random() * (max - min)); Give value between 0 and (max-min)
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    // Single digit number: 0 to 9
    return getRndInteger(0, 9);
}

function generateLowerCase() {
    // ASCII: a -> 97 and z -> 123
    // getRanInteger(97, 123); //it will give the number
    // So, we need to convert into character
    return String.fromCharCode(getRndInteger(97, 123))
}

function generateUpperCase() {
    // ASCII: A -> 65 and Z -> 91
    // getRanInteger(97, 123); //it will give the number
    // So, we need to convert into character
    return String.fromCharCode(getRndInteger(65, 91))
}

function generateSymbol() {
    // We dont' know the mapping of symbols: from where start, and where it end
    // Option: create string of symbols -> random number between size of string -> give the index -> go to index and find the symbol
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    // Rules is Yours:
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch (e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    /*
    copied text after click on copy image:
        copied is shown but
            after some time, copied is disappear
    */

    // set timeout for disappear and appear copied text
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);

}

/*
    Event Listener:

    when slider moves -> value of password length change
    generate password -> generate password logic
    on copy button -> when click on copy button, what we have to do
*/

function shufflePassword(array) {
    // there is an famous algorithm: Fisher Yates Method: applied on array and can shuffle
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
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
    });

    //special condition
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})


copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) //non-empty password if exist
        copyContent();

    // OR
    // if (passwordLength >  0)
    //     copyContent();
})

generateBtn.addEventListener('click', () => {
    // When all checkboxes are unchecked then password is not generated it means we have to add event listeners on checkboxes
    // password is Generated when atleast one checkbox is checked.

    //none of the checkbox are selected

    if (checkCount == 0)
        return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start the jouney to find new password
    console.log("Starting the Journey");
    //remove old password
    password = "";

    //let's put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    // Let length of password = 10, out of which 4 are put (if all 4 boxes are picked)
    // Now, remaining 6 are randomly puts up.
    // But, this is basic one... why? because first uppercase letter, then lowercase, then numbers, then symbols

    let funcArr = [];

    if (uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if (lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if (numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if (symbolsCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("Compulsory adddition done");

    //remaining adddition
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRndInteger(0, funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the password / Random password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrength();
});