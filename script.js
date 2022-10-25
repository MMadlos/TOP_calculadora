// Funciones de operaciones

const add = (a = 0, b = 0) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator = add, a , b) => operator(a, b);

// // Conversores
function convertToNumber(string){
    return Number(string.replace(",", "."));
}

function convertToString(number){
    return String(number).replace(".", ",")
}


// Cuando selecciono un número, lo muestro en pantalla

const pantalla = document.getElementById("resultadoActual");
const operacionRealizada = document.getElementById("resultadoAnterior");
const tecladoNumerico = document.querySelectorAll("#tecladoNumerico > div")

pantalla.textContent = "0";

let displayValue = "";
let numsToOperate = [];
let result = "";

tecladoNumerico.forEach(tecla => {
    tecla.addEventListener("click", () => {  
        if (tecla.id == "equal_key") {return}  
        if (pantalla.textContent == "0" ) {pantalla.textContent = ""}
        if (numsToOperate[0]){
            displayValue += tecla.textContent
            pantalla.textContent += tecla.textContent
        } else {
            displayValue += tecla.textContent
            pantalla.textContent = displayValue
        }        
    })
})


// Cuando pulso un operador, guardo el valor como la primera parte a operar

const tecladoOperadores = document.querySelectorAll(".operadores > div")

let operacionSeleccionada = "";
let simbolo = "";
let operator = "";

tecladoOperadores.forEach(tecla => {
    tecla.addEventListener("click", () => {
        if (simbolo){
            numsToOperate[1] = convertToNumber(displayValue);
            makeOperation()
            
            pantalla.textContent = result;
        
            operacionRealizada.textContent = numsToOperate[0] + simbolo + numsToOperate[1] + "=" + result
            displayValue = "";
            simbolo = "";    
            operator = "";
            numsToOperate[0] = result;
        }

        if (result){
            numsToOperate[0] = result
            result = ""
        }
            
        // Guarda el valor a operar        
        else {numsToOperate[0] = convertToNumber(displayValue)};

        // Cuando haga click, selecciono el operador
        operacionSeleccionada = tecla.id;

        // Conversor en función de la tecla seleccionada
        (operacionSeleccionada == "suma") ? operator = add
        : (operacionSeleccionada == "resta") ? operator = substract
        : (operacionSeleccionada == "multiplicacion") ? operator = multiply
        : (operacionSeleccionada == "division") ? operator = divide
        : operator = add; //If "=" is pressed before an operator


        // Muestro el operador en pantalla y guardo el símbolo de la operación
        simbolo = tecla.textContent
        pantalla.textContent += tecla.textContent;


        // Reset del valor a guardar
        displayValue = "";
    })
})

// Function for key "="
const equalKey = document.getElementById("equal_key")
equalKey.addEventListener("click", () => {
    if (displayValue == undefined || displayValue == ""){return}
    if (!operacionSeleccionada){return}

    // Añado el valor a operar
    numsToOperate[1] = convertToNumber(displayValue)
    makeOperation()

    pantalla.textContent = convertToString(result);
    operacionRealizada.textContent 
        = convertToString(numsToOperate[0]) 
        + simbolo 
        + convertToString(numsToOperate[1]) 
        + "=" 
        + convertToString(result);

    // Update variables
    displayValue = "";
    numsToOperate = [];
    operacionSeleccionada = "";
    operator = "";
    simbolo = "";
})

function makeOperation() {
    if (operator == multiply || operator == divide) {
        result = parseFloat(operate(operator, numsToOperate[0], numsToOperate[1]).toFixed(5))
    } else {
        function getMaxDecimalLength(value1, value2){
            
            function getDecimalLength(num) {
                const numStr = String(num);
                if (numStr.includes(".")){
                    return numStr.split(".")[1].length
                }
                return 0;
            }
    
            firstNum = getDecimalLength(value1)
            secondNum = getDecimalLength(value2)
    
            return (firstNum > secondNum) ? firstNum : secondNum;        
        }
 
        const maxLength = getMaxDecimalLength(numsToOperate[0], numsToOperate[1])
        result = parseFloat(operate(operator, numsToOperate[0], numsToOperate[1]).toFixed(maxLength))
    }
}

// All Clear button
const btnAC = document.getElementById("btnAllClear")
btnAC.addEventListener("click", () => {
    displayValue = "";
    numsToOperate = [];
    result = "";

    operacionSeleccionada = ""
    simbolo = "";
    operator = "";

    pantalla.textContent = "0";
    operacionRealizada.textContent = "";
})

// Backspace button
const btnErase = document.getElementById("btnErase")
btnErase.addEventListener("click", () => {
    if (!displayValue){return}

    displayValue = displayValue.slice(0, -1);
    pantalla.textContent = pantalla.textContent.slice(0, -1);
})

// ---- TEST ---- //