function mostrarPantallaEspera() {
    mostrarPantalla("pantallaEspera");
}

function insertarTarjeta() {
    if (cajero.detectarTarjeta()) {
        mostrarPantallaLogin();
    }
}

function salirDelCajero() {
    cajero.expulsarTarjeta();
    mostrarPantalla("pantallaSalida");
}

accionesBoton.insertarTarjeta = insertarTarjeta;
accionesBoton.salir = salirDelCajero;
accionesBoton.nuevaSesion = mostrarPantallaEspera;
