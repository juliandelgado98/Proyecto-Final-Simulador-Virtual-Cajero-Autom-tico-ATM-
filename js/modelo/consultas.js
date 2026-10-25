Object.assign(CajeroAutomatico.prototype, {
    consultarSaldo() {
        this.registrarUltimaOperacion(
            "Consulta de saldo",
            `Saldo disponible: ${formatearMoneda(this.saldoDisponibleCuentaActual)}`
        );
        return this.saldoDisponibleCuentaActual;
    },

    registrarMovimiento(tipoMovimiento, detalleMovimiento, montoMovimiento, esIngreso = false) {
        this.movimientos.unshift({
            fecha: new Date().toLocaleDateString("es-AR"),
            tipo: tipoMovimiento,
            detalle: detalleMovimiento,
            monto: montoMovimiento,
            esIngreso: esIngreso
        });
    },

    solicitarUltimosMovimientos() {
        return this.movimientos.slice(0, CANTIDAD_ULTIMOS_MOVIMIENTOS);
    }
});
