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

    document.getElementById("botonInicio").disabled = !cajero.sesionActiva;
    document.getElementById("botonSalir").disabled = !cajero.sesionActiva;
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

function mostrarResultado(tituloResultado, mensajeResultado, idPantallaAnterior, idPantallaRetorno) {
    document.getElementById("resultadoTitulo").textContent = tituloResultado;
    document.getElementById("resultadoMensaje").textContent = mensajeResultado;
    pantallaRetorno = idPantallaRetorno;
    this.ultimaOperacion = idPantallaAnterior;
    mostrarPantalla("pantallaResultado");
}

function imprimirComprobante(contenidoComprobante) {
    const ventanaComprobante = window.open("", "_blank", "width=400,height=600");
    ventanaComprobante.document.write("<html><head><title>Comprobante</title></head><body>");
    ventanaComprobante.document.write("<pre>" + contenidoComprobante + "</pre>");
    ventanaComprobante.document.write("</body></html>");
    ventanaComprobante.document.close();
    actualizarPantalla();
}

accionesBoton.continuar = () => mostrarPantalla(pantallaRetorno);

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
