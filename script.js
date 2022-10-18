// Operations

/* const add = (a = 0, b = 0) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let operator = operate => operate; */

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



// Ejemplo particular con la suma
const suma = document.getElementById("suma")

// suma.addEventListener("click", () => { 
//     if (pantalla.textContent.includes(suma.textContent)){
//         return
//     } else {
//         valoresOperacion.push(Number(value.replace(",", ".")));
//         pantalla.textContent = String(valoresOperacion[0]).replace(".", ",") + suma.textContent;
        
//         value = "";
//     }
// })

// FALTA GENERALIZAR AL RESTO DE OPERACIONES
const add = (a = 0, b = 0) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let operator = operate => operate;

const operadores = document.querySelectorAll(".operadores > div")
let operacionSeleccionada;

operadores.forEach(tecla => {
    tecla.addEventListener("click", () => {
        if(tecla.id == "suma"){
            if (!pantalla.textContent.includes(suma.textContent)){
                valoresOperacion.push(Number(value.replace(",", ".")));
                pantalla.textContent = String(valoresOperacion[0]).replace(".", ",") + suma.textContent;                
                value = "";
                operacionSeleccionada = "suma"
            }
        }
        if(tecla.id == "resta"){
            if (!pantalla.textContent.includes(suma.textContent)){
                valoresOperacion.push(Number(value.replace(",", ".")));
                pantalla.textContent = String(valoresOperacion[0]).replace(".", ",") + resta.textContent;                
                value = "";
                operacionSeleccionada = "resta"
            }
        }
    })
})

// Funcinoalidad de la tecla "=" con la suma
const resultado = document.getElementById("resultado")

resultado.addEventListener("click", () => {
    valoresOperacion.push(Number(value.replace(",", ".")));

    // Contar decimales de los valores
    function getDecimalLength(num) {
        const numStr = String(num);
        if (numStr.includes(".")){
            return numStr.split(".")[1].length
        }

        return 0;
    }
    
    function getMaxLength(a, b = 0) {
        return (a > b) ? a : b;
    }

    const primerValor = getDecimalLength(valoresOperacion[0])
    const segundoValor = getDecimalLength(valoresOperacion[1])
    const maxLength = getMaxLength(primerValor, segundoValor);

    if (operacionSeleccionada == "suma"){
        resultadoOperacion = add(valoresOperacion[0], valoresOperacion[1]).toFixed(maxLength);
    }

    if (operacionSeleccionada == "resta"){
        resultadoOperacion = substract(valoresOperacion[0], valoresOperacion[1]).toFixed(maxLength);
    }


    pantalla.textContent += resultado.textContent + String(resultadoOperacion).replace(".", ",");
    valoresOperacion = [];
    value = "";
    wasClicked = true;

})

// Botón borrar todo
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