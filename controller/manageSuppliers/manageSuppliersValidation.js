const logger = require('../../logs.js');

function manageSuppliersValidation(req, res, next) {
  const supplierDetails = req.body;

  let supplierFormErrorObject = {};

  for (let key in supplierDetails) {
    switch (key) {
      case "firstname":
        if (!supplierDetails[key]) {
          supplierFormErrorObject[key] = "* require";
        } else if (supplierDetails[key].trim().length === 0 && supplierDetails[key] !== "") {
          supplierFormErrorObject[key] = "* Please Enter Firstname";
        } else {
          delete supplierFormErrorObject[key];
        }
        break;

      case "lastname":

        if (!supplierDetails[key]) {
          supplierFormErrorObject[key] = "* require";
        } else if (supplierDetails[key].trim().length === 0 && supplierDetails[key] !== "") {
          supplierFormErrorObject[key] = "* Please Enter Lastname";
        } else {
          delete supplierFormErrorObject[key];
        }
        break;

      case "email":

        const regexemail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

        if (!supplierDetails[key]) {
          supplierFormErrorObject[key] = "* require";
        } else if (!regexemail.test(supplierDetails[key]) && supplierDetails[key] !== "") {
          supplierFormErrorObject[key] = "* Please Enter Valid Email";
        } else {
          delete supplierFormErrorObject[key];
        }
        break;

      case "phonenumber":

        if (!supplierDetails[key]) {
          supplierFormErrorObject[key] = "* require";
        } else if (isNaN(supplierDetails[key]) || supplierDetails[key].length !== 10 || supplierDetails[key].trim().length === 0) {
          supplierFormErrorObject[key] = "* Please Enter Valid Phonenumber";
        } else {
          delete supplierFormErrorObject[key];
        }
        break;


      case "companyname":

        if (supplierDetails[key].length === 0) {
          supplierFormErrorObject[key] = "* require";
        } else if (supplierDetails[key].trim().length === 0 && supplierDetails[key] !== "") {
          supplierFormErrorObject[key] = "* Please Enter Companyname";
        } else {
          delete supplierFormErrorObject[key];
        }
        break;

      case "gst":

        if (supplierDetails[key].length === 0) {
          supplierFormErrorObject[key] = "* require";
        } else if (supplierDetails[key].trim().length === 0 && supplierDetails[key] !== "") {
          supplierFormErrorObject[key] = "* Please Enter GST";
        } else {
          delete supplierFormErrorObject[key];
        }
        break;

      case "address":

        if (supplierDetails[key] && supplierDetails[key].trim().length === 0) {
          supplierFormErrorObject[key] = "* Please Enter Address Not Only Space";
        } else {
          delete supplierFormErrorObject[key];
        }
        break;

      case "zipcode":
        if (!supplierDetails[key]) {
          supplierFormErrorObject[key] = "* require";
        } else if (isNaN(supplierDetails[key]) || supplierDetails[key].trim().length === 0) {
          supplierFormErrorObject[key] = "* Please Enter Valid Zipcode";
        } else {
          delete supplierFormErrorObject[key];
        }
        break;

      case "state":
        if (supplierDetails[key] === "Select State") {
          supplierFormErrorObject[key] = "* require";
        } else {
          delete supplierFormErrorObject[key];
        }
        break;

      case "city":
        if (supplierDetails[key] === "Select City") {
          supplierFormErrorObject[key] = "* require";
        } else {
          delete supplierFormErrorObject[key];
        }
        break;
    }
  }

  if (Object.keys(supplierFormErrorObject).length === 0) {
    next();
  } else {
    return res.status(400).json(supplierFormErrorObject);
  }
}

module.exports = manageSuppliersValidation;