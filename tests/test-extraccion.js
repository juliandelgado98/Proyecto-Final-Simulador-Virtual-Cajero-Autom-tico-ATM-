const { assert, grupo, probar, crearCajero, crearCajeroConSesion } = require("./ayudas");

grupo("Extracción de efectivo");

probar("extraer descuenta el saldo de la cuenta y el efectivo del cajero", () => {
    const { logica, cajero } = crearCajeroConSesion();

    assert.strictEqual(cajero.extraerEfectivo(5000), true);
    assert.strictEqual(cajero.saldoDisponibleCuentaActual, logica.SALDO_INICIAL - 5000);
    assert.strictEqual(cajero.efectivoDisponibleCajero, logica.EFECTIVO_INICIAL_CAJERO - 5000);
});

probar("dispensarBilletes reparte el monto con los billetes más grandes primero", () => {
    const { cajero } = crearCajeroConSesion();

    cajero.extraerEfectivo(17800);
    assert.deepStrictEqual(cajero.billetesEntregados, [
        { valor: 10000, cantidad: 1 },
        { valor: 5000, cantidad: 1 },
        { valor: 2000, cantidad: 1 },
        { valor: 500, cantidad: 1 },
        { valor: 200, cantidad: 1 },
        { valor: 100, cantidad: 1 }
    ]);
});

probar("rechaza un monto que no es múltiplo del billete mínimo", () => {
    const { cajero } = crearCajeroConSesion();

    assert.strictEqual(cajero.extraerEfectivo(150), false);
    assert.ok(cajero.motivoRechazo.includes("múltiplo"));
});

probar("rechaza un monto mayor al límite por extracción", () => {
    const { logica, cajero } = crearCajeroConSesion();

    assert.strictEqual(cajero.extraerEfectivo(logica.LIMITE_EXTRACCION + 100), false);
    assert.ok(cajero.motivoRechazo.includes("máximo"));
});

probar("rechaza si el cajero no tiene efectivo suficiente", () => {
    const { cajero } = crearCajeroConSesion();

    cajero.efectivoDisponibleCajero = 500;
    assert.strictEqual(cajero.extraerEfectivo(1000), false);
    assert.ok(cajero.motivoRechazo.includes("efectivo"));
});

probar("rechaza si el saldo de la cuenta no alcanza", () => {
    const { cajero } = crearCajeroConSesion();

    cajero.saldoDisponibleCuentaActual = 300;
    assert.strictEqual(cajero.extraerEfectivo(1000), false);
    assert.ok(cajero.motivoRechazo.includes("Saldo insuficiente"));
});

probar("rechaza sin sesión activa y no modifica el saldo", () => {
    const { logica, cajero } = crearCajero();

    assert.strictEqual(cajero.extraerEfectivo(1000), false);
    assert.strictEqual(cajero.saldoDisponibleCuentaActual, logica.SALDO_INICIAL);
});

probar("una extracción exitosa queda registrada como movimiento y última operación", () => {
    const { cajero } = crearCajeroConSesion();

    cajero.extraerEfectivo(2000);
    assert.strictEqual(cajero.movimientos[0].tipo, "Extracción");
    assert.strictEqual(cajero.ultimaOperacion.nombreOperacion, "Extracción de efectivo");
});
