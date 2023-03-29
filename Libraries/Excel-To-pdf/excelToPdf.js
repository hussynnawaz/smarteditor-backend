const ExcelJS = require("exceljs");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");

async function excelToPdf(fileName, process) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(`./Documents/input/${process}/${fileName}`);

  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;

  const worksheet = workbook.worksheets[0];

  worksheet.eachRow((row, rowIndex) => {
    row.eachCell((cell, colIndex) => {
      const cellValue = cell.value ? cell.value.toString() : "";

      const x = colIndex * 75;
      const y = 750 - rowIndex * 25;

      page.drawText(cellValue, { x, y, size: fontSize, font });
    });
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(`./Documents/input/${process}/${fileName}.pdf`, pdfBytes);
}

module.exports = excelToPdf;
