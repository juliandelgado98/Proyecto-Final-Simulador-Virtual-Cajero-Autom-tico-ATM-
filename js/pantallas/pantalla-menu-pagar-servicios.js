function mostrarPantallaMenuPagarServicios() {
    mostrarPantalla("pantallaPagos");
}

function renderizarUltimosPagos() {
    const itemsPagos = cajero.ultimosPagos.map((pago) => {
        return crearItemLista(
            `${pago.tipo}: ${pago.detalle}`,
            pago.fecha,
            formatearMoneda(pago.monto)
        );
    });
    renderizarLista("listaUltimosPagos", "Todavía no realizó pagos.", itemsPagos);
}

function renderizarProximosVencimientos() {
    const itemsVencimientos = cajero.proximosVencimientos.map((vencimiento) => {
        return crearItemLista(
            vencimiento.servicio,
            `Vence el ${vencimiento.vencimiento}`,
            formatearMoneda(vencimiento.monto)
        );
    });
    renderizarLista(
        "listaProximosVencimientos",
        "No tiene vencimientos próximos.",
        itemsVencimientos
    );
}

function procesarPagoServicio(formulario) {
    const montoAPagar = leerMonto("inputMontoServicio");
    const servicioAPagar = document.getElementById("selectServicio").value;

    if (!cajero.pagarServicios(montoAPagar, servicioAPagar)) {
        mostrarErrorFormulario(formulario, cajero.motivoRechazo);
        return;
    }
    mostrarResultado(
        "Pago realizado",
        `Se pagaron ${formatearMoneda(montoAPagar)} a ${servicioAPagar}.`,
        "pantallaPagos"
    );
}

function procesarRecargaCelular(formulario) {
    const montoARecargar = leerMonto("inputMontoCelular");
    const numeroDestino = leerTexto("inputNumeroCelular");

    if (!cajero.recargarCredito(montoARecargar, numeroDestino, "Recarga de celular")) {
        mostrarErrorFormulario(formulario, cajero.motivoRechazo);
        return;
    }
    mostrarResultado(
        "Recarga realizada",
        `Se recargaron ${formatearMoneda(montoARecargar)} al celular ${numeroDestino}.`,
        "pantallaPagos"
    );
}

function procesarRecargaSube(formulario) {
    const montoARecargar = leerMonto("inputMontoSube");
    const numeroDestino = leerTexto("inputNumeroSube");

    if (!cajero.recargarCredito(montoARecargar, numeroDestino, "Recarga SUBE")) {
        mostrarErrorFormulario(formulario, cajero.motivoRechazo);
        return;
    }
    mostrarResultado(
        "Recarga realizada",
        `Se recargaron ${formatearMoneda(montoARecargar)} a la SUBE ${numeroDestino}.`,
        "pantallaPagos"
    );
}

renderizadoresPantalla.pantallaUltimosPagos = renderizarUltimosPagos;
renderizadoresPantalla.pantallaProximosVencimientos = renderizarProximosVencimientos;
manejadoresFormulario.pagarServicio = procesarPagoServicio;
manejadoresFormulario.recargarCelular = procesarRecargaCelular;
manejadoresFormulario.recargarSube = procesarRecargaSube;
