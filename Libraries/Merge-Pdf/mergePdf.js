const PDFMerger = require('pdf-merger-js');
const file = require('../../File Handling/fileHandling');

var merger = new PDFMerger();

async function mergePdf(file1,file1Pages, file2, file2Pages , process) {
  if(file1Pages.length > 1 && file2Pages.length > 1){
  await merger.add(`${file1}.pdf`,[file1Pages[0], file1Pages[1]]);
  await merger.add(`${file2}.pdf`, [file2Pages[0], file2Pages[1]]);
  }
  if(file1Pages.length ==1 && file2Pages.length ==1){
    await merger.add(`${file1}.pdf`,file1Pages[0]);
    await merger.add(`${file2}.pdf`,file2Pages[0]);
  }
  if(file1Pages.length ==1 && file2Pages.length >1){
    await merger.add(`${file1}.pdf`,file1Pages[0]);
    await merger.add(`${file2}.pdf`, [file2Pages[0], file2Pages[1]]);
  }

  if(file2Pages.length == 1 && file1Pages.length >1){
    await merger.add(`${file1}.pdf`,[file1Pages[0], file1Pages[1]]);
    await merger.add(`${file2}.pdf`,file2Pages[0]);
  }

  await merger.save('merged.pdf'); //save under given name and reset the internal document
  

  const mergedPdfBuffer = await merger.saveAsBuffer();
  const output = file.outputResult('merged.pdf', process)
  fs.writeSync(output, mergedPdfBuffer);
};

module.exports = mergePdf;