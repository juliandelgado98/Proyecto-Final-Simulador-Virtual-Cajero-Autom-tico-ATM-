function mostrarPantallaComprobante() {
    mostrarPantalla("pantallaComprobante");
}

function procesarImprimirComprobante() {
    if (!cajero.imprimirComprobante()) {
        mostrarPantallaError(cajero.motivoRechazo, pantallaRetorno);
        return;
    }
    mostrarComprobanteEnImpresora(cajero.comprobanteEmitido);
    mostrarPantallaExito("Retire su comprobante de la impresora.", pantallaRetorno);
}

manejadoresFormulario.imprimirComprobante = procesarImprimirComprobante;
