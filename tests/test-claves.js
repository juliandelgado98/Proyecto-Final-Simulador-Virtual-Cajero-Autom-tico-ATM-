const { assert, grupo, probar, crearCajero, crearCajeroConSesion } = require("./ayudas");

grupo("Cambio de clave");

probar("cambia la clave cuando todos los datos son correctos", () => {
    const { logica, cajero } = crearCajeroConSesion();

    assert.strictEqual(cajero.gestionarClaves(logica.PIN_USUARIO_PRUEBA, "5678", "5678"), true);
    assert.strictEqual(cajero.claveUsuario, "5678");
});

probar("la clave nueva sirve para el próximo login y la vieja deja de servir", () => {
    const { logica, cajero } = crearCajeroConSesion();

    cajero.gestionarClaves(logica.PIN_USUARIO_PRUEBA, "5678", "5678");
    cajero.expulsarTarjeta();
    cajero.detectarTarjeta();
    assert.strictEqual(cajero.validarPIN(logica.PIN_USUARIO_PRUEBA), false);
    assert.strictEqual(cajero.validarPIN("5678"), true);
});

probar("una clave actual incorrecta suma un intento y no cambia nada", () => {
    const { logica, cajero } = crearCajeroConSesion();

    assert.strictEqual(cajero.gestionarClaves("0000", "5678", "5678"), false);
    assert.strictEqual(cajero.intentosPin, 1);
    assert.strictEqual(cajero.claveUsuario, logica.PIN_USUARIO_PRUEBA);
});

probar("tras tres claves actuales incorrectas se supera el límite de intentos", () => {
    const { cajero } = crearCajeroConSesion();

    cajero.gestionarClaves("0000", "5678", "5678");
    cajero.gestionarClaves("0000", "5678", "5678");
    cajero.gestionarClaves("0000", "5678", "5678");
    assert.strictEqual(cajero.superoIntentosPermitidos(), true);
    assert.ok(cajero.motivoRechazo.includes("Superó"));
});

probar("rechaza una clave nueva con letras", () => {
    const { logica, cajero } = crearCajeroConSesion();

    assert.strictEqual(cajero.gestionarClaves(logica.PIN_USUARIO_PRUEBA, "56a8", "56a8"), false);
    assert.ok(cajero.motivoRechazo.includes("números"));
});

probar("rechaza una clave nueva igual a la actual", () => {
    const { logica, cajero } = crearCajeroConSesion();
    const claveActual = logica.PIN_USUARIO_PRUEBA;

    assert.strictEqual(cajero.gestionarClaves(claveActual, claveActual, claveActual), false);
    assert.ok(cajero.motivoRechazo.includes("igual"));
});

probar("rechaza si la repetición no coincide", () => {
    const { logica, cajero } = crearCajeroConSesion();

    assert.strictEqual(cajero.gestionarClaves(logica.PIN_USUARIO_PRUEBA, "5678", "5679"), false);
    assert.ok(cajero.motivoRechazo.includes("no coinciden"));
});

probar("sin sesión devuelve false con un motivo, sin lanzar errores", () => {
    const { logica, cajero } = crearCajero();

    assert.doesNotThrow(() => cajero.gestionarClaves(logica.PIN_USUARIO_PRUEBA, "5678", "5678"));
    assert.strictEqual(cajero.gestionarClaves(logica.PIN_USUARIO_PRUEBA, "5678", "5678"), false);
    assert.ok(cajero.motivoRechazo.includes("sesión"));
});

probar("un cambio exitoso reinicia el contador de intentos", () => {
    const { logica, cajero } = crearCajeroConSesion();

    cajero.gestionarClaves("0000", "5678", "5678");
    cajero.gestionarClaves(logica.PIN_USUARIO_PRUEBA, "5678", "5678");
    assert.strictEqual(cajero.intentosPin, 0);
});
