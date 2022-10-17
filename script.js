// Basic functions

const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let operator = operate => operate;

// Display the number when clicking any button
const resultadoActual = document.getElementById("resultadoActual");
const tecladoNumerico = document.querySelectorAll("#tecladoNumerico > div")

let primerValor;
let segundoValor;
const suma = document.getElementById("suma")

let wasClicked;

suma.addEventListener("click", () => {
    wasClicked = true;
    resultadoActual.textContent += suma.textContent;
})

tecladoNumerico.forEach(tecla => {
    tecla.addEventListener("click", () => {
        if (wasClicked !== true) {
            if (primerValor == undefined){
                primerValor = "";                
            }
            if (primerValor[0] == undefined && tecla.textContent == "0"){
                return ;                
            }
    
            if (tecla.textContent == "=") {
                return
            }
            
            if (!primerValor.includes(",")) {
                primerValor += tecla.textContent;
            
            } else if (tecla.textContent !== ",") {
                primerValor += tecla.textContent;
            } else {
                alert("There's already a comma")
            }
    
            resultadoActual.textContent = primerValor;

        } else {
            if (segundoValor == undefined){
                segundoValor = "";                
            }
            if (segundoValor[0] == undefined && tecla.textContent == "0"){
                return ;                
            }
    
            if (tecla.textContent == "=") {
                return
            }
            
            if (!segundoValor.includes(",")) {
                segundoValor += tecla.textContent;
            
            } else if (tecla.textContent !== ",") {
                segundoValor += tecla.textContent;
            } else {
                alert("There's already a comma")
            }
    
            resultadoActual.textContent += segundoValor;
        }
    })
})

// OPERACIÓN SIMPLE: SUMA

//TEST
