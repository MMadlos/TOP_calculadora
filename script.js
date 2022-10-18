// Operations

const add = (a, b = 0) => a + b;
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
        
        // Ver si tiene una coma para no poder añadir más comas

        if(value.includes(",") && tecla.textContent == ",") {
            alert("There's already a comma")
            return
        }

        value += tecla.textContent;
        pantalla.textContent += tecla.textContent;
    })
})



// Ejemplo particular con la suma
suma.addEventListener("click", () => { 
    valoresOperacion.push(Number(value.replace(",", ".")));
    pantalla.textContent += suma.textContent;
    
    value = "";

})

// Funcinoalidad de la tecla "=" con la suma
resultado.addEventListener("click", () => {
    valoresOperacion.push(Number(value.replace(",", ".")));
    resultadoOperacion = operator(add(valoresOperacion[0], valoresOperacion[1]))
    pantalla.textContent += resultado.textContent + String(resultadoOperacion).replace(".", ",");

    valoresOperacion = [];
    value = "";
    wasClicked = true;

})


//TEST
