function mostrarPantallaLogin() {
    mostrarPantalla("pantallaLogin");
    mostrarClave();
}

function procesarLogin(formulario) {
    const pinIngresado = leerTexto("inputPin");

    if (cajero.validarPIN(pinIngresado)) {
        mostrarPantallaMenuPrincipal();
        return;
    }
    if (cajero.superoIntentosPermitidos()) {
        expulsarPorExcesoDeIntentos();
        return;
    }
    mostrarErrorFormulario(formulario, cajero.motivoRechazo);
}

manejadoresFormulario.validarPin = procesarLogin;
