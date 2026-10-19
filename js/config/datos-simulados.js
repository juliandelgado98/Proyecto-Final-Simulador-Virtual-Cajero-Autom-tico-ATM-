const PIN_USUARIO_PRUEBA = "1234";

const VENCIMIENTOS_SIMULADOS = [
    { servicio: "Edenor (Luz)", monto: 18450.5, vencimiento: "15/10/2026" },
    { servicio: "Metrogas (Gas)", monto: 9320, vencimiento: "20/10/2026" },
    { servicio: "Telecentro (Internet)", monto: 21990, vencimiento: "28/10/2026" },
    { servicio: "AySA (Agua)", monto: 6780.75, vencimiento: "03/11/2026" }
];

const MOVIMIENTOS_SIMULADOS = [
    {
        fecha: "16/10/2026",
        tipo: "Acreditación",
        detalle: "Haberes",
        monto: 85000,
        esIngreso: true
    },
    {
        fecha: "14/10/2026",
        tipo: "Pago de servicio",
        detalle: "Edenor (Luz)",
        monto: 18450.5,
        esIngreso: false
    },
    {
        fecha: "12/10/2026",
        tipo: "Extracción",
        detalle: "Cajero automático",
        monto: 20000,
        esIngreso: false
    },
    {
        fecha: "09/10/2026",
        tipo: "Transferencia recibida",
        detalle: "mi.familia.ahorro",
        monto: 12000,
        esIngreso: true
    }
];
