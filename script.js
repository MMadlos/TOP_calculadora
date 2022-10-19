// Variables globales
const pantalla = document.getElementById("resultadoActual");
const tecladoNumerico = document.querySelectorAll("#tecladoNumerico > div")

let wasClicked = false; // Para saber si ha pulsado "=" y empezar una nueva operación
let value; // Para guardar el valor para la operación
let valoresOperacion = []; // Para guardar los números a operar
let resultadoOperacion; // Para mostrar en pantalla


// FUNCIONES
// Guarda los valores seleccionados en el array y los muestra en pantalla.
tecladoNumerico.forEach(tecla => {    
    tecla.addEventListener("click", () => {
        if (wasClicked){
            pantalla.textContent = "";
            wasClicked = false;
        }

        if (value == undefined){
            value = "";
            pantalla.textContent = ""
        }

        //Evita que se añadan varios "0" al principio
        if (value == "" && tecla.textContent == "0") {
            pantalla.textContent = ""

        }
        if (value == "0" && tecla.textContent == "0") {
            return
        }

        if (tecla.textContent == "=") {              
            return                
        }

        if (tecla.textContent == "," && value.length == 0){
            value = "0,";
            pantalla.textContent += value;
            return
        }

        if(value.includes(",") && tecla.textContent == ",") {
            alert("There's already a comma")
            return //Si no añado el return, se imprime la ","
        }
        
        value += tecla.textContent;
        pantalla.textContent += tecla.textContent;


    })
})

// Conversores
function convertToNumber(string){
    return Number(string.replace(",", "."));
}

function convertToString(number){
    return String(number).replace(".", ",")
}

// Operadores
let operacionSeleccionada;
const operadores = document.querySelectorAll(".operadores > div")

operadores.forEach(tecla => {
    tecla.addEventListener("click", () => {
        if (pantalla.textContent.includes(tecla.textContent)){
            return
        }

        function processOperation(operacion){
            valoresOperacion.push(convertToNumber(value));
            pantalla.textContent = convertToString(valoresOperacion[0]) + tecla.textContent;                
            value = "";
            operacionSeleccionada = operacion
        }
        processOperation(tecla.id);
    })
})

// Funciones de operaciones
const add = (a = 0, b = 0) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Funcinoalidad de la tecla "="
const resultado = document.getElementById("resultado")
resultado.addEventListener("click", () => {
    valoresOperacion.push(convertToNumber(value));

    // Cuenta los decimales de los valores y los utiliza como máximo para el resultado
    function getDecimalLength(num = 0) {
        const numStr = String(num);
        if (numStr.includes(".")){
            return numStr.split(".")[1].length
        }
        return 0;
    }
    
    function getMaxLength(a, b) {
        return (a > b) ? a : b;
    }

    const primerValorOp = valoresOperacion[0]
    const segundoValorOp = valoresOperacion[1]

    const primerValorLength = getDecimalLength(primerValorOp)
    const segundoValorLength = getDecimalLength(segundoValorOp)
    const maxLength = getMaxLength(primerValorLength, segundoValorLength);

    //Operaciones en función de la tecla seleccionada
    function operateValues(operation){
        resultadoOperacion = operation(primerValorOp, segundoValorOp).toFixed(maxLength);
    }

    (operacionSeleccionada == "suma") ? operateValues(add)
    : (operacionSeleccionada == "resta") ? operateValues(substract)
    : (operacionSeleccionada == "multiplicacion") ? operateValues(multiply)
    : (operacionSeleccionada == "division") ? operateValues(divide)
    : resultadoOperacion = value; //If "=" is pressed after an operator
    
    //Muestra resultado final en pantalla y resetea variables
    pantalla.textContent += resultado.textContent + convertToString(resultadoOperacion);
    valoresOperacion = [];
    value = "";
    wasClicked = true;

})

// Borra todas las variables
const btnAC = document.getElementById("btnAllClear")
btnAC.addEventListener("click", () => {
    value = undefined;
    valoresOperacion = []
    pantalla.textContent = "0";
})

// Botón borrar un dígito
//!! Sólo funciona si no se ha utilizado el operador
const btnErase = document.getElementById("btnErase")
btnErase.addEventListener("click", () => {
    if(value.length == 1){
        value = undefined;
        pantalla.textContent = "0"

    } else {
        value = value.slice(0, -1);
        pantalla.textContent = pantalla.textContent.slice(0, -1);
    
    }
})