function mostrarPantallaError(mensajeError, idPantallaRetorno) {
    document.getElementById("errorMensaje").textContent = mensajeError;
    pantallaRetorno = idPantallaRetorno;
    mostrarPantalla("pantallaError");
}

function mostrarEnDesarrollo(idPantallaRetorno) {
    mostrarPantallaError("Esta funcion todavia esta en desarrollo.", idPantallaRetorno);
}
