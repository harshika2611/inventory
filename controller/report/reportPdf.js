const logger = require('../../logs.js');
const fs = require("fs");
const puppeteer = require("puppeteer");
const fetch = require("node-fetch");
const path = require('path');
const ejs = require("ejs");

const { productGenerateReport, storageDetails } = require('../../service/report/reportPdf.js');

function reportPdfPage(req, res) {
  return res.render('reports/reportPdf', { data: req.user });
}
// async function generatePdf(req, res) {
//   const data = req.body;
//   // logger.info(data);
//   const templatePath = path.join(__dirname, '../../views/reports/pdfTemplate/productPdfTemplate.ejs');
//   // logger.info(templatePath);
//   const template = fs.readFileSync(templatePath, "utf8");
//   // console.log(template);

//   // console.log(data.productDetails);

//   // {
//   //   productData: data.productDetails,
//   //   storeDetails: []
//   // }

//   const html = ejs.render(template, { data: data });
//   // console.log(html);
//   let browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.setContent(html, { waitUntil: 'load' });

//   // To reflect CSS used for screens instead of print
//   // await page.emulateMediaType('screen');
//   let pdfPath = path.join(__dirname, `../../public/uploads/pdfFile/${Date.now()}-ProductDetails.pdf`);  //path of pdf

//   await page.pdf({
//     path: pdfPath,
//     margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
//     printBackground: true,
//     formate: 'A4'
//   });
//   await browser.close();

//   // const pdfFile = fs.readFileSync(pdfPath);

//   // res.setHeader('Content-Type', 'application/pdf');
//   // res.setHeader('Content-Disposition', `attachment; filename=ProductDetails.pdf`);

//   // res.send(pdfFile); 
//   pdfPath = "/upl";
//   if (fs.existsSync(pdfPath)) {
//     const filename = pdfPath.split("/");
//     logger.info(req.origin);
//     return res.status(200).json({ pdfName: `${filename[filename.length - 1]}` });
//   } else {
//     return res.status(500).json({ message: "Something Went Wrong...." });
//   }
// }

async function generatePdf(data) {
  // const data = req.body;
  // logger.info(data);
  const templatePath = path.join(__dirname, '../../views/reports/pdfTemplate/productPdfTemplate.ejs');
  // logger.info(templatePath);
  const template = fs.readFileSync(templatePath, "utf8");
  // console.log(template);

  // console.log(data.productDetails);

  // {
  //   productData: data.productDetails,
  //   storeDetails: []
  // }

  const html = ejs.render(template, { data: data });
  // console.log(html);
  let browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'load' });

  // To reflect CSS used for screens instead of print
  // await page.emulateMediaType('screen');
  const pdfPath = path.join(__dirname, `../../public/uploads/pdfFile/${Date.now()}-ProductDetails.pdf`);  //path of pdf

  await page.pdf({
    path: pdfPath,
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    formate: 'A4'
  });
  await browser.close();

  // const pdfFile = fs.readFileSync(pdfPath);

  // res.setHeader('Content-Type', 'application/pdf');
  // res.setHeader('Content-Disposition', `attachment; filename=ProductDetails.pdf`);

  // res.send(pdfFile); 

  if (fs.existsSync(pdfPath)) {
    const filename = pdfPath.split("/");
    return filename[filename.length - 1];
  } else {
    return "";
  }
}


async function productReportGenerate(req, res) {
  try {
    // const databaseObject = req.body;
    const storageId = req.user.storageId;
    // logger.info(storageId);

    const productDetailsArray = await productGenerateReport(req.body, storageId);
    const storageDetailsArray = await storageDetails(storageId);

    if (productDetailsArray.length > 0 && storageDetailsArray.length > 0) {
      const productDetailsObject = {};
      productDetailsObject.productDetails = productDetailsArray;
      productDetailsObject.storeDetails = storageDetailsArray;

      const pdfFile = await generatePdf(productDetailsObject);

      if (!pdfFile) {
        return res.status(500).json({ message: "PDF Not Generate.." });
      } else {
        return res.status(200).json({ pdfName: pdfFile });
      }
    } else {
      return res.status(404).json({ message: "Something Went Wrong.." });
    }
  } catch (error) {
    logger.logError("Product Generate Report: " + error);
    return res.status(500).json({ message: "Something Went Wrong.." });
  }
}

// async function generatePdf() {

// }

module.exports = { reportPdfPage, productReportGenerate, generatePdf };