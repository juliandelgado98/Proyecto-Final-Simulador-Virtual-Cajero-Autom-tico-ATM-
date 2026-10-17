Object.assign(CajeroAutomatico.prototype, {
    registrarUltimaOperacion(operacion, datos = "") {
        this.ultimaOperacion = {
            nombreOperacion: operacion,
            info: datos
        };
    },


    imprimirComprobanteConsultaDeSaldo(operacion, datos) {
        // Si datos es undefined o vacío, usa la info guardada en el objeto o un texto por defecto
        const detalle = datos || this.ultimaOperacion?.info || `Saldo: $${this.saldoDisponibleCuentaActual}`;
        const nombreOp = operacion || this.ultimaOperacion?.nombreOperacion || "Consulta de Saldo";

        const comprobante = `
        BANELCO
        -------------------------------
        COMPROBANTE DE OPERACIÓN
        ${nombreOp}
        CUENTA DE AHORRO EN PESOS
        Fecha: ${new Date().toLocaleString("es-AR")}
        -------------------------------
        ${detalle}
        -------------------------------
        BANCO: SANTANDER RIO S.A.
        SUCURSAL MAR DEL PLATA
        -------------------------------
        **GRACIAS POR UTILIZAR NUESTRO SERVICIO**
        `;

        return comprobante;
    }
});