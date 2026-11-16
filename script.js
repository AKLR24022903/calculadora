//Donde veremos el resultado
const display = document.getElementById("display");
//VARIABLES PARA ALMACENAR
let valorActual = "";
let valorAnterior = "";
let operacionActual = null;

// 1. CONSTANTES DE OPERACIONES
const operaciones = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => b === 0 ? "Error" : a / b,
    "%": (a, b) => a * (b / 100),
};

// 2. Colocar numeros en pantalla con click
for (let i = 0; i <= 9; i++) {
    document.getElementById(`num${i}`).addEventListener("click", () => {
        valorActual += i.toString();
        display.value = valorActual;
    });
}

//  Operadores (se me asimila a un diccionario en python)
const botonesOperacion = [
    { id: "sum", simbolo: "+" },
    { id: "rest", simbolo: "-" },
    { id: "mult", simbolo: "*" },
    { id: "divide", simbolo: "/" },
    { id: "porcentaje", simbolo: "%" },
];

botonesOperacion.forEach(btn => {
    document.getElementById(btn.id).addEventListener("click", () => {
        if (valorActual === "") return;
        if (valorAnterior !== "") calcular(); // Permite encadenar operaciones
        
        operacionActual = btn.simbolo;
        valorAnterior = valorActual;
        valorActual = "";
    });
});

// 4. Calcular resultado
function calcular() {
    if (operacionActual === null || valorActual === "" || valorAnterior === "") return;

    const num1 = parseFloat(valorAnterior);//cadena de texto a numero flotante
    const num2 = parseFloat(valorActual);
    const resultado = operaciones[operacionActual](num1, num2);

    display.value = resultado;
    valorActual = resultado === "Error" ? "" : resultado.toString();
    valorAnterior = "";
    operacionActual = null;
}
document.getElementById("punto").addEventListener("click", () => {
    if (valorActual === "") {
        valorActual = "0.";
    } else if (!valorActual.includes(".")) {
        valorActual += ".";
        actualizarDisplay(valorActual);
    }
}); //Permite colocar . en el numero y no se repita usando la propiedad includes.

document.getElementById("raiz").addEventListener("click", () => {
    if (valorActual === ""){
        return;
    }
    let numero = parseFloat(valorActual);
    if (numero < 0) {
        display.value = "Error";
        valorActual = "";
    } else {
        let resultado = Math.sqrt(numero); //Para que permita la operacion de raiz en pantalla
        display.value = resultado;
        valorActual = resultado.toString();
    }
//Evitamos el error si se trata de realizar una raiz de un numero negativo, ya que no se puede realizar la operacion.
});
document.getElementById("igual").addEventListener("click", calcular);

//  Limpiar pantalla y variables
document.getElementById("limpiar").addEventListener("click", () => {
    valorActual = "";
    valorAnterior = "";
    operacionActual = null;
    display.value = "";
});
//  Borrar último dígito pero vuelve a 0 si no hay nada
document.getElementById("borrar").addEventListener("click", () => {
    valorActual = valorActual.slice(0, -1);
   if (valorActual === "") {
        display.value = "0";
    }else {
        display.value = valorActual;
    }
});