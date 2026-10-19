let campoActivo = null;

function obtenerPantallaActiva() {
    return document.querySelector(".pantalla:not([hidden])");
}

function obtenerCampoActivo() {
    const pantallaActiva = obtenerPantallaActiva();

    if (pantallaActiva === null) {
        return null;
    }
    if (campoActivo !== null && pantallaActiva.contains(campoActivo)) {
        return campoActivo;
    }
    campoActivo = pantallaActiva.querySelector("input");
    return campoActivo;
}

function escribirDigitoTeclado(digito) {
    const campo = obtenerCampoActivo();

    if (campo === null) {
        return;
    }
    if (campo.maxLength > 0 && campo.value.length >= campo.maxLength) {
        campo.focus();
        return;
    }
    campo.value = `${campo.value}${digito}`;
    campo.focus();
}

function corregirCampoActivo() {
    const campo = obtenerCampoActivo();

    if (campo === null) {
        return;
    }
    campo.value = campo.value.slice(0, -1);
    campo.focus();
}

function confirmarPantallaActiva() {
    const pantallaActiva = obtenerPantallaActiva();

    if (pantallaActiva === null) {
        return;
    }
    if (pantallaActiva instanceof HTMLFormElement) {
        pantallaActiva.requestSubmit();
        return;
    }
    const botonAccion = pantallaActiva.querySelector("button[data-accion]");
    if (botonAccion !== null) {
        botonAccion.click();
    }
}

function cancelarOperacionActiva() {
    const pantallaActiva = obtenerPantallaActiva();
    const campo = obtenerCampoActivo();

    if (campo !== null && campo.value !== "") {
        campo.value = "";
        if (pantallaActiva instanceof HTMLFormElement) {
            pantallaActiva.querySelector(".mensajeError").textContent = "";
        }
        campo.focus();
        return;
    }
    if (pantallaActiva === null || !cajero.sesionActiva) {
        return;
    }
    const botonVolver = pantallaActiva.querySelector(".izquierda.filaCuatro[data-destino]");
    if (botonVolver !== null) {
        mostrarPantalla(botonVolver.dataset.destino);
        return;
    }
    if (pantallaActiva.id !== "pantallaInicio") {
        mostrarPantalla("pantallaInicio");
    }
}

function procesarTeclaFisica(botonTecla) {
    if (botonTecla.classList.contains("teclaCancelar")) {
        cancelarOperacionActiva();
        return;
    }
    if (botonTecla.classList.contains("teclaCorregir")) {
        corregirCampoActivo();
        return;
    }
    if (botonTecla.classList.contains("teclaConfirmar")) {
        confirmarPantallaActiva();
        return;
    }
    const textoTecla = botonTecla.textContent.trim();
    if (/^\d$/.test(textoTecla)) {
        escribirDigitoTeclado(textoTecla);
    }
}

document.addEventListener("focusin", (evento) => {
    if (evento.target instanceof HTMLInputElement) {
        campoActivo = evento.target;
    }
});

document.addEventListener("mousedown", (evento) => {
    if (evento.target.closest(".teclaFisica") !== null) {
        evento.preventDefault();
    }
});
