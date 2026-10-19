# Pruebas

## Pruebas automáticas (lógica del cajero)

Prueban la clase `CajeroAutomatico` sin abrir el navegador. No necesitan instalar nada, solo tener [Node.js](https://nodejs.org) (versión 18 o superior).

Desde la carpeta raíz del proyecto:

```
node tests/ejecutar-tests.js
```

Cada prueba imprime `OK` o `FALLO` con el motivo. Si alguna falla, el comando termina con código de error.

| Archivo | Qué prueba |
|---|---|
| `test-autenticacion.js` | Tarjeta, PIN correcto e incorrecto, límite de intentos |
| `test-extraccion.js` | Reglas de extracción, reparto de billetes, límites |
| `test-transferencias-servicios.js` | CBU, alias, pagos, recargas y redondeo del saldo |
| `test-claves.js` | Cambio de clave y bloqueo por intentos |
| `test-movimientos-comprobante.js` | Últimos movimientos y comprobante |

Para agregar una prueba, crear una función con `probar("descripción", () => { ... })` en cualquiera de los archivos `test-*.js`. `ayudas.js` carga los archivos de la lógica y ofrece `crearCajero()` y `crearCajeroConSesion()`.

Las pantallas y los botones (la parte visual) se prueban a mano con los casos de `casos-de-prueba/casos-manuales.md`.
