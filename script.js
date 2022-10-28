const operators = document.querySelectorAll(".operator");
const specialBtns = document.querySelectorAll(".special");
const integers = document.querySelectorAll(".integer")
const display = document.getElementById("display");
const oprts = ["+","-","*","/"]

const handleIntegers = (e) => {
  if (display.textContent === "0") {
      display.textContent = e.target.textContent;
  }
  else {
      display.textContent += e.target.textContent;
  }
} 

const addOprts = (e) => {
    const previousVal = display.textContent.split(" ")[display.textContent - 1]
    const oprts = ["+","-","*","%"]
    const displayedNumber = display.textContent;

    if (display.textContent === "0") { //Makes it not possible to have operator as first value
        return; 
    }  
    const vEquation = displayedNumber.split(" ")

    if (!oprts.includes(previousVal)) { 
        display.textContent = `${vEquation[0]} ${e.target.textContent} `;
    }
    else {
        const result = display.textContent.split(" ");
        result.pop()
        display.textContent = result;
    }
    
    if (vEquation[2]) {
        const result = calculate(vEquation[0], vEquation[1], vEquation[2]);
        display.textContent = `${result} ${e.target.textContent} `; 
    }
}

const handleSpecials = (e) => {
    const element = e.target.textContent
        //Makes it not possible to have operator as first value
    if (display.textContent === "0" && 
        (
        element === "←" ||
        element === "C" ||
        element === "="
        )
       ) return;

    switch(element) {
      case "+/-":
        negativeInput()
        break;
      case "C":
        clear()
        break;
      case "←":
        display.textContent = String(backspace()).replaceAll(",", " ")
        break;
      case ".":
        firstDecimal()       
        break; 
      case "=":
        if (checkEquation()) return;
        const equation = display.textContent.split(" ");
        const result = calculate(equation[0], equation[1], equation[2]);
        display.textContent = result; 
        break;
    }
}

const checkEquation = () => {
    if (!display.textContent.split(" ")[1] || !display.textContent.split(" ")[2]) {
        alert("Input your equation!")
        return true;
    }
}

const calculate = (n1, oprt, n2) => {
    let result = ""; 
    switch(oprt) {  
       case "+":
           result = parseFloat(n1) + parseFloat(n2)
       break;
       case "-": 
           result = parseFloat(n1) - parseFloat(n2)
        break; 
       case "*":
          result = parseFloat(n1) * parseFloat(n2)
       break;
       case "%":
           const decimal = parseFloat(n1) / parseFloat(n2)
           result = decimal.toFixed(6); 
       break;
    }  
    return result;
}

const clear = () => {
    display.textContent = "0";
}
  
const backspace = () => {
  let result = display.textContent.slice(0, -1);
  if (display.textContent.length === 1) {
    return result = "0"
  }
  return result;
}

const firstDecimal = () => { 
    if (display.textContent === "0") {
        display.textContent = display.textContent + "."
    }
    if (
        !display.textContent.split(" ")[0].includes(".") ||
        !display.textContent.split(" ")[2].includes(".")
        ) {
        display.textContent = display.textContent + "."
    }
    return;
}
const negativeInput = () => { 
    if (display.textContent === "0") {
        display.textContent = "-";
    }
    if (display.textContent.split(" ")[1]) {
        display.textContent = display.textContent + "-"
    }
}

operators.forEach(oprt => {
  oprt.addEventListener("click", addOprts)
})
specialBtns.forEach(btn => {
  btn.addEventListener("click", handleSpecials)
})
integers.forEach(numb => {
  numb.addEventListener("click", handleIntegers)
})

window.addEventListener("keydown", (e) => {
    const eq = display.textContent.split(" ")
    if (e.key >= 0 && e.key <= 9) {
        if (display.textContent === "0") display.textContent = e.key
        else display.textContent += e.key;
    }
    else if (e.key === "Backspace") {
        display.textContent = display.textContent.slice(0, -1);
    }
    else if (e.key === " ") display.textContent += " "
    else if (
        e.key === "+" || e.key === "-" || e.key === "*" || e.key === "%"
        ) display.textContent += e.key;

    if (e.key === "Enter") display.textContent = calculate(eq[0], eq[1], eq[2])
});