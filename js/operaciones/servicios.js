Object.assign(CajeroAutomatico.prototype, {
    registrarPago(tipoPago, detallePago, montoPagado) {
        this.ultimosPagos.unshift({
            fecha: new Date().toLocaleString("es-AR"),
            tipo: tipoPago,
            detalle: detallePago,
            monto: montoPagado
        });
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
        this.motivoRechazo = "";
        return true;
    }
});
