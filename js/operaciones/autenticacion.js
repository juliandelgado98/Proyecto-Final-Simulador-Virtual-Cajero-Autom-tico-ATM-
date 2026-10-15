Object.assign(CajeroAutomatico.prototype, {
    validarPIN(pinIngresado) {
        if (pinIngresado.length !== LARGO_PIN) {
            this.motivoRechazo = `La clave debe tener ${LARGO_PIN} dígitos.`;
            return false;
        }
        if (pinIngresado !== this.claveUsuario) {
            this.intentosPin += 1;
            const intentosRestantes = INTENTOS_MAXIMOS_PIN - this.intentosPin;

            this.motivoRechazo = intentosRestantes <= 0
                ? "Supero la cantidad de intentos permitidos."
                : `Clave incorrecta. Intentos restantes: ${intentosRestantes}.`;
            return false;
        }
        this.intentosPin = 0;
        this.motivoRechazo = "";
        this.iniciarSesion();
        return true;
    },

    iniciarSesion() {
        this.estadoTarjeta = true;
        this.sesionActiva = true;
    },

    cerrarSesion() {
        this.sesionActiva = false;
    }
});
