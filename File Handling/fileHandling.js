const fs = require('fs');


async function uploadFile(fileName,file,process){
    // fs.mkdirSync(`../Documents/input/${process}/${fileName}`,directory, { recursive: true });
    fs.writeFileSync(`./Documents/input/${process}/${fileName}`,file.data);
}

function getFilePath(fileName,process){
  console.log(fileName);
  return `./Documents/input/${process}/${fileName}`
}

function outputResult(fileName,process){
    return `./Documents/output/${process}/${fileName}` 
}

module.exports = {uploadFile, getFilePath, outputResult}