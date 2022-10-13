// Basic functions

const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let operator = operate => operate;

// Display the number when clicking any button
const resultadoActual = document.getElementById("resultadoActual");
const tecladoNumerico = document.querySelectorAll("#tecladoNumerico > div")
let numero = "";   
let numbersToOperate = [];

// En función del índice (0 o 1) para el array numbersToOperate.
function getNumber(index) {
    tecladoNumerico.forEach(tecla => {
        tecla.addEventListener("click", () => {
    
            if (tecla.textContent == "=") {
                return
            }
    
            if (!numero.includes(",")) {
                numero += tecla.textContent;
                // resultadoActual.textContent = primerNumSelect.join("");
    
            } else if (tecla.textContent !== ",") {
                numero += tecla.textContent;
                // resultadoActual.textContent = primerNumSelect.join("");
            } else {
                alert("There's already a comma")
            }
            resultadoActual.textContent = numero;
            numbersToOperate[index] = numero;
    
            console.log(numbersToOperate);
            return numbersToOperate;
        })
    })
}



// TEST 

const string = "12,99"
const stringConverted = Number(string.replace(",", "."));

console.log(stringConverted);
