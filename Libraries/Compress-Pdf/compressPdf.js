const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");
const zlib = require("zlib");

async function compressFile(fileName, process) {
  const wordsApi = new WordsApi("####-####-####-####-####", "##################");

const requestDocument = fs.createReadStream("Input.pdf");
const requestCompressOptions = new model.CompressOptions({
    imagesQuality: 75,
    imagesReduceSizeFactor: 1
})
const compressDocumentRequest = new model.CompressDocumentOnlineRequest({
    document: requestDocument,
    compressOptions: requestCompressOptions
});

wordsApi.compressDocumentOnline(compressDocumentRequest)
.then((compressDocumentResult) => {
    const requestDocument = compressDocumentResult.Document.Values();
    const convertDocument = new model.ConvertDocumentRequest({
        document: requestDocument,
        format: "pdf"
    });

    wordsApi.convertDocument(convertDocument)
    .then((convertDocumentResult) => {
        console.log("Result of ConvertDocument: ", convertDocumentResult);
    });
});
}

module.exports = compressFile;
