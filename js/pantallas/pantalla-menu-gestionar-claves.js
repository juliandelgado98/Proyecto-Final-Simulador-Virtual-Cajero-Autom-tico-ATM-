function mostrarPantallaMenuGestionarClaves() {
    mostrarPantalla("pantallaGestionarClaves");
}

function procesarCambioDeClave(formulario) {
    const claveActual = leerTexto('inputClaveActual');
    const claveNueva = leerTexto('inputClaveNueva');
    const confirmarClave = leerTexto('inputClaveConfirmar');

        if (!cajero.gestionarClaves(claveActual, claveNueva, confirmarClave)) {
        mostrarErrorFormulario(formulario, cajero.motivoRechazo);
        return;
    }

    mostrarPantallaExito(
        "Se modificó su Clave Personal con éxito",
        "pantallaEspera",
    );
}


manejadoresFormulario.gestionarClaves = procesarCambioDeClave;
