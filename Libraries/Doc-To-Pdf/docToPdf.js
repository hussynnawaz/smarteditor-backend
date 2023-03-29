var docxConverter = require('docx-pdf');


function docToPDf(fileName,process) {
docxConverter(`./Documents/input/${process}/${fileName}`,`./Documents/output/${process}/${fileName}.pdf`,function(err,result){
  if(err){
    console.log(err);
  }
  console.log('result'+result);
});
}

module.exports = docToPDf;

