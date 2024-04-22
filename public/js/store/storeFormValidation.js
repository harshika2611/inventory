function storeFormValidation(storeFormData) {

  let storeFormErrorObject = {};

  for (let key in storeFormData) {
    switch (key) {
      case "storageName":
        // console.log(key + " " + storeFormData[key]);
        if (storeFormData[key].length === 0) {
          storeFormErrorObject[key] = "* require";
        } else if (storeFormData[key].trim().length === 0 && storeFormData[key] !== "") {
          storeFormErrorObject[key] = "* Please Enter Storage Name";
        } else {
          delete storeFormErrorObject[key];
        }
        break;

      case "storeType":
        // console.log(key + " " + storeFormData[key]);

        if (storeFormData[key].length === 0) {
          storeFormErrorObject[key] = "* require";
        } else if (storeFormData[key].trim().length === 0 && storeFormData[key] !== "") {
          storeFormErrorObject[key] = "* Please Enter Storage Type";
        } else {
          delete storeFormErrorObject[key];
        }
        break;

      case "state":
        // console.log(key + " " + storeFormData[key]);

        const stateSelectCombo = document.getElementById("stateSelectCombo");

        if (stateSelectCombo.selectedIndex < 1) {
          storeFormErrorObject[key] = "* require";
        } else {
          delete storeFormErrorObject[key];
        }
        break;

      case "city":
        // console.log(key + " " + storeFormData[key]);

        const citySelectCombo = document.getElementById("citySelectCombo");

        if (citySelectCombo.selectedIndex < 1) {
          storeFormErrorObject[key] = "* require";
        } else {
          delete storeFormErrorObject[key];
        }
        break;
    }
  }
  return storeFormErrorObject;
}
