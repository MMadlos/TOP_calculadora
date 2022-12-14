// Funciones de operaciones

const add = (a = 0, b = 0) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (operator = add, a , b) => operator(a, b);

// Conversores
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

let displayValue = "";
let numsToOperate = [];
let result = "";

function processTecladoNumerico(key) {  
    if (key == "=") {return}  
    if (pantalla.textContent == "0" ){pantalla.textContent = ""}
    if (displayValue.includes(",") && key == ",") {return alert("There's already a comma")}
    if (numsToOperate[0]){
        displayValue += key;
        pantalla.textContent += key
    } else {
        result = ""
        displayValue += key;
        pantalla.textContent = displayValue 
    }            
}

pantalla.textContent = "0";
tecladoNumerico.forEach(tecla => {
    tecla.addEventListener("click", () => { 
        processTecladoNumerico(tecla.textContent) 
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
            if (!displayValue){
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            } else {
                numsToOperate[1] = convertToNumber(displayValue);
                makeOperation()
                
                pantalla.textContent = result;
            
                operacionRealizada.textContent = numsToOperate[0] + simbolo + numsToOperate[1] + "=" + result
                displayValue = "";
                simbolo = "";    
                operator = "";
                numsToOperate[0] = result;
            }            
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

    if(result == Infinity){

        displayValue = "";
        numsToOperate = [];
        result = "";
    
        operacionSeleccionada = ""
        simbolo = "";
        operator = "";
    
        pantalla.textContent = "0";
        operacionRealizada.textContent = "";

        return alert("If you divide the number to 0, this calculator will autodestroy.") 
    }

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
    if (pantalla.textContent.length == 1){
        displayValue = ""
        pantalla.textContent = "0"
    }
    else {
        displayValue = displayValue.slice(0, -1);
        pantalla.textContent = pantalla.textContent.slice(0, -1);
    }   
})

// Key events
const arrayTecladoNumerico = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]
const arrayOperadores = ["+", "-", "/", "*"]
let keyPressed;


window.addEventListener("keydown", (event) =>  {
    keyPressed = event.key

    if (arrayTecladoNumerico.includes(keyPressed)){
        if (keyPressed == ".") {keyPressed = ","}
        processTecladoNumerico(keyPressed)
    }

    if (arrayOperadores.includes(keyPressed)){
        if (simbolo){
            if (!displayValue){
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            } else {
                numsToOperate[1] = convertToNumber(displayValue);
                makeOperation()
                
                pantalla.textContent = result;
            
                operacionRealizada.textContent = numsToOperate[0] + simbolo + numsToOperate[1] + "=" + result
                displayValue = "";
                simbolo = "";    
                operator = "";
                numsToOperate[0] = result;
            }            
        }

        if (result){
            numsToOperate[0] = result
            result = ""
        } else {numsToOperate[0] = convertToNumber(displayValue)};

        operacionSeleccionada = keyPressed;
        (operacionSeleccionada == "+") ? operator = add
        : (operacionSeleccionada == "-") ? operator = substract
        : (operacionSeleccionada == "*") ? operator = multiply
        : (operacionSeleccionada == "/") ? operator = divide
        : operator = add; //If "=" is pressed before an operator

        // Muestro el operador en pantalla y guardo el símbolo de la operación
        simbolo = keyPressed
        pantalla.textContent += keyPressed;
        displayValue = "";
    }

    if (keyPressed == "Enter"){
        if (displayValue == undefined || displayValue == ""){return}
        if (!operacionSeleccionada){return}

        // Añado el valor a operar
        numsToOperate[1] = convertToNumber(displayValue)
        makeOperation()

        if(result == Infinity){

            displayValue = "";
            numsToOperate = [];
            result = "";
        
            operacionSeleccionada = ""
            simbolo = "";
            operator = "";
        
            pantalla.textContent = "0";
            operacionRealizada.textContent = "";

            return alert("If you divide the number to 0, this calculator will autodestroy.") 
        }

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
    }

})
