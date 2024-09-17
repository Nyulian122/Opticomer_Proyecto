let barcodeData = [];  // Almacena los códigos de barras y sus SKUs

// Función para añadir un código de barras, SKUs, y nombre a la lista
function addBarcode(code, sku1, sku2, responsibleName) {
    const printDate = new Date().toISOString().split('T')[0];  // Fecha actual en formato YYYY-MM-DD
    const orderNumber = barcodeData.length + 1;  // Número de orden secuencial
    barcodeData.push({ code, sku1, sku2, orderNumber, printDate, responsibleName });
    displayBarcodes();  // Muestra los códigos almacenados
}

// Función para mostrar los códigos almacenados en el DOM
function displayBarcodes() {
    const dataList = document.getElementById("dataList");
    dataList.innerHTML = '';  // Limpia la lista antes de mostrar

    barcodeData.forEach((item, index) => {
        const barcodeDiv = document.createElement('div');
        barcodeDiv.innerHTML = `
            Código ${index + 1}: ${item.code}<br>
            SKU 1: ${item.sku1}<br>
            SKU 2: ${item.sku2}<br>
            Número de Orden: ${item.orderNumber}<br>
            Fecha de Impresión: ${item.printDate}<br>
            Responsable: ${item.responsibleName}<br>
            <button onclick="generateBarcodeImage('${item.code}', ${index})">Generar JPG</button>
        `;
        dataList.appendChild(barcodeDiv);
    });
}

// Escucha el escaneo de códigos
document.getElementById('barcodeInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const barcode = e.target.value;
        const sku1 = prompt("Ingrese SKU 1 para este código:");
        const sku2 = prompt("Ingrese SKU 2 para este código:");
        const responsibleName = prompt("Ingrese el nombre del responsable:");

        addBarcode(barcode, sku1, sku2, responsibleName);
        e.target.value = '';  // Limpia el campo de entrada
    }
});

// Función para generar la imagen del código de barras en JPG
function generateBarcodeImage(code, index) {
    const canvas = document.createElement('canvas');
    const link = document.createElement('a');

    JsBarcode(canvas, code, {
        format: "CODE128",
        displayValue: true
    });

    // Convierte el canvas a imagen .jpg
    const image = canvas.toDataURL("image/jpeg");
    link.href = image;
    link.download = `barcode_${index + 1}.jpg`;

    // Simula el clic para descargar la imagen
    link.click();
}

// Función para descargar todos los códigos de barras en un archivo Excel con estilo
function downloadExcel() {
    const worksheetData = barcodeData.map((item, index) => {
        return { 
            Cantidad: `Producto ${index + 1}`, 
            Código: item.code, 
            SKU1: item.sku1, 
            SKU2: item.sku2, 
            Número_de_Orden: item.orderNumber,
            Fecha_de_Impresión: item.printDate,
            Responsable: item.responsibleName
        };
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Aplicar estilos básicos
    const headerStyle = { font: { bold: true }, fill: { fgColor: { rgb: "FFFF00" } }, border: { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } }, alignment: { horizontal: 'center' } };

    // Estilo de las celdas de encabezado
    const headers = worksheet['!ref'].split(':');
    const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: headerRange.s.r, c: C });
        if (!worksheet[cellAddress]) worksheet[cellAddress] = {};
        worksheet[cellAddress].s = headerStyle;
    }

    // Aplicar bordes a todas las celdas
    worksheet['!cols'] = [];
    worksheet['!rows'] = [];
    for (let R = headerRange.s.r; R <= headerRange.e.r; ++R) {
        worksheet['!rows'].push({ hpt: 20 });
        for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
            const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
            if (!worksheet[cellAddress]) worksheet[cellAddress] = {};
            worksheet[cellAddress].s = worksheet[cellAddress].s || { border: { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } } };
        }
    }

    // Crear el libro de trabajo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Códigos de Barras");

    // Generar el archivo Excel
    XLSX.writeFile(workbook, "codigos_barras.xlsx");
}

// Botón para descargar el archivo Excel
document.getElementById('downloadExcel').addEventListener('click', downloadExcel);
