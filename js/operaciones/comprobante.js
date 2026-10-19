Object.assign(CajeroAutomatico.prototype, {
    registrarUltimaOperacion(operacion, datos = "") {
        this.ultimaOperacion = {
            nombreOperacion: operacion,
            info: datos
        };
    },

    generarComprobante(operacion, datos) {
        const nombreOperacion = operacion
            || this.ultimaOperacion.nombreOperacion
            || "Consulta de saldo";
        const detalle = datos
            || this.ultimaOperacion.info
            || `Saldo: ${formatearMoneda(this.saldoDisponibleCuentaActual)}`;

        return [
            "BANELCO",
            LINEA_COMPROBANTE,
            "COMPROBANTE DE OPERACIÓN",
            nombreOperacion,
            "CUENTA DE AHORRO EN PESOS",
            `Fecha: ${new Date().toLocaleString("es-AR")}`,
            LINEA_COMPROBANTE,
            detalle,
            LINEA_COMPROBANTE,
            "BANCO: SANTANDER RIO S.A.",
            "SUCURSAL MAR DEL PLATA",
            LINEA_COMPROBANTE,
            "GRACIAS POR UTILIZAR NUESTRO SERVICIO"
        ].join("\n");
    },

    imprimirComprobante() {
        if (!this.estadoTarjeta || !this.sesionActiva) {
            this.motivoRechazo = "Su sesión expiró. Inicie sesión nuevamente.";
            return false;
        }
        if (this.cantidadPapelDisponible <= 0) {
            this.motivoRechazo = "No hay papel disponible en la impresora.";
            return false;
        }
        this.descontarPapel();
        this.comprobanteEmitido = this.generarComprobante(
            this.ultimaOperacion.nombreOperacion,
            this.ultimaOperacion.info
        );
        this.motivoRechazo = "";
        return true;
    }
});
