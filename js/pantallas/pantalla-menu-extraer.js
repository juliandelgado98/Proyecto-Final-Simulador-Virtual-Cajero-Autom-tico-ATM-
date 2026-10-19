let temporizadorExtraccion = null;

function mostrarPantallaMenuExtraer() {
    mostrarPantalla("pantallaExtraer");
}

function finalizarExtraccion(montoAExtraer) {
    const pantallaActiva = obtenerPantallaActiva();

    if (pantallaActiva === null || pantallaActiva.id !== "pantallaProceso") {
        return;
    }
    if (!cajero.extraerEfectivo(montoAExtraer)) {
        mostrarPantallaError(cajero.motivoRechazo, "pantallaExtraer");
        return;
    }
    mostrarBilletesEnBandeja(cajero.billetesEntregados);
    mostrarResultado(
        "Extracción realizada",
        `Retire su dinero de la bandeja: ${formatearMoneda(montoAExtraer)}.`,
        "pantallaInicio"
    );
}

function iniciarExtraccion(montoAExtraer) {
    if (!cajero.validarExtraccion(montoAExtraer)) {
        mostrarPantallaError(cajero.motivoRechazo, "pantallaExtraer");
        return;
    }
    vaciarBandejaBilletes();
    mostrarPantallaProceso("Contando billetes...");
    clearTimeout(temporizadorExtraccion);
    temporizadorExtraccion = setTimeout(
        () => finalizarExtraccion(montoAExtraer),
        TIEMPO_PROCESO_MS
    );
}

function procesarExtraccion(datos) {
    iniciarExtraccion(Number(datos.monto));
}

function procesarExtraccionOtroMonto(formulario) {
    const montoAExtraer = leerMonto("inputMontoExtraccion");

    if (!cajero.validarExtraccion(montoAExtraer)) {
        mostrarErrorFormulario(formulario, cajero.motivoRechazo);
        return;
    }
    iniciarExtraccion(montoAExtraer);
}

accionesBoton.extraerEfectivo = procesarExtraccion;
manejadoresFormulario.extraerOtroMonto = procesarExtraccionOtroMonto;
