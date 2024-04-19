function manageManagerFormValidation(req, res, next) {
  const managerDetails = req.body;
  console.log(managerDetails, 'got');
  console.log(managerDetails, 'validatin');
  let managerFormError = {};
  for (let key in managerDetails) {
    console.log(key, 'validation');
    switch (key) {
      case 'firstname':
        if (managerDetails[key].length === 0) {
          managerFormError[key] = '* require';
        } else if (
          managerDetails[key].trim().length === 0 &&
          managerDetails[key] !== ''
        ) {
          managerFormError[key] = '* Please Enter Firstname';
        } else {
          delete managerFormError[key];
        }
        break;

      case 'lastname':
        if (managerDetails[key].length === 0) {
          managerFormError[key] = '* require';
        } else if (
          managerDetails[key].trim().length === 0 &&
          managerDetails[key] !== ''
        ) {
          managerFormError[key] = '* Please Enter Lastname';
        } else {
          delete managerFormError[key];
        }
        break;

      case 'email':
        const regexemail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
        if (managerDetails[key].length === 0) {
          managerFormError[key] = '* require';
        } else if (
          !regexemail.test(managerDetails[key]) &&
          managerDetails[key] !== ''
        ) {
          managerFormError[key] = '* Please Enter Valid Email';
        } else {
          delete managerFormError[key];
        }
        break;

      case 'state':
        console.log(managerDetails[key], 'eehehehehe');
        if (managerDetails[key] == 'select here') {
          managerFormError[key] = '*require';
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
