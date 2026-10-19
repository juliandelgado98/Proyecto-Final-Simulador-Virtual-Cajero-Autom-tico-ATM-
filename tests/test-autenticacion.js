const { assert, grupo, probar, crearCajero, crearCajeroConSesion } = require("./ayudas");

grupo("Tarjeta y autenticación");

probar("detectarTarjeta habilita la tarjeta", () => {
    const { cajero } = crearCajero();

    assert.strictEqual(cajero.estadoTarjeta, false);
    cajero.detectarTarjeta();
    assert.strictEqual(cajero.estadoTarjeta, true);
});

probar("un PIN correcto inicia la sesión", () => {
    const { logica, cajero } = crearCajero();

    cajero.detectarTarjeta();
    assert.strictEqual(cajero.validarPIN(logica.PIN_USUARIO_PRUEBA), true);
    assert.strictEqual(cajero.sesionActiva, true);
});

probar("un PIN incorrecto suma un intento e informa los restantes", () => {
    const { cajero } = crearCajero();

    cajero.detectarTarjeta();
    assert.strictEqual(cajero.validarPIN("0000"), false);
    assert.strictEqual(cajero.intentosPin, 1);
    assert.ok(cajero.motivoRechazo.includes("Intentos restantes: 2"));
    assert.strictEqual(cajero.sesionActiva, false);
});

probar("al tercer PIN incorrecto se supera el límite de intentos", () => {
    const { logica, cajero } = crearCajero();

    cajero.detectarTarjeta();
    for (let intento = 0; intento < logica.INTENTOS_MAXIMOS_PIN; intento += 1) {
        cajero.validarPIN("0000");
    }
    assert.strictEqual(cajero.superoIntentosPermitidos(), true);
    assert.ok(cajero.motivoRechazo.includes("Superó"));
});

probar("un PIN con largo incorrecto se rechaza sin contar como intento", () => {
    const { cajero } = crearCajero();

    cajero.detectarTarjeta();
    assert.strictEqual(cajero.validarPIN("12"), false);
    assert.strictEqual(cajero.intentosPin, 0);
});

probar("expulsarTarjeta cierra la sesión y reinicia los intentos", () => {
    const { cajero } = crearCajeroConSesion();

    cajero.intentosPin = 2;
    cajero.expulsarTarjeta();
    assert.strictEqual(cajero.sesionActiva, false);
    assert.strictEqual(cajero.intentosPin, 0);
});
