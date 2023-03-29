const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const file = require('./File Handling/fileHandling');
const docToPDf = require('./Libraries/Doc-To-Pdf/docToPdf');
const pdfSplitter = require('./Libraries/PDF-Splitter/index');
const mergePdf =  require('./Libraries/Merge-Pdf/mergePdf');
const pdfToDoc = require('./Libraries/pdfToWord/pdfToWord');
const excelToPdf = require('./Libraries/Excel-To-pdf/excelToPdf');
const compressFile = require('./Libraries/Compress-Pdf/compressPdf');
const extractFile = require('./Libraries/Pdf-Extractor/pdfExtractor');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const directory = `./Documents/input/docsForCompressFileS` // specify the directory where you want to save the file
      fs.mkdirSync(directory, { recursive: true }); // create the directory if it doesn't exist
      cb(null, directory);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}${ext}`;
      cb(null, filename);
    }
  });
  
  const upload = multer({ storage: storage });

app.get('/download/:fileName/:process', (req, res) => {
    const filePath = file.getFilePath(req.params.fileName,req.params.process)
    res.download(filePath);
    res.send('File downloaded successfully');
    });


app.post('/upload/:fileName/:process', (req, res) => {  
    const uploadedFile = file.uploadFile(req.params.fileName,req.files.file,req.params.process);
    res.send('File uploaded successfully');
    
})


app.post('/docToPdf/:fileName/:process', async (req, res) => {
   docToPDf(req.params.fileName, req.params.process);
   res.send("Successfully converted");
})

app.post('/PdfToDoc/:fileName/:process',async (req, res) => {
    await pdfToDoc(req.params.fileName, req.params.process);
    res.send("Successfully converted");
})

app.post('/ExcelToPdf/:fileName/:process', async(req, res) => {
    await excelToPdf(req.params.fileName, req.params.process);
    res.send("Successfully converted");
})

app.post('/compressFile/:fileName/:process', async(req, res) => {
    await compressFile(req.params.fileName, req.params.process);
    res.send("Successfully converted");
})

app.post('/extractFile/:fileName/:process', async(req, res) => {
    await extractFile(req.params.fileName, req.params.process);
    res.send("Successfully converted");
})

app.post('/pdfSplitter/:fileName/:process', async(req, res) => {
    let pdfs = await pdfSplitter(req.files.file);
    pdfs.forEach((pages) => {
      fs.writeFileSync(`./Documents/input/${req.params.process}/${req.params.fileName}`,pages);
    })
    res.send("Successfully converted");
})

app.post('/mergePdf', async(req, res) => {
   await mergePdf(req.files.file[0], req.body.file1Pages, req.files.file[1], req.body.file2Pages)
})



const port  = process.env.PORT || 3000;
app.listen(port, '192.168.84.196', ()=> {
    console.log('Server is listening on port 3000');
})

