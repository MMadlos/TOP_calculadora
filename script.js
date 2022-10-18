// Operations

const add = (a = 0, b = 0) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let operator = operate => operate;

// Variables globales
const pantalla = document.getElementById("resultadoActual");
const tecladoNumerico = document.querySelectorAll("#tecladoNumerico > div")

const suma = document.getElementById("suma")
const resultado = document.getElementById("resultado")

let wasClicked = false; // Para saber si ha pulsado "=" y empezar una nueva operación
let value; // Para guardar el valor para la operación
let valoresOperacion = []; // Para guardar los números a operar
let resultadoOperacion; // Para 


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
        if (value.length == 1 && tecla.textContent == "0") {
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
suma.addEventListener("click", () => { 
    if (pantalla.textContent.includes(suma.textContent)){
        return
    } else {
        valoresOperacion.push(Number(value.replace(",", ".")));
        pantalla.textContent += suma.textContent;
        
        value = "";
    }

    

})

// Funcinoalidad de la tecla "=" con la suma
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
    

    primerValor = getDecimalLength(valoresOperacion[0])
    segundoValor = getDecimalLength(valoresOperacion[1])

    function getMaxLength(a, b = 0) {
        return (a > b) ? a : b;
    }

    resultadoOperacion = add(valoresOperacion[0], valoresOperacion[1]).toFixed(getMaxLength(primerValor, segundoValor));

    pantalla.textContent += resultado.textContent + String(resultadoOperacion).replace(".", ",");

    valoresOperacion = [];
    value = "";
    wasClicked = true;

})