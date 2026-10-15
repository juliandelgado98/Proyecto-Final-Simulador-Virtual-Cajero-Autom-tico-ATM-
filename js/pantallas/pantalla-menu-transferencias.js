function mostrarPantallaMenuTransferencias() {
    mostrarPantalla("pantallaTransferencias");
}

function renderizarHistorial() {
    const itemsHistorial = cajero.historialTransferencias.map((transferencia) => {
        return crearItemLista(
            `Transferencia por ${transferencia.metodo}`,
            `${transferencia.destinatario} - ${transferencia.fecha}`,
            formatearMoneda(transferencia.monto)
        );
    });
    renderizarLista("listaHistorial", "Todavía no realizó transferencias.", itemsHistorial);
}

function procesarTransferenciaCbu(formulario) {
    const montoATransferir = leerMonto("inputMontoCbu");
    const destinatarioCBU = leerTexto("inputCbu");

    if (!cajero.transferirDineroCBU(montoATransferir, destinatarioCBU)) {
        mostrarErrorFormulario(formulario, cajero.motivoRechazo);
        return;
    }
    mostrarResultado(
        "Transferencia realizada",
        `Se transfirieron ${formatearMoneda(montoATransferir)} al CBU ${destinatarioCBU}.`,
        "pantallaTransferencias"
    );
}

function procesarTransferenciaAlias(formulario) {
    const montoATransferir = leerMonto("inputMontoAlias");
    const destinatarioAlias = leerTexto("inputAlias");

    if (!cajero.transferirDineroAlias(montoATransferir, destinatarioAlias)) {
        mostrarErrorFormulario(formulario, cajero.motivoRechazo);
        return;
    }
    mostrarResultado(
        "Transferencia realizada",
        `Se transfirieron ${formatearMoneda(montoATransferir)} al alias ${destinatarioAlias}.`,
        "pantallaTransferencias"
    );
}

renderizadoresPantalla.pantallaHistorial = renderizarHistorial;
manejadoresFormulario.transferirCbu = procesarTransferenciaCbu;
manejadoresFormulario.transferirAlias = procesarTransferenciaAlias;
