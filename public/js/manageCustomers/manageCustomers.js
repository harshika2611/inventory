async function addNewCustomer() {
  const customerForm = document.getElementById("myForm");
  customerForm.style.display = "block";

  getAllState("stateSelectCombo");  //second parameter those state we need to selected 
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
        console.log(response.status);
        console.log(responseMessage.message);
        window.location.replace(window.location.protocol + "//" +
          window.location.host + `/manageCustomers`)
      }
    } catch (error) {
      console.log(error);

      if (response.status === 400) {
        const errorObject = await response.json();
        console.log(errorObject);
        errorShow(errorObject);
      }
    }
  }
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

//---------update customer details
async function openUpdateCustomerForm(customer) {
  document.getElementById("myForm").style.display = "block";
  const customerId = customer.id;
  const response = await fetch(`/api/getCustomers/?customerId=${customerId}`, {
    method: 'GET'
  });
  const customerDetails = await response.json();

  try {
    if (!response.ok) {
      throw new Error("Error In Get Customer Details");
    }

    if (response.status === 200) {
      console.log(customerDetails);
      getAllState("stateSelectCombo", customerDetails[0].state);
      const stateSelectCombo = { id: "stateSelectCombo" }
      getCity(stateSelectCombo, customerDetails[0].state, customerDetails[0].city);

    }
  } catch (error) {
    if (response.status === 404) {
      console.log(customerDetails.message);
    }

    if (response.status === 500) {
      console.log(customerDetails.message);
    }
  }
}

async function updateCustomerDetails(customer) {

}