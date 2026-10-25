let pantallaRetorno = "pantallaInicio";

const renderizadoresPantalla = {};
const manejadoresFormulario = {};
const accionesBoton = {};

function leerTexto(idCampo) {
    return document.getElementById(idCampo).value.trim();
}

function leerMonto(idCampo) {
    return Number.parseFloat(document.getElementById(idCampo).value);
}

function actualizarSaldoEnPantalla() {
    const elementosSaldo = document.querySelectorAll(".saldoActual");
    elementosSaldo.forEach((elementoSaldo) => {
        elementoSaldo.textContent = formatearMoneda(cajero.saldoDisponibleCuentaActual);
    });
}

function actualizarEstadoSesion() {
    const pantallaActiva = obtenerPantallaActiva();

    const enProceso = pantallaActiva !== null && pantallaActiva.id === "pantallaProceso";

    document.getElementById("botonInicio").disabled = !cajero.sesionActiva || enProceso;
    document.getElementById("botonSalir").disabled = !cajero.sesionActiva || enProceso;
    document.getElementById("botonInsertarTarjeta").disabled =
        pantallaActiva === null || pantallaActiva.id !== "pantallaEspera";
}

function actualizarPantalla() {
    actualizarSaldoEnPantalla();
    actualizarEstadoSesion();
}

function crearItemLista(textoPrincipal, textoSecundario, textoImporte) {
    const item = document.createElement("li");
    const detalle = document.createElement("span");
    const principal = document.createElement("span");
    const secundario = document.createElement("span");
    const importe = document.createElement("span");

    item.className = "itemLista";
    detalle.className = "itemDetalle";
    secundario.className = "itemSecundario";
    importe.className = "itemImporte";
    principal.textContent = textoPrincipal;
    secundario.textContent = textoSecundario;
    importe.textContent = textoImporte;

    detalle.append(principal, secundario);
    item.append(detalle, importe);
    return item;
}

function renderizarLista(idLista, textoVacio, itemsLista) {
    const lista = document.getElementById(idLista);
    lista.replaceChildren();
    if (itemsLista.length === 0) {
        lista.append(crearItemLista(textoVacio, "", ""));
        return;
    }
    lista.append(...itemsLista);
}

function mostrarPantalla(idPantalla) {
    const pantallas = document.querySelectorAll(".pantalla");
    pantallas.forEach((pantalla) => {
        const esPantallaDestino = pantalla.id === idPantalla;
        pantalla.hidden = !esPantallaDestino;
        if (esPantallaDestino && pantalla instanceof HTMLFormElement) {
            pantalla.reset();
            pantalla.querySelector(".mensajeError").textContent = "";
        }
        if (esPantallaDestino) {
            campoActivo = pantalla.querySelector("input");
        }
    });
    if (idPantalla in renderizadoresPantalla) {
        renderizadoresPantalla[idPantalla]();
    }
    actualizarPantalla();
}

function mostrarResultado(tituloResultado, mensajeResultado, idPantallaRetorno) {
    document.getElementById("resultadoTitulo").textContent = tituloResultado;
    document.getElementById("resultadoMensaje").textContent = mensajeResultado;
    pantallaRetorno = idPantallaRetorno;
    mostrarPantalla("pantallaResultado");
}

function mostrarErrorFormulario(formulario, mensajeError) {
    formulario.querySelector(".mensajeError").textContent = mensajeError;
}

function mostrarComprobanteEnImpresora(textoComprobante) {
    const ticket = document.getElementById("ticketComprobante");

    ticket.textContent = textoComprobante;
    ticket.hidden = false;
    document.getElementById("botonRetirarComprobante").hidden = false;
}

function vaciarImpresora() {
    const ticket = document.getElementById("ticketComprobante");

    ticket.textContent = "";
    ticket.hidden = true;
    document.getElementById("botonRetirarComprobante").hidden = true;
}

function mostrarBilletesEnBandeja(billetes) {
    const bandeja = document.getElementById("ranuraBilletes");

    bandeja.replaceChildren();
    billetes.forEach((billete) => {
        const ficha = document.createElement("button");
        ficha.classList.add("botonTarjeta", "botonRetirar");
        ficha.id = "botonRetirarBilletes";
        ficha.dataset.accion = "retirarBilletes";
        ficha.className = "billeteEntregado";
        ficha.textContent = `${billete.cantidad} × $ ${billete.valor.toLocaleString("es-AR")}`;
        bandeja.append(ficha);
    });
    bandeja.classList.add("conBilletes");
    // document.getElementById("botonRetirarBilletes").hidden = false;
}

function vaciarBandejaBilletes() {
    const bandeja = document.getElementById("ranuraBilletes");

    bandeja.replaceChildren();
    bandeja.classList.remove("conBilletes");
    // document.getElementById("botonRetirarBilletes").hidden = true;
}

accionesBoton.continuar = () => mostrarPantalla(pantallaRetorno);
accionesBoton.retirarBilletes = vaciarBandejaBilletes;
accionesBoton.retirarComprobante = vaciarImpresora;

function conectarEventos() {
    document.addEventListener("click", (evento) => {
        const boton = evento.target.closest("button");

        if (boton === null || boton.disabled) {
            return;
        }
        if (boton.classList.contains("teclaFisica")) {
            procesarTeclaFisica(boton);
            return;
        }
        if (boton.dataset.destino !== undefined) {
            mostrarPantalla(boton.dataset.destino);
            return;
        }
        if (boton.dataset.accion !== undefined) {
            accionesBoton[boton.dataset.accion](boton.dataset);
        }
    });

    document.addEventListener("submit", (evento) => {
        const formulario = evento.target;
        const manejador = manejadoresFormulario[formulario.dataset.operacion];

        evento.preventDefault();
        if (manejador !== undefined) {
            manejador(formulario);
        }
    });
}
