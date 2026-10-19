# Casos de prueba manuales

Se ejecutan abriendo `index.html` en el navegador. Datos de la cuenta de prueba: clave `1234`, saldo inicial $ 150.000,00.

| ID | Caso                     | Pasos                                                                 | Resultado esperado|
|--- |---                       |---                                                                    |---                |
|T-01| Insertar tarjeta         | En la pantalla de espera, presionar "Insertar tarjeta"                | Aparece la pantalla de login y el botón "Insertar tarjeta" se deshabilita|
|T-02| PIN correcto             | Escribir 1234 con el teclado y presionar CONFIRMAR                    | Se muestra el menú principal con el saldo disponible|
|T-03| PIN incorrecto           | Escribir 0000 y confirmar                                             | Mensaje "Clave incorrecta. Intentos restantes: 2." y sigue en el login|
|T-04| Tres PIN incorrectos     | Repetir el PIN incorrecto tres veces                                  | Pantalla de error, luego pantalla de salida "retire su tarjeta"; "Nueva sesión" vuelve a la espera|
|T-05| Consultar saldo          | Consultas → Ver saldo                                                 | Resultado con $ 150.000,00 mostrado una sola vez|
|T-06| Últimos movimientos      | Consultas → Últimos movimientos                                       | Lista de 4 movimientos; tras operar, el nuevo aparece primero|
|T-07| Extraer con monto fijo   | Extraer efectivo → $ 5.000                                            | "Contando billetes..." 1,5 segundos, resultado, saldo $ 145.000,00 y "1 × $ 5.000" en la ranura de billetes|
|T-08| Retirar billetes         | Presionar "Retirar billetes"                                          | La ranura queda vacía y el botón desaparece|
|T-09| Monto no múltiplo        | Otro monto → 150                                                      | "El monto debe ser múltiplo de $ 100,00."|
|T-10| Monto sobre el límite    | Otro monto → 60000                                                    | "El monto máximo por extracción es $ 50.000,00."|
|T-11| Cancelar la extracción   | Elegir $ 2.000 y presionar CANCELAR durante "Contando billetes..."    | Vuelve al menú y el saldo no cambia|
|T-12| Transferencia por CBU    | Transferencias → Nueva → por CBU, 22 dígitos y monto                  | Resultado correcto, nuevo saldo y registro en el historial|
|T-13| CBU inválido             | Transferir con un CBU de 10 dígitos                                   | Mensaje "El CBU debe tener exactamente 22 dígitos numéricos."|
|T-14| Transferencia por alias  | Usar el alias `mi.alias.prueba`                                       | Resultado correcto, el historial indica "Alias"|
|T-15| Saldo insuficiente       | Recargar SUBE con un monto mayor al saldo                             | "Saldo insuficiente para realizar la operación."|
|T-16| Cambiar la clave         | Gestionar claves → 1234, nueva 5678, repetir 5678                     | Pantalla de éxito; "Aceptar" vuelve al menú; con 5678 se puede entrar en la próxima sesión|
|T-17| Clave nueva con letras   | Escribir 56a8 como clave nueva                                        | "La clave nueva debe tener 4 números."|
|T-18| Bloqueo al cambiar clave | Escribir tres veces una clave actual incorrecta                       | Se expulsa la tarjeta y se muestra la pantalla de salida|
|T-19| Imprimir comprobante     | Tras cualquier operación: Imprimir comprobante → Continuar            | Ticket en el módulo COMPROBANTE, mensaje "Retire su comprobante" y una hoja menos|
|T-20| Retirar comprobante      | Presionar "Retirar comprobante"                                       | El ticket desaparece|
|T-21| Sin papel                | En la consola escribir `cajero.cantidadPapelDisponible = 0` e imprimir| "No hay papel disponible en la impresora."|
|T-22| Salir                    | Presionar "Salir" en cualquier pantalla                               | Pantalla de salida; al iniciar nueva sesión se vacían la ranura de billetes y la impresora|
