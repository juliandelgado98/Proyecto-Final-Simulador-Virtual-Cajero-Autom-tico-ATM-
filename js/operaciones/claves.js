// pendiente: gestionarClaves
function verificarSesion(estado, sesion) {
    if (!estado || !sesion) { mostrarPantallaError('Error: Su sesión expiró, iniciar sesión nuevamente', 'pantallaLogin');
    throw new Error('Error: sesión no iniciada');
    }
}

Object.assign(CajeroAutomatico.prototype, {
    gestionarClaves(claveActual, nuevaClave, confirmarClave) {
        verificarSesion(this.estadoTarjeta, this.sesionActiva);
        if (claveActual.length !== LARGO_PIN) {
            this.motivoRechazo = `La clave actual debe tener ${LARGO_PIN} dígitos.`;
            return false;
        }
        if (claveActual !== this.claveUsuario) {
            this.intentosPin += 1;
            const intentosRestantes = INTENTOS_MAXIMOS_PIN - this.intentosPin;

            this.motivoRechazo = intentosRestantes <= 0
                ? "Supero la cantidad de intentos permitidos."
                : `Su clave actual es incorrecta. Intentos restantes: ${intentosRestantes}.`;
            return false;
        }
        if (nuevaClave.length !== LARGO_PIN) {
            this.motivoRechazo = `La clave nueva debe tener ${LARGO_PIN} dígitos.`;
            return false;
        }
        if (nuevaClave === this.claveUsuario) {
            this.motivoRechazo = 'La clave nueva no puede ser igual a la clave anterior';
            return false;
        }
        if (confirmarClave.length !== LARGO_PIN) {
            this.motivoRechazo = `La clave a confirmar debe tener ${LARGO_PIN} dígitos.`;
            return false;
        }
        if (nuevaClave !== confirmarClave ) {
            this.motivoRechazo = 'este campo debe contener la clave nueva';
            return false;
        }
        this.claveUsuario = nuevaClave;
        return true;
    }
});