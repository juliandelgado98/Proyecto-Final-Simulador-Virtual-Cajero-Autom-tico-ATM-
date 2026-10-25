Object.assign(CajeroAutomatico.prototype, {
    gestionarClaves(claveActual, nuevaClave, confirmarClave) {
        if (!this.estadoTarjeta || !this.sesionActiva) {
            this.motivoRechazo = "Su sesión expiró. Inicie sesión nuevamente.";
            return false;
        }
        if (claveActual.length !== LARGO_PIN) {
            this.motivoRechazo = `La clave actual debe tener ${LARGO_PIN} dígitos.`;
            return false;
        }
        if (claveActual !== this.claveUsuario) {
            this.intentosPin += 1;
            const intentosRestantes = INTENTOS_MAXIMOS_PIN - this.intentosPin;

            this.motivoRechazo = intentosRestantes <= 0
                ? "Superó la cantidad de intentos permitidos."
                : `Su clave actual es incorrecta. Intentos restantes: ${intentosRestantes}.`;
            return false;
        }
        if (!esPinNumerico(nuevaClave) || nuevaClave.length !== LARGO_PIN) {
            this.motivoRechazo = `La clave nueva debe tener ${LARGO_PIN} números.`;
            return false;
        }
        if (nuevaClave === this.claveUsuario) {
            this.motivoRechazo = "La clave nueva no puede ser igual a la actual.";
            return false;
        }
        if (nuevaClave !== confirmarClave) {
            this.motivoRechazo = "La clave nueva y su repetición no coinciden.";
            return false;
        }
        this.claveUsuario = nuevaClave;
        this.intentosPin = 0;
        this.motivoRechazo = "";
        return true;
    }
});
