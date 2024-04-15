function formData(formName) {

  const form = document.forms[formName];

  const formData = new FormData(form);

  let formDataObject = {};

  for (let [key, value] of formData.entries()) {
    formDataObject[key] = value;
  }
  return formDataObject;
}

function manageCustomerFormValidation() {
  const customerFormData = formData('customerForm');  //parameter as formname
  let customerFormErrorObject = {};

  for (let key in customerFormData) {
    switch (key) {
      case "firstname":
        console.log(key + " " + customerFormData[key]);
        if (customerFormData[key].length === 0) {
          customerFormErrorObject[key] = "* require";
        } else if (customerFormData[key].trim().length === 0 && customerFormData[key] !== "") {
          customerFormErrorObject[key] = "* Please Enter Firstname";
        } else {
          delete customerFormErrorObject[key];
        }
        break;

      case "lastname":
        console.log(key + " " + customerFormData[key]);

        if (customerFormData[key].length === 0) {
          customerFormErrorObject[key] = "* require";
        } else if (customerFormData[key].trim().length === 0 && customerFormData[key] !== "") {
          customerFormErrorObject[key] = "* Please Enter Lastname";
        } else {
          delete customerFormErrorObject[key];
        }
        break;

      case "email":
        console.log(key + " " + customerFormData[key]);

        const regexemail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

        if (customerFormData[key].length === 0) {
          customerFormErrorObject[key] = "* require";
        } else if (!regexemail.test(customerFormData[key]) && customerFormData[key] !== "") {
          customerFormErrorObject[key] = "* Please Enter Valid Email";
        } else {
          delete customerFormErrorObject[key];
        }
        break;

      case "phonenumber":
        console.log(key + " " + customerFormData[key]);

        if (customerFormData[key].length === 0) {
          customerFormErrorObject[key] = "* require";
        } else if ((isNaN(customerFormData[key]) || customerFormData[key].length !== 10 || customerFormData[key].trim().length === 0) && customerFormData[key] !== "") {
          customerFormErrorObject[key] = "* Please Enter Valid Phonenumber";
        } else {
          delete customerFormErrorObject[key];
        }
        break;

      case "address":
        console.log(key + " " + customerFormData[key]);

        if (customerFormData[key].trim().length === 0 && customerFormData[key] !== "") {
          customerFormErrorObject[key] = "* Please Enter Address Not Only Space";
        } else {
          delete customerFormErrorObject[key];
        }
        break;

      case "zipcode":
        console.log(key + " " + customerFormData[key]);

        if (customerFormData[key].length === 0) {
          customerFormErrorObject[key] = "* require";
        } else if (isNaN(customerFormData[key]) || customerFormData[key].trim().length === 0) {
          customerFormErrorObject[key] = "* Please Enter Valid Zipcode";
        } else {
          delete customerFormErrorObject[key];
        }
        break;

      case "state":
        console.log(key + " " + customerFormData[key]);

        const stateSelectCombo = document.getElementById("stateSelectCombo");

        if (stateSelectCombo.selectedIndex < 1) {
          customerFormErrorObject[key] = "* require";
        } else {
          delete customerFormErrorObject[key];
        }
        break;

      case "city":
        console.log(key + " " + customerFormData[key]);

        const citySelectCombo = document.getElementById("citySelectCombo");

        if (citySelectCombo.selectedIndex < 1) {
          customerFormErrorObject[key] = "* require";
        } else {
          delete customerFormErrorObject[key];
        }
        break;
    }
  }

  if (Object.keys(customerFormErrorObject).length === 0) {
    return true;
  } else {
    // show error and return false
    errorShow(customerFormErrorObject);
    return false;
  }
}


//----common function
function errorShow(errorObject) {
  const allSpan = document.querySelectorAll(".errorspan");

  allSpan.forEach((element) => {
    element.remove();
  });

  for (let key in errorObject) {
    console.log(key + " " + errorObject[key]);
    const targetElement = document.querySelector(`[name="${key}"]`);
    if (targetElement) {
      const errorSpan = targetElement.nextElementSibling;

      if (errorSpan && errorSpan.classList.contains("errorspan")) {
        errorSpan.textContent = errorObject[key];
      } else {
        //errorspan not exist
        const createSpan = document.createElement("span");
        createSpan.textContent = errorObject[key];
        createSpan.setAttribute("class", "errorspan");
        createSpan.style.color = "red";
        targetElement.insertAdjacentElement("afterend", createSpan);
      }
    }
  }

  // const allSpans = document.querySelectorAll(".errorspan");
  // allSpans.forEach(span => {
  //   if (!errorObject.hasOwnProperty(span.previousElementSibling.name)) {
  //     span.remove(); // Remove only if the corresponding input has no error
  //   }
  // });
}
