// pendiente: imprimirComprobante

Object.assign(CajeroAutomatico.prototype, {
    registrarUltimaOperacion(operacion, datos){
        this.ultimaOperacion = {
            ultimaOperacion: operacion,
            info: datos
        }
    }
})

Object.assign(CajeroAutomatico.prototype, {
    imprimirComprobanteConsultaDeSaldo(operacion, datos) {
        const comprobante = `
        BANELCO
        -------------------------------
        COMPROBANTE DE OPERACIÓN
        ${operacion} 
        CUENTA DE AHORRO EN PESOS
        Fecha: ${new Date().toLocaleString("es-AR")}
        -------------------------------
        ${datos}
        -------------------------------
        BANCO: SANTANDER RIO S.A.
        SUCURSAL MAR DEL PLATA
        -------------------------------
        **GRACIAS POR UTILIZAR NUESTRO SERVICIO**
        `;

        return comprobante;

    }
    
});
