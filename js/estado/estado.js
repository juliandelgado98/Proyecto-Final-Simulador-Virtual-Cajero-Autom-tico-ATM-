class CajeroAutomatico {
    constructor(saldoInicial) {
        this.estadoTarjeta = true;
        this.sesionActiva = false;
        this.estadoDispensador = true;
        this.efectivoDisponibleCajero = EFECTIVO_INICIAL_CAJERO;
        this.saldoDisponibleCuentaActual = saldoInicial;
        this.claveUsuario = PIN_USUARIO_PRUEBA;
        this.cantidadPapelDisponible = PAPEL_INICIAL;
        this.intentosPin = 0;
        this.motivoRechazo = "";
        this.historialTransferencias = [];
        this.ultimosPagos = [];
        this.proximosVencimientos = [...VENCIMIENTOS_SIMULADOS];
    }

    descontarSaldo(montoADescontar) {
        const saldoActualizado = this.saldoDisponibleCuentaActual - montoADescontar;
        this.saldoDisponibleCuentaActual = Math.round(saldoActualizado * 100) / 100;
    }
}
