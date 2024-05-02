const logger = require('../../logs');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const ejs = require("ejs");

// const { getOrderDetail } = require('../../service/salesModule/salesService');
const jwt = require('jsonwebtoken');
async function invoiceGenerator(req, res) {
  const puppeteer = require('puppeteer');
  // let obj = {}
  // obj["token"] = req.cookies.token;
  // obj["id"] = req.query.id;

  // try {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(`http://localhost:8000/invoice?token=${req.cookies.token}&invoiceId=${req.query.id}&type=${req.query.type}`, {
    waitUntil: 'networkidle0',
    // timeout: 0,
  });
  const pdf = await page.pdf({
    printBackground: true,
    displayHeaderFooter: false,
    // timeout: 0,
    format: 'A4',
  });
  await browser.close();
  res.setHeader('Content-Disposition', `attachment; filename=invoice${req.query.id}.pdf`);
  res.send(pdf);
  // } catch (err) {
  //   logger.logError(err);
  // }
}

const { SECRET_KEY } = process.env;


function pdfTokenVerify(req, res, next) {
  // const token = req.body.token;
  const token = req.query.token;
  const secretKey = SECRET_KEY;
  try {
    const verified = jwt.verify(token, secretKey);
    if (verified) {
      req.user = verified;
      next();
    } else {
      // Access Denied
      res.redirect('/');
      // return;
    }
  } catch (error) {
    // Access Denied
    logger.logError(error);
    res.redirect('/');
    // return;
  }
}

async function generateSalesPdf(orderDetails, reportType) {
  const templatePath = path.join(__dirname, '../../views/salesModule/invoice.ejs');
  const template = fs.readFileSync(templatePath, "utf8");
  const data = orderDetails.data;
  const products = orderDetails.products;
  const html = ejs.render(template, { data, products, user: orderDetails.user, type: orderDetails.type });
  let browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' });

  // To reflect CSS used for screens instead of print
  // await page.emulateMediaType('screen');
  const pdfPath = path.join(__dirname, `../../public/uploads/pdfFiles/${Date.now()}-${reportType}.pdf`);  //path of pdf

  await page.pdf({
    path: pdfPath,
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    formate: 'A4'
  });
  await browser.close();

  if (fs.existsSync(pdfPath)) {
    const filename = pdfPath.split("/");
    return filename[filename.length - 1];
  } else {
    return "";
  }
}


module.exports = { invoiceGenerator, pdfTokenVerify, generateSalesPdf };
