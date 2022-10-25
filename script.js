const numberContainer = document.querySelector("#number-container");
const operatorsCont = document.querySelector("#operators-cont");
const display = document.querySelector("#display");
const equalsBtn = document.getElementById("equal");
const oprtsNew = ["0","1","2","3","4","5","6","7","8","9"];
const history = document.querySelector(".history");
const histDisplay = document.getElementById("hist-display");
const historyBtn = document.getElementById("historyBtn")

//----------------------------------------------------
let ref = "";
numberContainer.addEventListener("click", (e) => {
  const displayedNumber = display.textContent;
  const prevValue = display.textContent;

  console.log(display.textContent.length)
  if (display.textContent.length > 7) {
    display.style.fontSize = "38px" 
    display.innerHTML = `${display.textContent} Hello` 
  }

  if (!e.target.closest("button")) return //fixes glitch where you press in between and all the numbers pop-up.

  if (displayedNumber === '0') { // Replaces the 0 in display with clicked number.
    display.textContent = e.target.textContent
  } 
  else {
    display.textContent = displayedNumber + e.target.textContent
  }
  
  // Adds decimal abilities.
  if (displayedNumber === "0" && e.target.textContent === ".") {
     return display.textContent = displayedNumber + ".";
  }
  if ( //Adds 0 before the decimal place when using decimals.
    e.target.textContent === "." && 
    !oprtsNew.includes(prevValue[display.textContent.length - 2])
    ) {
    return display.textContent = `${displayedNumber}0${e.target.textContent}`;
  }

  if (String(ref) === displayedNumber) {
    console.log("active")
    if (displayedNumber === String(ref)) {
      display.textContent = e.target.textContent
    } 
    else {
      display.textContent = displayedNumber + e.target.textContent
    }
  }
}) 
//-------------------------------------------------------------
 
operatorsCont.addEventListener("click", (e) => {
  const displayedNumber = display.textContent;
  const element = e.target.textContent;
  const previousVal = display.textContent[display.textContent.length - 1];
  const oprts = ["+","-","*","/"]

  if (display.textContent === "0") { //Makes it not possible to have operator as first value
    return; 
  }  
  
  if (element === "+" || element === "-" || element === "*" || element === "/") {
    display.textContent = displayedNumber + element;  
  } 
  
  // Prevent operators from being stacked together.
  if (oprts.includes(previousVal)) { 
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);  
  }
 
  // Makes it when you click oprt and have already two numbers, it evaluates them.
  if (element!== "AC") {  
    if (hasRepeats(display.textContent) || !hasRepeats(display.textContent)) {
      const result = Math.round(eval(display.textContent.slice(0,-1)) * 100) / 100;     
      display.textContent = result + element;                 
    }   
  } 
  // Checks if their is any repeating values in the display.
  function hasRepeats (str) { 
    return /(.).*\1/.test(str);
  }
})
document.getElementById("negative").addEventListener("click", () => {
  if (display.textContent === "0") {
    display.textContent = "-"
  }
  else {
    display.textContent = display.textContent + "-"
  }
})

historyBtn.addEventListener("click", () => {
  history.classList.toggle("active")
})
document.getElementById("clear").addEventListener("click", () => {
  display.textContent = "0"
}) 
  
document.getElementById("backspace").addEventListener("click", () => {
   display.textContent = display.textContent.slice(0, -1) 
   display.textContent = display.textContent.length <1 ? "0" : display.textContent
})
document.getElementById("equal").addEventListener("click", () => {
  if (display.textContent === "0") {
    return;
  }
  else {
    try {
      const result = eval(display.textContent)
      if (result === Infinity) {
        display.textContent = "No.....";
        return;
      }
      histDisplay.innerHTML += `<li>${display.textContent} = ${result}</li>`
      display.textContent = result.toFixed(2);
    }
    catch {
      display.textContent = "Error!!"
    }
  }
})

document.querySelector("#erase").addEventListener("click", () => {
  histDisplay.replaceChildren();
})

