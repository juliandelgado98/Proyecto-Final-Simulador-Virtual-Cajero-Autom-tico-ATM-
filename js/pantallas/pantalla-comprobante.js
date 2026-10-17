function mostrarPantallaComprobante() {
    mostrarPantalla("pantallaComprobante");
}

function procesarimprimirComprobante() {
    const { nombreOperacion, info} = cajero.ultimaOperacion;
    if(cajero.cantidadPapelDisponible > 0) {
        cajero.cantidadPapelDisponible -= 1;
        imprimirComprobante(cajero.imprimirComprobanteConsultaDeSaldo(nombreOperacion, info));
    } else {
        mostrarPantallaError('Error: No pudimos procesar la solicitud', 'pantallaInicio');
    }
}

manejadoresFormulario.imprimirComprobanteConsultaDeSaldo = procesarimprimirComprobante;
