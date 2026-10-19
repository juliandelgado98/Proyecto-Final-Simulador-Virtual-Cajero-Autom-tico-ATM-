function esCbuValido(destinatarioCBU) {
    return typeof destinatarioCBU === "string" && /^\d{22}$/.test(destinatarioCBU);
}

function esAliasValido(destinatarioAlias) {
    return typeof destinatarioAlias === "string"
        && /^[A-Za-z0-9]+(\.[A-Za-z0-9]+){2}$/.test(destinatarioAlias);
}

function esTextoNoVacio(texto) {
    return typeof texto === "string" && texto.trim() !== "";
}

function esPinNumerico(textoPin) {
    return /^\d+$/.test(textoPin);
}

Object.assign(CajeroAutomatico.prototype, {
    validarOperacion(montoOperacion) {
        if (!this.estadoTarjeta) {
            this.motivoRechazo = "La tarjeta se encuentra inhabilitada.";
            return false;
        }
        if (!this.sesionActiva) {
            this.motivoRechazo = "No hay una sesión activa.";
            return false;
        }
        if (typeof montoOperacion !== "number" || !Number.isFinite(montoOperacion)) {
            this.motivoRechazo = "Ingrese un monto válido.";
            return false;
        }
        if (montoOperacion <= 0) {
            this.motivoRechazo = "El monto debe ser mayor a cero.";
            return false;
        }
        if (montoOperacion > this.saldoDisponibleCuentaActual) {
            this.motivoRechazo = "Saldo insuficiente para realizar la operación.";
            return false;
        }
        return true;
    }
});
