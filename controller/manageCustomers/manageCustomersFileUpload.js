const logger = require('../../logs.js');

const fs = require("fs");
const csv = require("fast-csv");
const path = require("path");

const { getCityStateId } = require("../../service/commonFunctions/commonFunctions.js");
const { insertCustomerFromFileQuery } = require('../../service/manageCustomers/manageCustomers.js');

async function uploadFile(req, res) {
  try {

    if (req.fileError) {
      return res.status(400).json({ message: "Please Upload CSV File" });
    }
    let filePath = path.join(__dirname, `../../public/uploads/csvFiles/${req.file.filename}`);

    /**first check file exist in folder or not it is extra handle if file upload in folder then this execute
     * second we read csv file each row we got object with csv file first line is key
     */
    if (fs.existsSync(filePath)) {
      fs.createReadStream(filePath)
        .pipe(csv.parse({ headers: true }))
        .on("error", (err) => {
          console.log(err);
          return res.status(500).json({ message: "Something Went Wrong.." });
        })
        .on("data", async (row) => {
          console.log(row);
          const cityStateId = await getCityStateId("Gujarat [GU]", "Junagadh"); //array contain object
          // console.log(row);
          // let cityId = cityStateId[0].city_id;
          // let stateId = cityStateId[0].state_id;
          // console.log(cityId.toString());
          // console.log(stateId.toString());
        })
        .on("end", () => {
          return res.status(200).json({ message: "Inserted" });
        });
    } else {
      throw new Error("Something Went Wrong..")
      // return res.status(500).json({ message: "Something Went Wrong.." });
    }
  } catch (error) {
    logger.info("Customer File Upload:" + error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { uploadFile };