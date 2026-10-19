const { assert, grupo, probar, crearCajeroConSesion } = require("./ayudas");

grupo("Transferencias, pagos y recargas");

probar("esCbuValido acepta 22 dígitos y rechaza el resto", () => {
    const { logica } = crearCajeroConSesion();

    assert.strictEqual(logica.esCbuValido("1".repeat(22)), true);
    assert.strictEqual(logica.esCbuValido("1".repeat(21)), false);
    assert.strictEqual(logica.esCbuValido("1".repeat(21) + "a"), false);
});

probar("esAliasValido pide tres palabras separadas por puntos", () => {
    const { logica } = crearCajeroConSesion();

    assert.strictEqual(logica.esAliasValido("mi.alias.prueba"), true);
    assert.strictEqual(logica.esAliasValido("alias"), false);
    assert.strictEqual(logica.esAliasValido("solo.dos"), false);
});

probar("transferir por CBU descuenta el saldo y llena el historial", () => {
    const { logica, cajero } = crearCajeroConSesion();

    assert.strictEqual(cajero.transferirDineroCBU(1000, "1".repeat(22)), true);
    assert.strictEqual(cajero.saldoDisponibleCuentaActual, logica.SALDO_INICIAL - 1000);
    assert.strictEqual(cajero.historialTransferencias[0].metodo, "CBU");
});

probar("un CBU inválido no modifica el saldo", () => {
    const { logica, cajero } = crearCajeroConSesion();

    assert.strictEqual(cajero.transferirDineroCBU(1000, "123"), false);
    assert.strictEqual(cajero.saldoDisponibleCuentaActual, logica.SALDO_INICIAL);
});

probar("transferir por alias queda registrado como transferencia por alias", () => {
    const { cajero } = crearCajeroConSesion();

    assert.strictEqual(cajero.transferirDineroAlias(500, "mi.alias.prueba"), true);
    assert.strictEqual(cajero.ultimaOperacion.nombreOperacion, "Transferencia por Alias");
    assert.ok(cajero.ultimaOperacion.info.includes("alias"));
});

probar("no se puede transferir más que el saldo disponible", () => {
    const { logica, cajero } = crearCajeroConSesion();

    const montoExcesivo = logica.SALDO_INICIAL + 1;

    assert.strictEqual(cajero.transferirDineroAlias(montoExcesivo, "mi.alias.prueba"), false);
    assert.ok(cajero.motivoRechazo.includes("Saldo insuficiente"));
});

probar("pagar un servicio descuenta el saldo y lo anota en los últimos pagos", () => {
    const { logica, cajero } = crearCajeroConSesion();

    assert.strictEqual(cajero.pagarServicios(500, "Luz"), true);
    assert.strictEqual(cajero.saldoDisponibleCuentaActual, logica.SALDO_INICIAL - 500);
    assert.strictEqual(cajero.ultimosPagos.length, 1);
});

probar("pagar un servicio sin elegirlo se rechaza", () => {
    const { cajero } = crearCajeroConSesion();

    assert.strictEqual(cajero.pagarServicios(500, "   "), false);
});

probar("recargar crédito registra la operación con acento", () => {
    const { cajero } = crearCajeroConSesion();

    assert.strictEqual(cajero.recargarCredito(200, "2236001234"), true);
    assert.strictEqual(cajero.ultimaOperacion.nombreOperacion, "Recarga de crédito");
});

probar("descontarSaldo redondea a dos decimales", () => {
    const { cajero } = crearCajeroConSesion();

    cajero.saldoDisponibleCuentaActual = 100.1;
    cajero.descontarSaldo(0.2);
    assert.strictEqual(cajero.saldoDisponibleCuentaActual, 99.9);
});
