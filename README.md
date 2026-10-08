# Proyecto-Final-Simulador-Virtual-Cajero-Autom-tico-ATM-

## Resumen

## Links de Trabajo

- 📂 (PPs I) Supervisión y Avance del Proyecto: [Planilla ↗](https://docs.google.com/spreadsheets/d/1pBRHOTCipFmX1tp3u2GJI4SxAOm7CHVRIwYXXmqbRCY/edit?gid=1119914651#gid=1119914651) .

- 📂 (PPs I) Análisis Orientado a Objetos (Obj. Cajero Automático): [Planilla ↗](https://docs.google.com/spreadsheets/d/1xYBzqPl5yk1lRXqZZRBJbn6C9j8M4ZmlSXUjANenhvc/edit?usp=sharing) .

# Convenciones de Código y Guías del Proyecto

Acontinuación se establecen las convenciones de código, estándares de desarrollo y flujos de trabajo en Git para mantener la consistencia e integridad del código entre todos los integrantes del equipo.

---

## 📌 Tabla de Contenidos

* [Nomenclatura de Nombres y Funciones](#nomenclatura-de-nombres-y-funciones)
* [Indentación y Formato](#indentación-y-formato)
* [Flujo de Trabajo y Commits](#flujo-de-trabajo-y-commits)
* [Formato de Mensajes de Commit](#formato-de-mensajes-de-commit)
* [Estrategia de Ramas (Git Flow)](#estrategia-de-ramas-git-flow)

---

## Nomenclatura de Nombres y Funciones

### `camelCase` (Joroba de camello)
* **Regla:** La primera letra va en minúscula y cada palabra subsiguiente inicia con mayúscula.
* **Uso habitual:** Variables y funciones/métodos.
* **Ejemplo:** `totalAmount`, `getUserData`, `isLoggedIn`.

---

## Indentación y Formato

* **Indentación:** Usar **4 espacios** o tabuladores (`Tab`).
* **Longitud de línea:** Máximo **100 caracteres** por línea.
* **Comillas:** Usar comillas dobles (`"..."`) para cadenas de texto estáticas y template strings (`` `...` ``) para interpolación de variables.
* **Punto y coma:** Uso obligatorio al final de cada sentencia.
* **Final de archivo:** Todos los archivos deben finalizar con una nueva línea limpia.
* **Formateador automático:** Se recomienda utilizar [Prettier](https://prettier.io/) con la configuración del proyecto para formatear el código automáticamente al guardar (`Format on Save`).
* **Comentarios:** Se permitirá solo el uso de comentario en desarrollo, al momento de subir a producción y previo a realizar entrega deberá verificarse que no queden comentarios en el código. El mensaje de comentario servirá para guía del desarrollador, dar contexto de lo que se está trabajando. Por ejemplo: indicar el paso a paso para desarrollar una funcionalidad.

---

## Flujo de Trabajo y Commits

### Formato de Mensajes de Commit
* **Formato:** Se utilizará la siguiente convención: `<tipo>(<alcance opcional>): <descripción corta y clara>`
* Se recomienda usar el verbo en presente o imperativo: *"agregar"* o *"agrega"* en lugar de *"agregado"* o *"agregando"*, con un máximo de 50 caracteres y en minúscula sin punto final.

### Estrategia de Ramas (Git Flow)

* Solo se manejará la rama `main` o `master`, quedará definido a partir del primer commit y push.

