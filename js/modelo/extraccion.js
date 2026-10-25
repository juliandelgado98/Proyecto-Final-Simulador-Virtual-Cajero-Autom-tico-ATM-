Object.assign(CajeroAutomatico.prototype, {
    validarExtraccion(montoAExtraer) {
        if (!this.validarOperacion(montoAExtraer)) {
            return false;
        }
        if (!this.estadoDispensador) {
            this.motivoRechazo = "El dispensador de billetes no está disponible.";
            return false;
        }
        if (montoAExtraer % BILLETE_MINIMO !== 0) {
            this.motivoRechazo =
                `El monto debe ser múltiplo de ${formatearMoneda(BILLETE_MINIMO)}.`;
            return false;
        }
        if (montoAExtraer > LIMITE_EXTRACCION) {
            this.motivoRechazo =
                `El monto máximo por extracción es ${formatearMoneda(LIMITE_EXTRACCION)}.`;
            return false;
        }
        if (montoAExtraer > this.efectivoDisponibleCajero) {
            this.motivoRechazo =
                "El cajero no tiene efectivo suficiente. Pruebe con un monto menor.";
            return false;
        }
        this.motivoRechazo = "";
        return true;
    },

    dispensarBilletes(montoADispensar) {
        let montoRestante = montoADispensar;

        this.billetesEntregados = [];
        DENOMINACIONES_BILLETES.forEach((valorBillete) => {
            const cantidadBilletes = Math.floor(montoRestante / valorBillete);

            if (cantidadBilletes > 0) {
                this.billetesEntregados.push({ valor: valorBillete, cantidad: cantidadBilletes });
                montoRestante -= cantidadBilletes * valorBillete;
            }
        });
    },

    extraerEfectivo(montoAExtraer) {
        if (!this.validarExtraccion(montoAExtraer)) {
            return false;
        }
        this.dispensarBilletes(montoAExtraer);
        this.descontarSaldo(montoAExtraer);
        this.efectivoDisponibleCajero -= montoAExtraer;
        this.registrarMovimiento("Extracción", "Cajero automático", montoAExtraer);
        this.registrarUltimaOperacion(
            "Extracción de efectivo",
            `Se extrajo ${formatearMoneda(montoAExtraer)} de su cuenta.`
        );
        this.motivoRechazo = "";
        return true;
    }
});
