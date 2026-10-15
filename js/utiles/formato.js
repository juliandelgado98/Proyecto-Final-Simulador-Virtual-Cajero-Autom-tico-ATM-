const formateadorMoneda = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS"
});

function formatearMoneda(valorNumerico) {
    return formateadorMoneda.format(valorNumerico);
}
