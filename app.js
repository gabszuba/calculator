let a = null; //first number
let b = null; //second number
let operator = null;
let displayValue = "0";
const MAX_DISPLAY_LENGTH = 12;
const MAX_INPUT_LENGTH = 15;

const numbers = Array.from(document.querySelectorAll('.numberBtn'));
const operators = Array.from(document.querySelectorAll('.operatorBtn'));
const displayContent = document.getElementById("display-content");
const clearAll = document.getElementById("clearAllBtn");
const clearLast = document.getElementById("clearLastDigitBtn");
const currentOperation = document.getElementById("current-operation");
const decimalBtn = document.getElementById("decimalBtn");

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    if (b === 0)
        return "Error";
    return a / b;
};

function operate(a, operator, b) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "÷":
            return divide(a, b);
        case "×":
            return multiply(a, b);
        default:
            return null;
    }
}

function updateCurrentOperation() {
    if (displayValue !== "Error") currentOperation.textContent = a + " " + operator;
    else currentOperation.textContent = " ";
}

function clearAllValues() {
    a = null;
    b = null;
    operator = null;
    displayValue = "0";
    currentOperation.textContent = " ";
    updateDisplay();
}

function evaluate() {
    if (a !== null && b !== null && operator !== null) {
        result = operate(a, operator, b);
        displayValue = result.toString();
        updateDisplay();
        updateVariables();
    }
}

function updateVariables() {
    if (displayValue !== "Error") {
        a = displayValue;
/*         displayValue = "0"; // Reset displayValue to "0" after updating 'a'
 */    } else {
        a = null;
    }
    b = null;
    operator = null;
}


function updateDisplay() {
    if (displayValue.length > MAX_DISPLAY_LENGTH) 
        displayValue = parseFloat(displayValue).toPrecision(MAX_DISPLAY_LENGTH);
    displayContent.textContent = displayValue;
}

function handleOperation(e) {
    if (displayValue === "Error") { 
        clearAllValues();
        return;
    };
    
    if (a !== null) {
        b = displayValue;
        evaluate();

        if (e.target.textContent === "=") {
            currentOperation.textContent = " ";
            a = null;
            return;
        } else updateCurrentOperation();

    } else if (a === null) {
        if (e.target.textContent !== "=") {
            a = displayValue;
        } else return;
    }
    if (displayValue !== "Error") {
        operator = e.target.textContent;
        displayValue = "0";
        updateDisplay();
        updateCurrentOperation();
    }
}

function populateDisplay(e) {
    if (displayValue.length >= MAX_INPUT_LENGTH) {
        return;
    }

    let currentValue = e.target.textContent;

    if (displayValue === '0' || displayValue === "Error")
        displayValue = currentValue;
    else displayValue += currentValue;

    updateDisplay();
}

numbers.forEach(number => number.addEventListener("click", populateDisplay));
operators.forEach(operator => operator.addEventListener("click", handleOperation));
clearAll.addEventListener("click", clearAllValues);
decimalBtn.addEventListener("click", () => {
    if (!displayValue.includes(".") && displayValue !== "Error") {
        displayValue += ".";
        updateDisplay();
    }
});
clearLast.addEventListener("click", () => {
    if (displayValue.length > 1 && displayValue !== "Error") {
        displayValue = displayValue.slice(0, -1);
        updateVariables();
    } else {
        clearAllValues();
    }
    updateDisplay();
});