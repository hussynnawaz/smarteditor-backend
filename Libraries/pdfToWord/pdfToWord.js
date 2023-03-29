const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const { Document, Paragraph, Packer } = require("docx");

async function pdfToWord(fileName, process) {
  const pdfBytes = fs.readFileSync(`./Documents/input/${process}/${fileName}`);

  const pdfDoc = await PDFDocument.load(pdfBytes);

  const doc = new Document();

  for (let i = 0; i < pdfDoc.getPages().length; i++) {
    const page = pdfDoc.getPage(i);

    const text = await page.getTextContent();

    const paragraph = new Paragraph(text.items.map((item) => item.str));
    doc.addParagraph(paragraph);
  }

  const packer = new Packer();
  const buffer = await packer.toBuffer(doc);
  fs.writeFileSync(`./Documents/output/${process}/${fileName}.docx`, buffer);
}

module.exports = pdfToWord;
