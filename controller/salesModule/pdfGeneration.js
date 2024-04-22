const logger = require('../../logs');
const { getOrderDetail } = require('../../service/salesModule/salesService');

async function invoiceGenerator(req, res) {
  const puppeteer = require('puppeteer');

  // try {
  //   const [result] = await getOrderDetail(req);
  //   console.log(result);
  // } catch (err) {
  //   logger.logError(err);
  // }
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    logger.info('123456');
    await page.goto('http://localhost:8000/invoice', {
      waitUntil: 'networkidle0',
    });
    const pdf = await page.pdf({
      printBackground: true,
      displayHeaderFooter: false,
      timeout: 0,
      format: 'A4',
    });
    await browser.close();

    res.setHeader(
      'Content-Disposition',
      `attechment; filename=invoice123.pdf`
    );

    res.send(pdf);
  } catch (err) {
    logger.logError(err);
    res.send(err);
  }
}

module.exports = { invoiceGenerator };
