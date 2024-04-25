const logger = require('../../logs.js');

const { productGenerateReport } = require('../../service/report/reportPdf.js');
function reportPdfPage(req, res) {
  return res.render('reports/reportPdf', { data: req.user });
}

async function productReportGenerate(req, res) {
  try {
    // const databaseObject = req.body;
    const storageId = req.user.storageId;
    // logger.info(storageId);

    const productDetailsArray = await productGenerateReport(req.body, storageId);

    // if (productDetailsArray.length > 0) {
    //   return res.status(200).json({ message: "Hello" });
    // } else {
    //   return res.status(404).json({ message: "Something Went Wrong.." });
    // }
  } catch (error) {
    logger.logError("Product Generate Report: " + error);
    return res.status(500).json({ message: "Something Went Wrong.." });
  }
}

// async function generatePdf() {

// }

module.exports = { reportPdfPage, productReportGenerate };