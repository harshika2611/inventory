function manageManagerFormValidation(req, res, next) {
  const managerDetails = req.body;
  console.log(managerDetails, "validatin");
  let managerFormError = {};
  for (let key in data) {
    console.log(key, "validation");
    switch (key) {
      case "firstname":
        if (data[key].length === 0) {
          managerFormError[key] = "* require";
        } else if (data[key].trim().length === 0 && data[key] !== "") {
          managerFormError[key] = "* Please Enter Firstname";
        } else {
          delete managerFormError[key];
        }
        break;

      case "lastname":
        if (data[key].length === 0) {
          managerFormError[key] = "* require";
        } else if (data[key].trim().length === 0 && data[key] !== "") {
          managerFormError[key] = "* Please Enter Lastname";
        } else {
          delete managerFormError[key];
        }
        break;

      case "email":
        const regexemail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
        if (data[key].length === 0) {
          managerFormError[key] = "* require";
        } else if (!regexemail.test(data[key]) && data[key] !== "") {
          managerFormError[key] = "* Please Enter Valid Email";
        } else {
          delete managerFormError[key];
        }
        break;

      case "state":
        const stateSelectCombo = document.getElementById("state");

        if (stateSelectCombo.selectedIndex < 1) {
          managerFormError[key] = "* require";
        } else {
          delete managerFormError[key];
        }
        break;
    }
  }
  if (Object.keys(managerFormError).length === 0) {
    next();
  } else {
    return res.status(400).json(managerFormError);
  }
}

module.exports = manageManagerFormValidation;
