Object.assign(CajeroAutomatico.prototype, {
    detectarTarjeta() {
        this.estadoTarjeta = true;
        this.intentosPin = 0;
        this.motivoRechazo = "";
        return true;
    },

    expulsarTarjeta() {
        this.cerrarSesion();
        this.intentosPin = 0;
    }
});
