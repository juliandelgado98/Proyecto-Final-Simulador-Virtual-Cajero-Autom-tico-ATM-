function mostrarPantallaMenuGestionarClaves() {
    mostrarPantalla("pantallaGestionarClaves");
}

function procesarCambioDeClave(formulario) {
    const claveActual = leerTexto("inputClaveActual");
    const claveNueva = leerTexto("inputClaveNueva");
    const confirmarClave = leerTexto("inputClaveConfirmar");

    if (!cajero.gestionarClaves(claveActual, claveNueva, confirmarClave)) {
        if (cajero.superoIntentosPermitidos()) {
            expulsarPorExcesoDeIntentos();
            return;
        }
        mostrarErrorFormulario(formulario, cajero.motivoRechazo);
        return;
    }
    mostrarPantallaExito("Se modificó su clave personal con éxito.", "pantallaInicio");
}

manejadoresFormulario.gestionarClaves = procesarCambioDeClave;
