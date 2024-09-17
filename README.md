# Proyecto de Escáner de Códigos de Barras

Este proyecto es una aplicación web para escanear, almacenar y generar códigos de barras. Permite generar archivos `.jpg` de los códigos escaneados y descargar un archivo Excel con todos los códigos almacenados, junto con información adicional como el número de orden, fecha de impresión, y el nombre del responsable del proceso.

## Características

- **Escaneo de Códigos de Barras:** Captura y almacena los códigos de barras ingresados por un lector o manualmente.
- **Generación de Imágenes:** Convierte los códigos de barras escaneados en imágenes `.jpg` descargables.
- **Exportación a Excel:** Descarga todos los códigos almacenados en un archivo `.xlsx` con información adicional (número de orden, SKU, responsable, etc.).
- **Fecha de Impresión Automática:** La fecha de impresión se genera automáticamente y siempre muestra la fecha actual.
- **Información Personalizable:** Permite agregar SKU 1, SKU 2, el número de orden de compra y el nombre de la persona responsable.

## Tecnologías Utilizadas

- **HTML**: Estructura de la aplicación.
- **CSS (Grid Layout)**: Para el diseño del layout con encabezado y pie de página.
- **JavaScript**: Manejo de la lógica para escanear, almacenar, generar imágenes y descargar el archivo Excel.
- **Librerías Externas**:
  - [`JsBarcode`](https://github.com/lindell/JsBarcode): Generación de códigos de barras en formato `.jpg`.
  - [`SheetJS (XLSX)`](https://sheetjs.com/): Exportación de los datos a un archivo Excel.

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/proyecto-escaner-codigos
