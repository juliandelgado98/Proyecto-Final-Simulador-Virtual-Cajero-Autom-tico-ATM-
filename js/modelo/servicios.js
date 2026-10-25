Object.assign(CajeroAutomatico.prototype, {
    registrarPago(tipoPago, detallePago, montoPagado) {
        this.ultimosPagos.unshift({
            fecha: new Date().toLocaleString("es-AR"),
            tipo: tipoPago,
            detalle: detallePago,
            monto: montoPagado
        });
        this.registrarMovimiento(tipoPago, detallePago, montoPagado);
    },

    pagarServicios(montoAPagar, servicioAPagar) {
        if (!this.validarOperacion(montoAPagar)) {
            return false;
        }
        if (!esTextoNoVacio(servicioAPagar)) {
            this.motivoRechazo = "Seleccione el servicio que desea pagar.";
            return false;
        }
        this.descontarSaldo(montoAPagar);
        this.registrarPago("Pago de servicio", servicioAPagar, montoAPagar);
        this.registrarUltimaOperacion(
            "Pago de servicio",
            `Pago del servicio ${servicioAPagar} por ${formatearMoneda(montoAPagar)}.`
        );
        this.motivoRechazo = "";
        return true;
    },

    recargarCredito(montoARecargar, numeroDestino, tipoRecarga = "Recarga") {
        if (!this.validarOperacion(montoARecargar)) {
            return false;
        }
        if (!esTextoNoVacio(numeroDestino)) {
            this.motivoRechazo = "Ingrese el número de destino.";
            return false;
        }
        this.descontarSaldo(montoARecargar);
        this.registrarPago(tipoRecarga, `Número ${numeroDestino.trim()}`, montoARecargar);
        this.registrarUltimaOperacion(
            "Recarga de crédito",
            `${tipoRecarga} de ${formatearMoneda(montoARecargar)} `
                + `al número ${numeroDestino.trim()}.`
        );
        this.motivoRechazo = "";
        return true;
    }
});
