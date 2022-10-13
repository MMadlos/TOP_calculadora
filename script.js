// Basic functions

const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let operator = operate => operate;

// Display the number when clicking any button

function displayNum() {
    const resultadoActual = document.getElementById("resultadoActual");
    const numSeleccionado = []
    
    document
        .querySelectorAll("#tecladoNumerico > div")
        .forEach(tecla => {
            tecla.addEventListener("click", () => {
                // Si la tecla seleccionada no es un num, no hagas nada
                if (tecla.textContent == "," || tecla.textContent == "=") {
                    return
                } else {
                    // Crear una variable que recoja el número seleccionado
                    let numero = tecla.textContent;
                    
                    // Añadir el número en el array
                    numSeleccionado.push(numero);
        
                    // Mostrar array en pantalla
                    resultadoActual.textContent = numSeleccionado.join("");
                }
            })
        })
}

displayNum();

