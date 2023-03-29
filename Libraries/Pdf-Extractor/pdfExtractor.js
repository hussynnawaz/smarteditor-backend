const PdfExtractor = require("pdf-extractor").PdfExtractor;

async function extractFile(fileName, process) {
  let outputDir = `C:/Work/Smart Editor/Documents/output/docsForExtraction`;

  pdfExtractor = new PdfExtractor(outputDir, {
    viewportScale: (width, height) => {
      if (width > height) {
        return 1100 / width;
      }

      return 800 / width;
    },
    pageRange: [1, 5],
  });

  pdfExtractor
    .parse(`C:/Work/Smart Editor/Documents/input/docsForExtraction/${fileName}`)
    .then(function () {
      console.log("# End of Document");
    })
    .catch(function (err) {
      console.error("Error: " + err);
    });
}

module.exports = extractFile;
