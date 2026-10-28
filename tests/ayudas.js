const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const RAIZ_PROYECTO = path.join(__dirname, "..");
const ARCHIVOS_LOGICA = [
    "js/config/constantes.js",
    "js/config/datos-simulados.js",
    "js/modelo/cajero.js",
    "js/utiles/formato.js",
    "js/utiles/validaciones.js",
    "js/modelo/tarjeta.js",
    "js/modelo/autenticacion.js",
    "js/modelo/consultas.js",
    "js/modelo/extraccion.js",
    "js/modelo/transferencias.js",
    "js/modelo/servicios.js",
    "js/modelo/claves.js",
    "js/modelo/comprobante.js"
];
const NOMBRES_EXPUESTOS = [
    "CajeroAutomatico",
    "SALDO_INICIAL",
    "EFECTIVO_INICIAL_CAJERO",
    "PAPEL_INICIAL",
    "INTENTOS_MAXIMOS_PIN",
    "LIMITE_EXTRACCION",
    "CANTIDAD_ULTIMOS_MOVIMIENTOS",
    "PIN_USUARIO_PRUEBA",
    "formatearMoneda",
    "esCbuValido",
    "esAliasValido",
    "esPinNumerico"
];

const pruebas = [];
let grupoActual = "General";

function cargarLogica() {
    const codigo = ARCHIVOS_LOGICA
        .map((archivo) => fs.readFileSync(path.join(RAIZ_PROYECTO, archivo), "utf-8"))
        .join("\n");
    const fabrica = new Function(`${codigo}\nreturn { ${NOMBRES_EXPUESTOS.join(", ")} };`);

    return fabrica();
}

function crearCajero() {
    const logica = cargarLogica();
    const cajero = new logica.CajeroAutomatico(logica.SALDO_INICIAL);

    return { logica, cajero };
}

function crearCajeroConSesion() {
    const { logica, cajero } = crearCajero();

    cajero.detectarTarjeta();
    cajero.validarPIN(logica.PIN_USUARIO_PRUEBA);
    return { logica, cajero };
}

function grupo(nombreGrupo) {
    grupoActual = nombreGrupo;
}

function probar(nombrePrueba, funcionPrueba) {
    pruebas.push({ grupo: grupoActual, nombre: nombrePrueba, ejecutar: funcionPrueba });
}

function ejecutarPruebas() {
    let fallidas = 0;
    let grupoImpreso = "";

    pruebas.forEach((prueba) => {
        if (prueba.grupo !== grupoImpreso) {
            console.log(`\n${prueba.grupo}`);
            grupoImpreso = prueba.grupo;
        }
        try {
            prueba.ejecutar();
            console.log(`  OK     ${prueba.nombre}`);
        } catch (error) {
            fallidas += 1;
            console.log(`  FALLO  ${prueba.nombre}`);
            console.log(`         ${error.message.split("\n")[0]}`);
        }
    });
    console.log(`\n${pruebas.length - fallidas} de ${pruebas.length} pruebas pasaron.`);
    process.exitCode = fallidas === 0 ? 0 : 1;
}

module.exports = {
    assert,
    grupo,
    probar,
    ejecutarPruebas,
    crearCajero,
    crearCajeroConSesion
};
