function mostrarPantallaError(mensajeError, idPantallaRetorno) {
    document.getElementById("errorMensaje").textContent = mensajeError;
    pantallaRetorno = idPantallaRetorno;
    mostrarPantalla("pantallaError");
}

function expulsarPorExcesoDeIntentos() {
    const motivoDeExpulsion = cajero.motivoRechazo;

    cajero.expulsarTarjeta();
    mostrarPantallaError(motivoDeExpulsion, "pantallaSalida");
}
