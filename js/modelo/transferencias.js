Object.assign(CajeroAutomatico.prototype, {
    registrarTransferencia(metodoTransferencia, destinatario, montoTransferido) {
        this.historialTransferencias.unshift({
            fecha: new Date().toLocaleString("es-AR"),
            metodo: metodoTransferencia,
            destinatario: destinatario,
            monto: montoTransferido
        });
        this.registrarMovimiento(
            "Transferencia",
            `${metodoTransferencia}: ${destinatario}`,
            montoTransferido
        );
    },

    transferirDineroCBU(montoATransferir, destinatarioCBU) {
        if (!this.validarOperacion(montoATransferir)) {
            return false;
        }
        if (!esCbuValido(destinatarioCBU)) {
            this.motivoRechazo = "El CBU debe tener exactamente 22 dígitos numéricos.";
            return false;
        }
        this.descontarSaldo(montoATransferir);
        this.registrarTransferencia("CBU", destinatarioCBU, montoATransferir);
        this.registrarUltimaOperacion(
            "Transferencia por CBU",
            `Transferencia de ${formatearMoneda(montoATransferir)} al CBU ${destinatarioCBU}.`
        );
        this.motivoRechazo = "";
        return true;
    },

    transferirDineroAlias(montoATransferir, destinatarioAlias) {
        if (!this.validarOperacion(montoATransferir)) {
            return false;
        }
        if (!esAliasValido(destinatarioAlias)) {
            this.motivoRechazo = "El alias debe tener tres palabras separadas por puntos.";
            return false;
        }
        this.descontarSaldo(montoATransferir);
        this.registrarTransferencia("Alias", destinatarioAlias, montoATransferir);
        this.registrarUltimaOperacion(
            "Transferencia por Alias",
            `Transferencia de ${formatearMoneda(montoATransferir)} al alias ${destinatarioAlias}.`
        );
        this.motivoRechazo = "";
        return true;
    }
});
