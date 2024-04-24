const logger = require('../../logs');
// const { getOrderDetail } = require('../../service/salesModule/salesService');
const jwt = require('jsonwebtoken');
async function invoiceGenerator(req, res) {
  const puppeteer = require('puppeteer');
 
  const token = req.cookies.token;
  const id = req.query.id;
  // let obj = {}
  // obj["token"] = req.cookies.token;
  // obj["id"] = req.query.id;
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // await page.setRequestInterception(true);
    // page.on('request', (interceptedRequest) => {
    //   // Here, is where you change the request method and
    //   // add your post data
    //   var data = {
    //     method: 'POST',
    //     body: new URLSearchParams(obj),
    //   };

    //   // Request modified... finish sending!
    //   interceptedRequest.continue(data);
    // });

    // // Navigate, trigger the intercept, and resolve the response
    // const response = await page.goto('http://localhost:8000/invoice');
    // const responseBody = await response.text();
    // // console.log(responseBody);

    await page.goto(`http://localhost:8000/invoice?token=${token}&invoiceId=${id}`, {
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
    res.setHeader('Content-Disposition', `attachment; filename=invoice${id}.pdf`);
    res.send(pdf);
  } catch (err) {
    logger.logError(err);
  }
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

module.exports = { invoiceGenerator, pdfTokenVerify };
