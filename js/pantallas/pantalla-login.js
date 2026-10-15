function mostrarPantallaLogin() {
    mostrarPantalla("pantallaLogin");
}

function procesarLogin(formulario) {
    const pinIngresado = leerTexto("inputPin");

    if (cajero.validarPIN(pinIngresado)) {
        mostrarPantallaMenuPrincipal();
        return;
    }
    if (cajero.intentosPin >= INTENTOS_MAXIMOS_PIN) {
        const motivo = cajero.motivoRechazo;

        cajero.expulsarTarjeta();
        mostrarPantallaError(motivo, "pantallaSalida");
        return;
    }
    mostrarErrorFormulario(formulario, cajero.motivoRechazo);
}

manejadoresFormulario.validarPin = procesarLogin;
