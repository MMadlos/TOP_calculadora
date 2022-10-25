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
            result = operate(operator, numsToOperate[0], numsToOperate[1])
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
    // result = "";

    operacionSeleccionada = "";
    operator = "";
    simbolo = "";
})

// Decimales. 
// - Si es una suma o una resta, utiliza el número de decimales introducido por el usuario.
// - Si es una multiplicación o división, redondea o aplica un máximo de 5 desimales.
function operateValues(operation){
    if (operation == multiply || operation == divide){
        resultadoOperacion = parseFloat(operation(primerValorOp, segundoValorOp).toFixed(5));

    } else {
        
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

// ---- TEST ---- //

// ------------------------------------------------------------- //
// const pantalla = document.getElementById("resultadoActual");
// const tecladoNumerico = document.querySelectorAll("#tecladoNumerico > div")

// let wasClicked = false; // Para saber si ha pulsado "=" y empezar una nueva operación
// let value; // Guarda el valor para la operación
// let valoresOperacion = []; // Guarda los números a operar
// let resultadoOperacion; // Muestra resultado en pantalla


// // FUNCIONES
// // Guarda los valores seleccionados en el array y los muestra en pantalla.
// tecladoNumerico.forEach(tecla => {    
//     tecla.addEventListener("click", () => {
//         if (wasClicked){
//             pantalla.textContent = "";
//             wasClicked = false;
//         }

//         if (value == undefined){
//             value = "";
//             pantalla.textContent = ""
//         }

//         //Evita que se añadan varios "0" al principio
//         if (value == "" && tecla.textContent == "0") {
//             pantalla.textContent = ""
//         }

//         if (value == "0" && tecla.textContent == "0") {
//             return
//         }

//         if (tecla.textContent == "=") {              
//             return                
//         }

//         if (tecla.textContent == "," && value.length == 0){
//             value = "0,";
//             pantalla.textContent += value;
//             return
//         }

//         if(value.includes(",") && tecla.textContent == ",") {
//             alert("There's already a comma")
//             return //Si no añado el return, se imprime la ","
//         }
        
//         value += tecla.textContent;
//         pantalla.textContent += tecla.textContent;
//     })
// })

// // Conversores
// function convertToNumber(string){
//     return Number(string.replace(",", "."));
// }

// function convertToString(number){
//     return String(number).replace(".", ",")
// }

// // Operadores
// let operacionSeleccionada;
// const operadores = document.querySelectorAll(".operadores > div")
// let simbolo;

// operadores.forEach(tecla => {
//     tecla.addEventListener("click", () => {
//         if (pantalla.textContent.includes(tecla.textContent)){
//             return
//         }

//         function processOperation(operacion){
//             valoresOperacion.push(convertToNumber(value));
//             pantalla.textContent = convertToString(valoresOperacion[0]) + tecla.textContent;                
//             value = "";
//             operacionSeleccionada = operacion
//         }

//         if (tecla.id !== resultado){
//             processOperation(tecla.id);
//             simbolo = tecla.textContent;
//         }
//     })
// })

// // Funciones de operaciones
// const add = (a = 0, b = 0) => a + b;
// const substract = (a, b) => a - b;
// const multiply = (a, b) => a * b;
// const divide = (a = 1, b = 1) => a / b;

// // Funcionalidad de la tecla "="
// const resultado = document.getElementById("resultado")
// resultado.addEventListener("click", () => {
//     valoresOperacion.push(convertToNumber(value));

//     const primerValorOp = valoresOperacion[0]
//     const segundoValorOp = valoresOperacion[1]
    
//     function operateValues(operation){
//         if (operation == multiply || operation == divide){
//             resultadoOperacion = parseFloat(operation(primerValorOp, segundoValorOp).toFixed(5));

//         } else {
//             function getMaxDecimalLength(value1, value2){
//                 function getDecimalLength(num) {
//                     const numStr = String(num);
//                     if (numStr.includes(".")){
//                         return numStr.split(".")[1].length
//                     }
//                     return 0;
//                 }
        
//                 primerValor = getDecimalLength(value1)
//                 segundoValor = getDecimalLength(value2)
        
//                 return (primerValor > segundoValor) ? primerValor : segundoValor;        
//             }

//             const maxLength = getMaxDecimalLength(primerValorOp, segundoValorOp)        
//             resultadoOperacion = operation(primerValorOp, segundoValorOp).toFixed(maxLength);
//         }
//     }
    
//     //Operaciones en función de la tecla seleccionada
//     if (operacionSeleccionada == undefined) {
//         return pantalla.textContent = "0";
//     } 
    
//     (operacionSeleccionada == "suma") ? operateValues(add)
//     : (operacionSeleccionada == "resta") ? operateValues(substract)
//     : (operacionSeleccionada == "multiplicacion") ? operateValues(multiply)
//     : (operacionSeleccionada == "division") ? operateValues(divide)
//     : resultadoOperacion = value; //If "=" is pressed after an operator
    
//     //Muestra resultado final en pantalla y resetea variables
//     pantalla.textContent = convertToString(primerValorOp) + simbolo + convertToString(segundoValorOp) + resultado.textContent + convertToString(resultadoOperacion);
//     valoresOperacion = [];
//     value = "";
//     wasClicked = true;

// })

// // Borra todas las variables
// const btnAC = document.getElementById("btnAllClear")
// btnAC.addEventListener("click", () => {
//     value = undefined;
//     valoresOperacion = []
//     pantalla.textContent = "0";
// })

// // Botón borrar un dígito
// //!! Sólo funciona si no se ha utilizado el operador
// const btnErase = document.getElementById("btnErase")
// btnErase.addEventListener("click", () => {
//     if(value.length == 1){
//         value = undefined;
//         pantalla.textContent = "0"

//     } else {
//         value = value.slice(0, -1);
//         pantalla.textContent = pantalla.textContent.slice(0, -1);
    
//     }
// })