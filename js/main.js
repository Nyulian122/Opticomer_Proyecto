let barcodeData = [];  // Almacenar los códigos de barras

// Función para añadir un código de barras a la lista
function addBarcode(code) {
    barcodeData.push(code);
    displayBarcodes();  // Muestra los códigos almacenados
}

// Función para mostrar los códigos almacenados en el DOM
function displayBarcodes() {
    const dataList = document.getElementById("dataList");
    dataList.innerHTML = '';  // Limpia la lista antes de mostrar

    barcodeData.forEach((code, index) => {
        const barcodeDiv = document.createElement('div');
        barcodeDiv.innerHTML = `
            Código ${index + 1}: ${code}
            <button onclick="generateBarcodeImage('${code}', ${index})">Generar JPG</button>
        `;
        dataList.appendChild(barcodeDiv);
    });
}

// Escucha el escaneo de códigos
document.getElementById('barcodeInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const barcode = e.target.value;
        addBarcode(barcode);
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
    const worksheetData = barcodeData.map((code, index) => {
        return { Número: index + 1, Código: code };
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Códigos de Barras");

    // Genera el archivo Excel
    XLSX.writeFile(workbook, "codigos_barras.xlsx");
}

// Botón para descargar el archivo Excel
document.getElementById('downloadExcel').addEventListener('click', downloadExcel);
