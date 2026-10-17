
function mostrarPantallaMenuConsultar() {
    mostrarPantalla("pantallaConsultar");
}

function procesarConsultaSaldo() {
    mostrarResultado(
        "Consulta de saldo",
        //  `Su saldo disponible es ${formatearMoneda(cajero.consultarSaldo())}.`,
        ` `,
        'pantallaConsultar',
        "pantallaConsultar"
    );
}

accionesBoton.consultarSaldo = procesarConsultaSaldo;
accionesBoton.solicitarUltimosMovimientos = () => mostrarEnDesarrollo("pantallaConsultar");
