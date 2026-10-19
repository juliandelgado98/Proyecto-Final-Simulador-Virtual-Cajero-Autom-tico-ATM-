function mostrarPantallaMenuConsultar() {
    mostrarPantalla("pantallaConsultar");
}

function procesarConsultaSaldo() {
    cajero.consultarSaldo();
    mostrarResultado("Consulta de saldo", "", "pantallaConsultar");
}

function renderizarMovimientos() {
    const itemsMovimientos = cajero.solicitarUltimosMovimientos().map((movimiento) => {
        const signo = movimiento.esIngreso ? "+" : "-";

        return crearItemLista(
            `${movimiento.tipo} - ${movimiento.detalle}`,
            movimiento.fecha,
            `${signo} ${formatearMoneda(movimiento.monto)}`
        );
    });

    renderizarLista("listaMovimientos", "Todavía no hay movimientos.", itemsMovimientos);
}

accionesBoton.consultarSaldo = procesarConsultaSaldo;
renderizadoresPantalla.pantallaMovimientos = renderizarMovimientos;
