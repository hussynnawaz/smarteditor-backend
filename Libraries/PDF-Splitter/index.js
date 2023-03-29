
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

  async function pdfSplitter(buffer){
   const fullLengthPdfDocument = await PDFDocument.load(buffer);
   const arrayOfPdfPages = await getArrayOfPdfPages(fullLengthPdfDocument);
   return arrayOfPdfPages;
   }


async function getArrayOfPdfPages(fullLengthPdfDocument) {
    const arrayOfPdfPages = [];
    for(let pageIndex = 0; pageIndex < fullLengthPdfDocument.getPages().length; pageIndex++) {
        const singlePagePdfDocument = await getSinglePagePdfByteArray(fullLengthPdfDocument, pageIndex);
        arrayOfPdfPages.push(singlePagePdfDocument);
    }
    return arrayOfPdfPages;
}

async function getSinglePagePdfByteArray(fullLengthPdfDocument, pageIndex) {
    const newPdfDocument = await PDFDocument.create();
    const [pageToCopy] = await newPdfDocument.copyPages(fullLengthPdfDocument, [pageIndex]);
    newPdfDocument.addPage(pageToCopy);
    return await newPdfDocument.save();
}


module.exports = pdfSplitter; 
