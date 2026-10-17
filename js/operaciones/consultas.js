Object.assign(CajeroAutomatico.prototype, {
    consultarSaldo() {
        this.registrarUltimaOperacion('Consulta de saldo', `Saldo Disponible: $${this.saldoDisponibleCuentaActual}`);
        return this.saldoDisponibleCuentaActual;
    }
});

// pendiente: solicitarUltimosMovimientos
