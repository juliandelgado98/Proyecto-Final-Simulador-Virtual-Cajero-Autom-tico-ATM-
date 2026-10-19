const fs = require("node:fs");
const path = require("node:path");
const { ejecutarPruebas } = require("./ayudas");

fs.readdirSync(__dirname)
    .filter((nombreArchivo) => /^test-.*\.js$/.test(nombreArchivo))
    .sort()
    .forEach((nombreArchivo) => require(path.join(__dirname, nombreArchivo)));

ejecutarPruebas();
