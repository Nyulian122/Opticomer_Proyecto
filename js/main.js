let barcodeData = [];  // Almacena los códigos de barras y sus SKUs

// Función para añadir un código de barras, SKUs y cantidad a la lista
function addBarcode(code, sku1, sku2, quantity) {
    barcodeData.push({ code, sku1, sku2, quantity });
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
            Cantidad: ${item.quantity}<br>
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
        const quantity = parseInt(prompt("Ingrese la cantidad para este código:"), 10);
        if (!isNaN(quantity) && quantity > 0) {
            addBarcode(barcode, sku1, sku2, quantity);
        } else {
            alert("La cantidad debe ser un número positivo.");
        }
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

// Función para descargar todos los códigos de barras en un archivo Excel
function downloadExcel() {
    const worksheetData = barcodeData.map((item, index) => {
        return { 
            Producto: `Producto ${index + 1}`, 
            Código: item.code, 
            SKU1: item.sku1, 
            SKU2: item.sku2, 
            Cantidad: item.quantity 
        };
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Códigos de Barras");

    // Genera el archivo Excel
    XLSX.writeFile(workbook, "codigos_barras.xlsx");
}

// Botón para descargar el archivo Excel
document.getElementById('downloadExcel').addEventListener('click', downloadExcel);
