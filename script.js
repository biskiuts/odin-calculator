let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

const operationDisplay = document.getElementById("operationDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const numbersBtn = document.querySelectorAll(".number");
const operatorsBtn = document.querySelectorAll(".operator");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");
const plusMinusBtn = document.getElementById("plusMinus");
const percentBtn = document.getElementById("percent");
const backspaceBtn = document.getElementById("backspace");
const decimalBtn = document.querySelector(".decimal");

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return b === 0 ? "HEHE" : a / b;
}

function operate(num1, num2, operator) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return "Error";
  }
}

function formatResult(result) {
  if (typeof result === "string") return result;

  if (Math.abs(result) >= 1e13 || (Math.abs(result) < 1e-8 && result !== 0)) {
    return result.toExponential(6);
  }

  let resultStr = result.toString();

  return resultStr.length > 13 ? parseFloat(result.toFixed(8)) : resultStr;
}

function appendNumber(number) {
  if (shouldResetDisplay) {
    resultDisplay.value = "";
    shouldResetDisplay = false;
  }
  if (resultDisplay.value === "0" && number !== ".") {
    resultDisplay.value = number;
  } else {
    resultDisplay.value += number;
  }
}

function appendDecimal() {
  if (shouldResetDisplay) {
    resultDisplay.value = "0";
    shouldResetDisplay = false;
  }
  if (!resultDisplay.value.includes(".")) {
    resultDisplay.value += ".";
  }
}

function setOperator(operator) {
  if (currentOperator !== null && !shouldResetDisplay) {
    evaluate();
  }

  firstNumber = resultDisplay.value;
  currentOperator = operator;
  shouldResetDisplay = true;
  operationDisplay.value = `${firstNumber} ${operator}`;
}

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;

  secondNumber = resultDisplay.value;
  if (secondNumber === "") return;

  let result = operate(firstNumber, secondNumber, currentOperator);
  resultDisplay.value = formatResult(result);
  operationDisplay.value = `${firstNumber} ${currentOperator} ${secondNumber} =`;

  firstNumber = resultDisplay.value;
  currentOperator = null;
  shouldResetDisplay = true;
}

function clearCalculator() {
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  shouldResetDisplay = false;
  resultDisplay.value = "0";
  operationDisplay.value = "";
}

function toggleSign() {
  if (resultDisplay.value === "0") return;
  resultDisplay.value = resultDisplay.value.startsWith("-")
    ? resultDisplay.value.substring(1)
    : `-${resultDisplay.value}`;
}

function convertToPercent() {
  let value = parseFloat(resultDisplay.value);
  if (isNaN(value) || value === 0) return;

  value = value / 100;

  resultDisplay.value = formatResult(value);
  operationDisplay.value = `${resultDisplay.value} %`;
}

function deleteLastDigit() {
  resultDisplay.value = resultDisplay.value.length > 1 ? resultDisplay.value.slice(0, -1) : "0";
}

function handleKeyboardInput(event) {
  if (event.key >= "0" && event.key <= "9") {
    appendNumber(event.key);
  } else if (event.key === ".") {
    appendDecimal();
  } else if (event.key === "=" || event.key === "Enter") {
    evaluate();
  } else if (event.key === "Backspace") {
    deleteLastDigit();
  } else if (event.key === "Escape") {
    clearCalculator();
  } else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
    setOperator(event.key);
  }
}

numbersBtn.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

operatorsBtn.forEach((button) => {
  button.addEventListener("click", () => setOperator(button.textContent));
});

equalsBtn.addEventListener("click", evaluate);
clearBtn.addEventListener("click", clearCalculator);
plusMinusBtn.addEventListener("click", toggleSign);
percentBtn.addEventListener("click", convertToPercent);
backspaceBtn.addEventListener("click", deleteLastDigit);
decimalBtn.addEventListener("click", appendDecimal);

document.addEventListener("keydown", handleKeyboardInput);
