function mostrarPantallaComprobante() {
    mostrarPantalla("pantallaComprobante");
}

function procesarimprimirComprobante() {
    imprimirComprobante(cajero.imprimirComprobanteConsultaDeSaldo(cajero.ultimaOperacion.ultimaOperacion, cajero.ultimaOperacion.info));
}

manejadoresFormulario.imprimirComprobanteConsultaDeSaldo = procesarimprimirComprobante;
