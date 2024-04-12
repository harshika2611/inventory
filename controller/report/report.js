const logger = require("../../logs");
const { getAllorderreport } = require("../../service/report/reportService");

const getReport = (req, res) => {
  res.render("reports/report");
};

const getAllreport = async (req, res) => {
  try {
    const [rows, fields] = await getAllorderreport();

    const header = [];
    fields.forEach((ele) => {
      header.push(ele.name);
    });
    rows.forEach((ele) => {
      if (ele.payment_status == 1) {
        ele.payment_status = "payed";
        // header.push(ele.name);
      } else {
        ele.payment_status = "Yet-to-Pay";
        // header.push(ele.name);
      }
    });
    res.json({ rows, header });
  } catch (err) {
    logger.logError(err);
  }
};

module.exports = { getReport, getAllreport };
