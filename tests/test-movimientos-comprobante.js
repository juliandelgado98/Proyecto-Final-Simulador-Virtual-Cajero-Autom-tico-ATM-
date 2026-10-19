const { assert, grupo, probar, crearCajero, crearCajeroConSesion } = require("./ayudas");

grupo("Últimos movimientos y comprobante");

probar("solicitarUltimosMovimientos nunca devuelve más de la cantidad configurada", () => {
    const { logica, cajero } = crearCajeroConSesion();

    cajero.extraerEfectivo(1000);
    cajero.extraerEfectivo(1000);
    assert.strictEqual(
        cajero.solicitarUltimosMovimientos().length,
        logica.CANTIDAD_ULTIMOS_MOVIMIENTOS
    );
});

probar("los movimientos simulados están disponibles desde el inicio", () => {
    const { cajero } = crearCajero();

    assert.ok(cajero.solicitarUltimosMovimientos().length > 0);
});

probar("una operación nueva aparece primera en los movimientos", () => {
    const { cajero } = crearCajeroConSesion();

    cajero.transferirDineroCBU(1000, "1".repeat(22));
    assert.strictEqual(cajero.solicitarUltimosMovimientos()[0].tipo, "Transferencia");
    assert.strictEqual(cajero.solicitarUltimosMovimientos()[0].esIngreso, false);
});

probar("consultarSaldo devuelve el saldo y registra la operación", () => {
    const { logica, cajero } = crearCajeroConSesion();

    assert.strictEqual(cajero.consultarSaldo(), logica.SALDO_INICIAL);
    assert.strictEqual(cajero.ultimaOperacion.nombreOperacion, "Consulta de saldo");
    assert.ok(cajero.ultimaOperacion.info.includes(logica.formatearMoneda(logica.SALDO_INICIAL)));
});

probar("generarComprobante incluye el nombre de la operación y su detalle", () => {
    const { cajero } = crearCajeroConSesion();
    const ticket = cajero.generarComprobante("Pago de servicio", "Pago del servicio Luz.");

    assert.ok(ticket.includes("COMPROBANTE DE OPERACIÓN"));
    assert.ok(ticket.includes("Pago de servicio"));
    assert.ok(ticket.includes("Pago del servicio Luz."));
});

probar("imprimirComprobante descuenta una hoja y guarda el ticket emitido", () => {
    const { logica, cajero } = crearCajeroConSesion();

    cajero.consultarSaldo();
    assert.strictEqual(cajero.imprimirComprobante(), true);
    assert.strictEqual(cajero.cantidadPapelDisponible, logica.PAPEL_INICIAL - 1);
    assert.ok(cajero.comprobanteEmitido.includes("Consulta de saldo"));
});

probar("sin papel no se imprime y el motivo lo explica", () => {
    const { cajero } = crearCajeroConSesion();

    cajero.cantidadPapelDisponible = 0;
    assert.strictEqual(cajero.imprimirComprobante(), false);
    assert.ok(cajero.motivoRechazo.includes("papel"));
    assert.strictEqual(cajero.comprobanteEmitido, "");
});

probar("sin sesión activa no se imprime", () => {
    const { cajero } = crearCajero();

    assert.strictEqual(cajero.imprimirComprobante(), false);
});
