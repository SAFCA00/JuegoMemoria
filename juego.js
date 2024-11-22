// Declaracion de variables
let tarjetasAbiertas = 0;
let tj1 = null;
let tj2 = null;
let primRes = null;
let segRes = null;
let movimientos = 0;
let aciertos = 0;
let tiempo = false;
let timer = 60;
let timerInicial = timer;
let tiempoRegresivoId = null;

// Get Element de HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("tiempo_restante");

// Mezclar tarjetas
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => Math.random() - 0.5);

// Contar el tiempo mediante funcion
function contTiempo() {
    if (tiempoRegresivoId) return;
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;

        if (timer === 0) {
            clearInterval(tiempoRegresivoId);
            tiempoRegresivoId = null;
            bloqTarjetas();
            // Reiniciar Juego
            setTimeout(() => {
                resetearJuego();
            }, 3000);
        }
    }, 1000);
}

// Bloquear tarjetas mediante funcion
function bloqTarjetas() {
    for (let i = 0; i < 16; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[i]}.jpg" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
}

//Tarjetas mediante fncion
function desTarjetas(id) {
    if (!tiempo) {
        contTiempo();
        tiempo = true;
    }

    tarjetasAbiertas++;
    if (tarjetasAbiertas === 1) {
        tj1 = document.getElementById(id);
        primRes = numeros[id];
        tj1.innerHTML = `<img src="./images/${primRes}.jpg" alt="">`;

        tj1.disabled = true;
    } else if (tarjetasAbiertas === 2) {
        tj2 = document.getElementById(id);
        segRes = numeros[id];
        tj2.innerHTML = `<img src="./images/${segRes}.jpg" alt="">`;

        tj2.disabled = true;
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primRes === segRes) {
            tarjetasAbiertas = 0;
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos === 8) {
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} `;
                mostrarTiempo.innerHTML = `¡Muy bien! Sólo tardaste ${timerInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} `;
                setTimeout(() => {
                    resetearJuego();
                }, 3000);
            }
        } else {
            setTimeout(() => {
                tj1.innerHTML = " ";
                tj2.innerHTML = " ";
                tj1.disabled = false;
                tj2.disabled = false;
                tarjetasAbiertas = 0;
            }, 800);
        }
    }
}


function resetearJuego() {
    clearInterval(tiempoRegresivoId);
    tiempoRegresivoId = null;

    tarjetasAbiertas = 0;
    tj1 = null;
    tj2 = null;
    primRes = null;
    segRes = null;
    movimientos = 0;
    aciertos = 0;
    tiempo = false;
    timer = timerInicial;

    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;

    numeros = numeros.sort(() => Math.random() - 0.5);
    for (let i = 0; i < 16; i++) {
        let tarjeta = document.getElementById(i);
        tarjeta.innerHTML = " ";
        tarjeta.disabled = false;
    }
}


