//---------addnew customer
async function addNewCustomer() {
  const customerForm = document.getElementById("myForm");
  customerForm.style.display = "block";
  document.getElementById("submitButton").innerHTML = "Submit";
  document.getElementById("submitButton").setAttribute("onclick", `submitCustomerDetails()`);

  getAllState("stateSelectCombo");  //second parameter those state we need to selected 

  //---old field value clear
  const inputTag = customerForm.querySelectorAll(".customerInput");
  for (let element of inputTag) {
    element.value = "";
  }

  const selectTag = customerForm.getElementsByTagName("select");
  for (let element of selectTag) {
    element.selectedIndex = 0;
  }
}

async function submitCustomerDetails() {
  const customerFormData = formData('customerForm');  //parameter as formname

  const customerDetailsValidation = manageCustomerFormValidation(customerFormData);
  // const customerDetailsValidation = true;

  if (Object.keys(customerDetailsValidation).length > 0) {
    //----client side validation error
    errorShow(customerDetailsValidation);
  } else {
    //----backend
    const response = await fetch('/api/insertCustomer', {
      method: 'POST',
      body: JSON.stringify(customerFormData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    try {
      if (!response.ok) {
        throw new Error("Error In Backend Validation Manage Customer");
      }

      if (response.status === 200) {
        const responseMessage = await response.json();
        const customerForm = document.getElementById("myForm");
        customerForm.style.display = "none";
        getCustomers();
        messagePopUp(responseMessage.message);
      }
    } catch (error) {
      console.log(error);
      if (response.status === 400) {
        const errorObject = await response.json();
        // console.log(errorObject);
        errorShow(errorObject);
      }
    }
  }
}
